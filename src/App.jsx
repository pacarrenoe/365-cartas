import Landing from "./pages/Landing";
import Admin from "./pages/Admin";

export default function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="admin-root">
        <Admin />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="app">
        <Landing />
      </div>
    </div>
  );
}
