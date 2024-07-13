import { useState, useEffect } from 'react';
import Actividadeslaborales from '@/components/Registro/Pasos/Actividadeslaborales';
import EstudiosPostgrado from '@/components/Registro/Pasos/EstudiosPostgrado';
import Investigaciones from '@/components/Registro/Pasos/Investigaciones';
import ProduccionesIntelectuales from '@/components/Registro/Pasos/ProduccionesIntelectuales';
import React from 'react'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import {RegistroContext} from '@/context/RegistroContext'
import BarraControl from '@/components/Registro/BarraControl';
import NavegacionControl from '@/components/Registro/NavegacionControl';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option
  } from "@material-tailwind/react";
import DatosTitulado from '@/components/Registro/Pasos/DatosTitulado';
import Finalizar from '@/components/Registro/Pasos/Finalizar';

interface EstudioPostGrado {
    aInicioPostGrado: string;
    tituloCursoPostGrado: string;
    tipoEstudioPostGrado: string;
    gradoAcademicoPostGrado: string;
    aGraduacionPostGrado: string;
    modalidadGraduacionPostGrado: string;
    tituloTrabajoPostGrado: string;
    titulo: string;
}

interface ActividadLaboral {
    aIngresoTrabajo: string;
    aFinalisacionTrabajo: string | null; 
    estaTrabajando: string;
    cargoOTareaTrabajo: string;
    duracionTrabajo: string;
    institucionTrabajo: string;
    estadoActividadLaboralId: number | null; 
}

interface Investigacion {
    aInvestigacion: string;
    temaInvestigacion: string;
    institucionInvestigacion: string;
    publicacionId: number;
}

interface ProduccionIntelectual {
    aProduccion: string;
    temaProduccion: string;
    institucionProduccion: string;
    publicacionId: string; 
    formaTrabajoProduccionId: string; 
}

const Index = () => {
    const router = useRouter()
    const{id} = router.query;

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
        email: '',
        otro: ''

    });
    const [datosTitulado, setDatosTitulado] = useState({
        aEgreso: '',
        aExperienciaLaboral: '',
        aIngreso: '',
        aTitulacion: '',
        areaTrabajoId: '',
        formaTrabajoId: '',
        gradoAcademicoId: '',
        modalidadTitulacionId: ''
    })
    const [estudiosPostGrado, setEstudiosPostGrado] = useState<any>([]);
    const [actividadesLaborales, setActividadesLaborales] = useState<any>([]);
    const [investigaciones, setInvestigaciones] = useState<any>([]);
    const [produccionesIntelectuales, setProduccionesIntelectuales] = useState<any>([]);


    const pasos = [
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
                return <DatosTitulado/>
            case 2:
                return <EstudiosPostgrado/>
            case 3:
                return <Actividadeslaborales/>
            case 4:
                return <Investigaciones/>
            case 5:
                return <ProduccionesIntelectuales/>
            case 6:
                return <Finalizar/>

        }
    }

    useEffect(() => {
        if (router.isReady) {
            if (!id) {
                router.push('/pagina404'); // Redirige a una página de error si falta email o userId
            }
        }
    }, [router.isReady, id, router]);

    const handleClick = (dirrection: string) => {
        const camposVaciosDatosTitulado = Object.entries(datosTitulado).filter(([key, value]) => value === "");
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
            const {id} = router.query;

            // Crear un FormData
            const formData = new FormData();
            // Agregar cada campo de datosTitulado al FormData
            Object.entries(datosTitulado).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // Agregar el id al FormData
            formData.append('usuarioId', id as string);
    
            axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_datos_titulado`, formData)
            .then(result => {
                if (result.data.status) 
                {
                    if (result.data.status) 
                        {
                            
                            const tituladoId = result.data.id;
                            // Crear FormData y agregar los campos
                            const formData = new FormData();
                            
                            //Añadir el estudio postgrado
                            estudiosPostGrado.forEach((estudio: EstudioPostGrado) => {
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
                            actividadesLaborales.forEach((actividad: ActividadLaboral)  => {
                                

                                const datosActividadesLaborales = {
                                tituladoId: tituladoId || '',
                                aIngresoTrabajo: actividad.aIngresoTrabajo || '',
                                aFinalisacionTrabajo: actividad.aFinalisacionTrabajo || null, 
                                estaTrabajando: actividad.estaTrabajando || '',
                                cargoOTareaTrabajo : actividad.cargoOTareaTrabajo || '',
                                duracionTrabajo : actividad.duracionTrabajo || '',
                                institucionTrabajo : actividad.institucionTrabajo || '',
                                estadoActividadLaboralId : actividad.estadoActividadLaboralId || null
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
                            investigaciones.forEach((investigacion: Investigacion)  => {                                       

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
                            produccionesIntelectuales.forEach((produccion: ProduccionIntelectual) => {                                       

                                const datosProduccionesIntelectual = {
                                tituladoId: tituladoId ||'',
                                aProduccion: produccion.aProduccion ||'',
                                temaProduccion: produccion.temaProduccion ||'', 
                                institucionProduccion: produccion.institucionProduccion ||'',
                                publicacionId : produccion.publicacionId ||'',  
                                formaTrabajoProduccionId : produccion.formaTrabajoProduccionId ||'',                                       
                                }
                                axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_produccion_intelectual`, datosProduccionesIntelectual)
                                .then(result => {
                                    if (result.data.status) {
                                        router.push('/')
                                    } else {
                                        console.log(result.data.Error);
                                        
                                    }
                                }).catch(err => console.log(err))   

                                
                            
                            })



                  
                        }
                        else {
                            console.log(result.data.Error);
                            
                        }
                }
            }).catch(err => console.log(err))
        }

        let nuevoPaso = pasoActual;
        dirrection === "siguiente" ? nuevoPaso++ : nuevoPaso--

        nuevoPaso > 0 && nuevoPaso <= pasos.length && setPasoActual(nuevoPaso)

    }


  return (
    <div className='md:w-4/5 mx-auto shadow-xl rounded-2xl pb-2 bg-white mb-5'>
        
            
                    {/* Pasos */}
                <div className='container mt-5'>
                
                    <Typography color="gray" className="mt-1 m-3 font-normal text-3xl" placeholder>
                    Cuenta creada Exitosamente
                    </Typography>
                    <Typography color="gray" className="mt-1 m-3 font-normal" placeholder>
                    Puede llenar el siguiente formulario por pasos para completar el registro
                    </Typography>

                    <BarraControl
                        pasos = {pasos}
                        pasoActual = {pasoActual}
                    />

                        {alerta && 
                            <Stack sx={{ width: '100%' }} spacing={2} className='mt-10'>
                                <Alert variant="filled" severity="error">
                                    {alertaMensaje}
                                </Alert>
                            </Stack>
                        }
                    

                     {/* Componentes de visualisación */}
                     <div className='my-10 p-10'>
                     <Typography placeholder>(*) Es Obligatorio</Typography>
                        <RegistroContext.Provider
                            value={{    
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
                            }}
                        >
                            {mostrarPasos(pasoActual)}
                        </RegistroContext.Provider>
                        
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
  )
}

export default Index