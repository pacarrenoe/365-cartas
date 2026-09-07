import "./LetterCard.css";

function formatDate(dateString) {
    if (!dateString) {
        return "";
    }

    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    if (!year || !month || !day) {
        return dateString;
    }

    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("es-CL", {
        day: "numeric", month: "short", year: "numeric",
    }).format(date);
}

export default function LetterCard({letter, favorite, onToggleFavorite}) {
    return (<article className="letter-card">
        {letter.foto && <img className="letter-card__image" src={letter.foto} alt="" loading="lazy"/>}
        <div className="letter-card__body">
            <div className="letter-card__top">
                <time
                    className="letter-card__date"
                    dateTime={letter.fecha}
                >
                    {formatDate(letter.fecha)}
                </time>

                <button className={`letter-card__heart ${favorite ? "letter-card__heart--active" : ""}`}
                    onClick={() => onToggleFavorite(letter.id)} aria-label={favorite ? "Quitar de favoritas" : "Agregar a favoritas"}>
                    {favorite ? "♥" : "♡"}
                </button>
            </div>

            <h3 className="letter-card__title">
                {letter.titulo}
            </h3>

            <p className="letter-card__text">
                {letter.texto}
            </p>
            {(letter.foto || letter.cancion) && <div className="letter-card__tags">
                {letter.foto && <span aria-label="Incluye fotografía">▧</span>}
                {letter.cancion && <span aria-label="Incluye canción">♫</span>}
            </div>}
        </div>
    </article>);
}
