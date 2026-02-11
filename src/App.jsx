import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import Cupon from "./pages/Cupon";
import Escanea from "./pages/Escanea";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/cupon/:codigo" element={<Cupon />} />
        <Route path="/escanea" element={<Escanea />} />
      </Routes>
    </BrowserRouter>
  );
}
