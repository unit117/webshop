import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../state/CartContext.jsx';

function ModifierGroup({ modifier, selection, onSelect }) {
  return (
    <div className="text-sm space-y-2">
      <p className="font-semibold">{modifier.name}</p>
      <div className="flex flex-wrap gap-2">
        {modifier.options.map((option) => (
          <button
            key={option.id}
            className={`border rounded-full px-3 py-1 text-xs ${
              selection?.id === option.id ? 'bg-emerald-100 border-emerald-500' : 'border-slate-200'
            }`}
            onClick={() => onSelect(option)}
            type="button"
          >
            {option.name} {option.price ? `(+${option.price.toFixed(2)})` : ''}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MenuItemCard({ item }) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [modSelections, setModSelections] = useState(() => ({}));

  const handleAdd = () => {
    const modifiers = {};
    let extra = 0;
    item.modifiers?.forEach((mod) => {
      const selected = modSelections[mod.id] || mod.options?.[0];
      if (selected) {
        modifiers[mod.name] = { name: selected.name, price: selected.price };
        extra += selected.price || 0;
      }
    });
    const payload = {
      id: item.id,
      name: item.name,
      quantity,
      price: item.price + extra,
      modifiers,
      signature: JSON.stringify(modifiers),
    };
    addItem(payload);
    setQuantity(1);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-slate-600">{item.description}</p>
      </div>
      {item.modifiers?.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">{t('customize')}</p>
          {item.modifiers.map((modifier) => (
            <ModifierGroup
              key={modifier.id}
              modifier={modifier}
              selection={modSelections[modifier.id]}
              onSelect={(option) => setModSelections((prev) => ({ ...prev, [modifier.id]: option }))}
            />
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center border rounded-full">
          <button
            className="px-3 py-1"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            type="button"
          >
            -
          </button>
          <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
          <button className="px-3 py-1" onClick={() => setQuantity((q) => q + 1)} type="button">
            +
          </button>
        </div>
        <button
          className="flex-1 bg-emerald-600 text-white font-semibold rounded-full py-2"
          onClick={handleAdd}
          type="button"
        >
          {t('addToCart')} · ${(item.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
