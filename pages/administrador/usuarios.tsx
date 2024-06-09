import React from 'react'
import Dashboard from '@/components/Administrador/Dashboard'
import NavBar from '@/components/Administrador/NavBar'
import Administradores from '@/components/Administrador/gestionUsuarios/Administradores'
import Titulados from '@/components/Administrador/gestionUsuarios/Titulados'

const Usuarios = () => {
  return (
    <body className='bg-menuColor1'>
        <Dashboard>
            <main className='min-h-screen'>
                <NavBar titulo='Gestion de Usuarios' />
                <Administradores/>
                <Titulados/>
            </main>
        </Dashboard>
    </body>
        
 
    
  )
}

export default Usuarios
