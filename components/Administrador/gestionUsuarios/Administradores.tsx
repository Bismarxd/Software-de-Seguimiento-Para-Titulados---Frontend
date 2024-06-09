import Boton from '@/components/Diseño/Boton'
import React, {useEffect, useState} from 'react'
import PaginacionAdministradores from './PaginacionAdministradores'
import { GridColDef } from '@mui/x-data-grid'
import { pruebaAdministradores } from '@/data/pruebaUsuarios'
import Link from 'next/link'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

const columnas: GridColDef[] = [
    {
      field: "id", 
      headerName: "ID",
      width: 90
    },
    {
      field: "nombre", 
      type: "string",
      headerName: "Nombre(s)",
      width: 100,
    },
    {
      field: "apellidoPaterno", 
      type: "string",
      headerName: "Apellido Paterno",
      width: 100,
    },
    {
      field: "email", 
      type: "string",
      headerName: "Email",
      width: 130,
    },
    {
      field: "celular", 
      type: "string",
      headerName: "Contacto",
      width: 130,
    },
    {
      field: "tituloCargo", 
      type: "string",
      headerName: "Cargo",
      width: 130,
    }
  ]

const Administradores = () => {
  const [datosAdministradores, setDatosAdministradores] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/administradores/obtener_administradores`)
      .then(result => {
        if (result.data.status) {
          // Filtrar los datos para excluir aquellos con id nulo
          const administradoresFiltrados = result.data.result.filter(admin => admin.id !== null);
          setDatosAdministradores(administradoresFiltrados)
        }
      })
      .catch(err => console.log(err))
  },[])


  return (
    <div>
        <div className='m-6 flex gap-4'>
            <h2 className='text-white text-xl'>Administradores</h2>
            <Link href={'anadirAdministrador'}>
              <Boton texto='Añadir Administrador'/>         
            </Link>       
        </div>

        <PaginacionAdministradores columnas={columnas} filas={datosAdministradores}/>
        <ToastContainer/>

    </div>
  )
}

export default Administradores