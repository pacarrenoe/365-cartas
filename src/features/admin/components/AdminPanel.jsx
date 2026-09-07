import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

import AdminLayout from "./AdminLayout";
import AdminSidebar from "./AdminSidebar";
import CrearCarta from "./CrearCarta";
import ListarCartas from "./ListarCartas";
import EditarCarta from "./EditarCarta";

import {
  crearCarta,
  obtenerCartas,
  actualizarCarta,
  eliminarCarta
} from "../../../services/cartasAdminService";

function normalizeLetters(documents) {
  return documents
    .filter((document) => document.fields?.dia && document.fields?.texto)
    .map((document) => ({
      id: document.name.split("/").pop(),
      dia: Number(document.fields.dia.integerValue),
      texto: document.fields.texto.stringValue,
      fecha: document.fields.fecha?.stringValue || "",
    }))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export default function AdminPanel() {
  const { token } = useAuth();
  const [view, setView] = useState("list");
  const [letters, setLetters] = useState([]);
  const [editingLetter, setEditingLetter] = useState(null);

  const loadLetters = async () => {
    const documents = await obtenerCartas(token);
    setLetters(normalizeLetters(documents));
  };

  useEffect(() => {
    obtenerCartas(token).then((documents) => {
      setLetters(normalizeLetters(documents));
    });
  }, [token]);

  const handleCreate = async (day, text) => {
    await crearCarta(token, day, text);
    await loadLetters();
    setView("list");
  };

  const handleEdit = (letter) => {
    setEditingLetter(letter);
    setView("edit");
  };

  const handleSave = async (id, text) => {
    await actualizarCarta(token, id, text);
    setEditingLetter(null);
    await loadLetters();
    setView("list");
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta carta?")) return;

    await eliminarCarta(token, id);
    await loadLetters();
  };

  return (
    <AdminLayout
      sidebar={<AdminSidebar active={view} onChange={setView} />}
    >
      {view === "create" && <CrearCarta onCreate={handleCreate} />}

      {view === "list" && (
        <ListarCartas
          cartas={letters}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {view === "edit" && editingLetter && (
        <EditarCarta
          carta={editingLetter}
          onSave={handleSave}
          onCancel={() => {
            setEditingLetter(null);
            setView("list");
          }}
        />
      )}
    </AdminLayout>
  );
}
