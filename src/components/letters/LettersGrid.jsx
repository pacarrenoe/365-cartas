import LetterCard from "./LetterCard";

import "./LettersGrid.css";

export default function LettersGrid({
                                        letters,
                                        loading,
                                        error,
                                    }) {
    if (loading) {
        return (
            <div className="letters-grid__status">
                Cargando nuestras cartas...
            </div>
        );
    }

    if (error) {
        return (
            <div className="letters-grid__status letters-grid__status--error">
                {error}
            </div>
        );
    }

    if (!letters.length) {
        return (
            <div className="letters-grid__status">
                No encontramos cartas.
            </div>
        );
    }

    return (
        <div className="letters-grid">
            {letters.map((letter) => (
                <LetterCard
                    key={letter.id}
                    letter={letter}
                />
            ))}
        </div>
    );
}