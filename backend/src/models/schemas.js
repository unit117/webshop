import { z } from 'zod';

const translation = z.object({
  name_en: z.string(),
  name_fr: z.string(),
});

export const locationSchema = translation.extend({
  id: z.string(),
  address_en: z.string(),
  address_fr: z.string(),
  timezone: z.string(),
});

export const modifierOptionSchema = z.object({
  id: z.string(),
  name_en: z.string(),
  name_fr: z.string(),
  price: z.number().nonnegative(),
});

export const modifierSchema = z.object({
  id: z.string(),
  name_en: z.string(),
  name_fr: z.string(),
  min: z.number().nonnegative().default(0),
  max: z.number().nonnegative().default(1),
  options: z.array(modifierOptionSchema),
});

export const menuItemSchema = z.object({
  id: z.string(),
  name_en: z.string(),
  name_fr: z.string(),
  description_en: z.string(),
  description_fr: z.string(),
  price: z.number().positive(),
  category: z.string(),
  locationId: z.string(),
  modifierIds: z.array(z.string()).optional(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  preferredLanguage: z.enum(['en', 'fr']).default('en'),
  role: z.enum(['customer', 'admin']).default('customer'),
  passkeys: z.array(z.object({
    id: z.string(),
    publicKey: z.string(),
    counter: z.number(),
    transports: z.array(z.string()).optional(),
  })),
});

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  locationId: z.string(),
  items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().positive(),
    modifiers: z.record(z.string(), z.any()).optional(),
    notes: z.string().optional(),
  })),
  total: z.number().positive(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
  createdAt: z.string(),
});

export const paymentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  provider: z.string(),
  providerReference: z.string(),
  amount: z.number().positive(),
  currency: z.string(),
  createdAt: z.string(),
  method: z.enum(['apple_pay', 'card', 'cash']).optional(),
});
