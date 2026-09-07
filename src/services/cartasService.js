import {
    collection, getDocs, orderBy, query,
} from "firebase/firestore";

import {db} from "../firebase";

const COLLECTION_NAME = "cartas";

function firstValue(...values) {
    return values.find((value) => typeof value === "string" && value.trim())?.trim() ?? "";
}

export async function obtenerCartas() {
    const cartasQuery = query(collection(db, COLLECTION_NAME), orderBy("dia", "desc"));

    const snapshot = await getDocs(cartasQuery);

    return snapshot.docs.map((document) => {
        const data = document.data();

        const foto = firstValue(data.foto, data.imagen, data.imageUrl, data.imagenUrl, data.urlImagen);
        const rawSong = data.cancion ?? data.song ?? data.musica ?? null;
        const cancion = typeof rawSong === "string"
            ? {titulo: "Nuestra canción", artista: "", url: rawSong}
            : rawSong && {
                titulo: rawSong.titulo ?? rawSong.title ?? "Nuestra canción",
                artista: rawSong.artista ?? rawSong.artist ?? "",
                url: firstValue(rawSong.url, rawSong.src, rawSong.audioUrl),
                portada: firstValue(rawSong.portada, rawSong.cover, rawSong.image),
            };

        return {
            id: document.id,
            dia: Number(data.dia),
            fecha: data.fecha ?? "",
            texto: data.texto ?? "",
            titulo: data.titulo ?? `Carta ${data.dia}`,
            foto,
            cancion,
        };
    });
}
