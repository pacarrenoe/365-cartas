import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";

import AdminLayout from "./admin/AdminLayout";
import AdminSidebar from "./admin/AdminSidebar";

import CrearCarta from "./admin/CrearCarta";
import ListarCartas from "./admin/ListarCartas";
import EditarCarta from "./admin/EditarCarta";

import CrearCupon from "./admin/CrearCupon";
import ListarCupones from "./admin/ListarCupones";

import {
  crearCarta,
  obtenerCartas,
  actualizarCarta,
  eliminarCarta
} from "../service/cartasAdminService";

import {
  obtenerCupones,
  eliminarCupon
} from "../service/cuponesService";



export default function AdminPanel() {
  const { token } = useAuth();

  // 🔹 VISTAS
  const [vista, setVista] = useState("list");
  // list | create | edit | cupon-create | cupon-list

  // 🔹 CARTAS
  const [cartas, setCartas] = useState([]);
  const [cartaEditando, setCartaEditando] = useState(null);

  // 🔹 CUPONES
  const [cupones, setCupones] = useState([]);

  /* ========================= */
  /* 🔹 CARGAR CARTAS */
  /* ========================= */
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

  /* ========================= */
  /* 🔹 CARGAR CUPONES */
  /* ========================= */
  const cargarCupones = async () => {
    const docs = await obtenerCupones();
    setCupones(docs);
  };

  useEffect(() => {
    cargarCartas();
    cargarCupones();
  }, []);

  /* ========================= */
  /* 🔹 CREATE CARTA */
  /* ========================= */
  const handleCrear = async (dia, texto) => {
    await crearCarta(token, dia, texto);
    await cargarCartas();
    setVista("list");
  };

  /* ========================= */
  /* 🔹 EDIT CARTA */
  /* ========================= */
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

  /* ========================= */
  /* 🔹 DELETE CARTA */
  /* ========================= */
  const handleEliminar = async (id) => {
    const ok = confirm("¿Eliminar esta carta?");
    if (!ok) return;

    await eliminarCarta(token, id);
    await cargarCartas();
  };

  /* ========================= */
  /* 🔹 DELETE CUPON */
  /* ========================= */
  const handleEliminarCupon = async (id) => {
    const ok = confirm("¿Eliminar este cupón?");
    if (!ok) return;

    await eliminarCupon(id);
    await cargarCupones();
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

      {/* ================= CARTAS ================= */}

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

      {/* ================= CUPONES ================= */}

      {vista === "cupon-create" && (
        <CrearCupon
          onCreate={() => {
            cargarCupones();
            setVista("cupon-list");
          }}
        />
      )}

      {vista === "cupon-list" && (
        <ListarCupones
          cupones={cupones}
          onDelete={handleEliminarCupon}
        />
      )}

    </AdminLayout>
  );
}
