const ProductosList = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [proveedores, setProveedores] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
  
    // Filtros adicionales
    const [estadoFiltro, setEstadoFiltro] = useState("");  // Filtro por estado
    const [precioMinFiltro, setPrecioMinFiltro] = useState("");  // Filtro por precio mínimo
    const [precioMaxFiltro, setPrecioMaxFiltro] = useState("");  // Filtro por precio máximo
  
    useEffect(() => {
      const obtenerProductos = () => {
        setCargando(true);
        axios.get("http://localhost:5000/api/productos", {
          params: {
            nombre: nombreFiltro,
            subcategoria: subcategoriaFiltro,
            marca: marcaFiltro,
            proveedor: proveedorFiltro,
            estado: estadoFiltro,    // Filtro de estado
            precio_min: precioMinFiltro,  // Filtro de precio mínimo
            precio_max: precioMaxFiltro   // Filtro de precio máximo
          }
        })
          .then(response => {
            setProductos(response.data);
            setCargando(false);
          })
          .catch(error => {
            console.error("Error al obtener los productos:", error);
            setCargando(false);
          });
      };
  
      obtenerProductos(); // Llamar a la API para obtener productos con filtros
    }, [nombreFiltro, subcategoriaFiltro, marcaFiltro, proveedorFiltro, estadoFiltro, precioMinFiltro, precioMaxFiltro]);
  
    if (cargando) {
      return <div>Cargando productos...</div>;
    }
  
    return (
      <div>
        <h2>Lista de Productos</h2>
  
        {/* Filtros */}
        <div>
          <input 
            type="text" 
            placeholder="Filtrar por nombre"
            value={nombreFiltro} 
            onChange={(e) => setNombreFiltro(e.target.value)} 
          />
          <select 
            value={subcategoriaFiltro} 
            onChange={(e) => setSubcategoriaFiltro(e.target.value)}
          >
            <option value="">Seleccionar subcategoría</option>
            {subcategorias.map(subcategoria => (
              <option key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.nombre}
              </option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Filtrar por marca" 
            value={marcaFiltro} 
            onChange={(e) => setMarcaFiltro(e.target.value)} 
          />
          <select 
            value={proveedorFiltro} 
            onChange={(e) => setProveedorFiltro(e.target.value)}
          >
            <option value="">Seleccionar proveedor</option>
            {proveedores.map(proveedor => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
  
          {/* Nuevos filtros */}
          <select 
            value={estadoFiltro} 
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="">Seleccionar estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
  
          <input 
            type="number" 
            placeholder="Precio mínimo"
            value={precioMinFiltro} 
            onChange={(e) => setPrecioMinFiltro(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Precio máximo"
            value={precioMaxFiltro} 
            onChange={(e) => setPrecioMaxFiltro(e.target.value)} 
          />
        </div>
  
        {/* Lista de productos */}
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Subcategoría</th>
              <th>Marca</th>
              <th>Medida</th>
              <th>Precio Bruto</th>
              <th>Precio Neto</th>
              <th>Iva</th>
              <th>Porcentaje de Ganancia</th>
              <th>Unidades Totales</th>
              <th>Estado</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.id}>
                <td>{producto.Nombre_Prod}</td>
                <td>{subcategorias.find(subcategoria => subcategoria.id === producto.FK_Id_Subcategoria)?.nombre || "N/A"}</td>
                <td>{producto.Marca_Prod}</td>
                <td>{producto.Medida_Prod}</td>
                <td>{producto.Precio_Bruto_Prod}</td>
                <td>{producto.Precio_Neto_Unidad_Prod}</td>
                <td>{producto.Iva_Prod}</td>
                <td>{producto.Porcentaje_Ganancia}</td>
                <td>{producto.Unidades_Totales_Prod}</td>
                <td>{producto.Estado_Prod}</td>
                <td>{proveedores.find(proveedor => proveedor.id === producto.FK_Id_Proveedor)?.nombre || "N/A"}</td>
                <td>
                  <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ProductosList;
