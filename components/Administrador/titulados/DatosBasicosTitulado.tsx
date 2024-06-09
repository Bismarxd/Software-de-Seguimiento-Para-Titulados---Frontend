import React, {useState, useEffect} from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { FaRegEdit } from 'react-icons/fa'
import ModalEditarDatosBasicos from "./DatosBasicos/ModalEditarDatosBasicos";

const DatosBasicosTitulado = ({datos} : any) => {

    const [modalDatosBasicos, setModalDatosBasicos] = useState(false)
    console.log(modalDatosBasicos)

    const handleEditar = () => {
        setModalDatosBasicos(true)
    }

  return (
    <>
      <Card className="h-full w-full z-0 ml-auto" placeholder >
        <table className="w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    <th className='flex justify-between'>
                        <Typography placeholder className='text-3xl font-bold opacity-85'>Datos Básicos</Typography>
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
                    { label: 'NOMBRE:', value: datos?.nombre },
                    { label: 'APELLIDO PATERNO:', value: datos?.apellidoPaterno },
                    { label: 'APELLIDO MATERNO:', value: datos?.apellidoMaterno },
                    { label: 'CARNET DE IDENTIDAD:', value: datos?.ci },
                    { label: 'FECHA DE NACIMIENTO:', value: datos?.fechaNacimiento },
                    { label: 'CELULAR:', value: datos?.celular },
                    { label: 'SEXO:', value: datos?.sexo },
                    { label: 'DIRECCIÓN:', value: datos?.direccion },
                    { label: 'EMAIL:', value: datos?.email},
                
                    
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
            modalDatosBasicos &&
            <ModalEditarDatosBasicos
                setModalDatosBasicos={setModalDatosBasicos}
                datos={datos}
            />
        }
    </>
  )
}
export default DatosBasicosTitulado
