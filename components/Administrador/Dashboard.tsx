import React, { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import { menu } from '@/data/menuAdministrador' 
import { useRouter } from 'next/router';
import { CgMoreVertical } from 'react-icons/cg'
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu'
import LoginPrivado from '../RutasPrivadas/LoginPrivado';


type LayoutProps = {
    children: ReactNode
}

const Dashboard = ({children}: LayoutProps) => {
  const router = useRouter();

  const [administrador, setAdministrador] = useState({
    administrador: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    ci: '',
    fechaNacimiento: '',
    celular: '',
    sexo: '',
    direccion: '',
    personaId: '',
    usuarioId: '',
    tipoAdministrador: 0
   })
  useEffect(() => {

    // if(administrador.administrador === 0) {
    //   router.push('/perfil')
    // }

    const id = localStorage.getItem('userId')
    axios.get(`${process.env.NEXT_PUBLIC_URL}/administradores/obtener_admninistrador/${id}`)
   .then(result => {
        if(result.data.status){
            setAdministrador(result.data.result[0])

        }
   }).catch(err => console.log(err))
   
},[])


  const [expandir, setExpandir] = useState(false)

  const lastTwoItems = menu.slice(-2).map(item => item.id);
  return (
    <LoginPrivado>
       <div className='flex'>
      <aside className='h-screen fixed'>
        <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
          <div className='p-4 pb-2 flex justify-between items-center gap-2'>
              <Image
                src="/ImagenesAdmin/logo_psicologia.png"
                alt=''
                width={200}
                height={200}
                className={`overflow-hidden transition-all rounded-3xl ${expandir ? 'w-50' : 'w-0'}`}
              />
              <button
                className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'
                onClick={() => setExpandir((curr) => !curr)}
              >
                  {expandir ? <LuChevronFirst/> : <LuChevronLast/>}
              </button>
              
          </div>
          <ul className='flex-1 p-3'>
          {menu.filter(item => {
  // Check if administrador is defined and has tipoAdministrador property
  if (administrador && administrador.tipoAdministrador !== undefined) {
    return !(administrador.tipoAdministrador === 1 && item.id === 2);
  }
  return true; // If administrador is undefined, include all items
}).map((item, index) => (
              <React.Fragment key={item.id}>
                {index === menu.length - 2 && <hr className='my-2'/>} {/* Agregar <hr /> antes del penúltimo elemento */}
                <Link 
                  href={item.url}
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content={item.title}
                  data-tooltip-place="top-end"

                >
                  
                  <li
                    className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-gray-600 hover:bg-indigo-50
                    ${router.pathname === item.url ? 'bg-blue-500 text-white' : ''}`}
                    
                  >
                     
                    <Tooltip id='my-tooltip'/> 
                    <item.icon size={20} 
                      
                    />
                    
                      
                    <span 
                      className={`overflow-hidden transition-all 
                      ${expandir ? 'w-52' : 'w-0'}`}

                    >
                      {item.title}
                    </span>
                    {!expandir && (
                      <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                           {/* Contenido del tooltip */}
                          
          
                      </div>
                    )}
                  </li>
                </Link>
                
              </React.Fragment>
            ))}
          </ul>

         <div className='border-t flex p-3'>
            <Image
                src="/Imagenes Login/logo.jpg"
                alt=''
                width={200}
                height={200}
                className='rounded-3xl w-16'
            />
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expandir ? 'w-52 ml-3' : "w-0"}`}>
              <div className='leading-4'>
                <h4 className='font-semibold text-gray-800'>Carrera de Psicología</h4>
                  <span className='text-xs text-gray-600'>@derechos reservados <br/> bismarckmaytatintaya@gmail.com</span>               
              </div>
              <CgMoreVertical size={20} />
            </div>
         </div>
        </nav>

      </aside>
      <main className={`w-full ${expandir ? 'ml-80' : 'ml-20'}`}>{children}</main>
    </div>

    </LoginPrivado>
   
    // <div className='flex'>
    //   <div className='fixed w-20 h-screen p-4 bg-menuColor2 border-r-[1px] flex flex-col justify-between'>
    //     <div className='flex flex-col items-center'>
    //       <Link href='/administrador'>
    //         <div className='rounded-lg inline-block'>
    //           <Image
    //             src="/Imagenes Login/images.png"
    //             alt=''
    //             width={200}
    //             height={200}
    //             className='rounded-lg'
    //           />
    //         </div>
    //       </Link>
    //       <span className='border-b-[1px] border-menuColor1 w-full p-2'></span>
    //       {menu.map(item => (
    //         <Link href={item.url} key={item.id}>
    //           <div className='my-2 flex flex-col items-center text-white'>
    //             <div className='bg-menuColor1 hover:bg-menuHover cursor-pointer p-3 rounded-lg inline-block'>
    //               <item.icon size={20}/>
    //             </div>
    //             <div>
    //               <h3 className='text-[10px] items-center'>{item.title}</h3>
    //             </div>
    //           </div>
            
    //       </Link>
    //       ))}

    //     </div>
    //   </div>
    //   <main className='ml-20 w-full'>{children}</main>
    // </div>
  )
}

export default Dashboard
