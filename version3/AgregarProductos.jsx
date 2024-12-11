import React, { useState } from "react";
import axios from "axios";

const AgregarProducto = () => {
  const [formData, setFormData] = useState({
    Nombre_Prod: "",
    Medida_Prod: "",
    Precio_Bruto_Prod: "",
    Precio_Neto_Unidad_Prod: "",
    Iva_Prod: "",
    Porcentaje_Ganancia: "",
    Unidades_Totales_Prod: "",
    Estado_Prod: "",
    Marca_Prod: "",
    FK_Id_Proveedor: "",  // Inicializa con un valor vacío o un ID válido si ya lo tienes
    FK_Id_Subcategoria: "",  // Inicializa con un valor vacío o un ID válido si ya lo tienes
  });

  // Función para actualizar los valores del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación (puedes agregar más validaciones según sea necesario)
    if (!formData.Nombre_Prod || !formData.FK_Id_Proveedor || !formData.FK_Id_Subcategoria) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    axios
      .post("http://localhost:5000/api/productos", formData)
      .then((response) => {
        alert("Producto agregado correctamente");
        // Aquí puedes resetear el formulario si es necesario
        setFormData({
          Nombre_Prod: "",
          Medida_Prod: "",
          Precio_Bruto_Prod: "",
          Precio_Neto_Unidad_Prod: "",
          Iva_Prod: "",
          Porcentaje_Ganancia: "",
          Unidades_Totales_Prod: "",
          Estado_Prod: "",
          Marca_Prod: "",
          FK_Id_Proveedor: "",
          FK_Id_Subcategoria: "",
        });
      })
      .catch((error) => {
        console.error("Error al agregar producto:", error);
        alert("Hubo un error al agregar el producto.");
      });
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Nombre_Prod"
          placeholder="Nombre del producto"
          value={formData.Nombre_Prod}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Medida_Prod"
          placeholder="Medida"
          value={formData.Medida_Prod}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Precio_Bruto_Prod"
          placeholder="Precio bruto"
          value={formData.Precio_Bruto_Prod}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Precio_Neto_Unidad_Prod"
          placeholder="Precio neto por unidad"
          value={formData.Precio_Neto_Unidad_Prod}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Iva_Prod"
          placeholder="IVA"
          value={formData.Iva_Prod}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Porcentaje_Ganancia"
          placeholder="Porcentaje de ganancia"
          value={formData.Porcentaje_Ganancia}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Unidades_Totales_Prod"
          placeholder="Unidades totales"
          value={formData.Unidades_Totales_Prod}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Estado_Prod"
          placeholder="Estado del producto"
          value={formData.Estado_Prod}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Marca_Prod"
          placeholder="Marca"
          value={formData.Marca_Prod}
          onChange={handleInputChange}
        />

        {/* Selección de proveedor */}
        <select
          name="FK_Id_Proveedor"
          value={formData.FK_Id_Proveedor}
          onChange={handleInputChange}
        >
          <option value="">Selecciona un proveedor</option>
          {/* Aquí deberías renderizar los proveedores disponibles */}
          <option value="1">Proveedor 1</option>
          <option value="2">Proveedor 2</option>
        </select>

        {/* Selección de subcategoría */}
        <select
          name="FK_Id_Subcategoria"
          value={formData.FK_Id_Subcategoria}
          onChange={handleInputChange}
        >
          <option value="">Selecciona una subcategoría</option>
          {/* Aquí deberías renderizar las subcategorías disponibles */}
          <option value="1">Subcategoría 1</option>
          <option value="2">Subcategoría 2</option>
        </select>

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
