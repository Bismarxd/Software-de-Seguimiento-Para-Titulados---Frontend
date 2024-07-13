import React, {useState, useEffect} from 'react'
import Alert from '@mui/material/Alert';
import { Input,Select, Option, Typography } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { toast } from 'react-toastify'

type Props = {
    setModalAdd: React.Dispatch<React.SetStateAction<boolean>>,
    id: any
  }

const ModalAddInvestigacion = (props:Props) => {

    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')

    const [publicacion, setPublicacion] = useState([{
        value: '',
        label: ''
      }])

    const [datos, setDatos] = useState({
        aInvestigacion: '',
        temaInvestigacion: '',
        institucionInvestigacion: '',
        publicacionId: ''

    })

    const handleSelectChangeTipo = (value: any) => {
        setDatos({ ...datos, publicacionId: value });
        };

    useEffect(() => {

        //traer las publicaciones
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/obtener_publicaciones`)
        .then(result => {
        if (result.data.status) {
            const datosPublicacion = [ {value: "", label: ""}, ...result.data.result.map((item: any) => ({
                value: item.id,
                label: item.tipoPublicacion
            }))]
            setPublicacion(datosPublicacion)
            
        }else {
            alert(result.data.Error)
        }
        }).catch(err => console.log(err))
    
       
    
      }, [])

      const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
        e.preventDefault();
         // Verificar si algún campo está vacío
        const camposVacios = Object.entries(datos).filter(([key, value]) => value === "");
        
        if (camposVacios.length > 0) {
            setAlerta(true);
            setAlertaMensaje(`Los siguientes campos están vacíos: ${camposVacios.map(([key]) => key).join(", ")}`);
            setTimeout(() => {
                setAlerta(false)
            }, 5000)
            return; // Detener la función si hay campos vacíos
        }
        
    
        axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_investigaciones`, {...datos, 'tituladoId':props.id})
        .then(result => {
            if (result.data.status) {
              props.setModalAdd(false)  
              toast.success('Investigación Añadida Correctamente', {
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
                onClick={() => props.setModalAdd(false)}
            >X</span>
            <h1 className='text-slate-900 mb-10 text-2xl text-center'>Editar Producción Intelectual</h1>

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
                        label="Año de Investigación"
                        type='number'
                        onChange={e => setDatos({...datos, 'aInvestigacion': e.target.value})}     
                        name='aInvestigacion'
                    />
                     <Input 
                        crossOrigin={'anonimus'}
                        label="Tema de Investigación"
                        onChange={e => setDatos({...datos, 'temaInvestigacion': e.target.value})}     
                        name='temaInvestigacion'
                    />

                    <Input 
                        crossOrigin={'anonimus'}
                        label="Institución"
                        onChange={e => setDatos({...datos, 'institucionInvestigacion': e.target.value})}     
                        name='institucionInvestigacion'
                    />

                    <div>
                        <Typography placeholder>Tipo de Publicación</Typography>
                        <Select 
                        placeholder 
                        onChange={handleSelectChangeTipo}
                        name="publicacionId"  
                        >
                        {publicacion.map(item => {
                            return (
                            <Option key={item.value} value={item.value}>
                                {item.label}
                            </Option>
                            )
                        })}
                        </Select>
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

export default ModalAddInvestigacion