function formatearFecha(fechaStr) {
  const d = new Date(fechaStr + "T00:00:00");

  return d.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default function CartaCard({ carta, onClick, destacada }) {

  const preview =
    carta.texto.length > 140
      ? carta.texto.slice(0, 140) + "..."
      : carta.texto;

  return (
    <div
      className={`card ${destacada ? "card-hoy" : ""}`}
      onClick={() => onClick(carta)}
    >
      <div className="card-dia">
        Día {carta.dia}
      </div>

      <div className="card-fecha">
        {formatearFecha(carta.fecha)}
      </div>

      <div className="card-texto">
        {preview}
      </div>
    </div>
  );
}
