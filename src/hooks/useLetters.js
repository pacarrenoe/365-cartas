import { useEffect, useState } from "react";
import { obtenerCartas } from "../services/cartasService";

export default function useLetters() {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;

        async function loadLetters() {
            try {
                setLoading(true);
                setError(null);

                const data = await obtenerCartas();

                if (active) {
                    setLetters(data);
                }
            } catch (err) {
                console.error("Error cargando cartas:", err);

                if (active) {
                    setError("No pudimos cargar nuestras cartas.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadLetters();

        return () => {
            active = false;
        };
    }, []);

    return {
        letters,
        loading,
        error,
    };
}