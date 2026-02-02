export default function CartaCard({ carta, onClick }) {
  return (
    <div className="carta" onClick={() => onClick(carta)}>
      <h3>Día {carta.dia}</h3>
      <p>{carta.fecha}</p>
      <p>
        {carta.texto.slice(0, 90)}...
      </p>
    </div>
  );
}
