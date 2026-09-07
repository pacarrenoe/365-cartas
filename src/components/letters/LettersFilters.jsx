import "./LettersFilters.css";

export default function LettersFilters({
                                           search, onSearchChange,
                                       }) {
    return (<div className="letters-filters">
        <div className="letters-filters__options">
            <button
                type="button"
                className="letters-filters__button letters-filters__button--active"
            >
                Todas
            </button>

            <button
                type="button"
                className="letters-filters__button"
                disabled
            >
                Con fotos
            </button>

            <button
                type="button"
                className="letters-filters__button"
                disabled
            >
                Con canciones
            </button>

            <button
                type="button"
                className="letters-filters__button"
                disabled
            >
                Mis favoritas
            </button>
        </div>

        <label className="letters-filters__search">
        <span
            className="letters-filters__search-icon"
            aria-hidden="true"
        >
          ⌕
        </span>

            <input
                type="search"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Buscar..."
                aria-label="Buscar en nuestras cartas"
            />
        </label>
    </div>);
}