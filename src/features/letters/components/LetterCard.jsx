import { formatLetterDate } from "../utils/date";

export default function LetterCard({ letter, onSelect, featured = false }) {
  const preview =
    letter.texto.length > 140
      ? `${letter.texto.slice(0, 140)}...`
      : letter.texto;

  return (
    <article className={`card ${featured ? "card-hoy" : ""}`}>
      <button
        className="letter-card-button"
        type="button"
        onClick={() => onSelect(letter)}
        aria-label={`Leer carta del día ${letter.dia}`}
      >
        <span className="card-dia">Día {letter.dia}</span>
        <time className="card-fecha" dateTime={letter.fecha}>
          {formatLetterDate(letter.fecha)}
        </time>
        <span className="card-texto">{preview}</span>
      </button>
    </article>
  );
}
