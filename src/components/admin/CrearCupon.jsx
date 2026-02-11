import { useState } from "react";
import { crearCupon } from "../../service/cuponesService";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

export default function CrearCupon({ onCreate }) {
  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [loading, setLoading] = useState(false);

  const url = `https://cartas-365.web.app/cupon/${codigo}`;

  const handleGuardar = async () => {
    if (!codigo || !titulo || !mensaje) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);

      await crearCupon({
        codigo,
        titulo,
        mensaje,
        youtubeId
      });

      toast.success("Cupón creado 💖");

      setCodigo("");
      setTitulo("");
      setMensaje("");
      setYoutubeId("");

      if (onCreate) onCreate();

    } catch (error) {
      console.error(error);
      toast.error("Error al guardar cupón");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-cupon-wrapper">

      <h2 className="crear-cupon-title">
        Crear Cupón 🎟️
      </h2>

      <div className="crear-cupon-form">

        <input
          className="crear-cupon-input"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <input
          className="crear-cupon-input"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          className="crear-cupon-textarea"
          placeholder="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        <input
          className="crear-cupon-input"
          placeholder="YouTube ID"
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
        />

        <button
          className={`crear-cupon-btn ${loading ? "loading" : ""}`}
          onClick={handleGuardar}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Cupón"}
        </button>

      </div>

      {codigo && (
        <div className="crear-cupon-qr">
          <h4>QR generado</h4>
          <QRCodeCanvas value={url} size={180} />
        </div>
      )}

    </div>
  );
}
