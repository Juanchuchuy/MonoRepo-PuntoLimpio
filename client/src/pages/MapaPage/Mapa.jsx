import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "./Mapa-estilo.css";
import { api } from "../../services/api";
import { useAuthStore } from "../../store/authStore";



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

const iconoPuntoRecoleccion = L.divIcon({
  className: 'mapa-icono-amarillo',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});



const CapturaClic = ({ alHacerClick, habilitado }) => {
  useMapEvents({
    click: (e) => {
      if (habilitado) { alHacerClick(e.latlng) }
    }
  });
  return null;
};

const Mapa = () => {


  // verificacion de admin y de cambios
  const user = useAuthStore((state) => state.user);
  const esAdmin = user?.rol === 'administrador';
  const setCambiosSinGuardar = useAuthStore((state) => state.setCambiosSinGuardar)



  const [ubicacionTemporal, setUbicacionTemporal] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [tipoResiduo, setTipoResiduo] = useState("");
  const [reportes, setReportes] = useState([]);
  const [tipos, setTipos] = useState([])
  const [puntos, setPuntos] = useState([])
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [modoCrearPunto, setModoCrearPunto] = useState(false);
  const [nuevoPuntoNombre, setNuevoPuntoNombre] = useState('');
  const [nuevoPuntoReferencia, setNuevoPuntoReferencia] = useState('');
  const [nuevoPuntoCalle, setNuevoPuntoCalle] = useState('');
  const [calles, setCalles] = useState([]);

  // se coloca aqui ya que ModoCrearPunto es especifico del admin
  const habilitado = !esAdmin || modoCrearPunto

  useEffect(() => {
    let hayDatos = false

    if (esAdmin) {
      hayDatos =
        ubicacionTemporal !== null || nuevoPuntoNombre.trim() !== "" || nuevoPuntoReferencia.trim() !== "" || nuevoPuntoCalle !== ""


    }
    else {
      hayDatos =
        ubicacionTemporal !== null || descripcion.trim() !== "" || tipoResiduo !== ""

    }

    setCambiosSinGuardar(hayDatos)

    return () => {

      setCambiosSinGuardar(false)

    }

  }, [esAdmin, ubicacionTemporal, descripcion, tipoResiduo, nuevoPuntoNombre, nuevoPuntoReferencia, nuevoPuntoCalle, setCambiosSinGuardar])


  useEffect(() => {
    const traerTipos = async () => {
      try {

        // await new Promise(resolve => setTimeout(resolve, 3000)); // usar solo para el ejemplo de que sirve la carga 

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

  useEffect(() => {
    const traerCalles = async () => {
      try {
        const data = await api('/calles');
        setCalles(data);
      } catch (error) {
        console.error('Error al traer calles:', error);
      }
    };
    traerCalles();
  }, []);


  const limpiarFormulario = () => {
    setUbicacionTemporal(null);
    setDescripcion("");
    setTipoResiduo("");
  };

  const confirmarReporte = async () => {
    // Crear un reporte exige sesión: el servidor toma el usuario del token.
    if (!user) {
      setError('Tenés que iniciar sesión para enviar un reporte');
      return;
    }

    setError(null);
    setEnviando(true) //deshabilita el boton de primeras 

    try {
      const data = await api('/reportes', {
        method: 'POST',
        body: {
          latitud: ubicacionTemporal.lat,
          longitud: ubicacionTemporal.lng,
          descripcion: descripcion,
          id_tipo: tipoResiduo
        }
      });

      setReportes([...reportes, data]);
      limpiarFormulario();

    } catch (error) {
      console.error('no se pudo guardar el reporte intente de nuevo', error)
      setError(error.message);

    }
    //se ejecuta independientemente del resultado
    finally {
      setEnviando(false) //habilita nuevamente el boton
    }


  };

  //Funcion dirigida al admin
  const guardarPuntoRecoleccion = async () => {
    if (!nuevoPuntoNombre || !nuevoPuntoCalle) {
      alert('El nombre y la calle son obligatorios');
      return;
    }
    try {
      await api('/admin/puntos', {
        method: 'POST',
        body: {
          nombre: nuevoPuntoNombre,
          referencia: nuevoPuntoReferencia || null,
          id_calle: Number(nuevoPuntoCalle),
          latitud: ubicacionTemporal.lat,
          longitud: ubicacionTemporal.lng,
          activo: true
        }
      });

      const puntosActualizados = await api('/puntos');
      setPuntos(puntosActualizados);

      setModoCrearPunto(false);
      setUbicacionTemporal(null);
      setNuevoPuntoNombre('');
      setNuevoPuntoReferencia('');
      setNuevoPuntoCalle('');
      alert('Punto de recoleccion creado con exito');
    } catch (error) {
      console.error(error);
      alert('No se pudo crear el punto de recoleccion');
    }
  };


  const eliminarReporte = async (id) => {
    try {
      await api(`/reportes/${id}`, {
        method: 'DELETE'
      });

      const reportesActualizados = reportes.filter(
        reporte => reporte.id_reporte !== id
      );

      setReportes(reportesActualizados);

    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('No se pudo eliminar el reporte');
    }
  };



  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await api(`/reportes/${id}`, {
        method: 'PUT',
        body: { estado: nuevoEstado }
      });

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
        <CapturaClic alHacerClick={setUbicacionTemporal} habilitado={habilitado} />

        <TileLayer
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {ubicacionTemporal && (
          <Marker position={ubicacionTemporal} icon={iconoProvisional} />
        )}

        {puntos.map((punto) => (
          <Marker
            key={punto.id_punto}
            position={[Number(punto.latitud), Number(punto.longitud)]}
            icon={iconoPuntoRecoleccion}
          >
            <Popup>
              <p><strong>{punto.nombre}</strong></p>
              <p>{punto.calle} ({punto.zona})</p>
              <p>Recibe: {punto.tipos || 'No especificado'}</p>
              <p>Horarios: {punto.horarios || 'Sin horarios cargados'}</p>
            </Popup>
          </Marker>
        ))}

        {reportes.map((reporte) => (
          <Marker key={reporte.id_reporte} position={[reporte.latitud, reporte.longitud]} icon={iconoBasural}>
            <Popup>
              <p><strong>Tipo:</strong> {reporte.tipo}</p>
              <p><strong>Descripción:</strong> {reporte.descripcion}</p>
              <p><strong>Estado:</strong> {reporte.estado}</p>
              {esAdmin && (
                <>
                  <select
                    value={reporte.estado}
                    onChange={(e) => cambiarEstado(reporte.id_reporte, e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En revision">En revisión</option>
                    <option value="Resuelto">Resuelto</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>

                  <button className="boton-eliminar-reporte" onClick={() => eliminarReporte(reporte.id_reporte)}>
                    Eliminar
                  </button>
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <aside className="mapa-panel">
        {cargando && <p>Cargando datos del mapa...</p>}
        {error && <p className="mapa-error">{error}</p>}

        {/* BOTÓN DE ADMIN */}
        {esAdmin && (
          <button
            className="boton-admin-panel"
            onClick={() => {
              console.log("Modo admin antes:", modoCrearPunto)
              setModoCrearPunto(!modoCrearPunto);
              setUbicacionTemporal(null);
            }}
          >
            {modoCrearPunto ? 'Cancelar' : 'Crear Punto de Recoleccion'}
          </button>
        )}

        {ubicacionTemporal ? (
          esAdmin ? (
            // FORMULARIO DE PUNTO DE RECOLECCIÓN (Admin)
            <div className="mapa-formulario">
              <div className="mapa-encabezado">
                <h2>Nuevo Punto</h2>
                <p>Punto de recolección oficial</p>
              </div>
              <input
                type="text"
                value={nuevoPuntoNombre}
                onChange={(e) => setNuevoPuntoNombre(e.target.value)}
                placeholder="Nombre del punto"
              />
              <input
                type="text"
                value={nuevoPuntoReferencia}
                onChange={(e) => setNuevoPuntoReferencia(e.target.value)}
                placeholder="Referencia (opcional)"
              />
              <select
                value={nuevoPuntoCalle}
                onChange={(e) => setNuevoPuntoCalle(e.target.value)}
              >
                <option value="">Elegí una calle</option>
                {calles.map((calle) => (
                  <option key={calle.id_calle} value={calle.id_calle}>
                    {calle.nombre}
                  </option>
                ))}
              </select>
              <button className="boton-confirmar" onClick={guardarPuntoRecoleccion}>
                Guardar Punto
              </button>
            </div>
          ) : (
            // FORMULARIO DE REPORTE (Ciudadano)
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
          )
        ) : (
          !error && (
            <p>
              {esAdmin
                ? "Hace clic en el mapa para ubicar el punto de recoleccion nuevo"
                : "Hace click para marcar un basural"}
            </p>
          )
        )}


        <div className="mapa-leyenda">
          <h3>Referencias del mapa</h3>
          <p><span className="leyenda-rojo"></span> Basural Registrado</p>
          <p><span className="leyenda-azul"></span> Ubicación Momentánea</p>
          <p><span className="leyenda-amarillo"></span> Punto de recolección</p>
        </div>
      </aside>
    </div>
  );
};

export default Mapa;