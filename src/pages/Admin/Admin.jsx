import {useAuth} from "../../hooks/useAuth";
import AdminLogin from "../AdminLogin/AdminLogin";

import "./Admin.css";

export default function Admin() {
    const {token, logout} = useAuth();

    if (!token) return <AdminLogin/>;

    return <main className="admin-shell">
        <header className="admin-shell__header">
            <div><span>♡</span><strong>Nuestras Cartas</strong></div>
            <button type="button" onClick={logout}>Cerrar sesión</button>
        </header>
        <section className="admin-shell__welcome">
            <span>♡</span>
            <p>Panel de administración</p>
            <h1>Bienvenida</h1>
            <small>El administrador de cartas estará disponible en el próximo paso.</small>
        </section>
    </main>;
}
