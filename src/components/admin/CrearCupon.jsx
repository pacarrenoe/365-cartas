import { useState } from "react";
import { crearCupon } from "../../service/cuponesService";

import { QRCodeCanvas } from "qrcode.react";

export default function CrearCupon({ onCreate }) {
  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [musica, setMusica] = useState("");

  const url = `https://cartas-365.web.app/cupon/${codigo}`;

  const handleGuardar = async () => {
    if (!codigo || !titulo || !mensaje) {
      alert("Completa todos los campos");
      return;
    }

    await crearCupon({ codigo, titulo, mensaje, musica });
    alert("Cupón creado 💖");

    onCreate(); // recargar lista
  };

  return (
    <div>
      <h2>Crear Cupón 🎟️</h2>

      <input
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        placeholder="Mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />

      <input
        placeholder="URL música (opcional)"
        value={musica}
        onChange={(e) => setMusica(e.target.value)}
      />

      <button onClick={handleGuardar}>
        Guardar
      </button>

      {codigo && (
        <div style={{ marginTop: 20 }}>
          <QRCodeCanvas value={url} size={200} />
        </div>
      )}
    </div>
  );
}
