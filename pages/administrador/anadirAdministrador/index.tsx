import {AdministradorContext} from '@/context/AministradorContext'
import axios from 'axios';
import Dashboard from '@/components/Administrador/Dashboard'
import NavBar from '@/components/Administrador/NavBar'
import DatosAdmin from '@/components/Administrador/gestionUsuarios/anadirAdministrador/Pasos/DatosAdmin';
import DatosBasicosAdmin from '@/components/Administrador/gestionUsuarios/anadirAdministrador/Pasos/DatosBasicosAdmin';
import DatosCargo from '@/components/Administrador/gestionUsuarios/anadirAdministrador/Pasos/DatosCargo';
import BarraControl from '@/components/Administrador/gestionUsuarios/anadirTitulado/BarraControl'
import Finalizar from '@/components/Administrador/gestionUsuarios/anadirTitulado/pasos/Finalizar';
import React , {useState}from 'react'
import NavegacionControl from '@/components/Administrador/gestionUsuarios/anadirTitulado/NavegacionControl';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const pasos = [
    "Datos Basicos",
    "Datos Administrador",
    "Finalizar"

];

const mostrarPasos = (paso: number) => {
    switch(paso) {
        case 1:
            return <DatosBasicosAdmin/>
        case 2:
            return <DatosAdmin/>
        case 3:
            return <Finalizar/>

    }
}

const index = () => {

    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')

    const router = useRouter()

    const [pasoActual, setPasoActual] = useState(1)
    const [datosBasicos, setDatosBasicos] = useState<any>('');
    const [datosAdministrador, setDatosAdministrador] = useState<any>('');


    const handleClick = (dirrection: string) => {
        //Insertar en la base de datos
        if (pasoActual === pasos.length -1) {
           axios.post(`${process.env.NEXT_PUBLIC_URL}/administradores/add_persona_administrador`, datosBasicos)
           .then(result => {
                if (result.data.status) {
                    const personaId = result.data.id;

                    axios.post(`${process.env.NEXT_PUBLIC_URL}/administradores/add_usuario_administrador`, {personaId})
                   .then(result => {
                        if(result.data.status) {
                            const usuarioId = result.data.id;
                            axios.post(`${process.env.NEXT_PUBLIC_URL}/administradores/add_cargo_administrador`, {...datosAdministrador, usuarioId})
                            .then(result => {
                                if(result.data.status){
                                    toast.success('Administrador Añadido Correctamente', {
                                        autoClose: 2000,
                                        onClose: () => router.push('/administrador/usuarios')
                                    })
                                } else {
                                    console.log(result.data.Error)
                                }
                            }).catch(err => {console.log(err)})
                        }else {
                            console.log(result.data.Error)
                        }
                   }).catch(err => {console.log(err)})
                }else{
                    console.log(result.data.Error)
                }
        }).catch(err => console.log(err))
            
        }
      
        let nuevoPaso = pasoActual;
        dirrection === "siguiente" ? nuevoPaso++ : nuevoPaso--

        nuevoPaso > 0 && nuevoPaso <= pasos.length && setPasoActual(nuevoPaso)

        
        
          
    }
    

  return (
    <Dashboard>
        <main>
            <NavBar titulo='Añadir Administrador'/>
            <div className='md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 bg-white mb-5'>
                <div className='container mt-5'>
                    <BarraControl
                        pasos = {pasos}
                        pasoActual={pasoActual}
                    />

                    {/* Componentes de visualisación */}

                    <div className='my-10 p-10'>
                        <AdministradorContext.Provider
                            value={{
                                datosBasicos,
                                setDatosBasicos,
                                datosAdministrador,
                                setDatosAdministrador,
                                
                            }}
                        >
                            {mostrarPasos(pasoActual)}
                        </AdministradorContext.Provider>

                    </div>
                </div>

                {/* Navegacion */}
                {pasoActual !== pasos.length &&
                    <NavegacionControl
                        handleClick = {handleClick}
                        pasoActual={pasoActual}
                        pasos={pasos}
                    />
                    }
            </div>

        </main>
        <ToastContainer/>
    </Dashboard>
  )
}

export default index