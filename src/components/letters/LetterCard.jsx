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

export default function LetterCard({letter}) {
    return (<article className="letter-card">
        <div className="letter-card__body">
            <div className="letter-card__top">
                <time
                    className="letter-card__date"
                    dateTime={letter.fecha}
                >
                    {formatDate(letter.fecha)}
                </time>

                <span
                    className="letter-card__heart"
                    aria-hidden="true"
                >
            ♡
          </span>
            </div>

            <h3 className="letter-card__title">
                Carta {letter.dia}
            </h3>

            <p className="letter-card__text">
                {letter.texto}
            </p>
        </div>
    </article>);
}