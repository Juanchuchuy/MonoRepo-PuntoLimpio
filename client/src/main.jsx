import { createRoot } from 'react-dom/client'
import App from './App';
import Mapa from './pages/MapaPage/Mapa';
import AccesoPage from './pages/AccesoPage/AccesoPage';
import EstadisticasPage from './pages/EstadisticasPage/EstadisticasPage';
import ReciclajePage from './pages/ReciclajePage/ReciclajePage';
import PrivateRoute from './routes/PrivateRoute';
import AdminLayout from './pages/AdminPage/AdminLayout';
import AdminDashboard from './pages/AdminPage/AdminDashboard';
import RolesList from './pages/AdminPage/roles/RolesList';
import RolForm from './pages/AdminPage/roles/RolForm';
import { useAuthStore } from './store/authStore';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './index.css'
import 'leaflet/dist/leaflet.css';


// Recupera la sesión guardada (token en localStorage) antes de mostrar las rutas
useAuthStore.getState().loadSession();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/Mapa' element={<Mapa />}></Route>
      <Route path='/Acceso' element={<AccesoPage />}></Route>

      {/* Rutas privadas: se agregan acá 
          <Route element={<PrivateRoute />}> ...cualquier usuario con sesión... </Route> */}

      {/* Panel de administración: solo rol administrador */}
      <Route element={<PrivateRoute roles={['administrador']} />}>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='roles' element={<RolesList />} />
          <Route path='roles/nuevo' element={<RolForm />} />
          <Route path='roles/:id/editar' element={<RolForm />} />
        </Route>
      </Route>
    </Routes>

  </BrowserRouter>
)