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
import ModalEditarInvestigacion from '@/components/Administrador/titulados/investigaciones/ModalEditarInvestigacion';
import ModalVerINvestigacion from '@/components/Administrador/titulados/investigaciones/ModalVerINvestigacion';

type PropsInvestigaciones = {
    id: "",
    aInvestigacion: "",
    temaInvestigacion: "",
    institucionInvestigacion: "",
    publicacionId: "",
    tituladoId: "",
}

type Props = {
    investigaciones: [],

}

const columnas = ["Año de la Investigación", "Tema", "Institución", "Tipo de Publicación", "Acciones"];

const CardInvestigaciones = ({investigaciones}: PropsInvestigaciones) => {
    console.log(investigaciones)

    const [modalEditar, setModalEditar] = useState(false)
    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [investigacion, setInvestigacion] = useState('')

    const handleVer = (investigacion :any) => {
      setModalVer(true)
      setInvestigacion(investigacion)
  }

    const handleEditar = (investigacion: any) => {
      setModalEditar(true)
      setInvestigacion(investigacion)
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
            axios.delete(`${process.env.NEXT_PUBLIC_URL}/titulado/eliminar_investigacion/${id}`)
            .then(result => {
                if (result.data.status) {
                    toast.error('Investigacion Eliminada Correctamente', {                     
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
                {investigaciones.map((inv, index) => {
                  const isLast = index === investigacion.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={inv.id}>
                        <td className={classes}>
                            <Typography
                                placeholder
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                {inv.aInvestigacion}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                                placeholder
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                {inv.temaInvestigacion}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                                placeholder
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                {inv.institucionInvestigacion}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                                placeholder
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                {inv.tipoPublicacion}
                            </Typography>
                        </td>
                        <td className='p-4 m-3'>
                                  <div className="flex gap-5">
                                      <div 
                                        className='hover:cursor-pointer'
                                        data-tooltip-id='my-tooltip'
                                        data-tooltip-content="Editar"
                                        onClick={() => handleEditar(inv)}
                                      >
                                          <FaRegEdit 
                                              className='text-blue-600 text-xl m-4'
                                          />
                                          
                                      </div>
                                  
                                  
                                      <div 
                                        className="hover:cursor-pointer" 
                                        data-tooltip-id='my-tooltip'
                                        data-tooltip-content="Eliminar"
                                        onClick={() => handleDelete(inv.investigacionId
                                        )}
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
                                        onClick={() => handleVer(inv)}
                                      >
                                          <FaEye 
                                              className='text-green-600 text-xl m-4'
                                          />
                                      </div>
                                  </div>
                              </td>
                    </tr>
                  )
                })}
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
              modalEditar &&
              <ModalEditarInvestigacion
                  setModalEditar={setModalEditar}
                  investigacion={investigacion}
              />
            }
        </Card>
    </>
  )
}

export default CardInvestigaciones