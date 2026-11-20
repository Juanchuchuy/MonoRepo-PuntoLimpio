import "../../styles/Reciclaje.css";

function ReciclajePage(){
    const materiales= [
        {
            id: 1,
            nombre: "Papel y Carton",
            icono:"📦",
            descripcion: "Materiales de papel y carton limpios y secos.",
            ejemplos: ["Diarios", "Revistas", "Cajas", "Hojas"],
            color: "#e8f0fe"
        },
        {
            id: 2,
            nombre: "Plasticos",
            icono: "♻️",
            descripcion: "Envases plasticos limpios y sin restos de contenido",
            ejemplos: ["Botellas", "Envases", "Bidones", "Tapitas"],
            color: "#e0f2f1"

        },
        {
            id: 3,
            nombre: "Vidrio",
            icono:"🍾",
            descripcion: "Frascos y bottelas de vidrio vacios",
            ejemplos:["Botellas", "Frascos", "Envases"],
            color: "#e8f5e9"
        },
        {
        id: 4,
        nombre: "Residuos organicos",
        icono: "🍃",
        descripcion: "Restos naturales que pueden aprovecharse mediante compostaje",
        ejemplos: ["Cascaras", "Restos vegetales", "Yerba usada", "Hojas"],
        color: "#f1f8e9"
        },
        {
        id: 5,
        nombre: "Metales",
        icono: "🥫",
        descripcion: "Envases metalicos limpios y vacios.",
        ejemplos: ["Latas", "Aluminio", "Envases metalicos"],
        color: "#eceff1",
        }
    ];

    return (
        <div className="reciclaje-page">
            <header className="reciclaje-header">
                <h1>Aprende a reciclar</h1>
                <p>
                    Separar nuestros residuos es el primer paso para cuidar el ambiente. Conoce como clasificar cada material.
                </p>
            </header>

            <section className="reciclaje-intro">
                <h2>¿Por que es importante separar los residuos?</h2>
                <p>
                    La separacion permite recuperar materiales, reducir la cantidad de basura y aprovechar recursos que pueden volver a utilizarse.
                </p>
            </section>

            <section className="materiales-section">
                <h2>Tipos de residuos</h2>

                <div className="materiales-grid">
                    {materiales.map((material)=> (
                        <article className="material-card" key={material.id} style={{ "--material-color": material.color }}>
                            
                            <div className="material-icono">
                                {material.icono}
                            </div>

                            <h3>{material.nombre}</h3>

                            <p>{material.descripcion}</p>

                            <h4>Ejemplos:</h4>

                            <ul>
                                {material.ejemplos.map((ejemplo)=> (
                                    <li key={ejemplo}>{ejemplo}</li>
                                ))}
                            </ul>

                        </article>
                    ))}
                </div>
            </section>

            <section className="reciclaje-consejos">
                <h2>Consejos para reciclar correctamente</h2>

                <ul>
                    <li>Separa los residuos segun el tipo de material.</li>
                    <li>Limpia los envases y dejalos secar cuando corresponda.</li>
                    <li>Aplasta las botellas y cajas para ocupar menos espacio.</li>
                    <li>No mezcles residuos reciclables con restos de comida.</li>
                    <li>Consulta que materiales recibe tu punto de reciclaje local.</li>
                </ul>
            </section>
        </div>
    );
}

export default ReciclajePage;