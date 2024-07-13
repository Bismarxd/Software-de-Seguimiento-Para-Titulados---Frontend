import React, {ReactNode, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import axios from 'axios'
import Image from 'next/image'
import DashboardPerfil from '@/components/Perfil/DashboardPerfil'
import NavBar from '@/components/Administrador/NavBar'
import { List, ListItem, Card,  CardHeader,
  CardBody,
  CardFooter,
  Typography,ButtonGroup, Button, Collapse, Chip, ListItemSuffix
   } from "@material-tailwind/react";
import { FaRegEdit } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip';
import { Result } from 'postcss'
import CardEstudios from '@/components/Perfil/informacion/CardEstudios'
import CardActividad from '@/components/Perfil/informacion/CardActividad';
import CardInvestigaciones from '@/components/Perfil/informacion/CardInvestigaciones';
import CardProducciones from '@/components/Perfil/informacion/CardProducciones';

const columnasEstudio = ["titulo", "Job", "Employed", ""];

type PropsEstudioPostGrado = {
    id: "",
    aInicioPostGrado: "",
    tituloCursoPostGrado: "",
    modalidadGraduacionPostGrado: "",
    aGraduacionPostGrado: "",
    gradoAcademicoPostGrado: "",
    tipoEstudioPostGrado:"",
    tituloTrabajoPostGrado: "",
}

type PropsActividadesLaborales = {
  id: "",
  aIngresoTrabajo: "",
  aFinalisacionTrabajo: "",
  estaTrabajando: "",
  cargoOTareaTrabajo: "",
  duracionTrabajo: "",
  institucionTrabajo:"",
  estadoActividadLaboralId: "",
  tituladoId: "",
  actividadLaboralId: ''
}

type PropsInvestigaciones = {
  id: "",
  aInvestigacion: "",
  temaInvestigacion: "",
  institucionInvestigacion: "",
  publicacionId: "",
  tituladoId: "",
  tipoPublicacion: "",
  investigacionId: ""
}

type PropsProduccionesIntelectuales = {
  id: "",
  aProduccion: "",
  temaProduccion: "",
  institucionProduccion: "",
  publicacionId: "",
  formaTrabajoProduccionId: "",
  tituladoId: "",
  tipoPublicacion: "",
  nombreFormaTrabajoProduccion: "",
  produccionId: ""
}


const InformacionAdicional = () => {

  const [openEstudio, setOpenEstudio] = useState(false)
  const [openActividad, setOpenActividad] = useState(false)
  const [openInvestigacion, setOpenInvestigacion] = useState(false)
  const [openProduccion, setOpenProduccion] = useState(false)
  
  const router = useRouter()
  const url = localStorage.getItem('userId')

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
      tituladoId: ''

  })

  const [estudiosPostGrado, setEstudiosPostGrado] = useState<PropsEstudioPostGrado[]>([])
  const [actividadesLaborales, setActividadesLaborales] = useState<PropsActividadesLaborales[]>([])
  const [investigaciones, setInvestigaciones] = useState<PropsInvestigaciones[]>([])
  const [produccionesIntelectuales, setProduccionesIntelectuales] = useState<PropsProduccionesIntelectuales[]>([])

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/ver_titulado_perfil/` + userId)
        .then(result => {
            if (result.data.status) {
                setDatos(result.data.result[0]);
            }
        })
        .catch(err => console.log(err));
}, []);

  useEffect(() => {
    if (datos.tituladoId) {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/verestudiosPostGrado/` + datos.tituladoId)
          .then(result => {
              if (result.data.status) {
                const estudiosActivos = result.data.result.filter((estudio:any) => estudio.activo === 1);
                setEstudiosPostGrado(estudiosActivos);
              }
          })
          .catch(err => console.log(err));

        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/verlaboral/` + datos.tituladoId)
        .then(result => {
          if(result.data.status)
            {
              const activiadesActivos = result.data.result.filter((actividad:any) => actividad.activo === 1);
              setActividadesLaborales(activiadesActivos   );      
            }
        })

        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/verinvestigaciones/` + datos.tituladoId)
        .then(result => {
          if(result.data.status)
            {
              const investigacionesActivos = result.data.result.filter((investigacion:any) => investigacion.activo === 1);
              setInvestigaciones(investigacionesActivos);    
            }
        })

        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/verproduccionesIntelectuales/` + datos.tituladoId)
        .then(result => {
          if(result.data.status)
            {
              const produccionesActivos = result.data.result.filter((produccion:any) => produccion.activo === 1);
                    setProduccionesIntelectuales(produccionesActivos);      
            }
        })
    }
  }, [datos.tituladoId]);

  const abrirEstudios = () => {
    setOpenEstudio(!openEstudio)
    setOpenActividad(false)
    setOpenInvestigacion(false)
    setOpenProduccion(false)

    
  }

  const abrirActividad = () => {
    setOpenActividad(!openActividad)
    setOpenEstudio(false)
    setOpenInvestigacion(false)
    setOpenProduccion(false)

  }

  const abrirInvestigacion = () => {
    setOpenInvestigacion(!openInvestigacion)
    setOpenEstudio(false)
    setOpenActividad(false)
    setOpenProduccion(false)

  }

  const abrirProducciones = () => {
    setOpenProduccion(!openProduccion)
    setOpenEstudio(false)
    setOpenActividad(false)
    setOpenInvestigacion(false)

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

  
  return (
    <div 
    className='w-full h-screen object-cover flex'   
    >
    <ToastContainer />
      <DashboardPerfil>
        <div className='flex flex-col m-3 gap-2 '>
          <div>
            <Button
                placeholder=''
                className=' bg-teal-800 hover:bg-teal-500 text-white m-1 rounded-xl ml-40'
                onClick={handleGenerarPDF}
            >
                Generar Informe (pdf)
            </Button>
          </div>
          <div className='flex flex-col md:flex-row gap-2 m-3'>
            <Card placeholder className="w-96">
              <Card placeholder className="w-96 flex items-center">
              
                <CardHeader placeholder floated={false} className="h-30">
                
                  <Image src={`${process.env.NEXT_PUBLIC_URL}/imagenes/`+datos.imagen} width={100} height={100} alt="profile-picture" />
                </CardHeader>
                <CardBody placeholder className="text-center">
                  <Typography placeholder variant="h4" color="blue-gray" className="mb-2">
                    {datos.nombre}
                  </Typography>
                  <Typography placeholder color="blue-gray" className="font-medium" textGradient>
                    {datos.email}
                  </Typography>
                  
                
                </CardBody>

                <CardBody placeholder className="text-center mt-5">
                  
                  <Typography placeholder color="blue-gray" className="font-medium" textGradient>
                    Cedula de Identidad: {datos.ci}
                  </Typography>
                  <Typography placeholder color="blue-gray" className="font-medium" textGradient>
                  Fecha de Nacimiento: {datos.fechaNacimiento}
                  </Typography>
                  <Typography placeholder color="blue-gray" className="font-medium" textGradient>
                  Celular: {datos.celular}
                  </Typography>
                  <Typography placeholder color="blue-gray" className="font-medium" textGradient>
                  Genero: {datos.sexo}
                  </Typography>
                 
                </CardBody>
            
              </Card>
            </Card>

            <Card placeholder className="w-96">
              <List placeholder>
                <ListItem placeholder>Dirección: {datos.direccion}</ListItem>
                <ListItem placeholder disabled={true}>Año de Ingreso: {datos.aIngreso}</ListItem>
                <ListItem placeholder>Año de Egreso: {datos.aEgreso}</ListItem>
                <ListItem placeholder>Año de Titulación: {datos.aTitulacion}</ListItem>           
                <ListItem placeholder>Genero: {datos.sexo}</ListItem>
                <ListItem placeholder>Dirección: {datos.direccion}</ListItem>
              </List>
            </Card>
            
          </div>
          

          <div className="flex flex-col w-[200%] gap-4">
            <div className='w-full'>
              <Button placeholder color="blue" onClick={abrirEstudios}>Estudios PostGrado</Button>
              <Collapse open={openEstudio} className='grid grid-cols-2 gap-2 mt-2'>
                <CardEstudios
                  estudiosPostGrado={estudiosPostGrado}
                />
              </Collapse>
              
                
            </div>
            
            <div className='w-full'>
              <Button placeholder color="red" onClick={abrirActividad}>Actividades Laborales</Button>
              <Collapse open={openActividad} className='grid grid-cols-2 gap-2 mt-2'>
                <CardActividad
                  actividadLaboral={actividadesLaborales}
                />
              </Collapse>
              
                
            </div>

            <div className='w-full'>
              <Button placeholder className='bg-orange-600' onClick={abrirInvestigacion}>Investigaciones</Button>
              <Collapse open={openInvestigacion} className='grid grid-cols-2 gap-2 mt-2'>
                <CardInvestigaciones
                    investigaciones={investigaciones}
                />
              </Collapse>
              
                
            </div>
            <div className='w-full'>
              <Button placeholder className='bg-green-600' onClick={abrirProducciones}>Produccciones Intelectuales</Button>
              <Collapse open={openProduccion} className='grid grid-cols-2 gap-2 mt-2'>
                <CardProducciones
                  produccionesIntelectuales={produccionesIntelectuales}
                />
              </Collapse> 
              
                
            </div>
          </div>

        
        </div>
      </DashboardPerfil>
      

    </div>
  )
}

export default InformacionAdicional