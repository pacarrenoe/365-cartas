import { useEffect, useState } from "react";

/* ===================== */
/* RANGO FECHAS */
/* ===================== */

const FECHA_INICIO = "2026-02-02";
const FECHA_FIN    = "2026-02-06";

function hoyLocalISO() {
  const d = new Date();

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export default function DedicatoriaModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hoy = hoyLocalISO();

    if (hoy >= FECHA_INICIO && hoy <= FECHA_FIN) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="modal-bg">
      <div className="modal romantic">

        <h2>Mi amor linda, hermosa, preciosa 💖</h2>

        <p>
          Hice esto para ti porque quería escribirte muchas cartas, como en "Diario de una pasión". 
          Siempre dices que quieres ser protagonista, que te pidan las cosas de manera bonita. <br />
          Entonces quise escribirte y comencé hace unos días, pero mi mano a veces no me deja escribir 
          todo lo que siento con lápiz, aunque mi corazón sí lo tenga lleno de palabras o de ideas. <br />
          Y como no quería dejar de decirte lo que me pasa contigo, decidí hacerlo a mi manera, la forma que mejor 
          conozco: con código, con detalle, con dedicación y con muchísimo amor. <br />
          Nos conocimos en un momento difícil, 
          en un lugar donde ambas estábamos sanando, pasando procesos fuertes por dentro, y aun así, entre 
          conversaciones suaves y miradas con tensión, empezaste a volverte especial para mí sin que me diera 
          cuenta de cuándo exactamente pasó. <br />
          Desde que te conocí, no he dejado de pensar en ti; 
          desde ese 29 de diciembre no he parado de querer estar contigo, de saber de ti, de imaginar momentos a tu lado. <br />
          Aquí vas a encontrar pequeñas cartas diarias: a veces cortitas, a veces más profundas, a veces simples pensamientos, 
          recuerdos de momentos contigo o cosas que amo de tu forma de ser. <br />
          Es mi diario para ti, mi versión digital de escribirte
          a mano, un lugar donde dejo guardado lo mucho que te amo, lo enamorada que estoy de tu ternura, de tu sensibilidad, de ti. <br />
          Me gusta esta versión porque puedes abrirlo cuando quieras, donde estés, desde tu teléfono, y encontrarte con una parte 
          de mi corazón escrita especialmente para ti.
        </p>
        <p className="center">
          Todo esto es para ti. <br />
          Porque te amo. <br />
          Porque te elijo. <br />
          Porque me haces bien. <br />
          Porque me haces feliz  <br />
          Porque <b style={{ color: "#ff0000ff" }}>TE AMO</b>
        </p>


        <button
          className="modal-close"
          onClick={() => setVisible(false)}
        >
          Leer tus cartas 💌
        </button>

      </div>
    </div>
  );
}
