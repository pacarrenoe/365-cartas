export default function ListarCartas({ cartas, onEdit, onDelete }) {
  return (
    <>
      <h2>Listado de cartas</h2>

      {cartas.map(c => (
        <div className="card" key={c.id}>
          <strong>Día {c.dia}</strong>

          <p style={{ margin: "0.5rem 0" }}>
            {c.texto.slice(0, 150)}…
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn-primary" onClick={() => onEdit(c)}>
            ✏️ Editar
            </button>

            <button className="btn-danger" onClick={() => onDelete(c.id)}>
            🗑 Eliminar
            </button>

          </div>
        </div>
      ))}
    </>
  );
}
