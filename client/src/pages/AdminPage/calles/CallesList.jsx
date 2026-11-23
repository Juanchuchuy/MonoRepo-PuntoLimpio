import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';



const CallesList = () => {
  const [calles, setCalles] = useState([]);

  const traerCalles = async () => {
    try {
      const data = await api('/calles');
      setCalles(data);
    } catch (error) {
      console.error('Error al traer calles:', error);
    }
  };

  useEffect(() => {
    traerCalles();
  }, []);

  const eliminarCalle = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar esta calle?')) return;

    try {
      await api(`/calles/${id}`, { method: 'DELETE' });
      setCalles(calles.filter(c => c.id_calle !== id));
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar. Puede que tenga puntos asociados.');
    }
  };
  return (
    <div>
      <div className="glass-card-white">
        <h1 className="admin-title">
          <strong style={{ color: 'white' }}>Gestión de Calles</strong>
        </h1>
      </div>

      <div className="admin-toolbar">
        <Link to="/admin/calles/nueva" className="admin-btn admin-btn-primary">
          + Nueva Calle
        </Link>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la Calle</th>
              <th>Zona</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {calles.map((calle) => (
              <tr key={calle.id_calle}>
                <td>{calle.id_calle}</td>
                <td>{calle.nombre}</td>
                <td>{calle.zona_nombre || 'Sin zona'}</td>
                <td className="admin-actions">
                  <Link to={`/admin/calles/${calle.id_calle}/editar`} className="admin-btn admin-btn-secondary">
                    Editar
                  </Link>
                  <button onClick={() => eliminarCalle(calle.id_calle)} className="admin-btn admin-btn-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallesList;