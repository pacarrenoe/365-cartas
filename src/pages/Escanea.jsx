import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Escanea() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const buscar = () => {
    if (codigo.trim()) {
      navigate(`/cupon/${codigo}`);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h2>Ingresa tu código 💌</h2>

        <input
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ej: MASAJE-01"
        />

        <button onClick={buscar}>
          Ver sorpresa
        </button>
      </div>
    </div>
  );
}
