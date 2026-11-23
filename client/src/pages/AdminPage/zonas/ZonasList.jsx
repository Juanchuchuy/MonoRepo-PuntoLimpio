import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';



const ZonasList = () => {
  const [zonas, setZonas] = useState([]);

  const traerZonas = async () => {
    try {
      const data = await api('/zonas');
      setZonas(data);
    } catch (error) {
      console.error('Error al traer zonas:', error);
    }
  };

  useEffect(() => {
    traerZonas();
  }, []);

  const eliminarZona = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar esta zona?')) return;

    try {
      await api(`/zonas/${id}`, { method: 'DELETE' });
      setZonas(zonas.filter(z => z.id_zona !== id));
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar. Puede que tenga calles asociadas.');
    }
  };
  return (
    <div>
      <div className="glass-card-white">
        <h1 className="admin-title">
          <strong style={{ color: 'white' }}>Gestión de Zonas</strong>
        </h1>
      </div>

      <div className="admin-toolbar">
        <Link to="/admin/zonas/nueva" className="admin-btn admin-btn-primary">
          + Nueva Zona
        </Link>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la Zona</th>
              <th>Encargado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {zonas.map((zona) => (
              <tr key={zona.id_zona}>
                <td>{zona.id_zona}</td>
                <td>{zona.nombre}</td>
                <td>
                  {zona.encargado_nombre
                    ? `${zona.encargado_nombre} ${zona.encargado_apellido}`
                    : 'Sin asignar'}
                </td>
                <td className="admin-actions">
                  <Link to={`/admin/zonas/${zona.id_zona}/editar`} className="admin-btn admin-btn-secondary">
                    Editar
                  </Link>
                  <button onClick={() => eliminarZona(zona.id_zona)} className="admin-btn admin-btn-danger">
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

export default ZonasList; 