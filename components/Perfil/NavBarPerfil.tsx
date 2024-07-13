import React from 'react';
import { useRouter } from 'next/router';
import { menuUsuario } from '@/data/menuUsuario';
import Link from 'next/link';
import { FaRegWindowClose } from 'react-icons/fa';
import axios from 'axios';

interface PropsNavPerfil {
  toggle: boolean;
  datosUsuario: any;
}

const NavBarPerfil: React.FC<PropsNavPerfil> = ({ toggle, datosUsuario }) => {
  const router = useRouter();

  const cerrarSesion = () => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/logout`)
      .then(result => {
        if (result.data.status) {
          // Limpiar localStorage
          localStorage.removeItem('validUser');
          localStorage.removeItem('token');
          localStorage.removeItem('userId');

          router.push('/');
        }
      }).catch(err => console.log(err));
  };

  return (
    <div>
      {menuUsuario.map(dato => {
        const isActive = router.pathname === dato.url; // Comprueba si la ruta actual coincide con la URL del menú

        return (
          <Link
            key={dato.id}
            className={`${toggle ? "last:w-[2rem] md:last:w-[3.6rem]" : "last:w-[17rem]"} flex items-center mt-2 p-4 rounded-lg cursor-pointer ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'} transition-all duration-300 last:absolute md:left-4 bottom-4`}
            href={dato.url}
          >
            <div className='mr-8 text-[1rem] md:text-[1.7rem] text-gray-800'><dato.icon /></div>
            <div className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem text-gray-800 whitespace-pre]`}>{dato.title}</div>
          </Link>
        );
      })}
      <button onClick={cerrarSesion}>
        <div
          className={`${toggle ? "last:w-[2rem] md:last:w-[3.6rem]" : "last:w-[17rem]"} flex items-center mt-2 md:p-4 rounded-xl cursor-pointer hover:bg-red-500 transition-all duration-300 last:absolute left-4 bottom-4`}
        >
          <div className='mr-8 text-[1rem] md:text-[1.7rem] text-gray-800'><FaRegWindowClose /></div>
          <button
            className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem text-gray-800 whitespace-pre]`}
          >
            Cerrar Sesión
          </button>
        </div>
      </button>
    </div>
  );
};

export default NavBarPerfil;
