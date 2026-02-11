import { useEffect, useState } from "react";
import { obtenerCartas } from "../service/cartasService";
import CartaCard from "../components/CartaCard";
import CartaDetalle from "../components/CartaDetalle";
import LoaderCorazon from "../components/LoaderCorazon";
import DedicatoriaModal from "../components/DedicatoriaModal";

import CuponModal from "../components/CuponModal";
import SorpresaModal from "../components/SorpresaModal";

import "../styles/base.css";
import "../styles/layout.css";
import "../styles/cartas.css";
import "../styles/cupones.css";

function hoyLocalISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export default function Landing() {
  const [cartas, setCartas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mostrarCupon, setMostrarCupon] = useState(false);
  const [sorpresa, setSorpresa] = useState(null);

  useEffect(() => {
    obtenerCartas()
      .then(setCartas)
      .finally(() => setLoading(false));
  }, []);

  const hoyStr = hoyLocalISO();
  const visibles = cartas.filter(c => c.fecha <= hoyStr);

  const cartaHoy =
    visibles.find(c => c.fecha === hoyStr) ??
    visibles[0];

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

        {/* 🎟 SECCIÓN CUPÓN */}
        <div className="cupon-section">
          <p>¿Tienes un cupón especial?</p>
          <button
            className="cupon-btn"
            onClick={() => setMostrarCupon(true)}
          >
            Mira la sorpresa 💌
          </button>
        </div>

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

        {/* MODALES */}
        <CuponModal
          visible={mostrarCupon}
          onClose={() => setMostrarCupon(false)}
          onSuccess={(data) => {
            setMostrarCupon(false);
            setSorpresa(data);
          }}
        />

        <SorpresaModal
          cupon={sorpresa}
          onClose={() => setSorpresa(null)}
        />

      </div>
    </div>
  );
}
