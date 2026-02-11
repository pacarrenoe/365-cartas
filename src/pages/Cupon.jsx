import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { obtenerCuponPorCodigo } from "../service/cuponesService";
import LoaderCorazon from "../components/LoaderCorazon";

export default function Cupon() {
  const { codigo } = useParams();
  const [cupon, setCupon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerCuponPorCodigo(codigo)
      .then(setCupon)
      .finally(() => setLoading(false));
  }, [codigo]);

  if (loading) return <LoaderCorazon />;

  if (!cupon) {
    return (
      <div className="page">
        <div className="container">
          <h2>Este cupón no existe 💔</h2>
        </div>
      </div>
    );
  }

  const opts = {
    width: "100%",
    height: "250",
    playerVars: {
      autoplay: 1,
      controls: 1
    }
  };

  return (
    <div className="page">
      <div className="container cupon-page">

        <h1 className="cupon-page-title">
          {cupon.titulo}
        </h1>

        <p className="cupon-page-message">
          {cupon.mensaje}
        </p>

        {cupon.youtubeId && (
          <div className="cupon-page-player">
            <YouTube
              videoId={cupon.youtubeId}
              opts={opts}
            />
          </div>
        )}

      </div>
    </div>
  );
}
