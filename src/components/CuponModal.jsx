import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { obtenerCuponPorCodigo } from "../service/cuponesService";
import toast from "react-hot-toast";

export default function CuponModal({ visible, onClose, onSuccess }) {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [escaneando, setEscaneando] = useState(false);

  const qrRef = useRef(null);
  const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    if (!escaneando) return;

    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250
      },
      (decodedText) => {
        html5QrCode.stop();
        setEscaneando(false);

        try {
          const url = new URL(decodedText.trim());
          const partes = url.pathname.split("/");
          const codigoDetectado = partes[partes.length - 1].trim();

          buscarCupon(codigoDetectado);
        } catch {
          buscarCupon(decodedText.trim());
}

        buscarCupon(codigoDetectado);
      },
      (error) => {}
    );

    return () => {
      html5QrCode.stop().catch(() => {});
    };

  }, [escaneando]);

  if (!visible) return null;

  const buscarCupon = async (codigoBusqueda = codigo) => {
    if (!codigoBusqueda.trim()) {
      toast.error("Ingresa un código 💌");
      return;
    }

    try {
      setLoading(true);

      const data = await obtenerCuponPorCodigo(codigoBusqueda.trim());

      if (!data) {
        toast.error("Cupón no encontrado 💔");
        return;
      }

      setCodigo("");
      onSuccess(data);

    } catch (error) {
      console.error(error);
      toast.error("Error buscando el cupón");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cupon-modal-overlay">
      <div className="cupon-modal">

        <h3>Ingresa o escanea tu código 💌</h3>

        <input
          className="cupon-input"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ej: XXXXX"
        />

        <div className="cupon-actions">

          <button
            className="cupon-primary"
            onClick={() => buscarCupon()}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Leer"}
          </button>

          {esMovil && (
            <button
              className="cupon-secondary"
              onClick={() => setEscaneando(true)}
            >
              Escanear QR
            </button>
          )}

          <button
            className="cupon-secondary"
            onClick={onClose}
          >
            Salir
          </button>

        </div>

        {escaneando && (
          <div id="reader" className="qr-reader"></div>
        )}

      </div>
    </div>
  );
}
