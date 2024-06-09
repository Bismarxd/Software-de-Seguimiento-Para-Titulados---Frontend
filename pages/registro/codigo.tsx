import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option
  } from "@material-tailwind/react";

const codigo = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className='bg-white w-[70%] p-8 rounded-lg'>
       <Card color="transparent" shadow={false} placeholder>
           <Typography variant="h4" color="blue-gray" placeholder>
           Codigo Enviado
           </Typography>
           <Typography color="gray" className="mt-1 font-normal text-xl" placeholder>
           Por favor revisa tu correo electronico para completar el registro.
           </Typography>
           <Typography color="gray" className="mt-1 font-normal" placeholder>
           debe revisar su correo para completar el registro.
           </Typography>
           
       </Card>
</div>
</div>
  )
}

export default codigo
