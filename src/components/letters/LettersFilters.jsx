import "./LettersFilters.css";

export default function LettersFilters({
                                           search, onSearchChange, activeFilter, onFilterChange, counts,
                                       }) {
    const filters = [["all", "Todas"], ["photos", "Con fotos"], ["songs", "Con canciones"], ["favorites", "Mis favoritas"]];
    return (<div className="letters-filters">
        <div className="letters-filters__options">
            {filters.map(([value, label]) => <button key={value} type="button" onClick={() => onFilterChange(value)}
                aria-pressed={activeFilter === value}
                className={`letters-filters__button ${activeFilter === value ? "letters-filters__button--active" : ""}`}>
                {label}<span>{counts[value]}</span>
            </button>)}
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
