import React from 'react'
import Dashboard from '@/components/Administrador/Dashboard'
import NavBar from '@/components/Administrador/NavBar'

const actividades = () => {
  return (
    <body className='bg-menuColor1'>
        <Dashboard>
            <main className='min-h-screen'>
                <NavBar titulo='Publicaciones' />
            </main>
        </Dashboard>
    </body>
  )
}

export default actividades