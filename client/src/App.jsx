import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./pages/HomePage/components/Sidebar";
import Header from "./components/layout/Header";
import Home from "./pages/HomePage/Home";
import Footer from "./components/layout/Footer";

//"<>"" es para agrupar sin etiqueta
function App() {

  // Estado para abrir/cerrar el sidebar
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <>
      {/*header con boton para abrir el sidebar */}
      <Header toggleSidebar={() => setSidebarAbierto(true)} />

      {/*para que el sidebar se muestre en todas las paginas */}
      <Sidebar 
        abierto={sidebarAbierto} 
        cerrarSidebar={() => setSidebarAbierto(false)} 
      />

      <main>
        <Outlet/>
      </main>

      <Footer />
    </>
  );
}

export default App;