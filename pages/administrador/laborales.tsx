import NavBar from '@/components/Administrador/NavBar'
import Dashboard from '@/components/Administrador/Dashboard'
import React, {useState, useEffect} from 'react'
import PaginacionOfertas from '@/components/Administrador/ofertasLaborales/PaginacionOfertas'
import { GridColDef } from '@mui/x-data-grid'
import axios from 'axios'
import Boton3 from '@/components/Diseño/Boton3'
import ModalOfertas from '@/components/Administrador/ofertasLaborales/ModalOfertas'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const columnas: GridColDef[] = [
  {
    field: "id", 
    headerName: "ID",
    width: 10
  },
  {
    field: "titulo", 
    type: "string",
    headerName: "Titulo",
    width: 90,
  },
  {
    field: "descripcion", 
    type: "string",
    headerName: "Descripcion",
    width: 150,
  },
  {
    field: "ubicacion", 
    type: "string",
    headerName: "Ubicacion",
    width: 100,
  },

  {
    field: "telefono", 
    type: "string",
    headerName: "Teléfono o Celular",
    width: 80,
  },
  {
    field: "salario", 
    type: "number",
    headerName: "Salario",
    width: 100,
  },

  {
    field: "fechaVencimiento", 
    type: "string",
    headerName: "Fecha de Vencimiento",
    width: 120,
  }
]


const Laborales = () => {

  const [datosLaborales, setDatosLaborales] = useState([])
  const [abrirModal, setAbrirModal] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/ofertas/obtener_ofertas`)
      .then(result => {
        if (result.data.status) {
          const ofertasFiltradas = result.data.result.filter((dato: any) => dato.activo === 1);
          setDatosLaborales(ofertasFiltradas);
        }
      })
      .catch(err => console.log(err))
  },[])

  

  return (
    <body className='bg-menuColor1'>
        <Dashboard>
            <main className='min-h-screen '>
                <NavBar titulo='Ofertas Laborales'/>
                <div className='m-5'>
                  <Boton3                 
                    texto='Añadir Oferta Laboral' 
                    onClick={() => setAbrirModal(true)}
                  />

                  {abrirModal && 
                    <ModalOfertas
                      setAbrirModal={setAbrirModal}
                    />
                  }
                </div>
               
                <PaginacionOfertas columnas={columnas} filas={datosLaborales}/>
            </main>
            <ToastContainer/>
        </Dashboard>
    </body>
  )
}

export default Laborales