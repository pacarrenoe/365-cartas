import Landing from "./pages/Landing/Landing";
import Admin from "./pages/Admin/Admin";

export default function App() {
  if (window.location.pathname.startsWith("/admin")) {
    return <Admin />;
  }

  return <Landing />;
}
