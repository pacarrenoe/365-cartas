import "./LettersPagination.css";

export default function LettersPagination({page, totalPages, onPageChange}) {
    if (totalPages <= 1) return null;

    const pages = Array.from({length: totalPages}, (_, index) => index + 1)
        .filter((item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1);

    return <nav className="letters-pagination" aria-label="Páginas de cartas">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label="Página anterior">←</button>
        {pages.map((item, index) => <span key={item} className="letters-pagination__item">
            {index > 0 && item - pages[index - 1] > 1 && <i>…</i>}
            <button className={item === page ? "is-active" : ""} aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}>{item}</button>
        </span>)}
        <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} aria-label="Página siguiente">→</button>
    </nav>;
}
