import { useState, useEffect } from 'react';
import { api } from '../../services/api';


const AdminReportes = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const traerReportes = async () => {
      try {
        const data = await api('/reportes');
        setReportes(data);
      } catch (error) {
        console.error('Error al traer reportes:', error);
      }
    };

    traerReportes();
  }, []);

  const eliminarReporte = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar este reporte?')) return;

    try {
      await api(`/reportes/${id}`, {
        method: 'DELETE'
      });

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

  return (
    <div>
      <div className="glass-card-white">
        <h1 className="admin-title">
          <strong style={{ color: 'white' }}>Gestión de Reportes Ciudadanos</strong>
        </h1>
      </div>


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
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En revision">En revisión</option>
                    <option value="Resuelto">Resuelto</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </td>
                <td>

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