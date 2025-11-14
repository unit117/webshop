import { NavLink, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MenuPage from './pages/MenuPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { CartSidebar } from './components/CartSidebar.jsx';
import { useCart } from './state/CartContext.jsx';

function Layout() {
  const { t, i18n } = useTranslation();
  const { items } = useCart();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4 justify-between">
          <NavLink to="/" className="text-xl font-semibold tracking-tight">
            WebShop Café
          </NavLink>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <NavLink to="/" className="hover:text-emerald-600" end>
              {t('menu')}
            </NavLink>
            <NavLink to="/checkout" className="hover:text-emerald-600">
              {t('checkout')} ({items.length})
            </NavLink>
            <NavLink to="/dashboard" className="hover:text-emerald-600">
              {t('dashboard')}
            </NavLink>
            <select
              className="border border-slate-200 rounded px-2 py-1 text-xs"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
        <aside className="lg:block">
          <CartSidebar />
        </aside>
      </main>
    </div>
  );
}

export default function App() {
  return <Layout />;
}
