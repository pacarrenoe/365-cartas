import { useAuth } from "../store/AuthContext";
import Login from "../components/Login";
import AdminPanel from "../components/AdminPanel";

export default function Admin() {
  const { token } = useAuth();

  if (!token) {
    return <Login />;
  }

  return <AdminPanel />;
}
