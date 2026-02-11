import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

export default function ListarCupones({ cupones, onDelete }) {

  const copiarLink = (codigo) => {
    const url = `https://cartas-365.web.app/cupon/${codigo}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado 💖");
  };

  const descargarQR = (codigo) => {
    const canvas = document.getElementById(`qr-${codigo}`);
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = `cupon-${codigo}.png`;
    link.click();
  };

  if (!cupones.length) {
    return <p>No hay cupones creados aún.</p>;
  }

  return (
    <div>
      <h2>Cupones creados 🎟️</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>

        {cupones.map(c => {
          const url = `https://cartas-365.web.app/cupon/${c.codigo}`;

          return (
            <div key={c.id} style={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "20px",
              background: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}>

              <h3>{c.titulo}</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                Código: {c.codigo}
              </p>

              <div style={{ margin: "15px 0" }}>
                <QRCodeCanvas
                  id={`qr-${c.codigo}`}
                  value={url}
                  size={150}
                />
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <button onClick={() => copiarLink(c.codigo)}>
                  📋 Copiar link
                </button>

                <button onClick={() => descargarQR(c.codigo)}>
                  ⬇️ Descargar QR
                </button>

                <button
                  onClick={() => onDelete(c.id)}
                  style={{ background: "#f44336", color: "#fff" }}
                >
                  🗑 Eliminar
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
