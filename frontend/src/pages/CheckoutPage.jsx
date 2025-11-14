import { useTranslation } from 'react-i18next';
import { useCart } from '../state/CartContext.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { items, total } = useCart();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{t('checkout')}</h1>
        <p className="text-slate-500 text-sm">Securely pay with Apple Pay or a fallback card form.</p>
      </header>
      <div className="grid gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-4">
          <h2 className="font-semibold mb-2">Order summary</h2>
          <ul className="space-y-2 text-sm">
            {items.map((item, idx) => (
              <li key={`${item.id}-${idx}`} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>{t('total')}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <CheckoutForm total={total} disabled={items.length === 0} />
      </div>
    </section>
  );
}
