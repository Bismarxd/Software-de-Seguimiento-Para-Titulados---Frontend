import React from 'react'
import Image from 'next/image'

interface PropsUsuarioPerfil {
    toggle: boolean,
    datosUsuario: any
  }  

const UsuarioPerfil: React.FC<PropsUsuarioPerfil> = ({toggle, datosUsuario}) => {
  
  return (
    <div 
        className={`flex gap-5 items-center ${ 
            toggle 
                ? "bg-none transition-all duration-300 delay-200" 
                : "bg-indigo-500 rounded-xl p-2"}`}
    >

      <div className='min-w-[3.5rem] h-[3.5rem]'>
        <Image
            src={`http://localhost:8000/imagenes/` + (datosUsuario?.imagen || '')}
            width={50}
            height={50}
            alt=''
            className='w-full h-full rounded-full object-cover'
        />

      </div>

      <div className={toggle ? "opacity-0 delay-200" : ""}>
            <h3 className='text-xl'>{datosUsuario.nombre} {datosUsuario.apellidoPaterno} {datosUsuario.apellidoMaterno}</h3>
            <span className='text-[0.75rem] opacity-60'>{datosUsuario.email}</span>
      </div>
    </div>
  )
}

export default UsuarioPerfil
