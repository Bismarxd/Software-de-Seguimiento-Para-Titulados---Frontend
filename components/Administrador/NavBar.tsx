import React from 'react'
import axios from 'axios';
import {Concert_One} from 'next/font/google'
import Boton2 from '../Diseño/Boton2';
import { useRouter } from 'next/router';

const font = Concert_One({weight: '400',subsets: ['latin']})

export interface titulo {
  titulo: string
}

const NavBar = ({titulo}: titulo) => {

  const router = useRouter()
  
  const handleLogout = () => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/logout`)
    .then(result => {
      if (result.data.status)  {
        localStorage.removeItem('valid');
        localStorage.removeItem('tipo');
        localStorage.removeItem('userId');

        router.push('/')
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className={`flex justify-between px-4 pt-4 text-white ${font.className}`}>
       <div className='text-3xl'>
        {titulo}     
       </div>
       <Boton2 color='bg-red-500' texto='Cerrar Sesión' onClick={handleLogout}/>
      
    </div>
  )
}

export default NavBar
