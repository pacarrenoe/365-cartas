import Landing from "./pages/Landing";
import Admin from "./pages/Admin";

export default function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");

  return isAdmin ? <Admin /> : <Landing />;
}
