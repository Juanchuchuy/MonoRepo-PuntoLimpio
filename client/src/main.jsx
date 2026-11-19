import { createRoot } from 'react-dom/client'
import App from './App';
import Mapa from './pages/MapaPage/Mapa';
import AccesoPage from './pages/AccesoPage/AccesoPage';
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
          <Route element={<PrivateRoute />}> ...cualquier usuario con sesión... </Route>
          <Route element={<PrivateRoute roles={['administrador']} />}> ...solo administrador... </Route> */}
    </Routes>

  </BrowserRouter>
)
