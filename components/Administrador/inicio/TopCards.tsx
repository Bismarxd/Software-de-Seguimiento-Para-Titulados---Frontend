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
          setNTitulados(result.data.cantidad)
        }
      })
      .catch(err => console.log(err))

    axios.get(`${process.env.NEXT_PUBLIC_URL}/ofertas/cantidad_ofertas`)
    .then(result => {
      if (result.data.status) {
        setNOfertas(result.data.cantidad)
      }
    })
    .catch(err => console.log(err))

    axios.get(`${process.env.NEXT_PUBLIC_URL}/administradores/cantidad_administradores`)
    .then(result => {
      if (result.data.status) {
        setAdministradores(result.data.cantidad)
      }
    })
    .catch(err => console.log(err))
  },[])

  console.log(nAdministradores);
  

  return (
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-xl'>
        <div className='flex flex-col w-full pb-4'>
            <p className='text-2xl font-bold'>{nTitulados}</p>
            <p className='text-slate-500'>Titulados</p>
        </div>

      </div>

      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-xl'>
        <div className='flex flex-col w-full pb-4'>
            <p className='text-2xl font-bold'>{nAdministradores}</p>
            <p className='text-slate-500'>Administradores</p>
        </div>

      </div>

      <div className='bg-white flex justify-between w-full border p-4 rounded-xl'>
        <div className='flex flex-col w-full pb-4'>
            <p className='text-2xl font-bold'>{nOfertas}</p>
            <p className='text-slate-500'>Ofertas Laborales</p>
        </div>

      </div>
    </div>
  )
}

export default TopCards
