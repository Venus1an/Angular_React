import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductosList from "./ProductosList"; // Importa el componente de la lista de productos
import AgregarProducto from "./AgregarProducto"; // Si tienes un formulario para agregar productos
import Header from "./Header"; // Puedes agregar un encabezado si lo deseas (opcional)
import Footer from "./Footer"; // Puedes agregar un pie de página si lo deseas (opcional)

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Opcional: Puedes agregar un header o barra de navegación */}
        <Header />
        
        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<ProductosList />} /> {/* Ruta para la lista de productos */}
          <Route path="/agregar" element={<AgregarProducto />} /> {/* Ruta para agregar un producto */}
          {/* Agrega más rutas si tienes otras vistas o formularios */}
        </Routes>
        
        {/* Opcional: Pie de página */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
