import { useAuth } from "../../../hooks/useAuth";

export default function AdminLayout({ sidebar, children }) {
  const { logout } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-aside">
        <h2>📘 Cartas</h2>
        {sidebar}
      </aside>

      <section className="admin-content">
        <header className="admin-top">
          <h1>Panel de administración</h1>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </header>

        <div className="admin-page">
          {children}
        </div>
      </section>
    </div>
  );
}
