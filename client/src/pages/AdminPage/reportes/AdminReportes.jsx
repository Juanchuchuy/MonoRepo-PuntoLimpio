import { useState, useEffect } from 'react';
import { api } from '../../../services/api';


const AdminReportes = () => {

  const [reportes, setReportes] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState({
    id_tipo: '',
    descripcion: ''
  });



  useEffect(() => {
    const traerReportes = async () => {
      try {
        const data = await api('/reportes');
        setReportes(data);
        const tiposData = await api('/tipos')
        setTipos(tiposData)
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

  }


  const iniciarEdicion = (reporte) => {
    setEditandoId(reporte.id_reporte);

    setDatosEdicion({
      id_tipo: reporte.id_tipo,
      descripcion: reporte.descripcion
    });
  };






  const guardarEdicion = async (id) => {
    try {
      await api(`/reportes/${id}/editar`, {
        method: 'PUT',
        body: {
          id_tipo: datosEdicion.id_tipo,
          descripcion: datosEdicion.descripcion
        }
      });

      const tipoSeleccionado = tipos.find(
        t => t.id_tipo === Number(datosEdicion.id_tipo)
      );

      setReportes(reportes.map(r =>
        r.id_reporte === id
          ? {
            ...r,
            id_tipo: Number(datosEdicion.id_tipo),
            tipo: tipoSeleccionado.nombre,
            descripcion: datosEdicion.descripcion
          }
          : r
      ));

      setEditandoId(null);

    } catch (error) {
      console.error(error);
      alert('No se pudo editar el reporte');
    }
  };



  return (
    <div>
      <div className="glass-card-white">
        <h1 className="admin-title">
          <strong style={{ color: 'white' }}>Gestión de Reportes Ciudadanos</strong>

        </h1>
      </div>

      <p>Cantidad de reportes: {reportes.length}</p>
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
                <td>
                  {editandoId === reporte.id_reporte ? (
                    <select

                      value={datosEdicion.id_tipo}
                      onChange={(e) =>
                        setDatosEdicion({
                          ...datosEdicion,
                          id_tipo: e.target.value
                        })
                      }
                    >
                      {tipos.map(tipo => (
                        <option key={tipo.id_tipo} value={tipo.id_tipo}>
                          {tipo.nombre}
                        </option>
                      ))}
                    </select>
                  ) : (
                    reporte.tipo
                  )}
                </td>

                <td>
                  {editandoId === reporte.id_reporte ? (
                    <textarea

                      value={datosEdicion.descripcion}
                      onChange={(e) =>
                        setDatosEdicion({
                          ...datosEdicion,
                          descripcion: e.target.value
                        })
                      }
                    />
                  ) : (
                    reporte.descripcion
                  )}
                </td>
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
                  {editandoId === reporte.id_reporte ? (
                    <>
                      <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => guardarEdicion(reporte.id_reporte)}
                      >
                        Guardar
                      </button>

                      <button
                        className="admin-btn admin-btn-secondary"
                        onClick={() => setEditandoId(null)}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      className="admin-btn admin-btn-primary"
                      onClick={() => iniciarEdicion(reporte)}
                    >
                      Editar
                    </button>
                  )}

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