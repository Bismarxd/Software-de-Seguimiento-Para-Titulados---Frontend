import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { log } from 'console'

const TopCards = () => {

  const [nTitulados, setNTitulados] = useState(0)
  const [nOfertas, setNOfertas] = useState(0)
  const [nAdministradores, setAdministradores] = useState(0)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/cantidad_titulados`)
      .then(result => {
        if (result.data.status) {
          const numeroTitulados = result.data.result
              .filter((titulados: any) => titulados.activo === 1).length
          setNTitulados(numeroTitulados)
        }
      })
      .catch(err => console.log(err))

    axios.get(`${process.env.NEXT_PUBLIC_URL}/ofertas/cantidad_ofertas`)
    .then(result => {
      if (result.data.status) {
        const numeroOfertas = result.data.result
              .filter((ofertas: any) => ofertas.activo === 1).length
        setNOfertas(numeroOfertas)
      }
    })
    .catch(err => console.log(err))

    axios.get(`${process.env.NEXT_PUBLIC_URL}/administradores/cantidad_administradores`)
    .then(result => {
      if (result.data.status) {
          const numeroAdministradores = result.data.result
                .filter((administradores: any) => administradores.activo === 1).length
              console.log(numeroAdministradores)
        setAdministradores(numeroAdministradores)
      }
    })
    .catch(err => console.log(err))
  },[])
  

  return (

    <div className='grid lg:grid-cols-5 gap-4 p-4'>
      <div className='lg:col-span-2 col-span-1 text-white flex justify-between w-full border p-4 rounded-xl bg-red-600 shadow-xl transform transition-transform hover:scale-105'>
    <div className='flex flex-col w-full pb-4'>
        <p className='text-2xl font-bold'>{nTitulados}</p>
        <p className=''>Titulados</p>
    </div>  
</div>



      <div className='lg:col-span-2 col-span-1 bg-yellow-600 text-white flex justify-between w-full border p-4 rounded-xl shadow-xl transform transition-transform hover:scale-105'>
        <div className='flex flex-col w-full pb-4'>
            <p className='text-2xl font-bold'>{nAdministradores}</p>
            <p className=''>Administradores</p>
        </div>

      </div>

      <div className='bg-green-700 text-white flex justify-between w-full border p-4 rounded-xl shadow-xl transform transition-transform hover:scale-105'>
        <div className='flex flex-col w-full pb-4'>
            <p className='text-2xl font-bold'>{nOfertas}</p>
            <p className=''>Ofertas Laborales</p>
        </div>

      </div>
    </div>



    
  )
}

export default TopCards
