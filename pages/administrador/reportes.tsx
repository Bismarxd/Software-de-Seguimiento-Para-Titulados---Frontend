import React from 'react'
import Dashboard from '@/components/Administrador/Dashboard'
import NavBar from '@/components/Administrador/NavBar'
import ReportesTitulados from '@/components/Administrador/reportes/reportesTitulado/ReportesTitulados'


const reportes = () => {
  return (
    <body className='bg-menuColor1'>
        <Dashboard>
            <main className='min-h-screen'>
             
              <NavBar titulo='Reportes General' />
              <ReportesTitulados/>
            </main>
        </Dashboard>
    </body>
  )
}

export default reportes