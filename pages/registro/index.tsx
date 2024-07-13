import React, {useState} from 'react'
import { extensionCi, genero } from '@/data/registroDatos';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option
  } from "@material-tailwind/react";
import { LuSendHorizonal } from "react-icons/lu";
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import axios from 'axios';
import { MenuItem } from '@mui/material';

const Index = () => {

    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')
    const [placeholderVisible, setPlaceholderVisible] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const router = useRouter();
    const [datosBasicos, setDatosBasicos] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        ci: '',
        fechaNacimiento: '',
        celular: '',
        sexo: '',
        direccion: '',
        email: '',
    })

    const validateEmail = (email: any) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateCI = (ci: string) => {
        const ciPattern = /^\d+[a-zA-Z]+$/;
        return ciPattern.test(datosBasicos.ci);
      };


    const handleClick =  () => {

        if (
            datosBasicos.nombre === '' || 
            datosBasicos.email === '' || 
            datosBasicos.apellidoPaterno === '' || 
            datosBasicos.apellidoMaterno === '' || 
            datosBasicos.ci === '' || 
            datosBasicos.fechaNacimiento === '' || 
            datosBasicos.celular === '' || 
            
            datosBasicos.direccion === ''
          ) {
            setAlerta(true);
            setAlertaMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
              setAlerta(false);
            }, 5000);
            return;
          }
          if (!validateCI(datosBasicos.ci)) {
            setAlerta(true);
            setAlertaMensaje("El C.I. debe incluir una extensión, por ejemplo: 123456lp");
            setTimeout(() => {
            setAlerta(false);
            }, 5000);
            return; // Detener la función si el C.I. no es válido
        }
       

        if (!validateEmail(datosBasicos.email)) {
            setEmailError(true);
            setAlerta(true);
            setAlertaMensaje('El correo electrónico no es válido');
            setTimeout(() => {
                setAlerta(false);
                setEmailError(false);
            }, 5000);
            return;
        }
        try {
            axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_persona`, datosBasicos)
        .then(result => {
            if (result.data.status) {
                
                const email = result.data.result.email
                axios.post(`${process.env.NEXT_PUBLIC_URL}/registro/send-email`, { email: result.data.result.email, id: result.data.id})
                .then(result =>{
                    if(result.data.status)
                        {
                            router.push('/registro/codigo')
                        }
                })
                .catch(err => console.log(err)) 
            } else
            {
                setEmailError(true);
                setAlerta(true);
                setAlertaMensaje(result.data.Error);
                setTimeout(() => {
                    setAlerta(false);
                    setEmailError(false);
                }, 5000);
                return;
            }
        }).catch(err => console.log(err))
            
        } catch (error) {
            
        }
        
    };

    const handleSelectChange = (value: string) => {
        setDatosBasicos({ ...datosBasicos, sexo: value });
      };
    //   const handleSelectChangeCI = (value: string) => {
    //     setDatosBasicos({ ...datosBasicos, ci: datosBasicos.ci + " " + value });
    //   };

  return (
    <div className='min-h-screen flex items-center justify-center'>
             <div className='bg-white w-[70%] p-8 rounded-lg'>
                <Card color="transparent" shadow={false} placeholder>
                    <Typography variant="h4" color="blue-gray" placeholder>
                    Bienvenido
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal text-xl" placeholder>
                    Registro para el Seguimiento de Titulados.
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal" placeholder>
                    Llena cuidadosamente los siguientes datos.
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
                            <Input 
                                crossOrigin="anonymous" 
                                label="Tu(s) Nombre(s)" 
                                onChange={(e) => setDatosBasicos({...datosBasicos, nombre: e.target.value})}
                                name='nombre'
                            />
                            <div className='flex flex-col md:flex-row gap-4'>
                                <Input 
                                    crossOrigin="anonymous" 
                                    label="Tu Apellido Paterno"
                                    onChange={(e) => setDatosBasicos({...datosBasicos, apellidoPaterno: e.target.value})} 
                                    name='apellidoPaterno'
                                />
                                <Input 
                                    crossOrigin="anonymous" 
                                    label="Tu Apellido Materno" 
                                    onChange={(e) => setDatosBasicos({...datosBasicos, apellidoMaterno: e.target.value})}
                                    name='apellidoMaterno'
                                />
                            </div>

                            <div className='flex flex-col md:flex-row gap-4'>
                                <Input 
                                    crossOrigin="anonymous" 
                                    value={datosBasicos.direccion}
                                    label="Dirección" 
                                    onChange={(e) => setDatosBasicos({...datosBasicos, direccion: e.target.value})}
                                    name='direccion'
                                />
                                <Input 
                                    type='date'
                                    crossOrigin="anonymous" 
                                    label="Fecha de Nacimiento" 
                                    onChange={(e) => setDatosBasicos({...datosBasicos, fechaNacimiento: e.target.value})}
                                    name='fechaNacimiento'
                                />
                            </div>

                            <div className='flex flex-col md:flex-row gap-2'>

                                    <Input 
                                        type='text'
                                        crossOrigin="anonymous" 
                                        value={datosBasicos.ci}
                                        label="Carnet de Identidad" 
                                        placeholder={placeholderVisible ? 'Ej: 123456 lp' : ''}
                                        onFocus={() => setPlaceholderVisible(true)}
                                        onBlur={() => setPlaceholderVisible(false)}
                                        onChange={(e) => setDatosBasicos({...datosBasicos, ci: e.target.value})}
                                        name='ci'
                                    />
                                    {/* <Select 
                                        placeholder className='w-[50px]'
                                        onChange={(e) => handleSelectChangeCI(e)}
                                        value={datosBasicos.ci}
                                    >
                                        {extensionCi.map(item => (
                                            <Option key={item.id} value={item.value}>
                                                {item.nombreCi}
                                            </Option>
                                        ))}
                                    </Select> */}


                                    <Input 
                                        type='number'
                                        crossOrigin="anonymous" 
                                        label="Celular" 
                                        onChange={(e) => setDatosBasicos({...datosBasicos, celular: e.target.value})}
                                        name='celular'
                                    />

                                    <Select 
                                        placeholder className='w-[150px]'                                      
                                        onChange={(e: any) => handleSelectChange(e)}
                                        label='Genero'
                                        name='genero'
                                    >
                                            {genero.map(item => (
                                                <Option key={item.id} value={item.value}>
                                                    {item.nombre}
                                                </Option>
                                            ))}
                                    </Select>
                                
                            </div>


                            <div className='flex gap-4'>
                                <Input 
                                    type='email'
                                    crossOrigin="anonymous" 
                                    label="Email" 
                                    onChange={(e) => setDatosBasicos({...datosBasicos, email: e.target.value})}
                                    name='email'
                                />                            
                            </div>
                        
                        </div>

                        <Typography color="gray" className="mt-4 font-normal" placeholder >
                        *Se le enviara un enlace a su correo electronico para completar el registro                      
                        </Typography>
                    
                    <Button 
                        className="mt-6 text-white bg-cyan-900 hover:bg-cyan-600 flex gap-2 justify-center text-base" fullWidth placeholder onClick={handleClick}
                        name= 'Enviar'
                    >
                            <p>
                            Enviar
                            </p>
                            <LuSendHorizonal className='items-center'/>
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal" placeholder >
                        Ya estas registrado?{" "}
                        <Link href="/" className="font-medium text-teal-700">
                        Iniciar Sesion
                        </Link>
                    </Typography>
                    </form>
                </Card>
    </div>
    </div>
   
   
  )
}

export default Index
