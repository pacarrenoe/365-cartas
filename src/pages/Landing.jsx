import { useState } from "react";
import CartaCard from "../components/CartaCard";
import CartaDetalle from "../components/CartaDetalle";

const cartasMock = [
  {
    dia: 1,
    fecha: "2026-01-01",
    texto: "Hoy empezó algo que no sabía cuánto iba a cambiarme..."
  },
  {
    dia: 2,
    fecha: "2026-01-02",
    texto: "Descubrí que los días simples también guardan magia..."
  },
  {
    dia: 3,
    fecha: "2026-01-03",
    texto: "A veces el corazón entiende antes que la cabeza..."
  }
];

export default function Landing() {
  const [seleccionada, setSeleccionada] = useState(null);

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: 24 }}>

      <h1 className="titulo">365 Cartas 💌</h1>
      <p className="subtitulo">
        Una carta por día. Un recuerdo para siempre.
      </p>

      {seleccionada ? (
        <CartaDetalle
          carta={seleccionada}
          onClose={() => setSeleccionada(null)}
        />
      ) : (
        <div className="grid">
          {cartasMock.map(c => (
            <CartaCard
              key={c.dia}
              carta={c}
              onClick={setSeleccionada}
            />
          ))}
        </div>
      )}

    </div>
  );
}
