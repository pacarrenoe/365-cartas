function formatearFecha(fechaStr) {
  const d = new Date(fechaStr + "T00:00:00");

  return d.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default function CartaDetalle({ carta, onClose }) {
  if (!carta) return null;

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        <h2>Día {carta.dia}</h2>

        <p className="card-fecha">
          {formatearFecha(carta.fecha)}
        </p>

        <p className="modal-texto">
          {carta.texto}
        </p>

        <button
          className="modal-close"
          onClick={onClose}
        >
          Cerrar
        </button>

      </div>
    </div>
  );
}
