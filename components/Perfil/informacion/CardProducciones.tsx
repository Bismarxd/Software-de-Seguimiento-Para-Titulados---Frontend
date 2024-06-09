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
import ModalProduccionIntelectualEditar from '@/components/Administrador/titulados/ProduccionesIntelectuales/ModalProduccionIntelectualEditar';
import ModalVer from '@/components/Administrador/titulados/ProduccionesIntelectuales/ModalVer';

type PropsProduccionIntelectual = {
    id: "",
    aProduccion: "",
    temaProduccion: "",
    institucionProduccion: "",
    publicacionId: "",
    formaTrabajoProduccionId: "",
    tituladoId: "",
}

type Props = {
    produccionesIntelectuales: [],

}

const columnas = ["Año de la Producción", "Tema", "Institución", "Tipo de Publicación", "Forma de Trabajo", "Acciones"];

const CardProducciones = ({produccionesIntelectuales}: PropsProduccionIntelectual) => {
    console.log(produccionesIntelectuales)
    const [modalEditar, setModalEditar] = useState(false)
    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [produccion, setProduccion] = useState('')

    const handleVer = (prod :any) => {
      setModalVer(true)
      setProduccion(prod)
  }

    const handleEditar = (prod: any) => {
      setModalEditar(true)
      setProduccion(prod)
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
                    toast.error('Produccion Intelectual Eliminado Correctamente', {                     
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
                {produccionesIntelectuales.map((produccion, index) => {
                  const isLast = index === produccionesIntelectuales.length - 1;
                  const classes = isLast? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={produccion.id}>
                        <td className={classes}>
                            <Typography
                            placeholder
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {produccion.aProduccion}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                            placeholder
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {produccion.temaProduccion}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                            placeholder
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {produccion.institucionProduccion}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                            placeholder
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {produccion.tipoPublicacion}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                            placeholder
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {produccion.nombreFormaTrabajoProduccion}
                            </Typography>
                        </td>

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
                  )
                })}
              </tbody>
            </table>
            {modalVer && 
              <ModalVer
                  openDrawer={openDrawer}
                  closeDrawer={closeDrawer}
                  modalVer={modalVer}
                  produccion = {produccion}
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
    </>
  )
}

export default CardProducciones