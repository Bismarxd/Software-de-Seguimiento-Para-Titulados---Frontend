import React, { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { menuUsuario } from '@/data/menuUsuario'
import {BiChevronLeft} from "react-icons/bi"
import UsuarioPerfil from './UsuarioPerfil'
import NavBarPerfil from './NavBarPerfil'
import { PasoContext } from '@/context/PasoContext'
import axios from 'axios'
import LoginPrivado from '../RutasPrivadas/LoginPrivado'
import RutasProtegidas from '@/components/RutasPrivadas/RutasProtegidas'

type LayoutProps = {
  children: ReactNode
}


const DashboardPerfil = ({children}: LayoutProps) => {

  const [toggle, setToggle] = useState(true)
  const [datosUsuario, setDatosUsuario] = useState({})

  useEffect(() => {
    // Obtener el valor del parámetro 'id' de la URL del usuario
    const userId = localStorage.getItem('userId')
    
    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/ver_titulado_perfil/`+userId)
      .then(result => {
        if (result.data.status) {
          setDatosUsuario(result.data.result[0])
        }
      })
  },[])

  return (
    <LoginPrivado>
      <RutasProtegidas tipoRol={['usuarioTitulado']}>
        <aside className='h-screen fixed'>
          <div className={`${toggle ? "w-[3rem] md:w-[5.8rem] md:fixed" : ""} bg-white  h-[96%] w-[20rem] rounded-3xl md:ml-6 md:p-4 border transition-all duration-500 border-solid border-cyan-700 fixed`}>
              <UsuarioPerfil toggle={toggle} datosUsuario = {datosUsuario}/>
              <NavBarPerfil toggle={toggle} datosUsuario = {datosUsuario}/>
              <div 
                className='hidden absolute top-[7rem] md:flex justify-center items-center -left-5 w-10 h-10 bg-white rounded-full cursor-pointer'
                onClick={() => {
                  setToggle(!toggle)
                }}
              >
              
                <BiChevronLeft className={`${toggle ? "rotate-180" : ""} text-3xl transition-all duration-300`}/>

              </div>
              {/* <main className='ml-20 w-full'>{children}</main> */}
          </div>
        </aside>
        <main className={`w-full ${!toggle ? 'ml-[10rem] md:ml-[22rem]' : 'ml-10 md:ml-32'}`}>{children}</main>
      </RutasProtegidas>
        

    </LoginPrivado>
    
       
   
  )
}

export default DashboardPerfil
