import { useEffect } from "react";
import YouTube from "react-youtube";

export default function SorpresaModal({ cupon, onClose }) {

  if (!cupon) return null;

  const opts = {
    width: "100%",
    height: "200",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="cupon-modal-overlay">
      <div className="cupon-modal">

        <h2 className="sorpresa-titulo">
          {cupon.titulo}
        </h2>

        <p className="sorpresa-mensaje">
          {cupon.mensaje}
        </p>

        {cupon.youtubeId && (
          <div className="sorpresa-video">
            <YouTube
              videoId={cupon.youtubeId}
              opts={opts}
            />
          </div>
        )}

        <div className="cupon-actions">
          <button
            className="cupon-secondary"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
