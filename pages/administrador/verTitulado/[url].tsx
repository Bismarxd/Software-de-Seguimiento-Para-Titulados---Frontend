import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@tremor/react';
import Dashboard from '@/components/Administrador/Dashboard';
import NavBar from '@/components/Administrador/NavBar';
import DatosBasicosTitulado from '@/components/Administrador/titulados/DatosBasicosTitulado';
import DatosSecundariosTitulado from '@/components/Administrador/titulados/DatosSecundariosTitulado';
import EstudiosTitulado from '@/components/Administrador/titulados/EstudiosTitulado';
import ActividadesTitulado from '@/components/Administrador/titulados/ActividadesTitulado';
import InvestigacionesTitulado from '@/components/Administrador/titulados/InvestigacionesTitulado';
import ProduccionesTitulado from '@/components/Administrador/titulados/ProduccionesTitulado';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PacmanLoader from "react-spinners/PacmanLoader";
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import LoginPrivado from '@/components/RutasPrivadas/LoginPrivado';

type PropsEstudioPostGrado = {
    id: number;
    aInicioPostGrado: string;
    tituloCursoPostGrado: string;
    modalidadGraduacionPostGrado: string;
    aGraduacionPostGrado: string;
    gradoAcademicoPostGrado: string;
    tipoEstudioPostGrado: string;
    tituloTrabajoPostGrado: string;
    titulo: string;
};


type PropsActividadesLaborales = {
    aFinalisacionTrabajo: string;
    aIngresoTrabajo: string;
    cargoOTareaTrabajo: string;
    duracionTrabajo: string;
    estaTrabajando: string;
    institucionTrabajo: string;
    tituloEstado: string;
    actividadLaboralId: number;
};

type PropsInvestigaciones = {
    aInvestigacion: string;
    temaInvestigacion: string;
    institucionInvestigacion: string;
    tipoPublicacion: string;
    investigacionId: number;
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

    const [administrador, setAdministrador] = useState({
        tipoAdministrador: 0,
        usuarioId: ''
       })

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
        usuarioId: '',
        personaId: ''
    });

    const [loading, setLoading] = useState(true);
    const [estudiosPostGrado, setEstudiosPostGrado] = useState<PropsEstudioPostGrado[]>([]);
    const [actividadesLaborales, setActividadesLaborales] = useState<PropsActividadesLaborales[]>([]);
    const [investigaciones, setInvestigaciones] = useState<PropsInvestigaciones[]>([]);
    const [produccionesIntelectuales, setProduccionesIntelectuales] = useState<PropsProduccionesIntelectuales[]>([]);

    const [imagen, setImagen] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tituladoResult, estudiosResult, laboralResult, investigacionesResult, produccionesResult] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/ver_titulado/` + url),
                    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/verestudiosPostGrado/` + url),
                    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/verlaboral/` + url),
                    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/verinvestigaciones/` + url),
                    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/verproduccionesIntelectuales/` + url),
                ]);

                if (tituladoResult.data.status) {
                    setDatos(tituladoResult.data.result[0]);
                }
                if (estudiosResult.data.status) {
                    const estudiosActivos = estudiosResult.data.result.filter((estudio:any) => estudio.activo === 1);
                    setEstudiosPostGrado(estudiosActivos);
                }
                if (laboralResult.data.status) {
                    const activiadesActivos = laboralResult.data.result.filter((actividad:any) => actividad.activo === 1);
                    setActividadesLaborales(activiadesActivos   );
                }
                if (investigacionesResult.data.status) {
                    const investigacionesActivos = investigacionesResult.data.result.filter((investigacion:any) => investigacion.activo === 1);
                    setInvestigaciones(investigacionesActivos);
                }
                if (produccionesResult.data.status) {
                    const produccionesActivos = produccionesResult.data.result.filter((produccion: any) => produccion.activo === 1)
                    setProduccionesIntelectuales(produccionesActivos);
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

        //para traer los datos del administrador
        const id = localStorage.getItem('userId')
        axios.get(`${process.env.NEXT_PUBLIC_URL}/administradores/obtener_admninistrador/${id}`)
       .then(result => {
            if(result.data.status){
                setAdministrador(result.data.result[0])
    
            }
       }).catch(err => console.log(err))
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
        const imagen = '/Imagenes Login/margen.jpeg'
        
        // Agrega contenido al PDF
        pdf.addImage(imagen, 'JPEG', 0, 0, pdf.internal.pageSize.width, 20);
        
        pdf.addImage(`${process.env.NEXT_PUBLIC_URL}/imagenes/`+datos?.imagen, 'PNG', 20, 25, 30, 30);
        // pdf.text(`${datos.nombre}`, 40, 30);
    
        //Crear la tabla
        const columnas = ['Datos Basicos','']
    
        const data = [
          ['Nombre:',`${datos.nombre}`], 
          ['Apellido Paterno:',`${datos.apellidoPaterno}`], 
          ['Apellido Materno:',`${datos.apellidoMaterno}`], 
          ['Cedula de Identidad:',`${datos.ci}`],
          ['Email:',`${datos.email}`],
          ['Fecha de Nacimiento:',`${datos.fechaNacimiento}`],
          ['Celular:',`${datos.celular}`],
          ['Año de Ingreso:',`${datos.aIngreso}`],
          ['Año de Egreso:',`${datos.aEgreso}`],
          ['Año de Titulación:',`${datos.aTitulacion}`],
          ['Años de Experiencia Laboral:',`${datos.aExperienciaLaboral}`],
          ['GradoAcademico',`${datos?.tituloGradoAcademico}`],
          ['Modalidad de Titulación',`${datos?.tituloModalidadTitulacion}`],
          ['Forma de Trabajo Profesional',`${datos?.tituloFormaTrabajo}`],
          ['Área de Trabajo Profesional',`${datos?.tituloAreaTrabajo}`],
          
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
          theme:'grid'
        })

        let finalY = 60;
    
        const drawTable = (startY: any, head: any, body: any) => {
            autoTable(pdf, {
              startY,
              head: [head],
              body: body,
              theme: 'grid',
              didDrawPage: (data) => {
                if (data.cursor) {
                    finalY = data.cursor.y;
                }
            
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
        const columnasLaboral = ['Institución','Año de Finalisación', 'Cargo o Tarea', 'Año de Ingreso', 'Esta Trabajando?']
    
        const datosLaboral = 
          actividadesLaborales.map(actividad => (
            [`${actividad.institucionTrabajo}`, `${actividad.aFinalisacionTrabajo}`, `${actividad.cargoOTareaTrabajo}`, `${actividad.aIngresoTrabajo}`, `${actividad.estaTrabajando}`]
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

       //para eliminar
    const handleDelete = () => {
        const adminId = administrador.usuarioId
        console.log(adminId)
        Swal.fire({
            title: "Esta seguro?",
            text: "Esta acción es irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                const usuarioId = datos.usuarioId;
                const personaId = datos.personaId;
                axios.delete(`${process.env.NEXT_PUBLIC_URL}/titulado/borrar_titulado/${url}`, { 
                    data: { usuarioId, personaId, adminId }  // Pasamos usuarioId como parte del objeto data
                })
                  .then(response => {
                    if (response.data.status) {
                        Swal.fire({
                            title: 'Eliminado',
                            text: 'Usuario eliminado correctamente',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            router.push('/administrador');
                        });
                    } else {
                      console.log(response.data.error); // Manejar el error en caso de que no se elimine correctamente
                    }
                  }).catch(err => console.log(err)) 
            }
            
          });

    }

    const handleImageUpload = async () => {
        if (!imagen) return;

        const formData = new FormData();
        formData.append('imagen', imagen);

        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/editar_imagen/${datos.personaId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status) {
                toast.success('Imagen actualizada correctamente');
                // Actualiza el estado o vuelve a cargar la página para reflejar la nueva imagen
                window.location.reload();
            } else {
                toast.error('Error al actualizar la imagen');
            }
        } catch (error) {
            toast.error('Error al subir la imagen');
        }
    };


    return (
        <LoginPrivado>
            <Dashboard>          
                <div>
                    <NavBar titulo={`Datos Titulado : ${datos.nombre} ${datos.apellidoPaterno} ${datos.apellidoMaterno}`} />
                    <div className='m-5 flex flex-col gap-4 w-[95%] text-[8px]'>
                        <div className='bg-white bg-opacity-90 flex-1 rounded-2xl'>
                            <div className='m-4 flex flex-col'>
                                <div className='flex justify-between'>
                                    <Image
                                        src={datos && datos.imagen ? `${process.env.NEXT_PUBLIC_URL}/imagenes/${datos.imagen}` : '/public/imagen Login/images.png'}
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
                            
                                <DatosBasicosTitulado datos={datos} administrador={administrador}/>
                            </div>
                            <div className='m-4 flex flex-col'>
                                <DatosSecundariosTitulado datos={datos}/>
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
                    {administrador && administrador.tipoAdministrador !== undefined && administrador.tipoAdministrador !== 1 ? (
                        <div 
                        className='flex justify-end mb-8 mr-4 gap-4'
                        >
                            <Button 
                                className=' bg-red-800 hover:bg-red-400 text-white m-1 rounded-lg'
                                onClick={() => handleDelete()}
                            >
                                Eliminar
                            </Button>
                        </div>
                        ) : null
                    }
                    
                    <ToastContainer />
                </div>                     
            </Dashboard>
        </LoginPrivado>
    );
};

export default DatosTitulado;