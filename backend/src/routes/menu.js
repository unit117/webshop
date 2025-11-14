import { Router } from 'express';
import { db } from '../config/db.js';
import { withTranslations } from '../services/translate.js';

const router = Router();

router.get('/', async (req, res) => {
  const lang = req.query.lang || 'en';
  await db.read();
  const modifiers = db.data.modifiers.map((modifier) => ({
    ...withTranslations(modifier, lang, ['name']),
    options: modifier.options?.map((opt) => withTranslations(opt, lang, ['name'])) || [],
  }));
  const modifierById = Object.fromEntries(modifiers.map((m) => [m.id, m]));
  const items = db.data.menuItems.map((item) => {
    const translated = withTranslations(item, lang, ['name', 'description']);
    return {
      ...translated,
      modifiers: item.modifierIds?.map((id) => modifierById[id]).filter(Boolean) || [],
    };
  });
  res.json({ items, modifiers, categories: [...new Set(items.map((i) => i.category))] });
});

router.post('/', async (req, res) => {
  const item = req.body;
  await db.read();
  db.data.menuItems.push(item);
  await db.write();
  res.status(201).json(item);
});

export default router;
