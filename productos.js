import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';


const Productos = () => {
    const url = 'http://api-productos.run';
    const [Producto, setProducto] = useState('');
    const [Id_Producto, setId_Producto] = useState('');
    const [Nombre_Prod, setNombre_Prod] = useState([]);
    const [Id_Subcategoria, setId_Subcategoria] = useState('');
    const [Medida_Prod, setMedida_Prod] = useState('');
    const [Unidad_Medida_Prod, setUnidad_Medida_Prod] = useState('');
    const [Costo_Prod, setCosto_Prod] = useState('');
    const [Iva_Prod, setIva_Prod] = useState('');
    const [Porcentaje_Ganancia, setPorcentaje_Ganancia] = useState('');
    const [Unidades_Totales_Prod, setUnidades_Totales_Prod] = useState('');
    const [Marca_Prod, setMarca_Prod] = useState('');
    const [Estado, setEstado] = useState('');
    const [Id_Proveedor, setId_Proveedor] = useState('');

    useEffect(() => {
        getProducto();
    }, []);

    const getId_Producto = async () => {
        const respuesta = await axios.get(url);
        setId_Producto(respuesta.data);
    }

    return (
        <div className="App">
            <div className='container-fluid'>
                <div className='row m-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#ModalProductos">
                                <i className='fa-solid fa-circle-plus'></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0-lg-12'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr><th>#</th><th>PRODUCTO</th><th>DESCRIPCION</th><th>PRECIO</th><th></th></tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {Productos.map((Producto, Id_Producto) => (    /*might be wrong*/
                                    <tr key={Producto.Id_Producto}>
                                        <td>{i + 1}</td>
                                        <td>{Producto.Nombre_Prod}</td>
                                        <td>{Producto.Costo_Prod}</td>
                                        <td>{Producto.Iva_Prod}</td>
                                        <td>{Producto.Porcentaje_Ganancia}</td>
                                        <td>{Producto.Unidades_Totales_Prod}</td>
                                        <td>{Producto.Marca_Prod}</td>
                                        <td>{Producto.Estado}</td>
                                        <td>{Producto.Id_Proveedor}</td>
                                        <td>{Producto.Id_Subcategoria}</td>
                                        <td>{Producto.Medida_Prod}</td>
                                        <td>{Producto.Unidad_Medida_Prod}</td>
                                        <td>{Producto.Id_Producto}</td>


                                        <td> </td>
                                    </tr> /*might be wrong*/
                                )
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Productos;