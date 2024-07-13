import React, {useState, useEffect} from 'react'
import Alert from '@mui/material/Alert';
import { Input,Select, Option, Typography } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { toast } from 'react-toastify'

const sigueTrabajando = [
    {
      value: "",
      label: ""
    },
    {
      value: "si",
      label: "Si"
    },
    {
      value: "no",
      label: "No"
    }
  ] 

type Props = {
    setModalEditar: React.Dispatch<React.SetStateAction<boolean>>,
    actividad: any
  }

const ModalEditarActividades = (props: Props) => {
    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')

    const [estaTrabajando, setEstaTrabajando] = useState('');
    const [estadosLaboral, setEstadosLaboral] = useState([])

    const [datosEditados, setDatosEditados] = useState(props.actividad)

    useEffect(() => {
      

    },[])

    const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
        e.preventDefault();
         //Verificar si algún campo está vacío
         if (datosEditados.institucionTrabajo === '' && datosEditados.cargoOTareaTrabajo === '' && datosEditados.estaTrabajando === '') {
            setAlerta(true);
            setAlertaMensaje('Hay Campos Vacios');
            setTimeout(() => {
                setAlerta(false)
            }, 5000)
            return; // Detener la función si hay campos vacíos
        }

        const user = localStorage.getItem('userId');
        // Agregar el usuario a los datos editados
        const datosEditadosConUsuario = {
            ...datosEditados,
            adminId: user // Asegúrate de tener un identificador válido del usuario
        };
        axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/editar_laboral_titulado/${datosEditados.actividadLaboralId
        }`, datosEditadosConUsuario)
        .then(result => {
            if (result.data.status) {
              
              props.setModalEditar(false)  
              toast.info('Actividad Laboral Editada Correctamente', {
                autoClose: 2000,
                onClose: () => window.location.reload()
              })           
            } else {
              console.log(result.data.Error)
              
            }
        }).catch(err => console.log(err))
    }
  return (
    <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-[#00000080] flex items-center justify-center z-50'>
    <div className='p-8 rounded-2xl bg-white relative'>
       <span
           className='absolute top-3 right-3 cursor-pointer text-stone-900 text-3xl'
           onClick={() => props.setModalEditar(false)}
       >X</span>
       <h1 className='text-slate-900 mb-10 text-2xl text-center'>Editar Actividad Laboral</h1>
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
            <div className='grid grid-cols-3 gap-x-20 gap-y-3'>
               <Input 
                   crossOrigin={'anonimus'}
                   label="Institución u Empresa"
                   placeholder={props.actividad.institucionTrabajo}
                   onChange={e => setDatosEditados({...datosEditados, 'institucionTrabajo': e.target.value})}     
                   name='institucionTrabajo'
               />
               <Input 
                   crossOrigin={'anonimus'}
                   label="Año de Ingreso"
                   type='number'
                   placeholder={props.actividad.aIngresoTrabajo}
                   onChange={e => setDatosEditados({...datosEditados, 'aIngresoTrabajo': e.target.value})}     
                   name='aIngresoTrabajo'
               />

             
               <Input 
                   crossOrigin={'anonimus'}
                   label="Cargo o Tarea"
                   placeholder={props.actividad.cargoOTareaTrabajo}
                   onChange={e => setDatosEditados({...datosEditados, 'cargoOTareaTrabajo': e.target.value})}     
                   name='cargoOTareaTrabajo'
               />
               <Select
                   placeholder="Seleccione una opcion"
                   onChange={value => setDatosEditados({...datosEditados, 'estaTrabajando': value})}  
                   value={estaTrabajando}    
                   name='estaTrabajando'             
               >
                   {sigueTrabajando.map(item => (
                       <Option key={item.value} value={item.value}>
                           {item.label}
                       </Option>
                   ))}
               </Select>

               {datosEditados.estaTrabajando === 'no' &&
                   <Input 
                   crossOrigin={'anonimus'}
                   label="Año de Finalisación"
                   placeholder={props.actividad.aFinalisacionTrabajo}
                   onChange={e => setDatosEditados({...datosEditados, 'aFinalisacionTrabajo': e.target.value})}     
                   name='aFinalisacionTrabajo'
               />
               }

                <div className='flex gap-3'>
                    <Input 
                        crossOrigin={'anonimus'}
                        label="Tiempo de Trabajo"
                        type='number'
                        placeholder={props.actividad.duracionTrabajo}
                        onChange={e => setDatosEditados({...datosEditados, 'duracionTrabajo': e.target.value})}     
                        name='duracionTrabajo'
                    />
                    <Typography placeholder className="">años</Typography>
                </div>
                

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

export default ModalEditarActividades