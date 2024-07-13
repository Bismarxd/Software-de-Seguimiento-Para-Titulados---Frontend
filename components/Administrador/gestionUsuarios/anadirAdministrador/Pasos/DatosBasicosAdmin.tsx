import React, {useContext} from 'react'
import { AdministradorContext } from '@/context/AministradorContext'
import { log } from 'console'
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
  ci: string,
  direccion: string,
  fechaNacimiento: string,
  celular: number,
  sexo: string
}

interface PropsContext {
  datosBasicos: Props ,
  setDatosBasicos: React.Dispatch<React.SetStateAction<Props>> 
}

const DatosBasicosAdmin = () => {

  const {datosBasicos,setDatosBasicos}: PropsContext = useContext<any>(AdministradorContext)
  
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setDatosBasicos({...datosBasicos, [name]: value})
  }

  const validateCI = () => {
    const ciPattern = /^\d+[a-zA-Z]+$/;
    return ciPattern.test(datosBasicos.ci);
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full flex-1'>
        {/* Nombre */}
                 
          <Input 
            placeholder=''
            titulo='Nombre'
            onChange={handleChange}
            type='text'
            value={datosBasicos["nombre"] || ""}           
            name='nombre'
          />
               
        {/* Apellidos */}
        <div className='flex gap-8'>
          <div className='flex-1'>
       
              <Input
              placeholder=''
              titulo='Apellido Paterno'
              onChange={handleChange}
              value={datosBasicos["apellidoPaterno"] || ""}
              type='text'
              name='apellidoPaterno'
              />
            
          </div>

          <div className='flex-1'>           
              <Input
                placeholder=''
                titulo='Apellido Materno'
                onChange={handleChange}
                value={datosBasicos["apellidoMaterno"] || ""}
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
              value={datosBasicos["email"] || ""}
              type='email'
              name='email'
              
            />         

        {/* ci y dirección*/}
        <div className='flex gap-3'>
          {/* ci */}
          <div className='flex-1'>
 
              <Input
                placeholder=''
                titulo='C.I.'
                onChange={handleChange}
                value={datosBasicos["ci"] || ""}
                name='ci'
                type='text'               
              />
              {!validateCI() && datosBasicos.ci && (
              <p className='text-red-500 text-xs italic'>El C.I. debe incluir una extensión.</p>
            )}
            
          </div>
          {/* dirección */}
          <div className='flex-1'>           
              <Input
                placeholder=''
                titulo='Dirección'
                onChange={handleChange}
                value={datosBasicos["direccion"] || ""}
                name='direccion'
                type='text'
              />
            
          </div>
        </div>

        {/* Fecha de Nacimiento, celular y sexo*/}
        <div className='flex gap-3'>
         
          {/* Fecha de Nacimiento */}
          <div className='flex-1'>
            
              <Input
                placeholder=''
                titulo='Fecha de Nacimiento'
                onChange={handleChange}
                value={datosBasicos["fechaNacimiento"] || ""}
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
                  value={datosBasicos["celular"] || ""}
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
                  value={datosBasicos["sexo"] || ""}
                  name='sexo'

                />
                  
              
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

export default DatosBasicosAdmin
