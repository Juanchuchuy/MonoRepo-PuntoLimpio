import { useState, useEffect } from "react";
import "../../styles/Estadisticas.css";
import { jsPDF } from "jspdf";

function cargarLogo() {
    return new Promise((resolve, reject) => {
        const imagen = new Image();
        imagen.src = "/LogoPuntoLimpio.jpg";
        imagen.onload = () => {
            resolve(imagen);
        };
        imagen.onerror = reject;
    });
}

function Estadisticas() {
    // 1. Estado para guardar los datos de la API
    const [data, setData] = useState({
        reportes: 0,
        solucionados: 0,
        pendientes: 0,
        porcentaje: 0,
        reportesPorDia: [],
        reportesPorTipo: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Cargar los datos del backend al iniciar
    useEffect(() => {
        fetch("http://localhost:3000/api/estadisticas")
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar las estadísticas");
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // 3. Generar y descargar el informe PDF (usando los datos de la API)
    async function generarPDF() {
        // Si no hay datos, avisamos y no generamos
        if (data.reportesPorDia.length === 0) {
            alert("Esperá un momento, los datos se están cargando.");
            return;
        }

        const doc = new jsPDF();

        // Colores del proyecto
        const verde = [46, 125, 50];
        const verdeOscuro = [27, 94, 32];
        const gris = [70, 70, 70];
        const grisClaro = [240, 245, 240];

        // Cargar logo
        try {
            const logo = await cargarLogo();
            const anchoLogo = 30;
            const altoLogo = (logo.height * anchoLogo) / logo.width;
            doc.addImage(logo, "JPEG", 20, 10, anchoLogo, altoLogo);
        } catch (error) {
            console.error("No se pudo cargar el logo:", error);
        }

        // ENCABEZADO
        doc.setFontSize(22);
        doc.setTextColor(...verdeOscuro);
        doc.setFont("helvetica", "bold");
        doc.text("PuntoLimpio", 60, 22);

        doc.setFontSize(12);
        doc.setTextColor(...gris);
        doc.setFont("helvetica", "normal");
        doc.text("Informe de estadisticas e impacto", 60, 32);

        doc.setDrawColor(...verde);
        doc.setLineWidth(0.8);
        doc.line(20, 48, 190, 48);

        // FECHA
        const fecha = new Date().toLocaleDateString("es-AR");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Fecha de generacion: ${fecha}`, 20, 57);

        // INDICADORES GENERALES (Usando data.*)
        doc.setFontSize(15);
        doc.setTextColor(...verdeOscuro);
        doc.setFont("helvetica", "bold");
        doc.text("Indicadores generales", 20, 70);

        const indicadores = [
            { titulo: "Reportes recibidos", valor: data.reportes },
            { titulo: "Basurales solucionados", valor: data.solucionados },
            { titulo: "Reportes pendientes", valor: data.pendientes },
            { titulo: "Resolucion", valor: `${data.porcentaje}%` }
        ];

        indicadores.forEach((item, index) => {
            const columna = index % 2;
            const fila = Math.floor(index / 2);
            const x = 20 + columna * 90;
            const y = 77 + fila * 29;

            doc.setFillColor(...grisClaro);
            doc.roundedRect(x, y, 80, 23, 3, 3, "F");

            doc.setFontSize(9);
            doc.setTextColor(...gris);
            doc.setFont("helvetica", "normal");
            doc.text(item.titulo, x + 5, y + 8);

            doc.setFontSize(14);
            doc.setTextColor(...verdeOscuro);
            doc.setFont("helvetica", "bold");
            doc.text(String(item.valor), x + 5, y + 18);
        });

        // GRAFICO DE EVOLUCION SEMANAL
        doc.setFontSize(15);
        doc.setTextColor(...verdeOscuro);
        doc.text("Evolucion de reportes", 20, 145);

        doc.setFontSize(9);
        doc.setTextColor(...gris);
        doc.setFont("helvetica", "normal");
        doc.text("Cantidad de reportes registrados por dia", 20, 152);

        const maximoDia = Math.max(
            ...data.reportesPorDia.map(item => item.cantidad),
            1
        );

        const baseY = 190;
        const altoMaximo = 27;
        const anchoBarra = 12;
        const espacio = 11;

        data.reportesPorDia.forEach((item, index) => {
            const x = 25 + index * (anchoBarra + espacio);
            const alto = (item.cantidad / maximoDia) * altoMaximo;

            doc.setFillColor(...verde);
            doc.roundedRect(x, baseY - alto, anchoBarra, alto, 1, 1, "F");

            doc.setFontSize(9);
            doc.setTextColor(...gris);
            doc.text(String(item.cantidad), x + 6, baseY - alto - 3, { align: "center" });
            doc.text(item.dia, x + 6, baseY + 7, { align: "center" });
        });

        // DISTRIBUCION POR TIPO
        doc.setFontSize(15);
        doc.setTextColor(...verdeOscuro);
        doc.setFont("helvetica", "bold");
        doc.text("Distribucion por tipo de residuo", 20, 215);

        // Buscar el tipo con mayor cantidad
        const tipoMayor = data.reportesPorTipo.reduce((mayor, actual) =>
            actual.cantidad > mayor.cantidad ? actual : mayor
        , { tipo: "N/A", cantidad: 0 });

        // Calcular promedio de reportes por dia
        const promedioDiario = (
            data.reportesPorDia.reduce((total, item) => total + item.cantidad, 0) /
            (data.reportesPorDia.length || 1)
        ).toFixed(1);

        const maximoTipo = Math.max(
            ...data.reportesPorTipo.map(item => item.cantidad),
            1
        );

        data.reportesPorTipo.forEach((item, index) => {
            const y = 222 + index * 9;
            const ancho = (item.cantidad / maximoTipo) * 105;

            doc.setFontSize(10);
            doc.setTextColor(...gris);
            doc.setFont("helvetica", "normal");
            doc.text(item.tipo, 20, y + 4);

            doc.setFillColor(230, 235, 230);
            doc.roundedRect(65, y, 105, 5, 2, 2, "F");

            doc.setFillColor(...verde);
            doc.roundedRect(65, y, ancho, 5, 2, 2, "F");

            doc.setFont("helvetica", "bold");
            doc.text(String(item.cantidad), 178, y + 4);
        });

        // RESUMEN DE IMPACTO
        doc.setFillColor(240, 245, 240);
        doc.roundedRect(20, 255, 170, 28, 3, 3, "F");

        doc.setFontSize(12);
        doc.setTextColor(...verdeOscuro);
        doc.setFont("helvetica", "bold");
        doc.text("Resumen de impacto", 25, 262);

        doc.setFontSize(9);
        doc.setTextColor(...gris);
        doc.setFont("helvetica", "normal");

        doc.text(`Tipo con mas reportes: ${tipoMayor.tipo} (${tipoMayor.cantidad})`, 25, 269);
        doc.text(`Promedio diario: ${promedioDiario} reportes`, 25, 275);
        doc.text(`Porcentaje de resolucion: ${data.porcentaje}%`, 25, 281);

        // PIE DE PAGINA
        doc.setDrawColor(...verde);
        doc.line(20, 286, 190, 286);

        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text("PuntoLimpio - Cuidemos juntos el ambiente", 105, 291, { align: "center" });

        // DESCARGAR PDF
        doc.save("informe-estadisticas-puntolimpio.pdf");
    }

    // 4. Manejo de estados de carga y error
    if (loading) return <p className="cargando" style={{ textAlign: "center", marginTop: "50px" }}>Cargando estadísticas...</p>;
    if (error) return <p className="error" style={{ textAlign: "center", marginTop: "50px", color: "red" }}>Error: {error}</p>;

    // 5. Renderizado de la vista
    return (
        <div className="estadisticas">
            <header className="estadisticas-header">
                <h1>Estadisticas e impacto</h1>
                <p>
                    Conoce la evolucion de los reportes y el impacto
                    de las acciones realizadas en nuestra ciudad.
                </p>
                <button className="btn-descargar-pdf" onClick={generarPDF}>
                    Descargar informe PDF
                </button>
            </header>

            {/* Indicadores generales */}
            <section className="estadisticas-indicadores">
                <div className="estadistica-card">
                    <h3>Reportes recibidos</h3>
                    <span>{data.reportes}</span>
                </div>
                <div className="estadistica-card">
                    <h3>Basurales solucionados</h3>
                    <span>{data.solucionados}</span>
                </div>
                <div className="estadistica-card">
                    <h3>Reportes pendientes</h3>
                    <span>{data.pendientes}</span>
                </div>
                <div className="estadistica-card">
                    <h3>Porcentaje de resolucion</h3>
                    <span>{data.porcentaje}%</span>
                </div>
            </section>

            {/* Evolucion de reportes */}
            <section className="estadisticas-seccion">
                <h2>Evolucion de reportes</h2>
                <p>Reportes recibidos durante la ultima semana</p>
                <div className="grafico-barras">
                    {data.reportesPorDia.map((item) => (
                        <div className="barra-contenedor" key={item.dia}>
                            <span className="barra-cantidad">{item.cantidad}</span>
                            <div className="barra" style={{ height: `${item.cantidad * 10}px` }}></div>
                            <span className="barra-dia">{item.dia}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Distribucion por tipo */}
            <section className="estadisticas-seccion">
                <h2>Distribución por tipo de residuo</h2>
                <p>Distribucion de los reportes registrados</p>
                <div className="zonas-lista">
                    {data.reportesPorTipo.map((item) => (
                        <div className="zona-item" key={item.tipo}>
                            <div className="zona-info">
                                <span>{item.tipo}</span>
                                <strong>{item.cantidad}</strong>
                            </div>
                            <div className="zona-barra-fondo">
                                <div
                                    className="zona-barra"
                                    style={{
                                        width: `${(item.cantidad / (data.reportes || 1)) * 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Estadisticas;