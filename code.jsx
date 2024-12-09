import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminproductos.css"; // Asegúrate de que tus estilos estén bien configurados

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    estado: "Disponible",
    id_categoria: "", // Asumiendo que las categorías se gestionan de alguna manera
  });

  const [editData, setEditData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    estado: "Disponible",
    id_categoria: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Obtener la lista de productos cuando el componente se monta
  useEffect(() => {
    fetchProductos();
  }, []);

  // Obtener la lista de productos
  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/productos");
      setProductos(response.data);
    } catch (error) {
      setMensaje("Error al cargar los productos.");
    }
  };

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario de creación de producto
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/productos", formData);
      setMensaje(response.data.mensaje);
      fetchProductos(); // Actualizar la lista de productos
    } catch (error) {
      setMensaje("Error al crear el producto.");
    }
  };

  // Manejar el envío del formulario de edición de producto
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5000/productos/${editData.id}`, editData);
      setMensaje(response.data.mensaje);
      fetchProductos(); // Actualizar la lista de productos
    } catch (error) {
      setMensaje("Error al editar el producto.");
    }
  };

  // Manejar el envío del formulario para eliminar un producto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/productos/${id}`);
      setMensaje("Producto eliminado.");
      fetchProductos(); // Actualizar la lista de productos
    } catch (error) {
      setMensaje("Error al eliminar el producto.");
    }
  };

  return (
    <div style={{ backgroundColor: "#E5E1DA" }}>
      <div className="container">
        <h1>Gestión de Productos</h1>

        {/* Mensaje de éxito o error */}
        {mensaje && <div className="alert alert-info">{mensaje}</div>}

        {/* Formulario para crear un nuevo producto */}
        <div className="form-container">
          <h2>Crear Producto</h2>
          <form onSubmit={handleSubmitCreate}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="Disponible">Disponible</option>
                <option value="No Disponible">No Disponible</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="id_categoria">Categoría</label>
              <input
                type="text"
                id="id_categoria"
                name="id_categoria"
                value={formData.id_categoria}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Crear Producto</button>
          </form>
        </div>

        {/* Tabla de productos */}
        <div className="table-container">
          <h2>Lista de Productos</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.estado}</td>
                  <td>
                    <button onClick={() => setEditData(producto)} className="btn btn-warning">Editar</button>
                    <button onClick={() => handleDelete(producto.id)} className="btn btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para editar producto */}
        {editData.id && (
          <div className="modal">
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmitEdit}>
              <input type="hidden" name="id" value={editData.id} />
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={editData.nombre}
                  onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  value={editData.descripcion}
                  onChange={(e) => setEditData({ ...editData, descripcion: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={editData.precio}
                  onChange={(e) => setEditData({ ...editData, precio: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={editData.estado}
                  onChange={(e) => setEditData({ ...editData, estado: e.target.value })}
                >
                  <option value="Disponible">Disponible</option>
                  <option value="No Disponible">No Disponible</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_categoria">Categoría</label>
                <input
                  type="text"
                  id="id_categoria"
                  name="id_categoria"
                  value={editData.id_categoria}
                  onChange={(e) => setEditData({ ...editData, id_categoria: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductos;
