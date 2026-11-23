import { useState, useEffect } from 'react';
import { api } from '../../../services/api'; 

const AdminReportes = () => {
  const [reportes, setReportes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const traerReportes = async () => {
      try {
        const data = await api('/reportes');
        setReportes(data);
      } catch (error) {
        console.error('Error al traer reportes:', error);
        setError('No se pudieron cargar los reportes');
      } finally {
        setCargando(false);
      }
    };
    traerReportes();
  }, []);

  const eliminarReporte = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar este reporte?')) return;
    try {
      await api(`/reportes/${id}`, { method: 'DELETE' });
      setReportes(reportes.filter(r => r.id_reporte !== id));
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar el reporte');
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await api(`/reportes/${id}`, {
        method: 'PUT',
        body: { estado: nuevoEstado }
      });
      setReportes(reportes.map(r =>
        r.id_reporte === id ? { ...r, estado: nuevoEstado } : r
      ));
    } catch (error) {
      console.error(error);
      alert('No se pudo actualizar el estado');
    }
  };

  if (cargando) return <p>Cargando reportes...</p>;

  return (
    <div>
      <div className="glass-card-white">
        <h1 className="admin-title">
          <strong style={{ color: 'white' }}>Gestión de Reportes Ciudadanos</strong>
        </h1>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte) => (
              <tr key={reporte.id_reporte}>
                <td>{reporte.id_reporte}</td>
                <td>{reporte.tipo}</td>
                <td>{reporte.descripcion}</td>
                <td>
                  <select
                    value={reporte.estado}
                    onChange={(e) => cambiarEstado(reporte.id_reporte, e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En revision">En revisión</option>
                    <option value="Resuelto">Resuelto</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </td>
                <td className="admin-actions">
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => eliminarReporte(reporte.id_reporte)}
                  >
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

export default AdminReportes;