import Dashboard from '@/components/Administrador/Dashboard'
import NavBar from '@/components/Administrador/NavBar'
import BarraControl from '@/components/Administrador/gestionUsuarios/anadirTitulado/BarraControl'
import NavegacionControl from '@/components/Administrador/gestionUsuarios/anadirTitulado/NavegacionControl'
import DatosBasicos from '@/components/Administrador/gestionUsuarios/anadirTitulado/pasos/DatosBasicos'
import EstudiosPostGrado from '@/components/Administrador/gestionUsuarios/anadirTitulado/pasos/EstudiosPostGrado'
import React, {useState, useContext} from 'react'
import { PasoContext } from '@/context/PasoContext'
import axios from 'axios'
import ActividadLaboral from '@/components/Administrador/gestionUsuarios/anadirTitulado/pasos/ActividadLaboral'
import Finalizar from '@/components/Administrador/gestionUsuarios/anadirTitulado/pasos/Finalizar'
import DatosTitulado from '@/components/Administrador/gestionUsuarios/anadirTitulado/pasos/DatosTitulado'
import Investigaciones from '@/components/Administrador/gestionUsuarios/anadirTitulado/pasos/Investigaciones'
import ProduccionesIntelectual from '@/components/Administrador/gestionUsuarios/anadirTitulado/pasos/ProduccionesIntelectual'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const index = () => {
    
    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')

    const [pasoActual, setPasoActual] = useState(1)
    const [datosUsuario, setDatosUsuario] = useState<any>({
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
    const [datosTitulado, setDatosTitulado] = useState<any>('');
    const [estudiosPostGrado, setEstudiosPostGrado] = useState<any>([]);
    const [actividadesLaborales, setActividadesLaborales] = useState<any>([]);
    const [investigaciones, setInvestigaciones] = useState<any>([]);
    const [produccionesIntelectuales, setProduccionesIntelectuales] = useState<any>([]);
    const [datosFinales, setDatosFinales] =useState<any[]>([])
    

    const pasos = [
        "Datos Basicos",
        "Datos Titulado",
        "Estudios PostGrado",
        "Actividad Laboral",
        "Investigaciones",
        "Producciones Intelectuales",
        "Finalizar",

    ];


    
    const mostrarPasos = (paso: number) => {
        switch(paso) {
            case 1:
                return <DatosBasicos/>
            case 2:
                return <DatosTitulado/>
            case 3:
                return <EstudiosPostGrado/>
            case 4:
                return <ActividadLaboral/>
            case 5:
                return <Investigaciones/>
            case 6:
                return <ProduccionesIntelectual/>
            case 7:
                return <Finalizar/>
        }
    }


    const handleClick = (dirrection: string) => {
        const camposVaciosDatosUsuarios = Object.entries(datosUsuario).filter(([key, value]) => value === "");
        const camposVaciosDatosTitulado = Object.entries(datosTitulado).filter(([key, value]) => value === "");

        //para controlar los errores de los datos basicos
        if (camposVaciosDatosUsuarios.length > 0) {
            setAlerta(true);
            setAlertaMensaje(`Los siguientes campos son obligatorios: ${camposVaciosDatosUsuarios.map(([key]) => key).join(", ")}`);
            setTimeout(() => {
              setAlerta(false)
            }, 5000)
            return; // Detener la función si hay campos vacíos
        }
        //para controlar los errores de los datos del titulado
        if (camposVaciosDatosTitulado.length > 0) {
            setAlerta(true);
            setAlertaMensaje(`Los siguientes campos son obligatorios: ${camposVaciosDatosTitulado.map(([key]) => key).join(", ")}`);
            setTimeout(() => {
              setAlerta(false)
            }, 5000)
            return; // Detener la función si hay campos vacíos
        }
        //Insertar en la base de datos
        if (pasoActual === pasos.length -1) {
            axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_persona`, datosUsuario)
            .then(result => {
                if (result.data.status) { 

                    const personaId = result.data.id;
                    
                    axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_usuario`, {personaId})
                    .then(result => {
                        if (result.data.status) {
                            const usuarioId = result.data.id;
                            
                            
                            setDatosTitulado({...datosTitulado, usuarioId: usuarioId})

                            // Crear un FormData
                            const formData = new FormData();
                            // Agregar cada campo de datosTitulado al FormData
                            Object.entries(datosTitulado).forEach(([key, value]) => {
                                formData.append(key, value);
                            });

                            // Agregar usuarioId al FormData
                            formData.append('usuarioId', usuarioId);

                        
                            axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_datos_titulado`, formData)
                            .then(result => {
                                if (result.data.status) 
                                {
                                    
                                    const tituladoId = result.data.id;
                                    // Crear FormData y agregar los campos
                                    const formData = new FormData();
                                    
                                    //Añadir el estudio postgrado
                                    estudiosPostGrado.forEach(estudio => {
                                        const formData = new FormData();
                                            formData.append('tituladoId', tituladoId);
                                            formData.append('aInicioPostGrado', estudio.aInicioPostGrado);
                                            formData.append('tituloCursoPostGrado', estudio.tituloCursoPostGrado);
                                            formData.append('tipoEstudioPostGrado', estudio.tipoEstudioPostGrado);
                                            formData.append('gradoAcademicoPostGrado', estudio.gradoAcademicoPostGrado);
                                            formData.append('aGraduacionPostGrado', estudio.aGraduacionPostGrado);
                                            formData.append('modalidadGraduacionPostGrado', estudio.modalidadGraduacionPostGrado);
                                            formData.append('tituloTrabajoPostGrado', estudio.tituloTrabajoPostGrado);
                                            formData.append('titulo', estudio.titulo);

                                        
                                        axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_estudio`, formData)
                                        .then(result => {
                                            if (result.data.status) {

                                            } else {
                                                console.log(result.data.Error);
                                                
                                            }
                                        }).catch(err => console.log(err))   

                                        
                                    
                                    })  
                                        //Añadir las actividades laborales
                                    actividadesLaborales.forEach(actividad => {
                                        

                                        const datosActividadesLaborales = {
                                        tituladoId: tituladoId,
                                        aIngresoTrabajo: actividad.aIngresoTrabajo,
                                        aFinalisacionTrabajo: actividad.aFinalisacionTrabajo, 
                                        estaTrabajando: actividad.estaTrabajando,
                                        cargoOTareaTrabajo : actividad.cargoOTareaTrabajo,
                                        duracionTrabajo : actividad.duracionTrabajo,
                                        institucionTrabajo : actividad.institucionTrabajo,
                                        estadoActividadLaboralId : actividad.estadoActividadLaboralId
                                        }
                                        axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_actividad_laboral`, datosActividadesLaborales)
                                        .then(result => {
                                            if (result.data.status) {
                                            } else {
                                                console.log(result.data.Error);
                                                
                                            }
                                        }).catch(err => console.log(err))   

                                        
                                    
                                    })

                                    //Añadir las investigaciones
                                    investigaciones.forEach(investigacion => {                                       

                                        const datosInvestigaciones = {
                                        tituladoId: tituladoId,
                                        aInvestigacion: investigacion.aInvestigacion,
                                        temaInvestigacion: investigacion.temaInvestigacion, 
                                        institucionInvestigacion: investigacion.institucionInvestigacion,
                                        publicacionId : investigacion.publicacionId,                                       
                                        }
                                        axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_investigaciones`, datosInvestigaciones)
                                        .then(result => {
                                            if (result.data.status) {
                                            } else {
                                                console.log(result.data.Error);
                                                
                                            }
                                        }).catch(err => console.log(err))   

                                        
                                    
                                    })

                                    //Añadir las Producciones Intelectuales
                                    produccionesIntelectuales.forEach(produccion => {                                       

                                        const datosProduccionesIntelectual = {
                                        tituladoId: tituladoId,
                                        aProduccion: produccion.aProduccion,
                                        temaProduccion: produccion.temaProduccion, 
                                        institucionProduccion: produccion.institucionProduccion,
                                        publicacionId : produccion.publicacionId,  
                                        formaTrabajoProduccionId : produccion.formaTrabajoProduccionId,                                       
                                        }
                                        axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_produccion_intelectual`, datosProduccionesIntelectual)
                                        .then(result => {
                                            if (result.data.status) {
                                            } else {
                                                console.log(result.data.Error);
                                                
                                            }
                                        }).catch(err => console.log(err))   

                                        
                                    
                                    })



                          
                                }
                                else {
                                    console.log(result.data.Error);
                                    
                                }
                            }).catch(err => console.log(err))
                            
                        }else {
                            console.log(result.data.Error);
                            
                        }
                    }).catch(err => console.log(err))
                }
                
            
                
            }).catch(err => console.log(err) )
            
        }

        
        let nuevoPaso = pasoActual;
        dirrection === "siguiente" ? nuevoPaso++ : nuevoPaso--

        nuevoPaso > 0 && nuevoPaso <= pasos.length && setPasoActual(nuevoPaso)

        
        
          
    }

  return (
    <Dashboard>
        <main>
            <NavBar titulo='Añadir Titulado'/>
            <div className='md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 bg-white mb-5'>
            
                    {/* Pasos */}
                <div className='container mt-5'>
                    <BarraControl
                        pasos = {pasos}
                        pasoActual = {pasoActual}
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
                        <PasoContext.Provider
                            value={{
                                datosUsuario,
                                setDatosUsuario,
                                datosTitulado,
                                setDatosTitulado,
                                estudiosPostGrado,
                                setEstudiosPostGrado,
                                actividadesLaborales,
                                setActividadesLaborales,
                                investigaciones,
                                setInvestigaciones,
                                produccionesIntelectuales,
                                setProduccionesIntelectuales,
                                datosFinales,
                                setDatosFinales,
                                alerta,
                                setAlerta,
                                alertaMensaje,
                                setAlertaMensaje
                            }}
                        >
                            {mostrarPasos(pasoActual)}
                        </PasoContext.Provider>
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
       
        
    </Dashboard>
    
  )
}
    
export default index