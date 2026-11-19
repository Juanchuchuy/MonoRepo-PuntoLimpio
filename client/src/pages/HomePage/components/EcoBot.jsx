import { useEffect, useRef, useState } from 'react';
import '../css/EcoBot.css';

// Las claves van sin tildes ni mayúsculas: el mensaje del usuario se normaliza igual.
const RESPUESTAS = {
  pila: `Las pilas deben llevarse a puntos de recolección especiales
(puntos limpios, supermercados o municipios).
Nunca las tires al tacho común: una sola pila puede contaminar
600.000 litros de agua.`,

  plastico: `El plástico va al contenedor amarillo.
Antes de tirarlo, enjuagá el envase y aplastalo para ahorrar espacio.
Las bolsas plásticas podés llevarlas a supermercados habilitados.`,

  papel: `El papel y cartón va al contenedor azul.
Asegurate de que esté seco y limpio — el papel mojado
o con grasa no se puede reciclar.`,

  carton: `El cartón va al contenedor azul, igual que el papel.
Desarmá las cajas para que ocupen menos espacio.`,

  vidrio: `El vidrio va al contenedor verde.
Enjuagá los frascos antes de tirarlos.
No mezcles vidrio de ventanas con el de envases,
tienen composición diferente.`,

  medicamento: `Los medicamentos vencidos o en desuso deben llevarse
a farmacias habilitadas o puntos limpios municipales.
Nunca los tires al tacho ni los descargues por el inodoro.`,

  aceite: `El aceite de cocina usado nunca va por el desagüe,
tapa las cañerías y contamina el agua.
Guardalo en botellas cerradas y llevalo a puntos limpios
donde lo transforman en biodiesel.`,

  compost: `Para hacer compost en casa necesitás una compostera
(puede ser un balde con tapa).
Agregá cáscaras de frutas, verduras, yerba y posos de café.
Evitá carnes, lácteos y grasas. En unas semanas tenés abono natural.`,

  camion: `Para saber el horario del camión de basura en tu zona,
usá nuestro bot de WhatsApp.
Te manda el horario automáticamente la noche anterior.`,

  electronico: `Los residuos electrónicos (celulares, computadoras, cables)
van a puntos de recolección específicos, llamados "e-waste".
Muchos municipios y marcas tienen programas de recolección gratuita.`,

  bateria: `Las baterías, igual que las pilas, van a puntos de
recolección especiales. Nunca al tacho común.
Muchos supermercados tienen contenedores específicos para esto.`,

  hola: `¡Hola! Soy EcoBot, mi trabajo es informarte cómo reciclar con responsabilidad.
Preguntame lo que quieras sobre residuos.`,
};

const RESPUESTA_DEFAULT = `No encontré información sobre eso todavía. Probá preguntarme sobre: pilas, plástico, papel, vidrio, medicamentos, aceite, compost, electrónicos o el camión de basura.`;

const BIENVENIDA = `¡Hola! Soy EcoBot 🌱
Preguntame sobre reciclaje, residuos o puntos de recolección.
Para saber cuándo pasa el camión, usá el bot de WhatsApp.`;

const PREGUNTAS_RAPIDAS = [
  { label: '¿Dónde tiro las pilas?', texto: '¿Dónde tiro las pilas usadas?' },
  { label: '¿Cómo reciclo el plástico?', texto: '¿Cómo reciclo el plástico?' },
  { label: 'Medicamentos vencidos', texto: '¿Qué hago con los medicamentos vencidos?' },
  { label: 'Compost en casa', texto: '¿Cómo hago compost en casa?' },
  { label: '¿A qué hora pasa el camión?', texto: '¿A qué hora pasa el camión de basura?' },
];

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function obtenerRespuesta(mensaje) {
  const msj = normalizar(mensaje);
  for (const [clave, respuesta] of Object.entries(RESPUESTAS)) {
    if (msj.includes(clave)) return respuesta;
  }
  return RESPUESTA_DEFAULT;
}

const horaActual = () =>
  new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

const LeafIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M1.4 1.7c.217.289.65.84 1.725 1.274 1.093.44 2.885.774 5.834.528 2.02-.168 3.431.51 4.326 1.556C14.161 6.082 14.5 7.41 14.5 8.5q0 .344-.027.734C13.387 8.252 11.877 7.76 10.39 7.5c-2.016-.288-4.188-.445-5.59-2.045-.142-.162-.402-.102-.379.112.108.985 1.104 1.82 1.844 2.308 2.37 1.566 5.772-.118 7.6 3.071.505.8 1.374 2.7 1.75 4.292.07.298-.066.611-.354.715a.7.7 0 0 1-.161.042 1 1 0 0 1-1.08-.794c-.13-.97-.396-1.913-.868-2.77C12.173 13.386 10.565 14 8 14c-1.854 0-3.32-.544-4.45-1.435-1.124-.887-1.889-2.095-2.39-3.383-1-2.562-1-5.536-.65-7.28L.73.806z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
  </svg>
);

export default function EcoBot() {
  const [abierto, setAbierto] = useState(false);
  const [texto, setTexto] = useState('');
  const [mensajes, setMensajes] = useState(() => [
    { id: 0, esBot: true, texto: BIENVENIDA, hora: horaActual() },
  ]);

  const siguienteId = useRef(1);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const timeouts = useRef([]);

  const agregarMensaje = (contenido, esBot) => {
    setMensajes((prev) => [
      ...prev,
      { id: siguienteId.current++, esBot, texto: contenido, hora: horaActual() },
    ]);
  };

  const enviarMensaje = (contenido, delay = 500) => {
    const limpio = contenido.trim();
    if (!limpio) return;

    agregarMensaje(limpio, false);
    const t = setTimeout(() => agregarMensaje(obtenerRespuesta(limpio), true), delay);
    timeouts.current.push(t);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarMensaje(texto);
    setTexto('');
    inputRef.current?.focus();
  };

  // Scroll automático al último mensaje
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mensajes, abierto]);

  // Foco en el input al abrir y cierre con Escape
  useEffect(() => {
    if (!abierto) return;
    inputRef.current?.focus();
    const onKeyDown = (e) => e.key === 'Escape' && setAbierto(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [abierto]);

  // Limpia los timeouts pendientes al desmontar
  useEffect(() => () => timeouts.current.forEach(clearTimeout), []);

  return (
    <div className="ecobot">
      {abierto && (
        <section className="ecobot-panel" role="dialog" aria-label="Chat con EcoBot">
          <header className="ecobot-header">
            <div className="ecobot-avatar">
              <LeafIcon size={20} />
            </div>
            <div className="ecobot-header-info">
              <strong>EcoBot</strong>
              <span className="ecobot-online">En línea</span>
            </div>
            <button
              type="button"
              className="ecobot-close"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar chat"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="ecobot-chat" ref={chatRef} aria-live="polite">
            {mensajes.map((m) => (
              <div key={m.id} className={`ecobot-msg ecobot-msg-${m.esBot ? 'bot' : 'user'}`}>
                <div className="ecobot-bubble">{m.texto}</div>
                <div className="ecobot-time">{m.hora}</div>
              </div>
            ))}
          </div>

          <div className="ecobot-quick" aria-label="Preguntas rápidas">
            {PREGUNTAS_RAPIDAS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="ecobot-qbtn"
                onClick={() => enviarMensaje(p.texto, 300)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <form className="ecobot-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribí tu consulta acá"
              autoComplete="off"
              aria-label="Tu consulta"
            />
            <button type="submit" className="ecobot-send" aria-label="Enviar">
              <SendIcon />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="ecobot-fab"
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? 'Cerrar chat de EcoBot' : 'Abrir chat de EcoBot'}
        aria-expanded={abierto}
      >
        {abierto ? <CloseIcon /> : <LeafIcon size={28} />}
      </button>
    </div>
  );
}
