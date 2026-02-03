import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter
} from "firebase/firestore";

import { db } from "../firebase";

const PAGE_SIZE = 12;

export async function obtenerCartasPaginadas(lastDoc = null) {

  const base = [
    collection(db, "cartas"),
    orderBy("fecha", "desc"), // ✅ campo lógico
    limit(PAGE_SIZE)
  ];

  const q = lastDoc
    ? query(...base, startAfter(lastDoc))
    : query(...base);

  const snap = await getDocs(q);

  const cartas = snap.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      fecha: String(data.fecha).slice(0, 10),
      dia: Number(data.dia),
      texto: data.texto
    };
  });

  const ultimoDoc =
    snap.docs.length > 0
      ? snap.docs[snap.docs.length - 1]
      : null;

  return {
    cartas,
    ultimoDoc,
    hayMas: snap.docs.length === PAGE_SIZE
  };
}
