import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import { FaEye } from "react-icons/fa";
import Image from 'next/image';
import Router, { useRouter } from 'next/router'

const UltimosUsuarios = () => {

  const router = useRouter()

  const [datosTitulados, setDatosTitulados] = useState([{
    id: '',
    nombre: '',
    apellidoPaterno:'',
    apellidoMaterno:'',
    imagen: ''
  }])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/obtener_titulados`)
    .then(result => {
        if (result.data.status) {
            const titulados = result.data.result
              .filter(titulado => titulado.administrador === 0)
              .sort((a, b) => b.id - a.id);

        setDatosTitulados(titulados);

            
        } else {
            alert(result.data.Error);
        }
    })
    .catch(err => console.log(err));

  }, [])

  console.log(datosTitulados);

  const handleVerDetalles = (id: number) => {
    router.push(`/administrador/verTitulado/${id}`)
}
  

  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh]  p-4 border rounded-xl bg-white overflow-scroll'>
      <h1>Ultimos Usuarios Añadidos</h1>
      <ul>
        {datosTitulados.map((item) => (
            <li 
                key={item.id}
                className='bg-gray-100 hover:bg-gray-300 rounded-lg my-3 p-2 flex items-center cursor-pointer'
            >
                <div className='bg-slate-700 rounded-lg p-3'>
                    <Image
                                src={datosTitulados && item.imagen ? `http://localhost:8000/imagenes/${item.imagen}` : '/public/imagen Login/images.png'}
                                width={50}
                                height={50}
                                alt=''
                                className='rounded-lg'
                            />
                </div>
                <div className='flex flex-rows justify-between w-full'>
                  <div className='pl-4 text-gray-600 font-bold text-sm flex-1'>
                      <p>{item.nombre}</p>
                      <p>{item.apellidoPaterno} {item.apellidoMaterno}</p>
                  </div>
                  <div 
                      className='hover:cursor-pointer'
                      data-tooltip-id='my-tooltip'
                      data-tooltip-content="Ver"
                  >
                        <Tooltip id='my-tooltip'/>
                          <FaEye 
                              className='text-green-600 text-xl m-4 flex-1'
                              onClick={() => handleVerDetalles(item.id)}
                        />
                  </div>
                </div>
                
            </li>
        ))}
      </ul>
    </div>
  )
}

export default UltimosUsuarios
