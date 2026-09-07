import {useMemo, useState} from "react";

import LettersHeader from "./LettersHeader";
import LettersFilters from "./LettersFilters";
import LettersGrid from "./LettersGrid";

import "./LettersSection.css";

export default function LettersSection({
                                           letters, loading, error,
                                       }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [favorites, setFavorites] = useState(() => {
        try { return JSON.parse(localStorage.getItem("cartas-favoritas")) ?? []; } catch { return []; }
    });

    const toggleFavorite = (id) => setFavorites((current) => {
        const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
        localStorage.setItem("cartas-favoritas", JSON.stringify(next));
        return next;
    });

    const filteredLetters = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return letters.filter((letter) => {
            const matchesSearch = !normalizedSearch || `${letter.titulo} ${letter.texto}`.toLowerCase().includes(normalizedSearch);
            const matchesFilter = filter === "all" ||
                (filter === "photos" && Boolean(letter.foto)) ||
                (filter === "songs" && Boolean(letter.cancion)) ||
                (filter === "favorites" && favorites.includes(letter.id));
            return matchesSearch && matchesFilter;
        });
    }, [letters, search, filter, favorites]);

    return (<section className="letters-section">
        <div className="letters-section__container">

            <div className="letters-section__main">

                <div className="letters-section__top">
                    <LettersHeader/>

                    <LettersFilters
                        search={search}
                        onSearchChange={setSearch}
                        activeFilter={filter}
                        onFilterChange={setFilter}
                    />
                </div>

                <LettersGrid
                    letters={filteredLetters}
                    loading={loading}
                    error={error}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />

            </div>

            <div className="letters-section__complementary">
                <aside className="music-card">
                    <div className="music-card__heading"><span>♫</span><div><h3>Nuestras canciones</h3><p>La banda sonora de nuestra historia.</p></div></div>
                    <div className="music-card__player"><div className="music-card__cover">♡</div><div><strong>Tu canción aquí</strong><small>Nuestra playlist</small><div className="music-card__bar"/></div></div>
                    <div className="music-card__controls"><span>↝</span><button aria-label="Canción anterior">◀</button><button className="music-card__play" aria-label="Reproducir">▶</button><button aria-label="Canción siguiente">▶</button><span>↜</span></div>
                    <button className="music-card__all">♫ &nbsp; Ver todas nuestras canciones</button>
                </aside>

                <blockquote className="quote-card"><span>“</span><p>Y que todas<br/>nuestras historias<br/><em>siempre tengan música</em></p><b>♡</b></blockquote>

                <div className="featured-card"><img src="/love.png" alt="Nuestro recuerdo destacado"/><span>Contigo<br/>la vida es más linda<br/>♡</span></div>
            </div>

        </div>
    </section>);
}
