import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { menuUsuario } from '@/data/menuUsuario'
import {BiChevronLeft} from "react-icons/bi"
import UsuarioPerfil from './UsuarioPerfil'
import NavBarPerfil from './NavBarPerfil'
import { PasoContext } from '@/context/PasoContext'
import axios from 'axios'


const DashboardPerfil = () => {



  const [toggle, setToggle] = useState(false)
  const [datosUsuario, setDatosUsuario] = useState({})

  useEffect(() => {
    // Obtener el valor del parámetro 'id' de la URL del usuario
    const userId = localStorage.getItem('userId')
    
    axios.get(`http://localhost:8000/titulado/ver_titulado_perfil/`+userId)
      .then(result => {
        if (result.data.status) {
          setDatosUsuario(result.data.result[0])
        }
      })
  },[])

  return (
    
         <div className={`${toggle ? "w-[5.8rem] fixed" : ""} bg-white h-[96%] w-[20rem] rounded-3xl ml-6 p-4 border transition-all duration-500 border-solid border-cyan-700 fixed`}>
            <UsuarioPerfil toggle={toggle} datosUsuario = {datosUsuario}/>
            <NavBarPerfil toggle={toggle} datosUsuario = {datosUsuario}/>
            <div 
              className='absolute top-[7rem] flex justify-center items-center -left-5 w-10 h-10 bg-white rounded-full cursor-pointer'
              onClick={() => {
                setToggle(!toggle)
              }}
            >
            
              <BiChevronLeft className={`${toggle ? "rotate-180" : ""} text-3xl transition-all duration-300`}/>

            </div>
            {/* <main className='ml-20 w-full'>{children}</main> */}
          </div>
   
  )
}

export default DashboardPerfil
