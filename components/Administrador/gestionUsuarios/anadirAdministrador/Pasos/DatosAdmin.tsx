import React, { createContext, useContext, useState } from 'react';
import { AdministradorContext } from '@/context/AministradorContext'
import { log } from 'console'
import Input from '@/components/Diseño/Input'
import Select from '@/components/Diseño/Select'

const tipoAdministrador = [
  {value:'', label: ""},
  {value:0, label: "Administrador Principal"},
  {value:1, label: "Administrador Normal"}
]

interface Props {
  tituloCargo: string,
  fechaFinal: string,
  descripcionCargo: string,
  tipoAdministrador: 0
}

interface PropsContext {
  datosAdministrador: Props ,
  setDatosAdministrador: React.Dispatch<React.SetStateAction<Props>>
}


const DatosAdmin = () => {

  const {datosAdministrador, setDatosAdministrador}: PropsContext = useContext<any>(AdministradorContext)
  
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setDatosAdministrador({...datosAdministrador, [name]: value})

    
    
  }

  return (
    <div className='flex flex-col'>
      <div className='w-full flex-1'>
        {/* Nombre */}
                 
          <Input
            placeholder='' 
            titulo='Titulo del Cargo'
            onChange={handleChange}
            type='text'
            value={datosAdministrador["tituloCargo"] || ""}           
            name='tituloCargo'
          />

       
          <Input
          placeholder=''
          titulo='Descripcion Cargo'
          onChange={handleChange}
          value={datosAdministrador["descripcionCargo"] || ""}
          type='text'
          name='descripcionCargo'
          />


          <Select
            titulo='Tipo de Administrador'
            opciones={tipoAdministrador}
            onChange={handleChange}
            value={datosAdministrador["tipoAdministrador"] || ""}
            name='tipoAdministrador'

          />
           
          
        </div>
        
      </div>

  )
}

export default DatosAdmin
