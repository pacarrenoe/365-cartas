import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import Cupon from "./pages/Cupon";
import Escanea from "./pages/Escanea";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/cupon/:codigo" element={<Cupon />} />
        <Route path="/escanea" element={<Escanea />} />
      </Routes>
    </BrowserRouter>
  );
}
