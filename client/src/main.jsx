import { createRoot } from 'react-dom/client'
import App from './App';
import Home from './pages/HomePage/Home';
import Mapa from './pages/MapaPage/Mapa';
import AccesoPage from './pages/AccesoPage/AccesoPage';
import EstadisticasPage from './pages/EstadisticasPage/EstadisticasPage';
import ReciclajePage from './pages/ReciclajePage/ReciclajePage';
import PrivateRoute from './routes/PrivateRoute';
import AdminLayout from './pages/AdminPage/AdminLayout';
import AdminDashboard from './pages/AdminPage/AdminDashboard';
import AdminReportes from './pages/AdminPage/AdminReportes'
import ZonasList from './pages/AdminPage/zonas/ZonasList';
import ZonaForm from './pages/AdminPage/zonas/ZonaForm';
import CallesList from './pages/AdminPage/calles/CallesList';
import CalleForm from './pages/AdminPage/calles/CalleForm'
import RolesList from './pages/AdminPage/roles/RolesList';
import RolForm from './pages/AdminPage/roles/RolForm';
import UsuariosList from './pages/AdminPage/usuarios/UsuariosList';
import UsuarioForm from './pages/AdminPage/usuarios/UsuarioForm';
import TiposResiduoList from './pages/AdminPage/tipos-residuo/TiposResiduoList';
import TipoResiduoForm from './pages/AdminPage/tipos-residuo/TipoResiduoForm';
import { useAuthStore } from './store/authStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import 'leaflet/dist/leaflet.css';


// Recupera la sesión guardada (token en localStorage) antes de mostrar las rutas
useAuthStore.getState().loadSession();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Acá metemos TODAS las paginas adentro de App para que tengan Sidebar/Header */}
      <Route element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='/Mapa' element={<Mapa />} />
        <Route path='/Acceso' element={<AccesoPage />} />
        <Route path='/reciclaje' element={<ReciclajePage />} />
        <Route path='/estadisticas' element={<EstadisticasPage />} />
      </Route>


      {/* Rutas privadas: se agregan acá 
          <Route element={<PrivateRoute />}> ...cualquier usuario con sesión... </Route> */}

      {/* Panel de administración: solo rol administrador */}
      <Route element={<PrivateRoute roles={['administrador']} />}>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='roles' element={<RolesList />} />
          <Route path='roles/nuevo' element={<RolForm />} />
          <Route path='roles/:id/editar' element={<RolForm />} />
          <Route path='usuarios' element={<UsuariosList />} />
          <Route path='usuarios/nuevo' element={<UsuarioForm />} />
          <Route path='usuarios/:id/editar' element={<UsuarioForm />} />
          <Route path='tipos-residuo' element={<TiposResiduoList />} />
          <Route path='tipos-residuo/nuevo' element={<TipoResiduoForm />} />
          <Route path='tipos-residuo/:id/editar' element={<TipoResiduoForm />} />
          <Route path='reportes' element={<AdminReportes />} />
          <Route path='zonas' element={<ZonasList />} />
          <Route path='zonas/nueva' element={<ZonaForm />} />
          <Route path='zonas/:id/editar' element={<ZonaForm />} />
          <Route path='calles' element={<CallesList />} />
          <Route path='calles/nueva' element={<CalleForm />} />
          <Route path='calles/:id/editar' element={<CalleForm />} />
        </Route>
      </Route>
    </Routes>

  </BrowserRouter>
)
