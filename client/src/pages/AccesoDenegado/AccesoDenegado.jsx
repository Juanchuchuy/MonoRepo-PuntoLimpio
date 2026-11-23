
import { useNavigate } from 'react-router-dom';
import './AccesoDenegado.css';

export default function AccesoDenegado() {
  const navigate = useNavigate();

  return (
    <div className="acceso-denegado">
      <div className="acceso-denegado-contenido">
        <div className="acceso-denegado-icono">
          <span>🛡️</span>
        </div>

        <h1>Acceso denegado</h1>
        <h2>403</h2>

        <p>
          No tenes permisos para acceder a esta sección.
        </p>

        <p>
          Esta area esta reservada para administradores de Punto Limpio.
        </p>

        <button onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
