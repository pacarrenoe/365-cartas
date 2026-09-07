import {useEffect, useMemo, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {actualizarCarta, crearCarta, eliminarCarta, obtenerCartas} from "../../services/cartasAdminService";
import AdminLogin from "../AdminLogin/AdminLogin";

import "./Admin.css";

const EMPTY_FORM = {titulo:"", texto:"", fecha:"", foto:"", cancion:"", categoria:"", favorita:false, publicada:true};
const PAGE_SIZE = 10;

function formatDate(value) {
    if (!value) return "Sin fecha";
    return new Intl.DateTimeFormat("es-CL", {day:"numeric", month:"short", year:"numeric"})
        .format(new Date(`${value}T12:00:00`));
}

export default function Admin() {
    const {token, logout} = useAuth();
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [editor, setEditor] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!token) return;
        obtenerCartas(token).then(setLetters).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
    }, [token]);

    const filtered = useMemo(() => letters.filter((letter) => {
        const query = search.trim().toLowerCase();
        const matchesQuery = !query || `${letter.titulo} ${letter.texto} ${letter.dia}`.toLowerCase().includes(query);
        const matchesFilter = filter === "all" || (filter === "photos" && letter.foto) ||
            (filter === "songs" && letter.cancion) || (filter === "favorites" && letter.favorita);
        return matchesQuery && matchesFilter;
    }), [letters, search, filter]);
    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const visibleLetters = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const counts = {all:letters.length, photos:letters.filter((item) => item.foto).length, songs:letters.filter((item) => item.cancion).length, favorites:letters.filter((item) => item.favorita).length};

    if (!token) return <AdminLogin/>;

    const openNew = () => setEditor({...EMPTY_FORM, fecha:new Date().toISOString().slice(0, 10), dia:Math.max(0, ...letters.map((item) => item.dia)) + 1});
    const saveLetter = async (event) => {
        event.preventDefault(); setSaving(true); setError("");
        try {
            if (editor.id) {
                const updated = await actualizarCarta(token, editor.id, editor);
                setLetters((current) => current.map((item) => item.id === editor.id ? updated : item).sort((a,b) => b.dia-a.dia));
            } else {
                const created = await crearCarta(token, editor);
                setLetters((current) => [created, ...current].sort((a,b) => b.dia-a.dia));
            }
            setEditor(null);
        } catch (requestError) { setError(requestError.message); }
        finally { setSaving(false); }
    };
    const removeLetter = async (letter) => {
        if (!window.confirm(`¿Eliminar “${letter.titulo}”? Esta acción no se puede deshacer.`)) return;
        try { await eliminarCarta(token, letter.id); setLetters((current) => current.filter((item) => item.id !== letter.id)); }
        catch (requestError) { setError(requestError.message); }
    };

    return <div className="admin">
        <aside className="admin-sidebar">
            <a className="admin-sidebar__logo" href="/admin">
                <img src="/admin-logo.png" alt="" onError={(event) => { event.currentTarget.style.display = "none"; }}/>{/* Agrega tu logo en public/admin-logo.png o cambia aquí la ruta */}
                <strong>Nuestras Cartas</strong>
            </a>
            <nav>{[["⌂","Inicio"],["✉","Cartas"],["♫","Canciones"],["◇","Categorías"],["♙","Usuarios"],["▥","Estadísticas"],["⚙","Configuración"]].map(([icon,label]) =>
                <button type="button" className={label === "Cartas" ? "is-active" : ""} key={label}><span>{icon}</span>{label}</button>)}</nav>
            <p className="admin-sidebar__phrase">Contigo<br/>todo tiene<br/>más sentido ♡</p>
        </aside>
        <div className="admin-main">
            <header className="admin-topbar"><span>♧</span><div className="admin-user"><div>♡</div><p><strong>Administradora</strong><small>Panel privado</small></p><button onClick={logout}>Salir</button></div></header>
            <main className="admin-content">
                <div className="admin-heading"><div><h1>Gestión de Cartas</h1><p>Crea, edita y organiza las cartas que inspiran.</p></div><button className="admin-primary" onClick={openNew}>＋ Nueva carta</button></div>
                {error && <div className="admin-alert" role="alert">{error}<button onClick={() => setError("")}>×</button></div>}
                <div className="admin-tools">
                    <div className="admin-tabs">{[["all","Todas"],["photos","Con fotos"],["songs","Con canciones"],["favorites","Favoritas"]].map(([value,label]) =>
                        <button key={value} className={filter === value ? "is-active" : ""} onClick={() => {setFilter(value);setPage(1);}}>{label} <span>{counts[value]}</span></button>)}</div>
                    <label className="admin-search"><span>⌕</span><input value={search} onChange={(event) => {setSearch(event.target.value);setPage(1);}} placeholder="Buscar cartas..."/></label>
                </div>
                <section className="admin-table-wrap">
                    {loading ? <p className="admin-status">Cargando cartas…</p> : !visibleLetters.length ? <p className="admin-status">No hay cartas para mostrar.</p> : <table className="admin-table">
                        <thead><tr><th>Imagen</th><th>Título</th><th>Vista previa</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr></thead>
                        <tbody>{visibleLetters.map((letter) => <tr key={letter.id}>
                            <td>{letter.foto ? <img src={letter.foto} alt=""/> : <div className="admin-image-empty">♡</div>}</td>
                            <td><strong>{letter.titulo}</strong><small>Día {letter.dia}</small></td><td><p>{letter.texto}</p></td><td>{formatDate(letter.fecha)}</td>
                            <td><span className={`admin-state ${letter.publicada ? "is-published" : ""}`}>{letter.publicada ? "Publicada" : "Borrador"}</span></td>
                            <td><div className="admin-actions"><button title="Ver" onClick={() => window.open(`/?carta=${letter.id}`, "_blank")}>◉</button><button title="Editar" onClick={() => setEditor({...letter})}>✎</button><button title="Eliminar" onClick={() => removeLetter(letter)}>♲</button></div></td>
                        </tr>)}</tbody>
                    </table>}
                </section>
                <footer className="admin-pagination"><button disabled={currentPage===1} onClick={() => setPage(currentPage-1)}>‹</button><span>Página {currentPage} de {pageCount}</span><button disabled={currentPage===pageCount} onClick={() => setPage(currentPage+1)}>›</button><p>Mostrando {visibleLetters.length} de {filtered.length} cartas</p></footer>
            </main>
        </div>
        {editor && <div className="admin-drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setEditor(null)}>
            <aside className="admin-drawer" aria-label={editor.id ? "Editar carta" : "Nueva carta"}>
                <header><div><small>{editor.id ? "Edición" : "Creación"}</small><h2>{editor.id ? "Editar carta" : "Nueva carta"}</h2></div><button onClick={() => setEditor(null)}>×</button></header>
                <form onSubmit={saveLetter}>
                    <label>Día *<input type="number" min="1" value={editor.dia} onChange={(e)=>setEditor({...editor,dia:Number(e.target.value)})} required disabled={Boolean(editor.id)}/></label>
                    <label>Título *<input maxLength="100" value={editor.titulo} onChange={(e)=>setEditor({...editor,titulo:e.target.value})} placeholder="Ej. Siempre tú" required/></label>
                    <label>Contenido *<textarea maxLength="2000" value={editor.texto} onChange={(e)=>setEditor({...editor,texto:e.target.value})} placeholder="Escribe aquí tu carta..." required/><small>{editor.texto.length} / 2000</small></label>
                    <label>Fecha *<input type="date" value={editor.fecha} onChange={(e)=>setEditor({...editor,fecha:e.target.value})} required/></label>
                    <label>Ruta o URL de imagen<input value={editor.foto} onChange={(e)=>setEditor({...editor,foto:e.target.value})} placeholder="/imagenes/recuerdo.jpg o https://..."/></label>
                    <label>Canción (opcional)<input value={editor.cancion} onChange={(e)=>setEditor({...editor,cancion:e.target.value})} placeholder="URL del audio"/></label>
                    <label>Categoría (opcional)<input value={editor.categoria} onChange={(e)=>setEditor({...editor,categoria:e.target.value})} placeholder="Ej. Recuerdos"/></label>
                    <div className="admin-switches"><label><input type="checkbox" checked={editor.favorita} onChange={(e)=>setEditor({...editor,favorita:e.target.checked})}/> Favorita</label><label><input type="checkbox" checked={editor.publicada} onChange={(e)=>setEditor({...editor,publicada:e.target.checked})}/> Publicada</label></div>
                    <footer><button type="button" onClick={() => setEditor(null)}>Cancelar</button><button className="admin-primary" disabled={saving}>{saving ? "Guardando…" : "Guardar"}</button></footer>
                </form>
            </aside>
        </div>}
    </div>;
}
