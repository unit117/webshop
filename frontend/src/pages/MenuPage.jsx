import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItemCard from '../components/MenuItemCard.jsx';
import { api } from '../api/client.js';

export default function MenuPage() {
  const { i18n, t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const { data, isLoading, error } = useQuery({
    queryKey: ['menu', i18n.language],
    queryFn: () => api.menu(i18n.language),
  });

  if (isLoading) return <p className="text-sm text-slate-500">Loading menu…</p>;
  if (error) return <p className="text-sm text-rose-500">Failed to load menu</p>;

  const categories = ['all', ...(data?.categories || [])];
  const filtered =
    activeCategory === 'all'
      ? data.items
      : data.items.filter((item) => item.category === activeCategory);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-slate-500 uppercase tracking-wide">{t('menu')}</p>
        <p className="text-base text-slate-600 max-w-2xl">{t('welcome')}</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeCategory === category
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-slate-200 text-slate-600'
              }`}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </header>
      <div className="grid gap-4">
        {filtered.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
