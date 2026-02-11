export default function ListarCupones({ cupones, onDelete }) {
  return (
    <div>
      <h2>Cupones creados 🎫</h2>

      {cupones.map(c => (
        <div key={c.id} style={{ marginBottom: 20 }}>
          <strong>{c.titulo}</strong>
          <p>{c.codigo}</p>

          <button onClick={() => onDelete(c.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
