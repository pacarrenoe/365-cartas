import {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {login as authenticate} from "../../services/authService";

import "./AdminLogin.css";

export default function AdminLogin() {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const session = await authenticate(email.trim(), password);
            login(session.idToken);
        } catch (loginError) {
            setError(loginError.message);
        } finally {
            setLoading(false);
        }
    };

    return <main className="admin-login">
        <section className="admin-login__card" aria-labelledby="login-title">
            <div className="admin-login__brand" aria-hidden="true">
                <span className="admin-login__spark">♥</span>
                <span className="admin-login__heart">♡</span>
            </div>
            <h1 id="login-title">Nuestras Cartas</h1>
            <p className="admin-login__subtitle">Un espacio solo nuestro, donde<br/>guardamos todo lo que nos hace únicos.</p>

            <form onSubmit={handleSubmit} className="admin-login__form">
                <label className="admin-login__field">
                    <span aria-hidden="true">✉</span>
                    <input type="email" autoComplete="email" placeholder="Correo" value={email}
                        onChange={(event) => setEmail(event.target.value)} required/>
                </label>
                <label className="admin-login__field">
                    <span aria-hidden="true">♙</span>
                    <input type={showPassword ? "text" : "password"} autoComplete="current-password"
                        placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                    <button type="button" className="admin-login__reveal" onClick={() => setShowPassword((visible) => !visible)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>{showPassword ? "◉" : "⊙"}</button>
                </label>
                {error && <p className="admin-login__error" role="alert">{error}</p>}
                <button className="admin-login__submit" type="submit" disabled={loading}>
                    {loading ? "Entrando…" : <>Entrar <span>♡</span></>}
                </button>
            </form>

            <p className="admin-login__signature">Contigo todo tiene<br/>más sentido <span>♡</span></p>
        </section>
    </main>;
}
