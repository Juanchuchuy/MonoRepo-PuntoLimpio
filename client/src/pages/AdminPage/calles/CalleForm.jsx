import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

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
        const respuesta = await fetch(`${API_URL}/zonas`);
        const data = await respuesta.json();
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
          const respuesta = await fetch(`${API_URL}/calles`);
          const data = await respuesta.json();
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
      const url = id ? `${API_URL}/calles/${id}` : `${API_URL}/calles`;
      const method = id ? 'PUT' : 'POST';

      const respuesta = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, id_zona: idZona })
      });

      if (!respuesta.ok) throw new Error('Error al guardar');
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