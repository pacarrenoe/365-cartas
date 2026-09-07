export default function AdminSidebar({ active, onChange }) {
  return (
    <nav className="sidebar">
      <button onClick={() => onChange("create")} className={active==="create" ? "active" : ""}>
        ➕ Crear carta
      </button>

      <button onClick={() => onChange("list")} className={active==="list" ? "active" : ""}>
        📋 Listar cartas
      </button>
    </nav>
  );
}
