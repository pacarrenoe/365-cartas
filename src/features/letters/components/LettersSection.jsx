export default function LettersSection({ children, title, titleId }) {
  return (
    <section className="letters-section" aria-labelledby={titleId}>
      <h2 className="section-title" id={titleId}>
        {title}
      </h2>
      {children}
    </section>
  );
}
