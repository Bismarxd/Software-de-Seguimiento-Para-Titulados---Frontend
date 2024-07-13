import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Input from '@/components/Diseño/Input'
import { Select, Option } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'

type Props = {
    setAbrirModal: React.Dispatch<React.SetStateAction<boolean>>,
    id: number,
    adminId: number
}

const EditarAdmin = (props: Props) => {

    const id = props.id
    const router = useRouter()
    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')


    const [administrador, setAdministrador] = useState({
        tituloCargo: "",
        descripcionCargo: "",
        tipoAdministrador: "",
       
    })

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/administradores/obtener_administrador/`+id)
        .then(result => {
          setAdministrador({
            ...administrador,
            tituloCargo: result.data.result[0].tituloCargo,
            descripcionCargo: result.data.result[0].descripcionCargo,
            tipoAdministrador: result.data.result[0].tipoAdministrador,

        })
            

        }).catch(err => console.log(err))
    }, [])

    
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setAdministrador({...administrador, [name]: value})
    
      }

      const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
         // Verificar si algún campo está vacío
      const camposVacios = Object.entries(administrador).filter(([key, value]) => value === "");
    
      if (camposVacios.length > 0) {
          setAlerta(true);
          setAlertaMensaje(`Los siguientes campos están vacíos: ${camposVacios.map(([key]) => key).join(", ")}`);
          setTimeout(() => {
            setAlerta(false)
          }, 5000)
          return; // Detener la función si hay campos vacíos
      }
        axios.put(`${process.env.NEXT_PUBLIC_URL}/administradores/editar_cargo_administrador/${id}`, {
          adminId: props.adminId, // Incluye adminId en el cuerpo de la solicitud
          ...administrador   // Desestructura el objeto administrador para incluir sus propiedades
      })
        .then(result => {
            if (result.data.status) {
              
              props.setAbrirModal(false)  
              toast.info('Administrador Editado Correctamente', {
                autoClose: 2000,
                onClose: () => window.location.reload()
              })           
            } else {
              console.log(result.data.Error)
              
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className='w-[100%] h-[100%] absolute top-0 left-0 bg-[#00000080] flex items-center justify-center z-50'>
        <div className='p-8 rounded-2xl bg-white relative'>
        <span
          className='absolute top-3 right-3 cursor-pointer text-stone-900 text-3xl'
          onClick={() => props.setAbrirModal(false)}
        >X</span>
        <h1 className='text-slate-900 mb-10 text-2xl text-center'>Editar Tipo de Administrador</h1>

        <form 
            className=' text-slate-800'
            //onSubmit={handleSubmit}
        >
            {alerta && 
                <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                    {alertaMensaje}
                </Alert>
                </Stack>
            }
            <div className='grid grid-cols-3 gap-x-20 gap-y-3'>
                <Input
                    placeholder=''
                    titulo='Titulo del Cargo'
                    onChange={handleChange}
                    value={administrador['tituloCargo']}
                    type='text'
                    name='tituloCargo'                      
                />
                <Input
                    placeholder=''
                    titulo='Descripción del Cargo'
                    onChange={handleChange}
                    value={administrador['descripcionCargo']}
                    type='text'
                    name='descripcionCargo'                      
                />

                <Select
                    placeholder
                    label="Tipo de Administrador"
                    onChange={(e: any) => setAdministrador({...administrador, 'tipoAdministrador': e})}
                    name="gradoAcademicoPostGrado"
                    // onChange={handleChange}
                    // titulo='Grado Academico'
                    // type='text'
                    // value={gradoAcademico}
                    // name='gradoAcademicoPostGrado'
                    // placeholder='Ej: Maestría, Doctorado'
                >
                    <Option value='0'>Administrador Principal</Option>
                    <Option value='1'>Administrador Normal</Option>
                </Select>
            </div>

            <button 
                className='w-[100%] p-3 rounded bg-teal-900 text-white font-semibold cursor-pointer hover:bg-teal-700 uppercase m-4'
                onClick={handleClick}
            >
                Aceptar
            </button>
        
        </form>   

        </div>
    </div>
  )
}

export default EditarAdmin