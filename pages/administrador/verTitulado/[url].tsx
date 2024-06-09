import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@tremor/react';
import Dashboard from '@/components/Administrador/Dashboard';
import NavBar from '@/components/Administrador/NavBar';
import DatosBasicosTitulado from '@/components/Administrador/titulados/datosBasicosTitulado';
import DatosSecundariosTitulado from '@/components/Administrador/titulados/DatosSecundariosTitulado';
import EstudiosTitulado from '@/components/Administrador/titulados/EstudiosTitulado';
import ActividadesTitulado from '@/components/Administrador/titulados/ActividadesTitulado';
import InvestigacionesTitulado from '@/components/Administrador/titulados/InvestigacionesTitulado';
import ProduccionesTitulado from '@/components/Administrador/titulados/ProduccionesTitulado';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PacmanLoader from "react-spinners/PacmanLoader";
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

type PropsEstudioPostGrado = {
    aInicioPostGrado: string;
    tituloCursoPostGrado: string;
    modalidadGraduacionPostGrado: string;
    aGraduacionPostGrado: string;
    gradoAcademicoPostGrado: string;
    tipoEstudioPostGrado: string;
    tituloTrabajoPostGrado: string;
};

type PropsActividadesLaborales = {
    aFinalisacionTrabajo: string;
    aIngresoTrabajo: string;
    cargoOTareaTrabajo: string;
    duracionTrabajo: string;
    estaTrabajando: string;
    institucionTrabajo: string;
    tituloEstado: string;
};

type PropsInvestigaciones = {
    aInvestigacion: string;
    temaInvestigacion: string;
    institucionInvestigacion: string;
    tipoPublicacion: string;
};

type PropsProduccionesIntelectuales = {
    aProduccion: string;
    temaProduccion: string;
    institucionProduccion: string;
    tipoPublicacion: string;
    nombreFormaTrabajoProduccion: string;
};

const DatosTitulado = () => {
    const router = useRouter();
    const { url } = router.query;

    const [datos, setDatos] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        ci: "",
        fechaNacimiento: "",
        celular: "",
        sexo: "",
        direccion: "",
        email: "",
        imagen: "",
        aIngreso: "",
        aEgreso: "",
        aTitulacion: "",
        aExperienciaLaboral: "",
        tituloGradoAcademico: "",
        tituloModalidadTitulacion: "",
        tituloFormaTrabajo: "",
        tituloAreaTrabajo: "",
    });

    const [loading, setLoading] = useState(true);
    const [estudiosPostGrado, setEstudiosPostGrado] = useState<PropsEstudioPostGrado[]>([]);
    const [actividadesLaborales, setActividadesLaborales] = useState<PropsActividadesLaborales[]>([]);
    const [investigaciones, setInvestigaciones] = useState<PropsInvestigaciones[]>([]);
    const [produccionesIntelectuales, setProduccionesIntelectuales] = useState<PropsProduccionesIntelectuales[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tituladoResult, estudiosResult, laboralResult, investigacionesResult, produccionesResult] = await Promise.all([
                    axios.get('http://localhost:8000/titulado/ver_titulado/' + url),
                    axios.get('http://localhost:8000/titulado/verestudiosPostGrado/' + url),
                    axios.get('http://localhost:8000/titulado/verlaboral/' + url),
                    axios.get('http://localhost:8000/titulado/verinvestigaciones/' + url),
                    axios.get('http://localhost:8000/titulado/verproduccionesIntelectuales/' + url),
                ]);

                if (tituladoResult.data.status) {
                    setDatos(tituladoResult.data.result[0]);
                }
                if (estudiosResult.data.status) {
                    setEstudiosPostGrado(estudiosResult.data.result);
                }
                if (laboralResult.data.status) {
                    setActividadesLaborales(laboralResult.data.result);
                }
                if (investigacionesResult.data.status) {
                    setInvestigaciones(investigacionesResult.data.result);
                }
                if (produccionesResult.data.status) {
                    setProduccionesIntelectuales(produccionesResult.data.result);
                }
                 // Simular un retraso antes de cambiar el estado de carga
            setTimeout(() => {
                setLoading(false);
            }, 2000);
                
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }
    }, [url]);

    if (loading) {
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <PacmanLoader color="rgba(0, 54, 61, 1)" />
        </div>
    }

    //Generar reporte en pdf
    const handleGenerarPDF = () => {
        // Crea un objeto jsPDF
        const pdf = new jsPDF();
        const imagen = '/Imagenes Login/images.png'
        
        // Agrega contenido al PDF
        pdf.addImage(imagen, 'PNG', 0, 0, 20, 20);
        pdf.text('CARRERA DE PSICOLOGÍA - INFORME DE TITULADO', 30, 10);
        pdf.addImage(`http://localhost:8000/imagenes/`+datos?.imagen, 'PNG', 30, 15, 50, 50);
        // pdf.text(`${datos.nombre}`, 40, 30);
    
        //Crear la tabla
        const columnas = ['Datos Basicos','']
    
        const data = [
          ['Nombre:',`${datos.nombre}`], 
          ['Apellido:',`${datos.apellidoPaterno}`], 
          ['Cedula de Identidad:',`${datos.ci}`],
          ['Email:',`${datos.email}`],
          ['Fecha de Nacimiento:',`${datos.fechaNacimiento}`],
          ['Celular:',`${datos.celular}`],
          ['GradoAcademico',`${datos?.tituloGradoAcademico}`],
          ['Forma de Trabajo Profesional',`${datos?.tituloFormaTrabajo}`],
          ['Modalidad de Titulación',`${datos?.tituloModalidadTitulacion}`],
          
        ]
    
    
        // pdf.autoTable({
        //   startY:30,
        //   head: [columnas],
        //   body: data  
        // })
    
        autoTable(pdf , {
          startY:60,
          head:[columnas],
          body: data,
          theme:'striped'
        })

        let finalY = 60;
    
        const drawTable = (startY: any, head: any, body: any) => {
            autoTable(pdf, {
              startY,
              head: [head],
              body: body,
              theme: 'striped',
              didDrawPage: (data) => {
                finalY = data.cursor.y;
              }
            });
          };
        
          // Dibujar la tabla de datos básicos
          drawTable(finalY, columnas, data);
    
        //para los estudios postgrado
        pdf.text('ESTUDIOS POST GRADO', 20, finalY + 10);
        const columnasEstudios = ['Año de Estudio','Titulo de Curso', 'Modalidad de Graduación', 'Año de Graduación', 'Grado Academico', 'Tipo de Estudio', 'Titulo Trabajo Final']
    
        const datosEstudios = 
          estudiosPostGrado.map(estudio => (
            [`${estudio.aInicioPostGrado}`, `${estudio.tituloCursoPostGrado}`, `${estudio.modalidadGraduacionPostGrado}`, `${estudio.aGraduacionPostGrado}`, `${estudio.gradoAcademicoPostGrado}`, `${estudio.tipoEstudioPostGrado}`, `${estudio.tituloTrabajoPostGrado}`]
          ))
        
    
          drawTable(finalY + 15, columnasEstudios, datosEstudios);
    
        
    
        //para los estudios postgrado
        pdf.text('HISTORIAL LABORAL', 20, finalY + 10);
        const columnasLaboral = ['Institución','Año de Finalisación', 'Cargo o Tarea', 'Año de Ingreso', 'Esta Trabajando?', 'Estado']
    
        const datosLaboral = 
          actividadesLaborales.map(actividad => (
            [`${actividad.institucionTrabajo}`, `${actividad.aFinalisacionTrabajo}`, `${actividad.cargoOTareaTrabajo}`, `${actividad.aIngresoTrabajo}`, `${actividad.estaTrabajando}`, `${actividad.tituloEstado}`]
          ))
        
    
          drawTable(finalY + 15, columnasLaboral, datosLaboral);

        //para las investigaciones
        pdf.text('INVESTIGACIONES', 20, finalY + 10);
        const columnasInvestigaciones = ['Año','Tema', 'Institución', 'Tipo de Publicación']
    
        const datosInvestigaciones = 
          investigaciones.map(investigacion => (
            [`${investigacion.aInvestigacion}`, `${investigacion.temaInvestigacion}`, `${investigacion.institucionInvestigacion}`, `${investigacion.tipoPublicacion}`]
          ))
        
    
          drawTable(finalY + 15, columnasInvestigaciones, datosInvestigaciones);

         //para las producciones intelectuales
         pdf.text('PRODUCCIONES INTELECTUALES', 20, finalY + 10);
         const columnasProducciones = ['Año','Tema', 'Institución', 'Tipo de Publicación', 'Forma de Trabajo']
     
         const datosProducciones = 
           produccionesIntelectuales.map(produccion => (
             [`${produccion.aProduccion}`, `${produccion.temaProduccion}`, `${produccion.institucionProduccion}`, `${produccion.tipoPublicacion}`, `${produccion.nombreFormaTrabajoProduccion}`]
           ))
         
           drawTable(finalY + 15, columnasProducciones, datosProducciones);
    
        // Descarga el PDF
        pdf.save('informe.pdf');   
      };


    return (
        <Dashboard>
            <div>
                <NavBar titulo={`Datos Titulado : ${datos.nombre} ${datos.apellidoPaterno} ${datos.apellidoMaterno}`} />
                <div className='m-5 flex flex-col gap-4 w-[95%] text-[8px]'>
                    <div className='bg-white bg-opacity-90 flex-1 rounded-2xl'>
                        <div className='m-4 flex flex-col'>
                            <div className='flex justify-between'>
                                <Image
                                    src={datos && datos.imagen ? `http://localhost:8000/imagenes/${datos.imagen}` : '/public/imagen Login/images.png'}
                                    width={70}
                                    height={70}
                                    alt=''
                                    className='rounded-full'
                                />
                                <div>
                                    <Button
                                        className=' bg-teal-800 hover:bg-teal-500 text-white m-1 rounded-lg ml-40'
                                        onClick={handleGenerarPDF}
                                    >
                                        Generar Reporte (pdf)
                                    </Button>
                                </div>
                            </div>
                            <DatosBasicosTitulado datos={datos} />
                        </div>
                        <div className='m-4 flex flex-col'>
                            <DatosSecundariosTitulado datos={datos} />
                        </div>
                    </div>
                    <div className='bg-white bg-opacity-90 flex-1 rounded-2xl'>
                        {/* ESTUDIOS POSTGRADO */}
                        <EstudiosTitulado 
                            estudiosPostGrado={estudiosPostGrado} 
                            setEstudiosPostGrado={setEstudiosPostGrado}
                        />
                        {/* ACTIVIDAES LABORALES */}
                        <ActividadesTitulado 
                            actividadesLaborales={actividadesLaborales} 
                            setActividadesLaborales={setActividadesLaborales}
                        />
                        {/* INVESTIGACIONES */}
                        <InvestigacionesTitulado investigaciones={investigaciones} 
                            
                        />
                        {/* PRODUCCIONES INTELECTUALES */}
                        <ProduccionesTitulado 
                            produccionesIntelectuales={produccionesIntelectuales} 
                            setProduccionesIntelectuales={setProduccionesIntelectuales}
                        />
                    </div>
                </div>
                <div className='flex justify-end mb-8 mr-4 gap-4'>
                    <Button className=' bg-red-800 hover:bg-red-400 text-white m-1 rounded-lg '>
                        Eliminar
                    </Button>
                </div>
                <ToastContainer />
            </div>
        </Dashboard>
    );
};

export default DatosTitulado;