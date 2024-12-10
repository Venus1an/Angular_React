import {useState} from 'react';

function Producto()
 {

    const [precio, setPrecio] = useState(0);
    const [cant, setCant] = useState(0);
    const [total, setTotal] = useState(0);
    const [Medida_Prod, setMedida_Prod] = useState(0);
    const [Unidad_Medida_Prod, setUnidad_Medida_Prod] = useState('');
    const [Precio_Bruto_Prod, setPrecio_Bruto_Prod] = useState(0.0);
    const [Iva_Prod, setIva_Prod] = useState(0.0);
    const [Porcentaje_Ganancia, setPorcentaje_Ganancia] = useState(0.0);
    const [Precio_Neto_Unidad_Prod, setPrecio_Neto_Unidad_Prod] = useState(0.0); // Calculated field
    const [Unidades_Totales_Prod, setUnidades_Totales_Prod] = useState(0);
    const [Marca_Prod, setMarca_Prod] = useState('');
    const [Estado_Prod, setEstado_Prod] = useState('');
    const [Id_Proveedor, setId_Proveedor] = useState(0);
    const [Id_Subcategoria, setIdSubcategoria] = useState(0);
    
        const [usuarios, setUsuarios] = useState([]);
        const [nombre, setNombre] = useState();
        
        const [suma, setSuma] = useState(0);
   
        



         function Calculation()
        {

            usuarios.push({ nombre, cant, precio, suma});

            const total = usuarios.reduce((total,usuario)=>{
                total += Number(usuario.suma)
                return total
            },0);

               setTotal (total);
        setNombre('');
        setCant('');
        setPrecio('');
        setSuma('');
        }


        const handleCambioPrecio = (e) => {
            const nuevoPrecio = parseFloat(e.target.value);
            if (!isNaN(nuevoPrecio)) {
              setPrecio(nuevoPrecio);
              calcularTotal(nuevoPrecio, cant);
            }
            };
            

            
             const handleCambioCantidad = (e) => {
             const nuevaCantidad = parseInt(e.target.value);
             if  (!isNaN(nuevaCantidad)) {
                setCant(nuevaCantidad);
                calcularTotal(precio, nuevaCantidad);
                }
                };
                  
             const calcularTotal = (precio, cant) => {
            const nuevoTotal = precio * cant;
            setSuma(nuevoTotal);
             };

                function refreshPage(){
                window.location.reload();

                const precioNeto = precioBrutoProd * (1 + ivaProd/100) * (1 + porcentajeGanancia/100);
               setPrecioNetoUnidadProd(precioNeto);
        }


       return (
             <div class= "container-fluid bg-2 text-center">
                  <h1>Inventario</h1>
                  <br/>
             <div class="row">


                <div class="col-sm-8">

                <table class="table table-bordered">
                             <h3 align="left"> Agregar Productos </h3>
                             <tr>
                                  <th>Nombre</th>
                                  <th>Precio</th>
                                  <th>Cantidad</th>
                                  <th>Amount</th>
                                  <th>Opcion</th>        
                             </tr>
                             <tr>

                             <td>
                                     
                                     <input type="text" class="form-control" placeholder="nombre del item" value={nombre}
                                          onChange = {(event) =>
                                          {
                                              setNombre(event.target.value);
                                          }}
                                          
                                          />
                            </td>
                            <td>
                            <input type="text" class="form-control"placeholder="ingresa el precio" value={precio}
                                  onChange={handleCambioPrecio}
                            />
                            </td>
                            <td>
                            <input type="number" class="form-control" placeholder= "Ingresa Cantidad"
                                         value = {cant}
                                         onChange = {handleCambioCantidad}
                            />
                            </td>
                            <td>
                                     <input type="text" value={suma} class="form-control"  placeholder="Ingresa el total" id="costo_total" name="costo_total" disabled/>
                            </td>
                            <td>

                                     <button class="btn btn-success" type="submit" onClick={Calculation}>Add</button>
                            </td>
                            </tr>
                </table>
                <h3 align="left"> Productos</h3>
                <table class="table table-bordered">

                              <thread>
                                <tr>
                                    <th>Nombre del item</th>
                                   
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Amount</th>

                                </tr>
                              </thread>

                              <tbody>
                              {usuarios.map((row,index)=>(
                <tr key={index}>
                    <td>{row  .name}</td>
                    <td>{row  .price}</td>


                    <td>{row  .cant}</td>
                    <td>{row  .suma}</td>

                </tr>
                ))}
                </tbody>
                         </table>
                </div>

                <div class="col-sm-4">

                         <div class="form-group" align="left">
                                <h3>Total</h3>

                        <input type="text" class="form-control" placeholder='Ingresa el total' required disabled
                         value={total}/>
                         <br/>
                         <button type="button" class="btn btn-success" onClick={refreshPage}><span>Complete</span> </button>
                    </div>
                    </div>
    
    </div>

              </div>
            );

             
  };

export default Producto;


  
  
  
  
 /*import React, { useEffect, useState } from 'react';
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
                                {Productos.map((Producto, Id_Producto) => (    /*might be wrong
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
                                        <td>${new Intl.NumberFormat('es-mx').format(Producto.Costo_Prod)}</td>
                                        <td>
                                            <button className = 'btn btn-warning'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-danger'>
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                        </td>
                                    

 

                                        
                                    </tr> /*might be wrong*/
                                )
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>



    )


export default Producto;*/
