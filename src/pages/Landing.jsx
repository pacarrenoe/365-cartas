import { useEffect, useState } from "react";
import { obtenerCartas } from "../service/cartasService";
import CartaCard from "../components/CartaCard";
import CartaDetalle from "../components/CartaDetalle";
import LoaderCorazon from "../components/LoaderCorazon";
import DedicatoriaModal from "../components/DedicatoriaModal";

/* ===================== */
/* FECHA LOCAL SEGURA */
/* ===================== */
function hoyLocalISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export default function Landing() {
  const [cartas, setCartas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerCartas()
      .then(setCartas)
      .finally(() => setLoading(false));
  }, []);

  const hoyStr = hoyLocalISO();

  /* ===================== */
  /* NO MOSTRAR FUTURAS */
  /* ===================== */
  const visibles = cartas.filter(c => c.fecha <= hoyStr);

  /* ===================== */
  /* CARTA DESTACADA */
  /* ===================== */
  const cartaHoy =
    visibles.find(c => c.fecha === hoyStr) ??
    visibles[0]; // última escrita como fallback

  /* ===================== */
  /* RESTO */
  /* ===================== */
  const anteriores = visibles.filter(c => c.id !== cartaHoy?.id);

  return (
    <div className="page">
      <div className="container">

        <DedicatoriaModal />

        <header className="header">
          <h1>Mi Nachi 💖</h1>
          <p>
            Un diario digital de todo lo que siento por ti,
            escrito con amor y un poco de código.
          </p>
        </header>

        {loading && <LoaderCorazon />}

        {!loading && (
          <>
            {cartaHoy && (
              <>
                <div className="section-title">
                  💌 Hoy siento y pienso...
                </div>

                <CartaCard
                  carta={cartaHoy}
                  onClick={setSeleccionada}
                  destacada
                />
              </>
            )}

            {anteriores.length > 0 && (
              <>
                <div className="section-title">
                  Hace unos días pensé y sentí...
                </div>

                <div className="grid">
                  {anteriores.map(c => (
                    <CartaCard
                      key={c.id}
                      carta={c}
                      onClick={setSeleccionada}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <CartaDetalle
          carta={seleccionada}
          onClose={() => setSeleccionada(null)}
        />

      </div>
    </div>
  );
}
