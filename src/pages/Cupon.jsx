import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

  return (
    <div className="page">
      <div className="container">
        <h1>{cupon.titulo}</h1>
        <p>{cupon.mensaje}</p>

        {cupon.musica && (
          <audio controls autoPlay>
            <source src={cupon.musica} type="audio/mpeg" />
          </audio>
        )}
      </div>
    </div>
  );
}
