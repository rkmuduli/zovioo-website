import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const items = [
  ['', '▦', 'Overview'],
  ['rooms', '⌂', 'Rooms & rates'],
  ['reservations', '▤', 'Reservations'],
  ['guests', '♙', 'Guest records'],
  ['offers', '◇', 'Offers'],
  ['reports', '▥', 'Reports'],
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = pathname.replace(/^\/admin\/?/, '').replace(/\/$/, '');

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <Link className="brand" to="/">ZOVIOO</Link>
        <div><span className="badge">ADMIN DEMO</span> &nbsp; <Link to="/">← Guest website</Link></div>
      </header>
      <div className="admin-layout">
        <aside className="sidebar">
          <div className="sidebar-label">HOTEL MANAGEMENT</div>
          {items.map(([path, icon, label]) => (
            <button
              key={label}
              className={`side-link${current === path ? ' active' : ''}`}
              onClick={() => navigate(path ? `/admin/${path}` : '/admin')}
            >
              <span>{icon}</span>{label}
            </button>
          ))}
        </aside>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
