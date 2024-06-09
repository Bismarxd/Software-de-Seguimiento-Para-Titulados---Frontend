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
  tituloCargo: string,
  descripcionCargo: string,
  fechaFinal: string,

}

interface PropsContext {
  datosAdministrador: Props ,
  setDatosAdministrador: React.Dispatch<React.SetStateAction<Props>>
}

const DatosAdmin = () => {

  const {datosAdministrador, setDatosAdministrador}: PropsContext = useContext(AdministradorContext)
  
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setDatosAdministrador({...datosAdministrador, [name]: value})

    
    
  }

  return (
    <div className='flex flex-col'>
      <div className='w-full flex-1'>
        {/* Nombre */}
                 
          <Input 
            titulo='Titulo del Cargo'
            onChange={handleChange}
            type='text'
            value={datosAdministrador["tituloCargo"] || ""}           
            name='tituloCargo'
          />

       
          <Input
          titulo='Descripcion Cargo'
          onChange={handleChange}
          value={datosAdministrador["descripcionCargo"] || ""}
          type='text'
          name='descripcionCargo'
          />

          <Input
            titulo='Fecha Final'
            onChange={handleChange}
            value={datosAdministrador["fechaFinal"] || ""}
            name='fechaFinal'
            type='date'
            
          />

              
           
          
        </div>
        
      </div>

  )
}

export default DatosAdmin
