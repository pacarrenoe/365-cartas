import { useEffect, useState } from "react";
import { obtenerCartasPaginadas } from "../service/cartasService";
import CartaCard from "../components/CartaCard";
import CartaDetalle from "../components/CartaDetalle";
import LoaderCorazon from "../components/LoaderCorazon";
import DedicatoriaModal from "../components/DedicatoriaModal";

/* ===================== */
/* DEBUG FLAG */
/* ===================== */

const DEBUG_LOADER = false;

/* ===================== */
/* FECHA LOCAL SEGURA */
/* ===================== */

function hoyLocalISO() {
  const d = new Date();

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export default function Landing() {
  const [cartas, setCartas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [hayMas, setHayMas] = useState(true);

  async function cargarMas() {
    if (loading || !hayMas) return;

    setLoading(true);

    try {
      const res = await obtenerCartasPaginadas(lastDoc);

      setCartas(prev => {
        const ids = new Set(prev.map(c => c.id));
        const nuevas = res.cartas.filter(c => !ids.has(c.id));
        return [...prev, ...nuevas];
      });

      setLastDoc(res.ultimoDoc);
      setHayMas(res.hayMas);

    } finally {
      setLoading(false);
      setLoadingInicial(false);
    }
  }

  useEffect(() => {
    if (!DEBUG_LOADER) {
      cargarMas();
    }
  }, []);

  /* ===================== */
  /* FECHA HOY */
  /* ===================== */

  const hoyStr = hoyLocalISO();

  /* ===================== */
  /* FILTRAR FUTURAS */
  /* ===================== */

  const cartasVisibles = cartas.filter(
    c => c.fecha <= hoyStr
  );

  /* ===================== */
  /* DESTACADA */
  /* ===================== */

  const cartaHoy =
    cartasVisibles.find(c => c.fecha === hoyStr)
    ?? cartasVisibles[0]   // fallback elegante

  /* ===================== */
  /* ANTERIORES */
  /* ===================== */

  const anteriores = cartasVisibles.filter(
    c => c.id !== cartaHoy?.id
  );

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

        {(loadingInicial || DEBUG_LOADER) && (
          <LoaderCorazon />
        )}

        {!loadingInicial && !DEBUG_LOADER && (
          <>

            {/* ===================== */}
            {/* CARTA DE HOY */}
            {/* ===================== */}

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

            {/* ===================== */}
            {/* ANTERIORES */}
            {/* ===================== */}

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
