import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";

import AdminLayout from "./admin/AdminLayout";
import AdminSidebar from "./admin/AdminSidebar";
import CrearCarta from "./admin/CrearCarta";
import ListarCartas from "./admin/ListarCartas";
import EditarCarta from "./admin/EditarCarta";

import {
  crearCarta,
  obtenerCartas,
  actualizarCarta,
  eliminarCarta
} from "../service/cartasAdminService";

export default function AdminPanel() {
  const { token } = useAuth();

  const [vista, setVista] = useState("list"); // list | create | edit
  const [cartas, setCartas] = useState([]);
  const [cartaEditando, setCartaEditando] = useState(null);

  // 🔹 Cargar cartas
  const cargarCartas = async () => {
    const docs = await obtenerCartas(token);

    const normalizadas = docs
  .filter(d => d.fields?.dia && d.fields?.texto)
  .map(d => ({
    id: d.name.split("/").pop(),
    dia: Number(d.fields.dia.integerValue),
    texto: d.fields.texto.stringValue,
    fecha: d.fields.fecha?.stringValue || ""
  }))
  .sort((a, b) => b.fecha.localeCompare(a.fecha));


    setCartas(normalizadas);
  };

  useEffect(() => {
    cargarCartas();
  }, []);

  // 🔹 CREATE
  const handleCrear = async (dia, texto) => {
    await crearCarta(token, dia, texto);
    await cargarCartas();
    setVista("list");
  };

  // 🔹 EDIT
  const handleEditar = (carta) => {
    setCartaEditando(carta);
    setVista("edit");
  };

  const handleGuardarEdicion = async (id, texto) => {
    await actualizarCarta(token, id, texto);
    setCartaEditando(null);
    await cargarCartas();
    setVista("list");
  };

  // 🔹 DELETE
  const handleEliminar = async (id) => {
    const ok = confirm("¿Eliminar esta carta?");
    if (!ok) return;

    await eliminarCarta(token, id);
    await cargarCartas();
  };

  return (
    <AdminLayout
      sidebar={
        <AdminSidebar
          active={vista}
          onChange={setVista}
        />
      }
    >
      {vista === "create" && (
        <CrearCarta onCreate={handleCrear} />
      )}

      {vista === "list" && (
        <ListarCartas
          cartas={cartas}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
      )}

      {vista === "edit" && cartaEditando && (
        <EditarCarta
          carta={cartaEditando}
          onSave={handleGuardarEdicion}
          onCancel={() => {
            setCartaEditando(null);
            setVista("list");
          }}
        />
      )}
    </AdminLayout>
  );
}
