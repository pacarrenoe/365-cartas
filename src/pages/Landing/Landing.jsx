import HeroBanner from "../../components/hero/HeroBanner";
import LettersSection from "../../components/letters/LettersSection";

import useLetters from "../../hooks/useLetters";

import "./Landing.css";

export default function Landing() {
    const {
        letters, loading, error,
    } = useLetters();

    return (<main className="landing">
        <HeroBanner totalLetters={letters.length}/>

        <LettersSection
            letters={letters}
            loading={loading}
            error={error}
        />
    </main>);
}