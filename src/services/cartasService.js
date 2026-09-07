import {
  collection,
  query,
  orderBy,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

export async function obtenerCartas() {
  const q = query(
    collection(db, "cartas"),
    orderBy("fecha", "desc") // campo lógico
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      fecha: String(data.fecha).slice(0, 10),
      dia: Number(data.dia),
      texto: data.texto
    };
  });
}
