import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { GridColDef } from '@mui/x-data-grid'
import PaginacionTitulados from './PaginacionTitulados'
import { pruebaUsuarios } from '@/data/pruebaUsuarios'
import Image from 'next/image'
import Boton from '@/components/Diseño/Boton'
import axios from 'axios'

const columnas: GridColDef[] = [
  {
    field: "id", 
    headerName: "ID",
    width: 90
  },
    {
      field: "imagen", 
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => {
        return <Image src={`${process.env.NEXT_PUBLIC_URL}/imagenes/`+params.row.imagen || ""} alt='/umsa.png' width={50} height={50}/>
      }
    },
    {
      field: "nombre", 
      type: "string",
      headerName: "Nombre(s)",
      width: 90,
    },
    {
      field: "apellidoPaterno", 
      type: "string",
      headerName: "Apellido Paterno",
      width: 100,
    },
    {
      field: "apellidoMaterno", 
      type: "string",
      headerName: "Apellido Materno",
      width: 100,
    },
    {
      field: "ci", 
      type: "string",
      headerName: "C.I.",
      width: 100,
    },
    {
      field: "email", 
      type: "string",
      headerName: "Email",
      width: 100,
    },
    {
      field: "celular", 
      type: "number",
      headerName: "Celular",
      width: 100,
    }
  ]

const Titulados = () => {

  const [datosTitulados, setDatosTitulados] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/obtener_titulados`)
    .then(result => {
        if (result.data.status) {
            const titulados = result.data.result
              .filter((titulado: any) => titulado.administrador === 0 && titulado.id !== null && titulado.activo === 1)
              .sort((a: any, b: any) => b.id - a.id);
        

        setDatosTitulados(titulados);

            
        } else {
            alert(result.data.Error);
        }
    })
    .catch(err => console.log(err));
  }, [])
  
  

  return (
    <div>
        <div className='m-6 flex gap-4'>
            <h2 className='text-white text-xl'>Titulados</h2>
            <Link href={'anadirTitulado'}>
                <Boton texto='Añadir Titulado'/>
            </Link>
            
        </div>
       
        <PaginacionTitulados columnas={columnas} filas={datosTitulados}/>
    </div>
  )
}

export default Titulados