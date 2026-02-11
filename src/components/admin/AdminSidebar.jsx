export default function AdminSidebar({ active, onChange }) {
  return (
    <nav className="sidebar">
      <button onClick={() => onChange("create")} className={active==="create" ? "active" : ""}>
        ➕ Crear carta
      </button>

      <button onClick={() => onChange("list")} className={active==="list" ? "active" : ""}>
        📋 Listar cartas
      </button>
      
      <button onClick={() => onChange("cupon-create")}>
        🎟 Crear cupón
      </button>

      <button onClick={() => onChange("cupon-list")}>
        🎫 Listar cupones
      </button>
    </nav>
  );
}
