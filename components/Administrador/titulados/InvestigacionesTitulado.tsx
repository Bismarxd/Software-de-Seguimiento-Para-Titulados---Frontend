import React, {useState, useEffect} from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { FaRegTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import { IoIosAdd } from "react-icons/io";
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';
import ModalEditarInvestigacion from './investigaciones/ModalEditarInvestigacion';
import ModalAddInvestigacion from './investigaciones/ModalAddInvestigacion';
import ModalVerINvestigacion from './investigaciones/ModalVerINvestigacion';

const InvestigacionesTitulado = ({investigaciones}) => {
    const router = useRouter();
    const { url } = router.query;

    const [modalEditar, setModalEditar] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)

    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [investigacion, setInvestigacion] = useState('')

    const handleVer = (investigacion :any) => {
        setModalVer(true)
        setInvestigacion(investigacion)
    }

    const handleAdd = () => {
        setModalAdd(true)
    }

    const handleEditar = (investigacion: any) => {
        setModalEditar(true)
        setInvestigacion(investigacion)
    }

    const handleDelete = (id :any) => {
        console.log(id)
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
                axios.delete(`${process.env.NEXT_PUBLIC_URL}/titulado/eliminar_investigacion/${id}`)
                .then(result => {
                    if (result.data.status) {
                        toast.error('Estudio PostGrado Eliminado Correctamente', {                     
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
                <h2 className='font-serif text-xl m-5 text-stone-500 uppercase'>Investigaciones</h2>
                <div 
                    className='hover:cursor-pointer'
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content="Editar"
                    onClick={() => handleAdd()}
                >
                    <IoIosAdd 
                        className='text-green-700 text-3xl m-4'
                    />
            
                </div>
                <Tooltip id='my-tooltip'/> 
        </div>
        <Card className="h-full w-full" placeholder >
            <table className="w-full min-w-max table-auto text-left">
                <tbody>
                <tr>
                    <th className='p-5'><Typography placeholder >Año</Typography></th>
                    <th className='p-5'><Typography placeholder >Tema</Typography></th>
                    <th className='p-5'><Typography placeholder >Institución</Typography></th>
                    <th className='p-5'><Typography placeholder >Tipo de <br/> Publicación</Typography></th>              
                    <th className='p-5'><Typography placeholder >Acciones</Typography></th>               
                    
                </tr>
                {investigaciones.map((investigacion, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-stone-200' : 'bg-slate-100'}>
                        <td className='p-4 m-3'><Typography placeholder >{investigacion.aInvestigacion}</Typography></td>
                        <td className='p-4 m-3'><Typography placeholder >{investigacion.temaInvestigacion}</Typography></td>
                        <td className='p-4 m-3'><Typography placeholder >{investigacion.institucionInvestigacion}</Typography></td>
                        <td className='p-4 m-3'><Typography placeholder >{investigacion.tipoPublicacion}</Typography></td>
                        <td className='p-4 m-3'>
                            <div className="flex gap-5">
                                <div 
                                    className='hover:cursor-pointer'
                                    data-tooltip-id='my-tooltip'
                                    data-tooltip-content="Editar"
                                    onClick={() => handleEditar(investigacion)}
                                >
                                    <FaRegEdit 
                                        className='text-blue-600 text-xl m-4'
                                    />
                                    
                                </div>
                            
                            
                                <div 
                                    className="hover:cursor-pointer" 
                                    data-tooltip-id='my-tooltip'
                                    data-tooltip-content="Eliminar"
                                    onClick={() => handleDelete(investigacion.investigacionId)}
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
                                    onClick={() => handleVer(investigacion)}
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

            {modalVer && 
            <ModalVerINvestigacion
                closeDrawer={closeDrawer}
                modalVer={modalVer}
                investigacion = {investigacion}
            />

        }

            {
            modalAdd && 
            <ModalAddInvestigacion
                setModalAdd={setModalAdd}
                id={url}
            />
        }

            {
            modalEditar &&
            <ModalEditarInvestigacion
                setModalEditar={setModalEditar}
                investigacion={investigacion}
            />
        }
        </Card>
                           
    </div>
  )
}

export default InvestigacionesTitulado