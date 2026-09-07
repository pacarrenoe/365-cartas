import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import DedicationModal from "../features/letters/components/DedicationModal";
import HeartLoader from "../features/letters/components/HeartLoader";
import LetterDetailModal from "../features/letters/components/LetterDetailModal";
import LettersBanner from "../features/letters/components/LettersBanner";
import LettersBody from "../features/letters/components/LettersBody";
import { getLocalISODate } from "../features/letters/utils/date";
import { obtenerCartas } from "../services/cartasService";

import "../styles/base.css";
import "../styles/layout.css";
import "../styles/cartas.css";

export default function Landing() {
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerCartas()
      .then(setLetters)
      .finally(() => setLoading(false));
  }, []);

  const { currentLetter, previousLetters } = useMemo(() => {
    const today = getLocalISODate();
    const visibleLetters = letters.filter((letter) => letter.fecha <= today);
    const current =
      visibleLetters.find((letter) => letter.fecha === today) ?? visibleLetters[0];

    return {
      currentLetter: current,
      previousLetters: visibleLetters.filter((letter) => letter.id !== current?.id),
    };
  }, [letters]);

  return (
    <PageLayout>
      <DedicationModal />
      <LettersBanner />

      {loading ? (
        <HeartLoader />
      ) : (
        <LettersBody
          currentLetter={currentLetter}
          previousLetters={previousLetters}
          onSelect={setSelectedLetter}
        />
      )}

      <LetterDetailModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
      />
    </PageLayout>
  );
}
