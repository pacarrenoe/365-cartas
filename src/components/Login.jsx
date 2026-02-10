import { useState } from "react";
import { login as loginService } from "../service/authService";
import { useAuth } from "../store/AuthContext";
import "../styles/admin.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const entrar = async () => {
    try {
      const res = await loginService(email, password);
      login(res.idToken);
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Login Admin</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={entrar}>Entrar</button>
      </div>
    </div>
  );
}
