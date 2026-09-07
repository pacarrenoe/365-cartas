import LetterCard from "./LetterCard";
import LettersSection from "./LettersSection";

export default function LettersBody({ currentLetter, previousLetters, onSelect }) {
  return (
    <div className="letters-body">
      {currentLetter && (
        <LettersSection title="💌 Hoy siento y pienso..." titleId="today-title">
          <LetterCard letter={currentLetter} onSelect={onSelect} featured />
        </LettersSection>
      )}

      {previousLetters.length > 0 && (
        <LettersSection
          title="Hace unos días pensé y sentí..."
          titleId="previous-title"
        >
          <div className="grid">
            {previousLetters.map((letter) => (
              <LetterCard key={letter.id} letter={letter} onSelect={onSelect} />
            ))}
          </div>
        </LettersSection>
      )}
    </div>
  );
}
