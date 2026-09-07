import "./LettersHeader.css";

export default function LettersHeader() {
    return (<header className="letters-header">
        <h2 className="letters-header__title">
            Nuestras cartas
        </h2>

        <p className="letters-header__subtitle">
            Cada carta es un pedacito de nosotros.
        </p>
    </header>);
}