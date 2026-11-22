import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api'; 

const ZonaForm = () => {
    const [nombre, setNombre] = useState('');
    const [idEncargado, setIdEncargado] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    
    useEffect(() => {
        const traerUsuarios = async () => {
            try {
                const data = await api('/admin/usuarios');
                
                const admins = data.filter(u => u.rol === 'administrador');
                setUsuarios(admins);
            } catch (error) {
                console.error('Error al traer usuarios:', error);
            }
        };
        traerUsuarios();
    }, []);

    
    useEffect(() => {
        if (id) {
            const traerZona = async () => {
                try {
                    
                    const data = await api('/zonas');
                    const zona = data.find(z => z.id_zona === parseInt(id));
                    if (zona) {
                        setNombre(zona.nombre);
                        setIdEncargado(zona.id_encargado || '');
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            traerZona();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!nombre.trim()) {
            setError('El nombre es obligatorio');
            return;
        }

        try {
            const url = id ? `/zonas/${id}` : '/zonas';
            const method = id ? 'PUT' : 'POST';

            
            await api(url, {
                method,
                body: { nombre, id_encargado: idEncargado || null }
            });

            navigate('/admin/zonas');
        } catch (error) {
            console.error(error);
            setError('No se pudo guardar la zona');
        }
    };

    return (
        <div>
            <div className="glass-card-white">
                <h1 className="admin-title">
                    <strong style={{ color: 'white' }}>{id ? 'Editar Zona' : 'Nueva Zona'}</strong>
                </h1>
            </div>

            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="admin-field">
                    <label>Nombre de la Zona</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Zona Centro"
                    />
                </div>

                <div className="admin-field">
                    <label>Administrador a cargo (Opcional)</label>
                    <select
                        value={idEncargado}
                        onChange={(e) => setIdEncargado(e.target.value)}
                    >
                        <option value="">Sin asignar</option>
                        {usuarios.map((u) => (
                            <option key={u.id_usuario} value={u.id_usuario}> 
                                {u.nombre} {u.apellido}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="admin-actions">
                    <button type="submit" className="admin-btn admin-btn-primary">Guardar</button>
                    <button type="button" onClick={() => navigate('/admin/zonas')} className="admin-btn admin-btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default ZonaForm;