import {AdministradorContext} from '@/context/AministradorContext'
import axios from 'axios';
import Dashboard from '@/components/Administrador/Dashboard'
import NavBar from '@/components/Administrador/NavBar'
import DatosAdmin from '@/components/Administrador/gestionUsuarios/anadirAdministrador/Pasos/DatosAdmin';
import DatosBasicosAdmin from '@/components/Administrador/gestionUsuarios/anadirAdministrador/Pasos/DatosBasicosAdmin';
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


const Index = () => {

    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')
    const [emailError, setEmailError] = useState(false);

    const router = useRouter()

    const [pasoActual, setPasoActual] = useState(1)
    const [datosBasicos, setDatosBasicos] = useState<any>({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        ci: '',
        fechaNacimiento: '',
        celular: '',
        sexo: '',
        direccion: '',
        email: ''
    });
    const [datosAdministrador, setDatosAdministrador] = useState<any>({
        tituloCargo: '',
        tipoAdministrador: ''
    });

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateCI = (ci: string) => {
        const ciPattern = /^\d+[a-zA-Z]+$/;
        return ciPattern.test(datosBasicos.ci);
      };


    const handleClick = (dirrection: string) => {
        const camposVaciosDatosUsuarios = Object.entries(datosBasicos).filter(([key, value]) => value === "");
        

        //para controlar los errores de los datos basicos
        if (camposVaciosDatosUsuarios.length > 0) {
            setAlerta(true);
            setAlertaMensaje(`Los siguientes campos son obligatorios: ${camposVaciosDatosUsuarios.map(([key]) => key).join(", ")}`);
            setTimeout(() => {
              setAlerta(false)
            }, 5000)
            return; // Detener la función si hay campos vacíos
        }

        if (!validateEmail(datosBasicos.email)) {
            setEmailError(true);
            setAlerta(true);
            setAlertaMensaje('El correo electrónico no es válido');
            setTimeout(() => {
                setAlerta(false);
                setEmailError(false);
            }, 5000);
            return;
        }

        if (!validateCI(datosBasicos.ci)) {
            setAlerta(true);
            setAlertaMensaje("El C.I. debe incluir una extensión, por ejemplo: 123456lp");
            setTimeout(() => {
            setAlerta(false);
            }, 5000);
            return; // Detener la función si el C.I. no es válido
        }
        
        //Insertar en la base de datos
        if (pasoActual === pasos.length -1) {
            const camposVaciosDatosAdministrador = Object.entries(datosAdministrador).filter(([key, value]) => value === "");
            //para controlar los errores de los datos del administrador
        if (camposVaciosDatosAdministrador.length > 0) {
            setAlerta(true);
            setAlertaMensaje(`Los siguientes campos son obligatorios: ${camposVaciosDatosAdministrador.map(([key]) => key).join(", ")}`);
            setTimeout(() => {
            setAlerta(false)
            }, 5000)
            return; // Detener la función si hay campos vacíos
        }
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
                        {alerta && 
                            <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity="error">
                                {alertaMensaje}
                            </Alert>
                            </Stack>
                        }
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

export default Index