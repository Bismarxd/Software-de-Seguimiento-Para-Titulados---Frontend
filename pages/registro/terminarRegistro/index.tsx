import React, {useState} from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option
  } from "@material-tailwind/react";
import { toast } from 'react-toastify'
import { LuSendHorizonal } from "react-icons/lu";
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const index = () => {

    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')
    const [placeholderVisible, setPlaceholderVisible] = useState(false);

    const router = useRouter();
    const { email, id } = router.query;
    const [datosTitulado, setDatosTitulado] = useState({
        nombreUsuario: '',
        password: '',
        repeatPassword: ''
       
    })


    const handleClick =  () => {

        if(datosTitulado.password !== datosTitulado.repeatPassword)
            {
                setAlerta(true)
                setAlertaMensaje('Las contraseñas no conciden')
                setTimeout(() => {
                    setAlerta(false)
                }, 3000);
                return
            }
        
        if(datosTitulado.password === '')
            {
                setAlerta(true)
                setAlertaMensaje('La contraseña no puede estar vacia')
                setTimeout(() => {
                    setAlerta(false)
                }, 3000);
                return
            }

        

        axios.post(`${process.env.NEXT_PUBLIC_URL}/registro/add_usuario`,{
            password: datosTitulado.password,
            email: router.query.email,
            id: router.query.userId
        })
        .then(result => {
            if(result.data.status)
                {
                    
                    const userId = result.data.id; // Obtiene el ID del usuario agregado
                    toast.success('Cuenta Creada Exitosamente', {
                        autoClose: 2000,
                        onClose: () => router.push(`/registro/datosAdicionales?id=${userId}`)
                      })  
                }
                else {
                    setAlerta(true)
                    setAlertaMensaje(result.data.Error)
                    setTimeout(() => {
                        setAlerta(false)
                    }, 3000);
                }
        }).catch(err=>console.log(err))

        //router.push('/registro/datosAdicionales')
        
        
    };
  

  return (
    <div className='min-h-screen flex items-center justify-center'>
             <div className='bg-white w-[70%] p-8 rounded-lg'>
                <ToastContainer/>
                <Card color="transparent" shadow={false} placeholder>
                    <Typography variant="h4" color="blue-gray" placeholder>
                    Registro exitoso
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal text-xl" placeholder>
                    Para terminar el registro debe ingresar una contraseña.
                    </Typography>
                   
                    <form 
                        className="mt-8 mb-2 max-w-screen-lg w-full"
                    >
                     {alerta && 
                        <Stack sx={{ width: '100%' }} spacing={2} className='mb-3'>
                            <Alert variant="filled" severity="error">
                                {alertaMensaje}
                            </Alert>
                        </Stack>
                    }
                        <div className="mb-1 flex flex-col gap-6 w-full">
                            <div 
                                className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border"
                            >
                                <nav 
                                    className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700"
                                >
                                <div 
                                    role="button"
                                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                >
                                    Usuario: {email}
                                    </div>
                                
                                </nav>
                            </div>
                            {/* <Input 
                                crossOrigin="anonymous" 
                                label="Tu(s) Nombre(s)" 
                                onChange={(e) => setDatosTitulado({...datosTitulado, nombreUsuario: e.target.value})}
                            /> */}
                            <div className='flex gap-4'>
                                <Input 
                                    crossOrigin="anonymous" 
                                    type='password'
                                    label="Contraseña"
                                    onChange={(e) => setDatosTitulado({...datosTitulado, password: e.target.value})} 
                                />
                                <Input 
                                    crossOrigin="anonymous" 
                                    type='password'
                                    label="Repetir Contraseña" 
                                    onChange={(e) => setDatosTitulado({...datosTitulado, repeatPassword: e.target.value})}
                                />
                            </div>

                          </div>
                    
                    <Button className="mt-6 text-white bg-cyan-900 hover:bg-cyan-600 flex gap-2 justify-center text-base" fullWidth placeholder onClick={handleClick}>
                            <p>
                            Terminar registro
                            </p>
                            <LuSendHorizonal className='items-center'/>
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal" placeholder >
                        Ya estas registrado?{" "}
                        <Link href="/" className="font-medium text-gray-900">
                        Iniciar Sesion
                        </Link>
                    </Typography>
                    </form>
                </Card>
    </div>
    </div>
   
   
  )
}

export default index
