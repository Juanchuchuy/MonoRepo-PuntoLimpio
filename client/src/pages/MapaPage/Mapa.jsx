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

const iconoPuntoVerde = L.divIcon({
  className: 'mapa-icono-verde',
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
  const [puntos, setPuntos] = useState([])
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);


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

  useEffect(() => {
    const traerPuntos = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/puntos`);
        const data = await respuesta.json();
        setPuntos(data);

      } catch (error) {
        console.error('error al traer los puntos:', error);
      }


    };

    traerPuntos();
  }, [])



  useEffect(() => {
    const traerTipos = async () => {
      try {

        // await new Promise(resolve => setTimeout(resolve, 3000)); // usar solo para el ejemplo de que sirve la carga XD

        const respuesta = await fetch(`${API_URL}/tipos`);
        const data = await respuesta.json();
        setTipos(data);
        setCargando(false);
      } catch (error) {
        console.error(error);
        setError('Error al cargar los tipos de residuos');
        setCargando(false);
      }
    };
    traerTipos();
  }, []);


  useEffect(() => {
    const traerReportes = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/reportes`);
        const data = await respuesta.json();
        setReportes(data);
      } catch (error) {
        console.error(error);
        setError('Error al cargar los reportes');
      }
    };
    traerReportes();
  }, []);



  const limpiarFormulario = () => {
    setUbicacionTemporal(null);
    setDescripcion("");
    setTipoResiduo("");
  };

  const confirmarReporte = async () => {
    setEnviando(true) //deshabilita el boton de primeras 

   // await new Promise(resolve => setTimeout(resolve, 2000)); // usar solo para el ejemplo de que sirve la carga XD


   
    try {
      const respuesta = await fetch(`${API_URL}/reportes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
    //se ejecuta independientemente del resultado
    finally {
      setEnviando(false) //habilita nuevamente el boton
    }



  };


  const eliminarReporte = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/reportes/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar');
      }

      const reportesActualizados = reportes.filter(reporte => reporte.id_reporte !== id);
      setReportes(reportesActualizados);

    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('No se pudo eliminar el reporte');
    }
  };



  const cambiarEstado = async (id, nuevoEstado) => {
    try {

      const respuesta = await fetch(`${API_URL}/reportes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });


      if (!respuesta.ok) {
        throw new Error('No se pudo actualizar el estado');
      }


      const reportesActualizados = reportes.map((reporte) => {
        if (reporte.id_reporte === id) {
          return { ...reporte, estado: nuevoEstado };
        }
        return reporte;
      });

      setReportes(reportesActualizados);

    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('No se pudo actualizar el estado del reporte');
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

        {puntos.map((punto) => (
          <Marker key={punto.id_punto} position={[punto.latitud, punto.longitud]} icon={iconoPuntoVerde}>
            <Popup>
              <p><strong>{punto.nombre}</strong></p>
              <p>{punto.referencia}</p>
            </Popup>
          </Marker>
        ))}

        {reportes.map((reporte) => (
          <Marker key={reporte.id_reporte} position={[reporte.latitud, reporte.longitud]} icon={iconoBasural}>
            <Popup>
              <p><strong>Tipo:</strong> {reporte.tipo}</p>
              <p><strong>Descripción:</strong> {reporte.descripcion}</p>
              <p><strong>Estado:</strong> {reporte.estado}</p>
              <select
                value={reporte.estado}
                onChange={(e) => cambiarEstado(reporte.id_reporte, e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En revision">En revisión</option>
                <option value="Resuelto">Resuelto</option>
                <option value="Rechazado">Rechazado</option>
              </select>

              <button onClick={() => eliminarReporte(reporte.id_reporte)}>
                Eliminar
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <aside className="mapa-panel">
        {cargando && <p>Cargando datos del mapa...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
              disabled={!descripcion || !tipoResiduo || enviando}
            >
              {enviando ? 'Enviando...' : 'Confirmar reporte'}

            </button>
          </div>
        ) : (
          !error && <p>Hacé click para marcar un basural </p>
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

          <p>
            <span className="leyenda-verde"></span>
            Punto de recolección
          </p>

        </div>

      </aside>
    </div>
  );
};

export default Mapa;
