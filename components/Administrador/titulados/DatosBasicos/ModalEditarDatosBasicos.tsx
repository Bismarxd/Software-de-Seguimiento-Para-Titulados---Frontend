import React, {useState, useEffect} from 'react'
import Alert from '@mui/material/Alert';
import { genero } from '@/data/registroDatos';
import { Input,Select, Option, Typography } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify'
import axios from 'axios';

interface PropsDatos {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    email: string,
    ci: string,
    direccion: string,
    fechaNacimiento: string,
    celular: string,
    sexo: string
  }

type Props = {
    setModalDatosBasicos: React.Dispatch<React.SetStateAction<boolean>>,
    datos : PropsDatos
}

const ModalEditarDatosBasicos = ({setModalDatosBasicos, datos} : Props) => {
    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')

    const [datosEditados, setDatosEditados] = useState(datos)

    const handleSelectChange = (value: string) => {
        setDatosEditados({ ...datosEditados, sexo: value });
      };

      console.log(datosEditados)

    const handleClick = (e) => {
        e.preventDefault()

        axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/editar_datos_basicos/${datosEditados.personaId}`, datosEditados)
        .then(result => {
            if(result.data.status) {
                setModalDatosBasicos(false)  
                toast.info('Datos Editado(s) Correctamente', {
                  autoClose: 2000,
                  onClose: () => window.location.reload()
                })   

            }
        })
    }

  return (
    <div className='w-[100%] h-[100%] absolute top-0 left-0 bg-[#00000080] flex items-center justify-center z-50'>
        <div className='p-8 rounded-2xl bg-white relative'>
            <span
                className='absolute top-3 right-3 cursor-pointer text-stone-900 text-3xl'
                onClick={() => setModalDatosBasicos(false)}
                >X
            </span>
            <h1 className='text-slate-900 mb-10 text-2xl text-center'>Editar Datos Basicos</h1>
            <form 
                className=' text-slate-800'

            >  
            {alerta && 
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error">
                    {alertaMensaje}
                    </Alert>
                </Stack>
            } 
            <div className='grid grid-cols-3 gap-x-20 gap-y-5'>
                <Input 
                crossOrigin={'anonimus'}
                label="Nombre"
                placeholder={datos.nombre}
                onChange={e => setDatosEditados({...datosEditados, 'nombre': e.target.value})}     
                name='nombre'
                />
                <Input 
                crossOrigin={'anonimus'}
                label="Apellido Paterno"
                placeholder={datos.apellidoPaterno}
                onChange={e => setDatosEditados({...datosEditados, 'apellidoPaterno': e.target.value})}     
                name='apellidoPaterno'
                />
                 <Input 
                crossOrigin={'anonimus'}
                label="Apellido Materno"
                placeholder={datos.apellidoMaterno}
                onChange={e => setDatosEditados({...datosEditados, 'apellidoMaterno': e.target.value})}     
                name='apellidoMaterno'
                />
                 <Input 
                crossOrigin={'anonimus'}
                label="Email"
                placeholder={datos.email}
                onChange={e => setDatosEditados({...datosEditados, 'email': e.target.value})}     
                name='email'
                />
                 <Input 
                crossOrigin={'anonimus'}
                label="Cedula de Identidad"
                placeholder={datos.ci}
                onChange={e => setDatosEditados({...datosEditados, 'ci': e.target.value})}     
                name='ci'
                />
                 <Input 
                crossOrigin={'anonimus'}
                label="Dirección"
                placeholder={datos.direccion}
                onChange={e => setDatosEditados({...datosEditados, 'direccion': e.target.value})}     
                name='direccion'
                />
                 <Input 
                crossOrigin={'anonimus'}
                label="Fecha de Nacimiento"
                type='date'
                onChange={e => setDatosEditados({...datosEditados, 'fechaNacimiento': e.target.value})}     
                name='fechaNacimiento'
                />
                 <Input 
                crossOrigin={'anonimus'}
                label="Celular"
                type='number'
                placeholder={datos.celular}
                onChange={e => setDatosEditados({...datosEditados, 'celular': e.target.value})}     
                name='celular'
                />
                <Select 
                    placeholder className='w-[150px]'                                      
                    onChange={(e) => handleSelectChange(e)}
                >
                        {genero.map(item => (
                            <Option key={item.id} value={item.value}>
                                {item.nombre}
                            </Option>
                        ))}
                </Select>
            </div>
                <button 
                    className='w-[100%] p-3 rounded bg-sky-600 text-white font-semibold cursor-pointer hover:bg-sky-400 uppercase m-4 text-lg'
                    onClick={handleClick}
                    >
                    Aceptar
                </button>
            
            </form>
        </div>
    </div>
  )
}

export default ModalEditarDatosBasicos