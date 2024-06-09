import React from 'react'
import { useRouter } from 'next/router';
import { menuUsuario } from '@/data/menuUsuario'
import Link from 'next/link'
import { FaRegWindowClose } from "react-icons/fa";
import axios from 'axios';

interface PropsNavPerfil {
  toggle: boolean,
  datosUsuario: any
}

const NavBarPerfil: React.FC<PropsNavPerfil> = ({toggle, datosUsuario}) => {
  const router = useRouter()

  const cerrarSesion = () => {
    axios.get('http://localhost:8000/auth/logout')
    .then(result => {
      if (result.data.status)  {
        router.push('/')
      }
    }).catch(err => console.log(err))
  }

  return (
    <div>
      {menuUsuario.map(dato => {
        return (
          <Link 
            key={dato.id}
            className={`${toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"} flex items-center mt-2 p-4 rounded-lg cursor-pointer hover:bg-indigo-500 transition-all duration-300 last:absolute left-4 bottom-4`}
            href={dato.url}
          >
              <div className='mr-8 text-[1.7rem] text-gray-800'><dato.icon/></div>
              <div className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem text-gray-800 whitespace-pre]`}>{dato.title}</div>
          </Link>

        );
      })}
      <button>
        <Link 
            className={`${toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"} flex items-center mt-2 p-4 rounded-lg cursor-pointer hover:bg-red-500 transition-all duration-300 last:absolute left-4 bottom-4`}
            href={''}

        >
            <div className='mr-8 text-[1.7rem] text-gray-800'><FaRegWindowClose/></div>
            <button 
              className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem text-gray-800 whitespace-pre]`}
              onClick={cerrarSesion}
            >
              Cerrar Sesión
            </button>
        </Link>
      </button>
    </div>
  )
}

export default NavBarPerfil
