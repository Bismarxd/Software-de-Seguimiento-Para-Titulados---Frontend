import React, {useState, useEffect} from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { FaRegTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import { IoIosAdd } from "react-icons/io";
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';
import ModalAddEstudioPostGrado from './EstudiosPostGrado/ModalAddEstudioPostGrado';
import ModalEditarEstudioPostGrado from './EstudiosPostGrado/ModalEditarEstudioPostGrado';
import ModalVerEstudioPostGrado from './EstudiosPostGrado/ModalVerEstudioPostGrado';

type PropsEstudioPostGrado = {
    id: number;
    aInicioPostGrado: string;
    tituloCursoPostGrado: string;
    modalidadGraduacionPostGrado: string;
    aGraduacionPostGrado: string;
    gradoAcademicoPostGrado: string;
    tipoEstudioPostGrado: string;
    tituloTrabajoPostGrado: string;
    titulo: string;
};
type PropsEstudiosTitulado = {
    estudiosPostGrado: PropsEstudioPostGrado[];
    setEstudiosPostGrado: (estudios: PropsEstudioPostGrado[]) => void;
};

const EstudiosTitulado: React.FC<PropsEstudiosTitulado> = ({ estudiosPostGrado, setEstudiosPostGrado }) => {

    const router = useRouter();
    const { url } = router.query;

    const [modalEditar, setModalEditar] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)

    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [estudio, setEstudio] = useState('')

    const handleVer = (estudio :any) => {
        setModalVer(true)
        setEstudio(estudio)
    }

    const handleAdd = () => {
        setModalAdd(true)
    }

    const handleEditar = (estudio: any) => {
        setModalEditar(true)
        setEstudio(estudio)
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
                const userId = localStorage.getItem('userId');
                axios.delete(`${process.env.NEXT_PUBLIC_URL}/titulado/eliminar_estudio/${id}`,{
                    data:{adminId:userId}
                })
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

    const handleDownload = (titulo: string) => {
        if (titulo) {
            const url = `${process.env.NEXT_PUBLIC_URL}/titulos/${titulo}`;
            window.open(url, '_blank');
        } else {
            console.log('Error: No hay título para abrir');
        }
    }


  return (
    <div className='m-3 '>
        <div className='flex justify-between'>
            <h2 className='font-serif text-xl text-stone-500 m-5 uppercase'>Estudios PostGrado</h2>
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
        </div>
        
        <Card className="h-full w-full overflow-scroll" placeholder >
            
            <table className=" min-w-max table-auto text-left">
                <tbody>
                    <tr className='p-2'>
                        <th><Typography placeholder >Año del <br/> Curso</Typography></th>
                        <th><Typography placeholder >Titulo <br/> del Curso</Typography></th>
                        
                        <th><Typography placeholder >Año de <br/> Graduación</Typography></th>
                        <th><Typography placeholder >Modalidad de <br/>Graduación</Typography></th>                             
                        <th><Typography placeholder >Grado <br/> Académico</Typography></th>
                        <th><Typography placeholder >Tipo de <br/>Estudio</Typography></th>
                        <th><Typography placeholder >Titulo <br/>Trabajo</Typography></th>
                        <th><Typography placeholder >Acciones</Typography></th>
                        
                    </tr>
                    {estudiosPostGrado.map((estudio, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-stone-200' : 'bg-slate-100'}>
                        <td ><Typography placeholder>{estudio.aInicioPostGrado}</Typography></td>
                        <td><Typography className='max-w-[50px] truncate' placeholder>{estudio.tituloCursoPostGrado}</Typography></td>                                          
                        <td><Typography placeholder>{estudio.aGraduacionPostGrado}</Typography></td>
                        <td><Typography placeholder>{estudio.modalidadGraduacionPostGrado}</Typography></td>
                        <td><Typography placeholder>{estudio.gradoAcademicoPostGrado}</Typography></td>
                        <td><Typography placeholder>{estudio.tipoEstudioPostGrado}</Typography></td>
                        <td><Typography className='max-w-[50px] truncate'  placeholder>{estudio.tituloTrabajoPostGrado}</Typography></td>
                        <td className='p-4 m-3'>
                            <div className="flex gap-5">
                                <div 
                                    className='hover:cursor-pointer'
                                    data-tooltip-id='my-tooltip'
                                    data-tooltip-content="Editar"
                                    onClick={() => handleEditar(estudio)}
                                >
                                    <FaRegEdit 
                                        className='text-blue-600 text-xl m-4'
                                    />
                                    
                                </div>
                            
                            
                                <div 
                                    className="hover:cursor-pointer" 
                                    data-tooltip-id='my-tooltip'
                                    data-tooltip-content="Eliminar"
                                    onClick={() => handleDelete(estudio.id)}
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
                                    onClick={() => handleVer(estudio)}
                                >
                                    <FaEye 
                                        className='text-green-600 text-xl m-4'
                                    />
                                </div>
                                
                                {estudio.titulo ?
                                 <div 
                                 className='hover:cursor-pointer flex items-center justify-center'
                                 data-tooltip-id='my-tooltip'
                                 data-tooltip-content="Ver Titulo del Estudio"
                                 
                                    >
                                        <button 
                                            className='bg-emerald-900 hover:bg-emerald-700 p-2 text-white text-xs rounded-xl'
                                            onClick={() => handleDownload(estudio.titulo)}
                                        >
                                                Ver Titulo
                                        </button>
                                    </div> : ''
                                
                                }
                               
                            </div>
                        </td>
                                            
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVer && 
                <ModalVerEstudioPostGrado
                    openDrawer={openDrawer}
                    closeDrawer={closeDrawer}
                    modalVer={modalVer}
                    estudio = {estudio}
                />

            }
            {
                modalAdd &&
                <ModalAddEstudioPostGrado
                    setModalAdd={setModalAdd}
                    id={url}
                />
            } 
            {
                modalEditar &&
                <ModalEditarEstudioPostGrado
                    setModalEditar={setModalEditar}
                    estudio={estudio}
                />
            }
        </Card>
                            
    </div>
  )
}

export default EstudiosTitulado