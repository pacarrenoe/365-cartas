const BASE =
  "https://firestore.googleapis.com/v1/projects/cartas-365/databases/(default)/documents/cartas";

const headers = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
});

// CREATE (fecha automática HOY)
export async function crearCarta(token, dia, texto) {
  const hoy = new Date().toISOString().split("T")[0];

  const res = await fetch(`${BASE}?documentId=${dia}`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({
      fields: {
        dia: { integerValue: String(dia) },
        fecha: { stringValue: hoy },
        texto: { stringValue: texto }
      }
    })
  });

  if (!res.ok) throw new Error("Error creando carta");
}

// READ
export async function obtenerCartas(token) {
  const res = await fetch(BASE, {
    headers: headers(token)
  });

  if (!res.ok) throw new Error("Error leyendo cartas");

  const data = await res.json();
  return data.documents || [];
}

// UPDATE
export async function actualizarCarta(token, id, texto) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: headers(token),
    body: JSON.stringify({
      fields: {
        texto: { stringValue: texto }
      }
    })
  });

  if (!res.ok) throw new Error("Error actualizando carta");
}

// DELETE
export async function eliminarCarta(token, id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Error eliminando carta");
}
