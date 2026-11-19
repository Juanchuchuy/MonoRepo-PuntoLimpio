import Header from "./components/layout/Header";
import Home from "./pages/HomePage/Home";
import Footer from "./components/layout/Footer";

//"<>"" es para agrupar sin etiqueta
function App() {
  return (
    <>
      <Header />

      <main>
        <Home />
      </main>

      <Footer />
    </>
  );
}

export default App;