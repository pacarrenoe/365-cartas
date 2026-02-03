import { useState } from "react";

export default function EditarCarta({ carta, onSave, onCancel }) {
  const [texto, setTexto] = useState(carta.texto);

  return (
    <section className="card">
      <h2>Editar Día {carta.dia}</h2>

      <textarea
        rows={6}
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />

      <div className="actions">
        <button onClick={() => onSave(carta.id, texto)}>Guardar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </section>
  );
}
