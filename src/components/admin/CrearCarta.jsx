import { useState } from "react";

export default function CrearCarta({ onCreate }) {
  const [dia, setDia] = useState("");
  const [texto, setTexto] = useState("");

  return (
    <div className="card">
      <h2>Nueva carta</h2>

      <input
        type="number"
        placeholder="Día"
        value={dia}
        onChange={e => setDia(e.target.value)}
      />

      <textarea
        rows={6}
        placeholder="Texto de la carta"
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />

      <button onClick={() => onCreate(dia, texto)}>
        Guardar
      </button>
    </div>
  );
}
