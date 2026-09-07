import Button from "../../../components/ui/Button";
import { formatLetterDate } from "../utils/date";

export default function LetterDetailModal({ letter, onClose }) {
  if (!letter) return null;

  return (
    <div className="modal-bg" role="presentation" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="letter-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="letter-detail-title">Día {letter.dia}</h2>
        <time className="card-fecha" dateTime={letter.fecha}>
          {formatLetterDate(letter.fecha)}
        </time>
        <p className="modal-texto">{letter.texto}</p>
        <Button className="modal-close" onClick={onClose}>
          Cerrar
        </Button>
      </section>
    </div>
  );
}
