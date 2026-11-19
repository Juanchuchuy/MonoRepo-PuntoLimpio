import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import { useState } from "react";
import "./css/Mapa-estilo.css";

// Iconos personalizados
const iconoBasural = L.divIcon({ 
  className: 'mapa-icono', 
  iconSize: [20, 20], 
  iconAnchor: [10, 10] 
});

const iconoProvisional = L.divIcon({ 
  className: 'mapa-icono-provisional', 
  iconSize: [20, 20], 
  iconAnchor: [10, 10] 
});

const tiposResiduo = [
  { valor: 'Escombros', texto: 'Escombros' },
  { valor: 'Domiciliario', texto: 'Domiciliario' },
  { valor: 'Peligrosos', texto: 'Peligrosos' },
  { valor: 'Mixto', texto: 'Mixto' },
  { valor: 'Otro', texto: 'Otro' },
];

const CapturaClic = ({ alHacerClick }) => {
  useMapEvents({ 
    click: (e) => { alHacerClick(e.latlng) } 
  });
  return null;
};

const Mapa = () => {
  const [ubicacionTemporal, setUbicacionTemporal] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [tipoResiduo, setTipoResiduo] = useState("");
  const [reportes, setReportes] = useState([]);

  const limpiarFormulario = () => {
    setUbicacionTemporal(null);
    setDescripcion("");
    setTipoResiduo("");
  };

  const confirmarReporte = () => {
    const reporte = { 
      id: Date.now(), 
      ubicacion: ubicacionTemporal, 
      descripcion: descripcion, 
      tipo: tipoResiduo, 
      estado: "pendiente" 
    };
    
    setReportes([...reportes, reporte]);
    limpiarFormulario();
  };

  return (
    <div className="mapa-contenedor-general">
      <MapContainer 
        center={[-26.830208, -65.203815]} 
        zoom={13} 
        className="mapa-container"
      >
        <CapturaClic alHacerClick={setUbicacionTemporal} />
        
        <TileLayer 
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
        />
        
        {ubicacionTemporal && (
          <Marker position={ubicacionTemporal} icon={iconoProvisional} />
        )}
        
        {reportes.map((reporte) => (
          <Marker key={reporte.id} position={reporte.ubicacion} icon={iconoBasural}>
            <Popup>
              <p><strong>Tipo:</strong> {reporte.tipo}</p>
              <p><strong>Descripción:</strong> {reporte.descripcion}</p>
              <p><strong>Estado:</strong> {reporte.estado}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <aside className="mapa-panel">
        {ubicacionTemporal ? (
          <div className="mapa-formulario"> 
            <h2>Nuevo Reporte</h2> 
            <textarea 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)} 
              name="Descripcion" 
              placeholder="Describí el basural" 
            />
            <select 
              value={tipoResiduo} 
              onChange={(e) => setTipoResiduo(e.target.value)} 
              name="Seleccion" 
            > 
              <option value="">Elegí un tipo</option>
              {tiposResiduo.map((tipo) => (
                <option key={tipo.valor} value={tipo.valor}>
                  {tipo.texto}
                </option>
              ))} 
            </select> 
            <button 
              onClick={confirmarReporte} 
              disabled={!descripcion || !tipoResiduo}
            >
              Confirmar
            </button> 
          </div> 
        ) : (
          <p>Hacé click para marcar un basural</p>
        )} 
      </aside>
    </div>
  );
};

export default Mapa;