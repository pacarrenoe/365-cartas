import {
    collection, getDocs, orderBy, query,
} from "firebase/firestore";

import {db} from "../firebase";

const COLLECTION_NAME = "cartas";

export async function obtenerCartas() {
    const cartasQuery = query(collection(db, COLLECTION_NAME), orderBy("dia", "desc"));

    const snapshot = await getDocs(cartasQuery);

    return snapshot.docs.map((document) => {
        const data = document.data();

        return {
            id: document.id,
            dia: Number(data.dia),
            fecha: data.fecha ?? "",
            texto: data.texto ?? "",
            titulo: data.titulo ?? `Carta ${data.dia}`,
            foto: data.foto ?? data.imagen ?? data.imageUrl ?? "",
            cancion: data.cancion ?? data.song ?? null,
        };
    });
}
