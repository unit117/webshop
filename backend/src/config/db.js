import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSONFilePreset } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, '../../data/db.json');

const defaultData = {
  locations: [],
  menuItems: [],
  modifiers: [],
  users: [],
  orders: [],
  payments: [],
  passkeyChallenges: []
};

export const db = await JSONFilePreset(dbFile, defaultData);

export async function seedIfEmpty(seedData) {
  await db.read();
  let dirty = false;
  Object.entries(seedData).forEach(([key, value]) => {
    if (db.data[key] && db.data[key].length === 0 && value?.length) {
      db.data[key] = value;
      dirty = true;
    }
  });
  if (dirty) {
    await db.write();
  }
}
