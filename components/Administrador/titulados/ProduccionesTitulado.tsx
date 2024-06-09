import React, {useEffect, useState} from 'react'
import { Card, Typography} from "@material-tailwind/react";
import { FaRegTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import ModalProduccionIntelectualEditar from './ProduccionesIntelectuales/ModalProduccionIntelectualEditar';
import axios from 'axios';
import ModalModalProduccionIntelectualAdd from './ProduccionesIntelectuales/ModalProduccionIntelectualAdd';
import { useRouter } from 'next/router';
import ModalVer from './ProduccionesIntelectuales/ModalVer';

type PropsProduccionesIntelectuales = {
    aProduccion: "",
    temaProduccion: "",
    institucionProduccion: "",
    tipoPublicacion: "",
    nombreFormaTrabajoProduccion: ""
}



const ProduccionesTitulado = ({produccionesIntelectuales} : PropsProduccionesIntelectuales) => {

    const router = useRouter();
    const { url } = router.query;

    const [modalEditar, setModalEditar] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)

    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [produccion, setProduccion] = useState('')

    const handleVer = (produccion :any) => {
        setModalVer(true)
        setProduccion(produccion)
    }

    const handleAdd = () => {
        setModalAdd(true)
    }

    const handleEditar = (produccion :any) => {
        setModalEditar(true)
        setProduccion(produccion)
    }

    const handleDelete = (id :any) => {
        Swal.fire({
            title: "Esta seguro?",
            text: "Esta acción es irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.NEXT_PUBLIC_URL}/titulado/eliminar_produccion/${id}`)
                .then(result => {
                    if (result.data.status) {
                        toast.error('Producción Intelectual Eliminada Correctamente', {                     
                                autoClose: 2000,
                                onClose: () => window.location.reload()
                            } 
                            )
                    } else {
                        console.log(result.data.Error);
                        
                    }
    
                }).catch(err => console.log(err))
            }
          });

        
    }
  return (
    <div className='m-3'>
                         <div className='flex justify-between'>
                                <h2 className='font-serif text-xl m-5 text-stone-500 uppercase'>Producciones Intelectuales</h2>
                                <div 
                                    className='hover:cursor-pointer'
                                    data-tooltip-id='my-tooltip'
                                    data-tooltip-content="Añadir"
                                    onClick={() => handleAdd()}
                                >
                                    <IoIosAdd 
                                        className='text-green-700 text-3xl m-4'
                                    />
                            
                                </div>
                            </div>
                            <Card className="h-full w-full" placeholder >
                                <table className="w-full min-w-max table-auto text-left">
                                    <tbody>
                                    <tr>
                                        <th className='p-5'><Typography placeholder >Año</Typography></th>
                                        <th className='p-5'><Typography placeholder >Tema</Typography></th>
                                        <th className='p-5'><Typography placeholder >Institución</Typography></th>
                                        <th className='p-5'><Typography placeholder >Tipo de <br/> Publicación</Typography></th>       
                                        <th className='p-5'><Typography placeholder >Forma de <br/> Trabajo</Typography></th>
                                        <th className='p-5'><Typography placeholder >Acciones</Typography></th>                         
                                        
                                    </tr>
                                    {produccionesIntelectuales.map((produccion : any, index: any) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-stone-200' : 'bg-slate-100'}>
                                            <td className='p-4 m-3'><Typography placeholder >{produccion.aProduccion}</Typography></td>
                                            <td className='p-4 m-3'><Typography placeholder >{produccion.temaProduccion}</Typography></td>
                                            <td className='p-4 m-3'><Typography placeholder >{produccion.institucionProduccion}</Typography></td>
                                            <td className='p-4 m-3'><Typography placeholder >{produccion.tipoPublicacion}</Typography></td>
                                            <td className='p-4 m-3'><Typography placeholder >{produccion.nombreFormaTrabajoProduccion}</Typography></td>
                                            <td className='p-4 m-3'>
                                                <div className="flex gap-5">
                                                    <div 
                                                        className='hover:cursor-pointer'
                                                        data-tooltip-id='my-tooltip'
                                                        data-tooltip-content="Editar"
                                                        onClick={() => handleEditar(produccion)}
                                                    >
                                                        <FaRegEdit 
                                                            className='text-blue-600 text-xl m-4'
                                                        />
                                                        
                                                    </div>
                                                
                                                
                                                    <div 
                                                        className="hover:cursor-pointer" 
                                                        data-tooltip-id='my-tooltip'
                                                        data-tooltip-content="Eliminar"
                                                        onClick={() => handleDelete(produccion.produccionId)}
                                                    >
                                                        <FaRegTrashAlt 
                                                            className='text-red-600 text-xl m-4'
                                                            
                                                        />
                                                    </div>
                                                    <Tooltip id='my-tooltip'/>
                                                    <div 
                                                        className='hover:cursor-pointer'
                                                        data-tooltip-id='my-tooltip'
                                                        data-tooltip-content="Ver"
                                                        onClick={() => handleVer(produccion)}
                                                    >
                                                        <FaEye 
                                                            className='text-green-600 text-xl m-4'
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {  
                                    modalVer &&
                                    <ModalVer
                                        openDrawer={openDrawer}
                                        closeDrawer={closeDrawer}
                                        modalVer={modalVer}
                                        produccion = {produccion}
                                    />
                                }

                                {
                                    modalAdd &&
                                    <ModalModalProduccionIntelectualAdd                                                 
                                        setModalAdd={setModalAdd}
                                        produccionesIntelectuales={produccionesIntelectuales}
                                        id={url}
                                        
                                    />
                                }
                                {
                                    modalEditar &&
                                    <ModalProduccionIntelectualEditar
                                        setModalEditar={setModalEditar}
                                        produccion={produccion}
                                    />
                                }
                            </Card>
                           
                        </div>
  )
}

export default ProduccionesTitulado