import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { api } from '../api/client.js';

export default function DashboardPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: api.listOrders });
  const [menuItem, setMenuItem] = useState({
    name_en: '',
    name_fr: '',
    description_en: '',
    description_fr: '',
    price: 5,
    category: 'coffee',
    locationId: 'loc-1',
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => api.updateOrderStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  const menuMutation = useMutation({
    mutationFn: api.adminMenuCreate,
  });

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">{t('dashboard')}</h1>
        <p className="text-slate-500 text-sm">{t('adminHeadline')}</p>
      </div>
      <div className="grid gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-4">
          <h2 className="font-semibold">Live orders</h2>
          <div className="space-y-3">
            {orders?.map((order) => (
              <div key={order.id} className="border border-slate-100 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <select
                    className="text-sm border rounded"
                    value={order.status}
                    onChange={(event) =>
                      statusMutation.mutate({ id: order.id, status: event.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <ul className="text-sm text-slate-600 mt-2 list-disc ml-4">
                  {order.items.map((item) => (
                    <li key={item.menuItemId}>
                      {item.quantity} × {item.menuItemId}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-4">
          <h2 className="font-semibold">Add menu item (EN/FR)</h2>
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              menuMutation.mutate(menuItem);
            }}
          >
            <div className="grid md:grid-cols-2 gap-3">
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="Name EN"
                value={menuItem.name_en}
                onChange={(e) => setMenuItem({ ...menuItem, name_en: e.target.value })}
                required
              />
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="Nom FR"
                value={menuItem.name_fr}
                onChange={(e) => setMenuItem({ ...menuItem, name_fr: e.target.value })}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <textarea
                className="border rounded-lg px-3 py-2"
                placeholder="Description EN"
                value={menuItem.description_en}
                onChange={(e) => setMenuItem({ ...menuItem, description_en: e.target.value })}
              />
              <textarea
                className="border rounded-lg px-3 py-2"
                placeholder="Description FR"
                value={menuItem.description_fr}
                onChange={(e) => setMenuItem({ ...menuItem, description_fr: e.target.value })}
              />
            </div>
            <input
              type="number"
              step="0.1"
              className="border rounded-lg px-3 py-2"
              value={menuItem.price}
              onChange={(e) => setMenuItem({ ...menuItem, price: Number(e.target.value) })}
            />
            <button className="bg-emerald-600 text-white rounded-xl py-2 font-semibold" type="submit">
              Save item
            </button>
            {menuMutation.isSuccess && (
              <p className="text-sm text-emerald-600">Menu item created.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
