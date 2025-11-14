import { Router } from 'express';
import { db } from '../config/db.js';
import { withTranslations } from '../services/translate.js';

const router = Router();

router.get('/', async (req, res) => {
  const lang = req.query.lang || 'en';
  await db.read();
  res.json(db.data.locations.map((loc) => withTranslations(loc, lang, ['name', 'address'])));
});

export default router;
