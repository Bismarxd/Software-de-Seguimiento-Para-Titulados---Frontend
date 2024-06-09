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
import Link from 'next/link';
import { LuSendHorizonal } from "react-icons/lu";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const index = () => {

    const [email, setEmail] = useState('')

    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')
    const [placeholderVisible, setPlaceholderVisible] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleClick= () => {
        if (!validateEmail(email)) {
            setEmailError(true);
            setAlerta(true);
            setAlertaMensaje('El correo electrónico no es válido');
            setTimeout(() => {
                setAlerta(false);
                setEmailError(false);
            }, 5000);
            return;
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className='bg-white w-[70%] p-8 rounded-lg'>

       <Card color="transparent" shadow={false} placeholder>
           <Typography variant="h4" color="blue-gray" placeholder>
           Registro Cuenta
           </Typography>
           <Typography color="gray" className="mt-1 font-normal text-xl" placeholder>
           Para recuperar la cuenta debe ingresar el correo y se le enviara una verificacion para cambiar la contraseña.
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
                   
                   {/* <Input 
                       crossOrigin="anonymous" 
                       label="Tu(s) Nombre(s)" 
                       onChange={(e) => setDatosTitulado({...datosTitulado, nombreUsuario: e.target.value})}
                   /> */}
                   <div className='flex gap-4'>
                       
                       <Input 
                           crossOrigin="anonymous" 
                           type='email'
                           label="Ingrese su Correo" 
                           
                       />
                   </div>

                 </div>
           
           <Button className="mt-6 text-white bg-cyan-900 hover:bg-cyan-600 flex gap-2 justify-center text-base" fullWidth placeholder onClick={handleClick}>
                   <p>
                   Enviar Verificación
                   </p>
                   <LuSendHorizonal className='items-center'/>
           </Button>
           <Typography color="gray" className="mt-4 text-center font-normal" placeholder >
               No estas registrado?{" "}
               <Link href="/registro" className="font-medium text-teal-600">
               Registrate
               </Link>
           </Typography>
           </form>
       </Card>
</div>
</div>
  )
}

export default index