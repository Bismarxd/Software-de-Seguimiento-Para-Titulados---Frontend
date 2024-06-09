import React, {useEffect, useState} from 'react'
import { genero } from '@/data/registroDatos';
import Dashboard from '@/components/Administrador/Dashboard'
import { Input, Switch, alert, Button, Select, Option } from "@material-tailwind/react";
import NavBar from '@/components/Administrador/NavBar';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Result } from 'postcss';

const configuracion = () => {

   const [administrador, setAdministrador] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    ci: '',
    fechaNacimiento: '',
    celular: '',
    sexo: '',
    direccion: '',
    personaId: '',
    usuarioId: ''
   })

   

    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')
    const [mostrarDatosUsuario, setMostrarDatosUsuario] = useState(false)
    const [datosEditados, setDatosEditados] = useState(administrador)
    const [password, setPassword] = useState({
        password: '',
        repeatPassword: ''
    })
    

    const handleSwitchChange = (e: any) => {
        setMostrarDatosUsuario(e.target.checked);
      };

    useEffect(() => {
        const id = localStorage.getItem('userId')
        axios.get(`${process.env.NEXT_PUBLIC_URL}/administradores/obtener_admninistrador/${id}`)
       .then(result => {
            if(result.data.status){
                setAdministrador(result.data.result[0])
                setDatosEditados(result.data.result[0])
            }
       }).catch(err => console.log(err))
       

    },[])

    const handleSelectChange = (value: string) => {
        setDatosEditados({ ...datosEditados, sexo: value });
      };

      const handleEditarDatos = () => {
        axios.put(`${process.env.NEXT_PUBLIC_URL}/administradores/editar_datos_basicos_administardor/${datosEditados.personaId}`, datosEditados)
        .then(result => {
            if(result.data.status)
                {
                    toast.info('Datos Editado(s) Correctamente', {
                        autoClose: 2000,
                        onClose: () => window.location.reload()
                    })                  
                }else
                {
                   
                    console.log(result.data.Error)
                }
        }).catch(err => console.log(err));
      }

      const handlePassword = () => {
        axios.put(`${process.env.NEXT_PUBLIC_URL}/administradores/editar_password_administardor/${datosEditados.usuarioId}`, password)
        .then(result => {
            if(result.data.status)
                {
                    toast.info('Constraseña Editada Correctamente', {
                        autoClose: 2000,
                        onClose: () => window.location.reload()
                    })                  
                }else
                {
                    setAlerta(true)
                    setAlertaMensaje(result.data.Error)
                    setTimeout(() => {
                        setAlerta(false)
                    }, 3000);
                    return
                }
        }).catch(err => console.log(err));
      }

    console.log(datosEditados)
    
  return (
    <body className='bg-menuColor1'>
        <Dashboard>
        <NavBar titulo='Configuración'/>
            <form
                className='bg-white w-full h-[120%] m-8 rounded-xl p-5'
            >       
                <ToastContainer />       
                <label htmlFor="" className='text-zinc-600'>Configuracion de los datos basicos</label>
                <div>
                    <div className='m-5 grid md:grid-cols-2 gap-5 text-gray-800'>
                        <Input
                            crossOrigin="anonymous" 
                            label='Nombre(s)'
                            onChange={e => setDatosEditados({...datosEditados, nombre: e.target.value})}
                            placeholder={administrador.nombre}
                            className='text-slate-400 placeholder:text-slate-500'
                            
                        />
                        <Input
                            crossOrigin="anonymous" 
                            label='Apellido Paterno'
                            onChange={e => setDatosEditados({...datosEditados, apellidoPaterno: e.target.value})}
                            placeholder={administrador.apellidoPaterno}
                            className='text-slate-400 placeholder:text-slate-500'
                            
                        />
                        <Input
                            crossOrigin="anonymous" 
                            label='Apellido Materno'
                            onChange={e => setDatosEditados({...datosEditados, apellidoMaterno: e.target.value})}
                            placeholder={administrador.apellidoMaterno}
                            className='text-slate-400 placeholder:text-slate-500'
                            
                        />
                        <Input
                            crossOrigin="anonymous" 
                            label='Carnet de Identidad'
                            placeholder={administrador.ci}
                            onChange={e => setDatosEditados({...datosEditados, ci: e.target.value})}
                            type='number'
                            className='text-slate-400 placeholder:text-slate-500'
                            
                        />
                        <Input
                            crossOrigin="anonymous" 
                            label='Fecha de Nacimiento'
                            placeholder={administrador.fechaNacimiento}
                            onChange={e => setDatosEditados({...datosEditados, fechaNacimiento: e.target.value})}
                            type='date'
                            className='text-slate-400 placeholder:text-slate-500'
                            
                        />
                        <Input
                            crossOrigin="anonymous" 
                            label='Celular'
                            placeholder={administrador.celular}
                            onChange={e => setDatosEditados({...datosEditados, celular: e.target.value})}
                            type='number'
                            className='text-slate-400 placeholder:text-slate-500'
                            
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
                        <Input
                            crossOrigin="anonymous" 
                            label='Dirección'
                            onChange={e => setDatosEditados({...datosEditados, direccion: e.target.value})}
                            placeholder={administrador.direccion}
                            className='text-slate-400'
                            
                        />
                    </div>
                    <Button 
                        placeholder 
                        className=' bg-teal-900 hover:bg-teal-600 text-white m-1 rounded-xl'
                        onClick={handleEditarDatos}
                    >
                    Guardar Configuración Datos
                    </Button>
                </div>
                

                <div className='flex gap-3'>
                    <label htmlFor="" className='text-zinc-600 m-5'>Cambiar Contraseña</label>
                    
                        <Switch 
                            color='blue'
                            crossOrigin="anonymous" 
                            checked={mostrarDatosUsuario} 
                            onChange={handleSwitchChange}  
                            className='ml-5 label:m-5'                              
                            label="(Habilitar para editar el usuario)"
                        />
                    
                    
                </div>
                
                {mostrarDatosUsuario && (
                    <>
                        {alerta && 
                            <Stack sx={{ width: '100%' }} spacing={2} className='mb-3'>
                                <Alert variant="filled" severity="error">
                                    {alertaMensaje}
                                </Alert>
                            </Stack>
                        }
                        <div className='m-5 grid grid-cols-3 gap-4 mt-3'>                        
                            <Input
                                crossOrigin="anonymous" 
                                label='Password'
                                variant="standard" 
                                onChange={e => setPassword({...password, password: e.target.value})}
                                type='password'                         
                                className=' placeholder:text-slate-500'
                            />
                            <Input
                                crossOrigin="anonymous" 
                                label='Repetir Password'
                                variant="standard" 
                                type='password'                         
                                className=' placeholder:text-slate-500'
                            />
                        </div>

                        <Button 
                            placeholder className=' bg-violet-950 hover:bg-violet-600 text-white m-1 rounded-xl'
                            onClick={handlePassword}
                        >
                            Guardar Contraseña
                        </Button>
                    </>
                    )}
               

            </form>
        </Dashboard>

    </body>

  )
}

export default configuracion