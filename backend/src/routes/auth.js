import { Router } from 'express';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { db } from '../config/db.js';
import { authenticate, createToken, createUser, findUserByEmail } from '../services/auth.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();
const rpID = process.env.RP_ID || 'localhost';
const origin = process.env.CLIENT_URL || 'http://localhost:5173';

router.post('/register', async (req, res) => {
  const { email, password, name, preferredLanguage } = req.body;
  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const user = await createUser({ email, password, name, preferredLanguage });
  const token = createToken(user);
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await authenticate(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = createToken(user);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.get('/me', requireAuth, async (req, res) => {
  await db.read();
  const user = db.data.users.find((u) => u.id === req.user.id);
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

router.post('/passkey/options', requireAuth, async (req, res) => {
  await db.read();
  const user = db.data.users.find((u) => u.id === req.user.id);
  const options = generateRegistrationOptions({
    rpName: 'Web Shop',
    rpID,
    userID: user.id,
    userName: user.email,
    attestationType: 'none',
  });
  db.data.passkeyChallenges = db.data.passkeyChallenges.filter((c) => c.userId !== user.id || c.type !== 'registration');
  db.data.passkeyChallenges.push({ userId: user.id, type: 'registration', challenge: options.challenge });
  await db.write();
  res.json(options);
});

router.post('/passkey/verify', requireAuth, async (req, res) => {
  const body = req.body;
  await db.read();
  const record = db.data.passkeyChallenges.find((c) => c.userId === req.user.id && c.type === 'registration');
  if (!record) {
    return res.status(400).json({ message: 'No challenge registered' });
  }
  const verification = await verifyRegistrationResponse({
    response: body,
    expectedChallenge: record.challenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });
  if (!verification.verified) {
    return res.status(400).json({ message: 'Verification failed' });
  }
  const user = db.data.users.find((u) => u.id === req.user.id);
  user.passkeys.push({
    id: verification.registrationInfo.credentialID,
    publicKey: Buffer.from(verification.registrationInfo.credentialPublicKey).toString('base64'),
    counter: verification.registrationInfo.counter,
    transports: body.response?.transports || [],
  });
  db.data.passkeyChallenges = db.data.passkeyChallenges.filter((c) => c !== record);
  await db.write();
  res.json({ verified: true });
});

router.post('/passkey/assertion-options', async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user || user.passkeys.length === 0) {
    return res.status(404).json({ message: 'No passkeys for user' });
  }
  const options = generateAuthenticationOptions({
    rpID,
    allowCredentials: user.passkeys.map((pk) => ({ id: pk.id, type: 'public-key' })),
  });
  await db.read();
  db.data.passkeyChallenges = db.data.passkeyChallenges.filter((c) => c.userId !== user.id || c.type !== 'authentication');
  db.data.passkeyChallenges.push({ userId: user.id, type: 'authentication', challenge: options.challenge });
  await db.write();
  res.json({ ...options, userId: user.id });
});

router.post('/passkey/assertion-verify', async (req, res) => {
  const { userId, response } = req.body;
  await db.read();
  const record = db.data.passkeyChallenges.find((c) => c.userId === userId && c.type === 'authentication');
  const user = db.data.users.find((u) => u.id === userId);
  if (!record || !user) {
    return res.status(400).json({ message: 'Challenge not found' });
  }
  const credential = user.passkeys.find((pk) => pk.id === response.id);
  if (!credential) {
    return res.status(404).json({ message: 'Credential missing' });
  }
  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge: record.challenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    authenticator: {
      credentialID: credential.id,
      credentialPublicKey: Buffer.from(credential.publicKey, 'base64'),
      counter: credential.counter,
      transports: credential.transports,
    },
  });
  if (!verification.verified) {
    return res.status(400).json({ message: 'Verification failed' });
  }
  credential.counter = verification.authenticationInfo.newCounter;
  db.data.passkeyChallenges = db.data.passkeyChallenges.filter((c) => c !== record);
  await db.write();
  const token = createToken(user);
  res.json({ verified: true, token });
});

export default router;
