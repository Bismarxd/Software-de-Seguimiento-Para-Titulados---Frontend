import React, {useContext, useState} from 'react'
import { PasoContext } from '@/context/PasoContext'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Input from '@/components/Diseño/Input'
import Select from '@/components/Diseño/Select'

const opcionesSexo = [
  {value:'', label: ""},
  {value:'masculino', label: "Masculino"},
  {value:'femenino', label: "Femenino"}
]

interface Props {
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  email: string,
   ci: number,
   direccion: string,
   fechaNacimiento: string,
   celular: number,
   sexo: string
}

interface PropsContext {
  datosUsuario: Props ,
  setDatosUsuario: React.Dispatch<React.SetStateAction<Props>>
}

const DatosBasicos = () => {
  const [alerta, setAlerta] = useState(false)
  const [alertaMensaje, setAlertaMensaje] = useState('')

  const {datosUsuario, setDatosUsuario}: PropsContext = useContext(PasoContext)
  
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setDatosUsuario({...datosUsuario, [name]: value})

  }


  return (
    <div className='flex flex-col'>
      <form className='w-full flex-1' >
      {alerta && 
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                {alertaMensaje}
              </Alert>
            </Stack>
        }
        {/* Nombre */}
                 
          <Input 
            placeholder=''
            titulo='Nombre(s)'
            onChange={handleChange}
            type='text'
            value={datosUsuario["nombre"] || ""}           
            name='nombre'
          />
               
        {/* Apellidos */}
        <div className='flex gap-8 '>
          <div className='flex-1'>
       
              <Input
              placeholder=''
              titulo='Apellido Paterno'
              onChange={handleChange}
              value={datosUsuario["apellidoPaterno"] || ""}
              type='text'
              name='apellidoPaterno'
              />
            
          </div>

          <div className='flex-1'>           
              <Input
                placeholder=''
                titulo='Apellido Materno'
                onChange={handleChange}
                value={datosUsuario["apellidoMaterno"] || ""}
                type='text'
                name='apellidoMaterno'
                
              />
            
          </div>
          
        </div>

        {/* Email */}      
            <Input
              placeholder=''  
              titulo='Email'
              onChange={handleChange}
              value={datosUsuario["email"] || ""}
              type='email'
              name='email'
              
            />         

        {/* ci y dirección*/}
        <div className='flex gap-3 '>
          {/* ci */}
          <div className='flex-1'>
 
              <Input
                placeholder=''
                titulo='C.I.'
                onChange={handleChange}
                value={datosUsuario["ci"] || ""}
                name='ci'
                type='number'
                
              />
            
          </div>
          {/* dirección */}
          <div className='flex-1'>           
              <Input
                placeholder=''
                titulo='Dirección'
                onChange={handleChange}
                value={datosUsuario["direccion"] || ""}
                name='direccion'
                type='text'
              />
            
          </div>
        </div>

        {/* Fecha de Nacimiento, celular y sexo*/}
        <div className='flex gap-3 '>
         
          {/* Fecha de Nacimiento */}
          <div className='flex-1'>
            
              <Input
                placeholder=''
                titulo='Fecha de Nacimiento'
                onChange={handleChange}
                value={datosUsuario["fechaNacimiento"] || ""}
                name='fechaNacimiento'
                type='date'
                
              />
            
          </div>
          <div className='flex-1'>
            {/* celular */}
            <div className=''>
             
                <Input
                  placeholder=''
                  titulo='Celular'
                  onChange={handleChange}
                  value={datosUsuario["celular"] || ""}
                  name='celular'
                  type='number'
                />
              
            </div>
            {/* sexo */}
            <div>
     
                <Select
                  titulo='Sexo'
                  opciones={opcionesSexo}
                  onChange={handleChange}
                  value={datosUsuario["sexo"] || ""}
                  name='sexo'
                />
                  
              
            </div>
          </div>
          
        </div>
        
      </form>
    </div>
  )
}

export default DatosBasicos
