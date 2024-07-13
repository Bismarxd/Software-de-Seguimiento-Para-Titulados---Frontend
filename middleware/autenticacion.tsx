import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

const rutasProtegidas = ['/perfil']

const autenticacion = () => {

    const router = useRouter()
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        
    })

  return (
    <div>autenticacion</div>
  )
}

export default autenticacion