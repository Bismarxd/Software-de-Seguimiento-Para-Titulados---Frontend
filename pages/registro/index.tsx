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

const index = () => {

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

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
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
            datosBasicos.sexo === ''  || 
            datosBasicos.direccion === ''
          ) {
            setAlerta(true);
            setAlertaMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
              setAlerta(false);
            }, 5000);
            return;
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
                console.log(email);
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
                console.log(result.data.Error)
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
                            />
                            <div className='flex gap-4'>
                                <Input 
                                    crossOrigin="anonymous" 
                                    label="Tu Apellido Paterno"
                                    onChange={(e) => setDatosBasicos({...datosBasicos, apellidoPaterno: e.target.value})} 
                                />
                                <Input 
                                    crossOrigin="anonymous" 
                                    label="Tu Apellido Materno" 
                                    onChange={(e) => setDatosBasicos({...datosBasicos, apellidoMaterno: e.target.value})}
                                />
                            </div>

                            <div className='flex gap-4'>
                                <Input 
                                    crossOrigin="anonymous" 
                                    value={datosBasicos.direccion}
                                    label="Dirección" 
                                    onChange={(e) => setDatosBasicos({...datosBasicos, direccion: e.target.value})}
                                />
                                <Input 
                                    type='date'
                                    crossOrigin="anonymous" 
                                    label="Fecha de Nacimiento" 
                                    onChange={(e) => setDatosBasicos({...datosBasicos, fechaNacimiento: e.target.value})}
                                />
                            </div>

                            <div className='flex gap-2'>

                                    <Input 
                                        type='number'
                                        crossOrigin="anonymous" 
                                        value={datosBasicos.ci}
                                        label="Carnet de Identidad" 
                                        placeholder={placeholderVisible ? 'Ej: 123456 lp' : ''}
                                        onFocus={() => setPlaceholderVisible(true)}
                                        onBlur={() => setPlaceholderVisible(false)}
                                        onChange={(e) => setDatosBasicos({...datosBasicos, ci: e.target.value})}
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


                            <div className='flex gap-4'>
                                <Input 
                                    type='email'
                                    crossOrigin="anonymous" 
                                    label="Email" 
                                    onChange={(e) => setDatosBasicos({...datosBasicos, email: e.target.value})}
                                />                            
                            </div>
                        
                        </div>

                        <Typography color="gray" className="mt-4 font-normal" placeholder >
                        *Se le enviara un enlace a su correo electronico para completar el registro
                        
                        </Typography>
                    
                    <Button className="mt-6 text-white bg-cyan-900 hover:bg-cyan-600 flex gap-2 justify-center text-base" fullWidth placeholder onClick={handleClick}>
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

export default index
