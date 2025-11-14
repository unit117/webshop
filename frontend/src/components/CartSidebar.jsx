import { useCart } from '../state/CartContext.jsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function CartSidebar() {
  const { items, total, removeItem, clear } = useCart();
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sticky top-28 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('cart')}</h2>
        {items.length > 0 && (
          <button className="text-xs text-rose-500" onClick={clear}>
            Clear
          </button>
        )}
      </div>
      {items.length === 0 && <p className="text-sm text-slate-500">{t('emptyCart')}</p>}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`} className="border border-slate-100 rounded-xl p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-slate-500">x{item.quantity}</p>
                {item.modifiers && (
                  <ul className="text-xs text-slate-500 mt-1 list-disc ml-4">
                    {Object.entries(item.modifiers).map(([group, option]) => (
                      <li key={group}>{`${group}: ${option.name}`}</li>
                    ))}
                  </ul>
                )}
              </div>
              <button className="text-xs text-rose-500" onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
            <p className="text-sm font-semibold mt-2">${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between font-semibold text-lg">
        <span>{t('total')}</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Link
        to="/checkout"
        className="block text-center bg-emerald-600 text-white font-semibold rounded-xl py-2 hover:bg-emerald-500"
      >
        {t('payNow')}
      </Link>
    </div>
  );
}
