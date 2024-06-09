import React from 'react'
import Dashboard from '@/components/Administrador/Dashboard'
import NavBar from '@/components/Administrador/NavBar'
import TopCards from '@/components/Administrador/inicio/TopCards'
import UltimosUsuarios from '@/components/Administrador/inicio/UltimosUsuarios'
import GraficoInicio from '@/components/Administrador/inicio/GraficoInicio'

const index = () => {
  return (
    <body className='bg-menuColor1 '>
       <Dashboard>
        <main className='min-h-screen'>
          <NavBar titulo='Administrador - Inicio'/>
          <TopCards/>
          
          
            <div className='grid lg:grid-cols-2 p-4 gap-2 min-h-screen'>
              <UltimosUsuarios/>
              <GraficoInicio/>
            </div>
              
          
          
          
        </main>
      </Dashboard>
      
    </body>
     

    
  )
}

export default index
