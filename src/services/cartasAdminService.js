const BASE =
  "https://firestore.googleapis.com/v1/projects/cartas-365/databases/(default)/documents/cartas";

const headers = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
});

function parseDocument(document) {
  const fields = document.fields ?? {};
  return {
    id: document.name.split("/").pop(),
    dia: Number(fields.dia?.integerValue ?? 0),
    fecha: fields.fecha?.stringValue ?? "",
    texto: fields.texto?.stringValue ?? "",
    titulo: fields.titulo?.stringValue ?? `Carta ${fields.dia?.integerValue ?? ""}`,
    foto: fields.foto?.stringValue ?? "",
    cancion: fields.cancion?.stringValue ?? "",
    categoria: fields.categoria?.stringValue ?? "",
    favorita: fields.favorita?.booleanValue ?? false,
    publicada: fields.publicada?.booleanValue ?? true,
  };
}

function serializeLetter(letter) {
  return {
    dia: {integerValue: String(letter.dia)},
    fecha: {stringValue: letter.fecha},
    texto: {stringValue: letter.texto},
    titulo: {stringValue: letter.titulo},
    foto: {stringValue: letter.foto ?? ""},
    cancion: {stringValue: letter.cancion ?? ""},
    categoria: {stringValue: letter.categoria ?? ""},
    favorita: {booleanValue: Boolean(letter.favorita)},
    publicada: {booleanValue: letter.publicada !== false},
  };
}

async function request(url, options, fallbackMessage) {
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) throw new Error("Tu sesión expiró. Vuelve a iniciar sesión.");
    throw new Error(fallbackMessage);
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function crearCarta(token, letter) {
  const data = await request(`${BASE}?documentId=${encodeURIComponent(letter.dia)}`, {
    method: "POST", headers: headers(token), body: JSON.stringify({fields: serializeLetter(letter)}),
  }, "No se pudo crear la carta.");
  return parseDocument(data);
}

export async function obtenerCartas(token) {
  const data = await request(`${BASE}?pageSize=365`, {headers: headers(token)}, "No se pudieron cargar las cartas.");
  return (data.documents ?? []).map(parseDocument).sort((a, b) => b.dia - a.dia);
}

export async function actualizarCarta(token, id, letter) {
  const data = await request(`${BASE}/${encodeURIComponent(id)}`, {
    method: "PATCH", headers: headers(token), body: JSON.stringify({fields: serializeLetter(letter)}),
  }, "No se pudo actualizar la carta.");
  return parseDocument(data);
}

export async function eliminarCarta(token, id) {
  return request(`${BASE}/${encodeURIComponent(id)}`, {
    method: "DELETE", headers: {Authorization: `Bearer ${token}`},
  }, "No se pudo eliminar la carta.");
}
