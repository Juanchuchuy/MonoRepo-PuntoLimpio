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
    // Datos de prueba
    const reportes = 50;
    const solucionados = 36;
    const pendientes = reportes - solucionados;

    const porcentaje = Math.round((solucionados / reportes) * 100);

    // Reportes durante la semana
    const reportesPorDia = [
        { dia: "Lun", cantidad: 5 },
        { dia: "Mar", cantidad: 8 },
        { dia: "Mier", cantidad: 4 },
        { dia: "Jue", cantidad: 10 },
        { dia: "Vier", cantidad: 7 },
        { dia: "Sab", cantidad: 9 },
        { dia: "Dom", cantidad: 7 },
    ];

    // Reportes por zona
    const reportesPorZona = [
        { zona: "Centro", cantidad: 20 },
        { zona: "Norte", cantidad: 12 },
        { zona: "Sur", cantidad: 10 },
        { zona: "Este", cantidad: 8 },
    ];

    // Generar y descargar el informe PDF
    
async function generarPDF() {
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

    // INDICADORES GENERALES
    doc.setFontSize(15);
    doc.setTextColor(...verdeOscuro);
    doc.setFont("helvetica", "bold");
    doc.text("Indicadores generales", 20, 70);

    const indicadores = [
        { titulo: "Reportes recibidos", valor: reportes },
        { titulo: "Basurales solucionados", valor: solucionados },
        { titulo: "Reportes pendientes", valor: pendientes },
        { titulo: "Resolucion", valor: `${porcentaje}%` }
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
        ...reportesPorDia.map(item => item.cantidad),
        1
    );

    const baseY = 190;
    const altoMaximo = 27;
    const anchoBarra = 12;
    const espacio = 11;

    reportesPorDia.forEach((item, index) => {
        const x = 25 + index * (anchoBarra + espacio);
        const alto = (item.cantidad / maximoDia) * altoMaximo;

        doc.setFillColor(...verde);
        doc.roundedRect(
            x,
            baseY - alto,
            anchoBarra,
            alto,
            1,
            1,
            "F"
        );

        doc.setFontSize(9);
        doc.setTextColor(...gris);
        doc.text(String(item.cantidad), x + 6, baseY - alto - 3, {
            align: "center"
        });

        doc.text(item.dia, x + 6, baseY + 7, {
            align: "center"
        });
    });

    // DISTRIBUCION POR ZONA
    doc.setFontSize(15);
    doc.setTextColor(...verdeOscuro);
    doc.setFont("helvetica", "bold");
    doc.text("Distribucion por zona", 20, 215);

    // RESUMEN DE IMPACTO

// Buscar la zona con mayor cantidad de reportes
const zonaMayor = reportesPorZona.reduce((mayor, actual) =>
    actual.cantidad > mayor.cantidad ? actual : mayor
);

        // Calcular promedio de reportes por dia
        const promedioDiario = (
            reportesPorDia.reduce((total, item) => total + item.cantidad, 0) /
            reportesPorDia.length
        ).toFixed(1);


    const maximoZona = Math.max(
        ...reportesPorZona.map(item => item.cantidad),
        1
    );

    reportesPorZona.forEach((item, index) => {
    const y = 222 + index * 9;
        const ancho = (item.cantidad / maximoZona) * 105;

        doc.setFontSize(10);
        doc.setTextColor(...gris);
        doc.setFont("helvetica", "normal");
        doc.text(item.zona, 20, y + 4);

        // Fondo de la barra
        doc.setFillColor(230, 235, 230);
        doc.roundedRect(65, y, 105, 5, 2, 2, "F");

        // Barra proporcional
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

doc.text(
    `Zona con mas reportes: ${zonaMayor.zona} (${zonaMayor.cantidad})`,
    25,
    269
);

doc.text(
    `Promedio diario: ${promedioDiario} reportes`,
    25,
    275
);

doc.text(
    `Porcentaje de resolucion: ${porcentaje}%`,
    25,
    281
);


            // PIE DE PAGINA
doc.setDrawColor(...verde);
doc.line(20, 286, 190, 286);

doc.setFontSize(8);
doc.setTextColor(120, 120, 120);
doc.text(
    "PuntoLimpio - Cuidemos juntos el ambiente",
    105,
    291,
    { align: "center" }
);

    // DESCARGAR PDF
    doc.save("informe-estadisticas-puntolimpio.pdf");
    }


    return (
        <div className="estadisticas">

            <header className="estadisticas-header">
                <h1>Estadisticas e impacto</h1>

                <p>
                    Conoce la evolucion de los reportes y el impacto
                    de las acciones realizadas en nuestra ciudad.
                </p>

                <button
                    className="btn-descargar-pdf"
                    onClick={generarPDF}
                >
                    Descargar informe PDF
                </button>
            </header>

            {/* Indicadores generales */}
            <section className="estadisticas-indicadores">

                <div className="estadistica-card">
                    <h3>Reportes recibidos</h3>
                    <span>{reportes}</span>
                </div>

                <div className="estadistica-card">
                    <h3>Basurales solucionados</h3>
                    <span>{solucionados}</span>
                </div>

                <div className="estadistica-card">
                    <h3>Reportes pendientes</h3>
                    <span>{pendientes}</span>
                </div>

                <div className="estadistica-card">
                    <h3>Porcentaje de resolucion</h3>
                    <span>{porcentaje}%</span>
                </div>

            </section>

            {/* Evolucion de reportes */}
            <section className="estadisticas-seccion">
                <h2>Evolucion de reportes</h2>
                <p>Reportes recibidos durante la ultima semana</p>

                <div className="grafico-barras">
                    {reportesPorDia.map((item) => (
                        <div className="barra-contenedor" key={item.dia}>
                            <span className="barra-cantidad">
                                {item.cantidad}
                            </span>

                            <div
                                className="barra"
                                style={{ height: `${item.cantidad * 10}px` }}
                            ></div>

                            <span className="barra-dia">{item.dia}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Distribucion por zona */}
            <section className="estadisticas-seccion">
                <h2>Reportes por zona</h2>
                <p>Distribucion de los reportes registrados</p>

                <div className="zonas-lista">
                    {reportesPorZona.map((item) => (
                        <div className="zona-item" key={item.zona}>
                            <div className="zona-info">
                                <span>{item.zona}</span>
                                <strong>{item.cantidad}</strong>
                            </div>

                            <div className="zona-barra-fondo">
                                <div
                                    className="zona-barra"
                                    style={{
                                        width: `${(item.cantidad / reportes) * 100}%`
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
