export default function CartaDetalle({ carta, onClose }) {
  if (!carta) return null;

  return (
    <div className="carta">
      <button onClick={onClose}>← Volver</button>
      <h2>Día {carta.dia}</h2>
      <p>{carta.fecha}</p>
      <hr />
      <p style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
        {carta.texto}
      </p>
    </div>
  );
}
