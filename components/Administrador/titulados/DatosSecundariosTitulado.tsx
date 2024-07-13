import React, {useState} from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { FaRegEdit } from 'react-icons/fa'
import ModalEditarDatosSecundarios from './DatosSecundrios/ModalEditarDatosSecundarios';

const ModalDatosSecundariosTitulado = ({datos}: any) => {
    const [modalEditar, setModalEditar] = useState(false)

    const handleEditar = () => {
        setModalEditar(true)
    }

  return (
    <>
        <Card className="h-full w-full" placeholder >
        <table className="w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    <th className='flex justify-between'>
                        <Typography placeholder className='text-3xl font-bold opacity-85'>Datos Titulado</Typography>
                        <div 
                            className='hover:cursor-pointer'
                            data-tooltip-id='my-tooltip'
                            data-tooltip-content="Editar"
                            onClick={() => handleEditar()}
                        >
                            <FaRegEdit 
                                className='text-blue-600 text-xl m-4'
                            />
                
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className=''>
                {[
                    { label: 'AÑO DE INGRESO:', value: datos?.aIngreso },
                    { label: 'AÑO DE EGRESO:', value: datos?.aEgreso },
                    { label: 'AÑO DE TITULACIÓN:', value: datos?.aTitulacion },
                    { label: 'AÑOS DE EXPERIENCIA LABORAL:', value: datos?.aExperienciaLaboral + " " + "años" },
                    { label: 'MODALIDAD DE TITULACIÓN:', value: datos?.tituloModalidadTitulacion
                },
                    { label: 'GRADO ACADEMICO:', value: datos?.tituloGradoAcademico},
                    { label: 'FORMA DE TRABAJO:', value: datos?.tituloFormaTrabajo
                },
                    { label: 'ÁREA DE TRABAJO:', value: datos?.tituloAreaTrabajo
                },
                
                    
                ].map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 bg-opacity-10' : 'bg-gray-600  bg-opacity-10'}>
                        <th className='p-2 text-left'>
                            <Typography placeholder>
                                {item.label}
                            </Typography>
                        </th>
                        <td className='p-2 space-x-10'>
                            <Typography placeholder>
                                {item.value}
                            </Typography>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
        </Card>
        {
            modalEditar && 
            <ModalEditarDatosSecundarios
                setModalEditar={setModalEditar}
                datos={datos}
            />
        }
    </>
   
  )
}

export default ModalDatosSecundariosTitulado