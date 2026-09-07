import {useMemo, useState} from "react";

import LettersHeader from "./LettersHeader";
import LettersFilters from "./LettersFilters";
import LettersGrid from "./LettersGrid";
import LettersPagination from "./LettersPagination";

import "./LettersSection.css";

const PAGE_SIZE = 9;

export default function LettersSection({
                                           letters, loading, error,
                                       }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
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

    const counts = useMemo(() => ({
        all: letters.length,
        photos: letters.filter((letter) => Boolean(letter.foto)).length,
        songs: letters.filter((letter) => Boolean(letter.cancion)).length,
        favorites: letters.filter((letter) => favorites.includes(letter.id)).length,
    }), [letters, favorites]);
    const totalPages = Math.max(1, Math.ceil(filteredLetters.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const paginatedLetters = filteredLetters.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const featuredPhoto = letters.find((letter) => letter.foto)?.foto || "/love.png";
    const featuredSong = letters.find((letter) => letter.cancion)?.cancion;

    const changePage = (nextPage) => {
        setPage(nextPage);
        document.querySelector(".letters-section")?.scrollIntoView({behavior: "smooth"});
    };

    return (<section className="letters-section">
        <div className="letters-section__container">

            <div className="letters-section__main">

                <div className="letters-section__top">
                    <LettersHeader/>

                    <LettersFilters
                        search={search}
                        onSearchChange={(value) => { setSearch(value); setPage(1); }}
                        activeFilter={filter}
                        onFilterChange={(value) => { setFilter(value); setPage(1); }}
                        counts={counts}
                    />
                </div>

                <LettersGrid
                    letters={paginatedLetters}
                    loading={loading}
                    error={error}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />
                {!loading && !error && <>
                    <p className="letters-section__results">Mostrando {paginatedLetters.length} de {filteredLetters.length} cartas</p>
                    <LettersPagination page={currentPage} totalPages={totalPages} onPageChange={changePage}/>
                </>}

            </div>

            <div className="letters-section__complementary">
                <aside className="music-card">
                    <div className="music-card__heading"><span>♫</span><div><h3>Nuestras canciones</h3><p>La banda sonora de nuestra historia.</p></div></div>
                    <div className="music-card__player">
                        <div className="music-card__cover" style={featuredSong?.portada ? {backgroundImage: `url(${featuredSong.portada})`} : undefined}>♡</div>
                        <div><strong>{featuredSong?.titulo || "Nuestra playlist"}</strong><small>{featuredSong?.artista || "Canciones para recordar"}</small><div className="music-card__bar"/></div>
                    </div>
                    {featuredSong?.url ? <audio className="music-card__audio" controls src={featuredSong.url}>Tu navegador no reproduce este audio.</audio> :
                        <p className="music-card__empty">Las canciones agregadas en Firebase aparecerán aquí.</p>}
                    <button className="music-card__all" onClick={() => { setFilter("songs"); setPage(1); }}>♫ &nbsp; Ver nuestras canciones ({counts.songs})</button>
                </aside>

                <blockquote className="quote-card"><span>“</span><p>Y que todas<br/>nuestras historias<br/><em>siempre tengan música</em></p><b>♡</b></blockquote>

                <div className="featured-card"><img src={featuredPhoto} alt="Nuestro recuerdo destacado"/><span>Contigo<br/>la vida es más linda<br/>♡</span></div>
            </div>

        </div>
    </section>);
}
