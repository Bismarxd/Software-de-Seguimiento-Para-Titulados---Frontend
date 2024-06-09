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
import ModalEditarActividades from '@/components/Administrador/titulados/ActividadesLaborales/ModalEditarActividades';
import ModalVerActividades from '@/components/Administrador/titulados/ActividadesLaborales/ModalVerActividades';

type PropsActividadLaboral = {
    id: "",
    aIngresoTrabajo: "",
    aFinalisacionTrabajo: "",
    estaTrabajando: "",
    cargoOTareaTrabajo: "",
    duracionTrabajo: "",
    institucionTrabajo:"",
    estadoActividadLaboralId: "",
    tituladoId: "",
}

type Props = {
    actividadLaboral: [],

}

const columnas = ["Empresa u Intitución", "Año de Ingreso", "Año de Finalisación", "Sigue Trabajando?", "Cargo o Tarea", "Duración", "Institución", "Estado", "Acciones"];


const CardActividad = ({actividadLaboral}: PropsActividadLaboral) => {

    const [modalEditar, setModalEditar] = useState(false)
    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [actividad, setActividad] = useState('')

    const handleVer = (trabajo :any) => {
      setModalVer(true)
      setActividad(trabajo)
  }

    const handleEditar = (trabajo: any) => {
      setModalEditar(true)
      setActividad(trabajo)
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
            axios.delete(`${process.env.NEXT_PUBLIC_URL}/titulado/eliminar_laborales/${id}`)
            .then(result => {
                if (result.data.status) {
                    toast.error('Actividad Laboral Eliminado Correctamente', {                     
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
                {actividadLaboral.map((trabajo, index) => {
                  const isLast = index === actividadLaboral.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      
                  return (
                    <tr key={trabajo.id}>

                      <td className={classes}>
                        <Typography
                          placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trabajo.institucionTrabajo}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trabajo.aIngresoTrabajo}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trabajo.aFinalisacionTrabajo}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trabajo.estaTrabajando}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trabajo.cargoOTareaTrabajo}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trabajo.duracionTrabajo}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trabajo.institucionTrabajo}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trabajo.estadoActividadLaboralId}
                        </Typography>
                      </td>
                      <td className='p-4 m-3'>
                                  <div className="flex gap-5">
                                      <div 
                                          className='hover:cursor-pointer'
                                          data-tooltip-id='my-tooltip'
                                          data-tooltip-content="Editar"
                                          onClick={() => handleEditar(trabajo)}
                                      >
                                          <FaRegEdit 
                                              className='text-blue-600 text-xl m-4'
                                          />
                                          
                                      </div>
                                  
                                  
                                      <div 
                                          className="hover:cursor-pointer" 
                                          data-tooltip-id='my-tooltip'
                                          data-tooltip-content="Eliminar"
                                          onClick={() => handleDelete(trabajo.actividadLaboralId)}
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
                                          onClick={() => handleVer(trabajo)}
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
              <ModalVerActividades
                  openDrawer={openDrawer}
                  closeDrawer={closeDrawer}
                  modalVer={modalVer}
                  actividad = {actividad}
              />

            }
            {
              modalEditar &&
              <ModalEditarActividades
                  setModalEditar={setModalEditar}
                  actividad={actividad}
              />
            }
          </Card>

           
        </>
             
                  
                
    
  )
}

export default CardActividad