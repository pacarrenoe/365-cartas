import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

const coleccion = collection(db, "cuponesSecretos");

/* ========================= */
/* 🔹 CREAR CUPON */
/* ========================= */
export async function crearCupon(data) {
  await addDoc(coleccion, {
    ...data,
    creadoEn: serverTimestamp(),
  });
}

/* ========================= */
/* 🔹 OBTENER TODOS (ADMIN) */
/* ========================= */
export async function obtenerCupones() {
  const snapshot = await getDocs(coleccion);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/* ========================= */
/* 🔹 OBTENER POR CODIGO */
/* ========================= */
export async function obtenerCuponPorCodigo(codigo) {
  const q = query(coleccion, where("codigo", "==", codigo));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
}

/* ========================= */
/* 🔹 ELIMINAR CUPON */
/* ========================= */
export async function eliminarCupon(id) {
  await deleteDoc(doc(db, "cuponesSecretos", id));
}
