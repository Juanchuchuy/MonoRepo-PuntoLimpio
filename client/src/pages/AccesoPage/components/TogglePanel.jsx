export default function TogglePanel({ lado, titulo, texto, textoBoton, onClick }) {
  return (
    <div className={`toggle-panel toggle-${lado}`}>
      <h1>{titulo}</h1>
      <p>{texto}</p>
      <button type="button" className="hidden" onClick={onClick}>
        {textoBoton}
      </button>
    </div>
  );
}