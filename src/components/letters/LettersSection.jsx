import {useMemo, useState} from "react";

import LettersHeader from "./LettersHeader";
import LettersFilters from "./LettersFilters";
import LettersGrid from "./LettersGrid";

import "./LettersSection.css";

export default function LettersSection({
                                           letters, loading, error,
                                       }) {
    const [search, setSearch] = useState("");

    const filteredLetters = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        if (!normalizedSearch) {
            return letters;
        }

        return letters.filter((letter) => letter.texto
            .toLowerCase()
            .includes(normalizedSearch));
    }, [letters, search]);

    return (<section className="letters-section">
        <div className="letters-section__container">

            <div className="letters-section__main">

                <div className="letters-section__top">
                    <LettersHeader/>

                    <LettersFilters
                        search={search}
                        onSearchChange={setSearch}
                    />
                </div>

                <LettersGrid
                    letters={filteredLetters}
                    loading={loading}
                    error={error}
                />

            </div>

            <div className="letters-section__complementary">
                <div className="letters-section__placeholder">
                    Aquí irá la sección de canciones
                </div>

                <div className="letters-section__placeholder">
                    Aquí irá nuestra frase
                </div>

                <div className="letters-section__placeholder letters-section__placeholder--photo">
                    Aquí irá nuestra foto destacada
                </div>
            </div>

        </div>
    </section>);
}