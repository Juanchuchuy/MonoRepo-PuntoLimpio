import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api';



const CalleForm = () => {
  const [nombre, setNombre] = useState('');
  const [idZona, setIdZona] = useState('');
  const [zonas, setZonas] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const traerZonas = async () => {
      try {
        const data = await api('/zonas');

        setZonas(data);
      } catch (error) {
        console.error('Error al traer zonas:', error);
      }
    };
    traerZonas();
  }, []);


  useEffect(() => {
    if (id) {
      const traerCalle = async () => {
        try {
          const data = await api('/calles');
          const calle = data.find(c => c.id_calle === parseInt(id));

          if (calle) {
            setNombre(calle.nombre);
            setIdZona(calle.id_zona || '');
          }
        } catch (error) {
          console.error(error);
        }
      };
      traerCalle();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim() || !idZona) {
      setError('El nombre y la zona son obligatorios');
      return;
    }

    try {
      const ruta = id ? `/calles/${id}` : '/calles';
      const method = id ? 'PUT' : 'POST';

      await api(ruta, {
        method,
        body: { nombre, id_zona: idZona }
      });

      navigate('/admin/calles');
    } catch (error) {
      console.error(error);
      setError('No se pudo guardar la calle');
    }
  };

  return (
    <div>
      <div className="glass-card-white">
        <h1 className="admin-title">
          <strong style={{ color: 'white' }}>{id ? 'Editar Calle' : 'Nueva Calle'}</strong>
        </h1>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-field">
          <label>Nombre de la Calle</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Calle San Martín"
          />
        </div>

        <div className="admin-field">
          <label>Zona a la que pertenece</label>
          <select
            value={idZona}
            onChange={(e) => setIdZona(e.target.value)}
          >
            <option value="">Seleccione una zona</option>
            {zonas.map((z) => (
              <option key={z.id_zona} value={z.id_zona}>
                {z.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary">Guardar</button>
          <button type="button" onClick={() => navigate('/admin/calles')} className="admin-btn admin-btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CalleForm;