import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "./Mapa-estilo.css";



const API_URL = 'http://localhost:3000/api'

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
  const [tipos, setTipos] = useState([])
  // traer los tipos de residuos
  useEffect(() => {
    const traertipos = async () => {
      try {

        const respuesta = await fetch(`${API_URL}/tipos`)
        const data = await respuesta.json()
        setTipos(data)

      } catch (error) {
        console.error('error al traer los tipos:', error)
      }
    }

    traertipos()

  }, [])


  useEffect(() => {
    const traerReportes = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/reportes`)
        const data = await respuesta.json()
        setReportes(data)

      } catch (error) {
        console.error('error al traer los reportes:', error)
      }


    }

    traerReportes()
  }, [])



  const limpiarFormulario = () => {
    setUbicacionTemporal(null);
    setDescripcion("");
    setTipoResiduo("");
  };

  const confirmarReporte = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/reportes`, {
        method: 'POST', //le dice al servidor que tipo de metodo va a usarse en este caso tipo post
        headers: {
          'Content-Type': 'application/json' // le dice al servidor como interpretar lo que manda (no lo convierte a objeto)
        },
        body: JSON.stringify({
          latitud: ubicacionTemporal.lat,
          longitud: ubicacionTemporal.lng,
          descripcion: descripcion,
          id_tipo: tipoResiduo
        })


      })

      if (!respuesta.ok) {
        throw new Error('El servidor rechazó el reporte');
      }

      const data = await respuesta.json();
      console.log(data)
      setReportes([...reportes, data]);
      limpiarFormulario();

    } catch (error) {
      console.error('no se pudo guardar el reporte intente de nuevo', error)

    }

    

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
          <Marker key={reporte.id_reporte} position={[reporte.latitud, reporte.longitud]} icon={iconoBasural}>
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
            <div className="mapa-encabezado">
              <h2>Nuevo Reporte</h2>
              <p>Registro de basurales</p>
            </div>
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
              {tipos.map((tipo) => (
                <option key={tipo.id_tipo} value={tipo.id_tipo}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
            <button className="boton-confirmar"
              onClick={confirmarReporte}
              disabled={!descripcion || !tipoResiduo}
            >
              Confirmar reporte
            </button>
          </div>
        ) : (
          <p>Hacé click para marcar un basural </p>
        )}
        <div className="mapa-leyenda">
          <h3>Referencias del mapa</h3>

          <p>
            <span className="leyenda-rojo"></span>
            Basural Registrado
          </p>

          <p>
            <span className="leyenda-azul"></span>
            Ubicacion Momentanea 
          </p>
        </div>

      </aside>
    </div>
  );
};

export default Mapa;