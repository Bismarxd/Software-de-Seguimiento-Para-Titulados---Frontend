import React, {useState} from 'react'
import { Tooltip } from 'react-tooltip';
import { FaRegTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import axios from 'axios';
import { List, ListItem, Card,  CardHeader,
    CardBody,
    CardFooter,
    Typography,ButtonGroup, Button, Collapse, Chip, ListItemSuffix
     } from "@material-tailwind/react";
import ModalEditarEstudioPostGrado from '@/components/Administrador/titulados/EstudiosPostGrado/ModalEditarEstudioPostGrado';
import ModalVerEstudioPostGrado from '@/components/Administrador/titulados/EstudiosPostGrado/ModalVerEstudioPostGrado';

type PropsEstudioPostGrado = {
    id: "",
    aInicioPostGrado: "",
    tituloCursoPostGrado: "",
    modalidadGraduacionPostGrado: "",
    aGraduacionPostGrado: "",
    gradoAcademicoPostGrado: "",
    tipoEstudioPostGrado:"",
    tituloTrabajoPostGrado: "",
}

type Props = {
    estudiosPostGrado: PropsEstudioPostGrado[],

}

const columnas = ["Titulo", "Año de Inicio", "Año de Graduación", "Modalidad de Graduación", "Grado Academico", "Tipo de Estudio", "Titulo de Trabajo Final", "Acciones"];

const CardEstudios = ({estudiosPostGrado}: Props) => {
    const [modalEditar, setModalEditar] = useState(false)
    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [estudio, setEstudio] = useState('')

    const handleVer = (estudio :any) => {
      setModalVer(true)
      setEstudio(estudio)
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
    
  return (
        <>
    <Card placeholder className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columnas.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                    placeholder
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {estudiosPostGrado.map((estudio, index) => {
            const isLast = index === estudiosPostGrado.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={estudio.id}>

                <td className={classes}>
                  <Typography
                    placeholder
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {estudio.tituloCursoPostGrado}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    placeholder
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {estudio.aInicioPostGrado}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    placeholder
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {estudio.aGraduacionPostGrado}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    placeholder
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {estudio.modalidadGraduacionPostGrado}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    placeholder
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {estudio.gradoAcademicoPostGrado}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    placeholder
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {estudio.tipoEstudioPostGrado}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    placeholder
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {estudio.tituloTrabajoPostGrado}
                  </Typography>
                </td>
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
                            </div>
                        </td>
              </tr>
            );
          })}
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
        modalEditar &&
        <ModalEditarEstudioPostGrado
            setModalEditar={setModalEditar}
            estudio={estudio}
        />
      }
    </Card>
           
        </>
             
                  
                
    
  )
}

export default CardEstudios