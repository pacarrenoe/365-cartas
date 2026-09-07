import { useAuth } from "../hooks/useAuth";
import AdminPanel from "../features/admin/components/AdminPanel";
import Login from "../features/auth/components/Login";

export default function Admin() {
  const { token } = useAuth();

  return <div className="admin-root">{token ? <AdminPanel /> : <Login />}</div>;
}
