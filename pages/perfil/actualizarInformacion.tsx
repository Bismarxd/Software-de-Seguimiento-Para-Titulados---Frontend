import React, { useEffect, useState, useContext } from 'react'
import DashboardPerfil from '@/components/Perfil/DashboardPerfil'
import { Input, Button, alert, Drawer, Typography, IconButton, Card, Checkbox, Switch } from "@material-tailwind/react";
import Select from '@/components/Diseño/Select'
import Image from 'next/image';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'

import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import ModalAddEstudioPostGrado from '@/components/Administrador/titulados/EstudiosPostGrado/ModalAddEstudioPostGrado';
import ModalAddActividades from '@/components/Administrador/titulados/ActividadesLaborales/ModalAddActividades';
import ModalAddInvestigacion from '@/components/Administrador/titulados/investigaciones/ModalAddInvestigacion';
import ModalProduccionIntelectualAdd from '@/components/Administrador/titulados/ProduccionesIntelectuales/ModalProduccionIntelectualAdd';

interface GradoAcademico {
  id: string | number,
  tituloGradoAcademico: string,
  value: string | number | [];
  label: string;
}
interface AreaTrabajo {
  id: string | number,
  tituloAreaTrabajo: string,
  value: string | number | [];
  label: string;
}
interface ModalidadTitulacion {
  id: string | number,
  tituloModalidadTitulacion: string,
  value: string | number | [];
  label: string;
}
interface FormaTrabajo {
  id: string | number,
  tituloFormaTrabajo: string,
  value: string | number | [];
  label: string;
}

type NuevaImagenState = {
  imagen: File | null; // Define que la imagen puede ser un File o null
};


const ActualizarInformacion = () => {

  
  const [alerta, setAlerta] = useState(false)
  const [alertaMensaje, setAlertaMensaje] = useState('')

  const [mostrarDatosUsuario, setMostrarDatosUsuario] = useState(false)

  const [abrirModalEstudios, setAbrirModalEstudios] = useState(false)
  const [abrirModalActividad, setAbrirModalActividad] = useState(false)
  const [abrirModalInvestigaciones, setAbrirModalInvestigaciones] = useState(false)
  const [abrirModalProduccion, setAbrirModalProduccion] = useState(false)

  const [gradosAcademicos, setGradosAcademicos] = useState<GradoAcademico[]>([])
  const [modalidadesTitulacion, setModalidadesTitulacion] = useState<ModalidadTitulacion[]>([])
  const [areasTrabajo, setAreasTrabajo] = useState<AreaTrabajo[]>([])
  const [formaTrabajo, setFormaTrabajo] = useState<FormaTrabajo[]>([])

  const [datosTitulado, setDatosTitulado] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    ci: '',
    fechaNacimiento: '',
    imagen: '',
    email: '',
    celular: '',
    direccion: '',
    sexo: '',
    personaId: '',
    aIngreso: '',
    aEgreso: '',
    aTitulacion: '',
    aExperienciaLaboral: '',
    tituladoId: '',
    usuarioId: '',
    gradoAcademicoId: '',
    modalidadTitulacionId: '',
    areaTrabajoId: '',
    formaTrabajoId: '',
  })

  const [password, setPassword] = useState({
    password: '',
    repeatPassword: ''
})

  const handleSwitchChange = (e: any) => {
    setMostrarDatosUsuario(e.target.checked);
  };



  useEffect(() => {
    // Obtener el valor del parámetro 'id' de la URL del usuario
    const userId = localStorage.getItem('userId')

      //traer al titulado
    axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/ver_titulado_perfil/`+userId)
    .then(result => {
      if (result.data.status) {
        setDatosTitulado(result.data.result[0])
      }
    })

     //traer los grados academicos
     axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/grados_academicos`)
     .then(result => {
     if (result.data.status) {
         const datosGrados = [ {value: "", label: ""}, ...result.data.result.map((item: GradoAcademico) => ({
             value: item.id,
             label: item.tituloGradoAcademico
         }))]

         setGradosAcademicos(datosGrados)
     }else {
         console.log(result.data.Error)
     }
     }).catch(err => console.log(err))

     //traer las modaliaes de titulacion
     axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/modalidades_titulacion`)
     .then(result => {
     if (result.data.status) {
         const datosModalidad= [ {value: "", label: ""}, ...result.data.result.map((item:ModalidadTitulacion) => ({
             value: item.id,
             label: item.tituloModalidadTitulacion
         }))]

         setModalidadesTitulacion(datosModalidad)
     }else {
      console.log(result.data.Error)
     }
     }).catch(err => console.log(err))

     
     //traer las areas de trabajo
     axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/areas_trabajo`)
     .then(result => {
     if (result.data.status) {
         const datosAreas = [ {value: "", label: ""}, ...result.data.result.map((item: AreaTrabajo) => ({
             value: item.id,
             label: item.tituloAreaTrabajo
         }))]

         setAreasTrabajo(datosAreas)
     }else {
      console.log(result.data.Error)
     }
     }).catch(err => console.log(err))

     //traer las formas de trabajo
     axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/formas_trabajo`)
     .then(result => {
     if (result.data.status) {
         const datosFormas = [ {value: "", label: ""}, ...result.data.result.map((item: FormaTrabajo) => ({
             value: item.id,
             label: item.tituloFormaTrabajo
         }))]

         setFormaTrabajo(datosFormas)
     }else {
      console.log(result.data.Error)
     }
     }).catch(err => console.log(err))
   
  }, [])
  
  const onClickEnviar = () => {
   
    if(datosTitulado.email === '' && datosTitulado.celular === '')
      {
        setAlerta(true)
        setAlertaMensaje('El campo Email esta vacio')
        return;
      }

    axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/editar_datos_basicos/`+datosTitulado.personaId, datosTitulado)
    .then(result => {
        if (result.data.status) {
          
          axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/editar_datos_titulado/`+datosTitulado.tituladoId, datosTitulado)
        .then(result => {
        if (result.data.status) {
          
          toast.info('Datos Editado(s) Correctamente', {
            autoClose: 2000,
            onClose: () => window.location.reload()
          })           
           
        } else {
          console.log(result.data.Error)
          
        }
    }).catch(err => console.log(err))   
           
        } else {
          console.log(result.data.Error)
          
        }
    }).catch(err => console.log(err))

   
  }

  const handlePassword = () => {
    if(password.password !== password.repeatPassword)
      {
          setAlerta(true)
          setAlertaMensaje('Las contraseñas no conciden')
          setTimeout(() => {
              setAlerta(false)
          }, 3000);
          return
      }
  
  if(password.password === '')
      {
          setAlerta(true)
          setAlertaMensaje('La contraseña no puede estar vacia')
          setTimeout(() => {
              setAlerta(false)
          }, 3000);
          return
      }
    axios.put(`${process.env.NEXT_PUBLIC_URL}/administradores/editar_password_administardor/${datosTitulado.usuarioId}`, password)
    .then(result => {
        if(result.data.status)
            {
                toast.info('Constraseña Editada Correctamente', {
                    autoClose: 2000,
                    onClose: () => window.location.reload()
                })                  
            }else
            {
              setAlerta(true)
              setAlertaMensaje(result.data.Error)
              setTimeout(() => {
                  setAlerta(false)
              }, 3000);
              return
            }
    }).catch(err => console.log(err));
  }

  //Para actualizar la imagen
  const [nuevaImagen, setNuevaImagen] = useState<NuevaImagenState>({
    imagen: null
  });

const handleSubmit = async (e: any) => {
  e.preventDefault()
  const formData: any = new FormData();
  formData.append('imagen', nuevaImagen.imagen);

  axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/actualizar_imagen/${datosTitulado.tituladoId}`, formData)
        .then(result => {
            if (result.data.status) {
 
              toast.info('Imagen Editada Correctamente', {
                autoClose: 2000,
                onClose: () => window.location.reload()
              })           
            } else {
              console.log(result.data.Error)
              
            }
        }).catch(err => console.log(err))

  // try {
  //   const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/actualizar_imagen/${datosTitulado.tituladoId}`, formData);
  //   if (response.data.status) {
  //     console.log('Imagen actualizada correctamente');
  //     // Aquí puedes agregar lógica adicional después de actualizar la imagen, si es necesario
  //   } else {
  //     console.error('Error al actualizar la imagen');
  //     // Manejar el error si la actualización no fue exitosa
  //   }
  // } catch (error) {
  //   console.error('Error al enviar la solicitud:', error);
  //   // Manejar cualquier error de red o del servidor
  // }
};
  

  return (
  
    
        <div 
      className='w-full h-screen object-cover flex'     
      > 
        <DashboardPerfil>
          <form 
          className='bg-white w-[90%] h-[450%] md:h-[220%] m-8 rounded-xl '
        >
            {alerta && 
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                  {alertaMensaje}
                </Alert>
              </Stack>
            }       
          <div className='m-5 w-[100%] flex flex-col justify-center gap-2'>
        
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}/imagenes/`+datosTitulado.imagen}
              width={100}
              height={100}
              alt=''
              className='rounded-full object-cover'
            />
            <input
               type="file"
               accept='image/*' // Permite seleccionar archivos de imagen
               name='imagen'
               onChange={(e: any) => {
                   const file = e.target.files[0];
                   // Verificar si se seleccionó un archivo
                   if (file) {
                    setNuevaImagen({...nuevaImagen, imagen: file});
                   } else {
                     // Si no se seleccionó ningún archivo, establece la imagen en null o algún valor predeterminado
                     setNuevaImagen({...nuevaImagen, imagen: null});
                   }
                 }}
               className='p-1 px-2 appearance-none outline-none w-full text-gray-600'
            />
            <button className='p-2 bg-orange-600 hover:bg-orange-400 rounded-xl w-[50%]' onClick={handleSubmit}>Actualizar Imagen</button>
          
          </div>
        
        <label htmlFor="" className='text-white m-3'>Datos Básicos</label>
          <div className='m-5 grid md:grid-cols-1 lg:grid-cols-2 gap-5 text-gray-800'>
            <Input
              crossOrigin="anonymous" 
              label='Nombre(s)'
              value={datosTitulado.nombre}
              className='text-slate-400 placeholder:text-slate-500'
              readOnly={true}
            />
            <Input
              crossOrigin="anonymous" 
              label='Apellido Paterno'
              value={datosTitulado.apellidoPaterno}
              className='text-slate-400'
              readOnly={true}
            />
            <Input
              crossOrigin="anonymous" 
              label='Apellido Materno'
              value={datosTitulado.apellidoMaterno}
              className='text-slate-400'
              readOnly={true}
            />
            <Input
              crossOrigin="anonymous" 
              label='Carnet de Identidad'
              value={datosTitulado.ci}
              className='text-slate-400'
              readOnly={true}
            />
            <Input
              crossOrigin="anonymous" 
              label='Fecha de Nacimiento'
              value={datosTitulado.fechaNacimiento}
              className='text-slate-400'
              readOnly={true}
            />
            <Input
              crossOrigin="anonymous" 
              label='Genero'
              value={datosTitulado.sexo}
              className='text-slate-400'
              readOnly={true}
            />
          
            <Input 
              crossOrigin="anonymous" 
              variant="standard" 
              label="Email" 
              type='email'
              placeholder={datosTitulado.email}
              onChange={(e) => setDatosTitulado({...datosTitulado, email: e.target.value})}
              className='text-white placeholder:text-slate-500'
            />
            <Input
              crossOrigin="anonymous" 
              label='Dirección'
              variant="standard" 
              type='text'
              placeholder={datosTitulado.direccion}
              onChange={(e) => setDatosTitulado({...datosTitulado, direccion: e.target.value})}
              className='text-white placeholder:text-slate-500'
            />
            <Input
              crossOrigin="anonymous" 
              label='Celular'
              variant="standard" 
              type='number'
              placeholder={datosTitulado.celular}
              onChange={(e) => setDatosTitulado({...datosTitulado, celular: e.target.value})}
              className='text-white placeholder:text-slate-500'
            />
          </div>

          <label htmlFor="" className='text-white m-3 mt-8'>Datos Titulado</label>
          <div className='m-5 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3'>
            <Input
              crossOrigin="anonymous" 
              label='Año de Ingreso'
              variant="standard" 
              type='number'
              placeholder={datosTitulado.aIngreso}
              onChange={(e) => setDatosTitulado({...datosTitulado, aIngreso: e.target.value})}
              className='text-white placeholder:text-slate-500'
            />

            <Input
              crossOrigin="anonymous" 
              label='Año de Egreso'
              variant="standard" 
              type='number'
              placeholder={datosTitulado.aEgreso}
              onChange={(e) => setDatosTitulado({...datosTitulado, aEgreso: e.target.value})}
              className='text-white placeholder:text-slate-500'
            />

            <Input
              crossOrigin="anonymous" 
              label='Año de Titulación'
              variant="standard" 
              type='number'
              placeholder={datosTitulado.aTitulacion}
              onChange={(e) => setDatosTitulado({...datosTitulado, aTitulacion: e.target.value})}
              className='text-white placeholder:text-slate-500'
            />

            <Input
              crossOrigin="anonymous" 
              label='Año de Experiencia Laboral'
              variant="standard" 
              type='number'
              placeholder={datosTitulado.aExperienciaLaboral}
              onChange={(e) => setDatosTitulado({...datosTitulado, aExperienciaLaboral: e.target.value})}
              className='text-white placeholder:text-slate-500'
            />
            <Select
                titulo='Grado Académico'
                opciones={gradosAcademicos}
                value={datosTitulado["gradoAcademicoId"] || ""}  
                onChange={(e) => setDatosTitulado({...datosTitulado, gradoAcademicoId: e.target.value})}
                name='gradoAcademicoId' 
            />

            <Select
                titulo='Modalidad de Titulación'
                opciones={modalidadesTitulacion}
                value={datosTitulado["modalidadTitulacionId"] || ""}  
                onChange={(e) => setDatosTitulado({...datosTitulado, modalidadTitulacionId: e.target.value})}
                name='modalidadTitulacionId' 
            />

            <Select
                titulo='Area de Trabajo'
                opciones={areasTrabajo}
                value={datosTitulado["areaTrabajoId"] || ""}  
                onChange={(e) => setDatosTitulado({...datosTitulado, areaTrabajoId: e.target.value})}
                name='areaTrabajoId' 
            />
            <Select
                titulo='Forma de Trabajo'
                opciones={formaTrabajo}
                value={datosTitulado["formaTrabajoId"] || ""}  
                onChange={(e) => setDatosTitulado({...datosTitulado, formaTrabajoId: e.target.value})}
                name='formaTrabajoId' 
            />

          </div>

          <Button 
            placeholder
            fullWidth className='bg-slate-900 hover:bg-slate-500 m-3 w-[90%]'
            onClick={onClickEnviar}
          >Actualizar Datos</Button>

      <div className="flex flex-col m-5">
        <div className='flex flex-col md:flex-row justify-between m-3'>
          <div>
          <Button placeholder color="blue" onClick={() => setAbrirModalEstudios(true)}>Añadir Estudio PostGrado</Button>
            {abrirModalEstudios && 
              <ModalAddEstudioPostGrado
                setModalAdd={setAbrirModalEstudios}
                id={datosTitulado.tituladoId}
              />
            }
          </div>
          <div>
            <Button placeholder color="red" onClick={() => setAbrirModalActividad(true)}>Añadir Actividad Laboral</Button>
              {abrirModalActividad &&
                <ModalAddActividades
                setModalAdd={setAbrirModalActividad}
                id={datosTitulado.tituladoId}
                />
              }
          </div>
          

        </div>
      

        <div className='flex flex-col md:flex-row justify-between m-3'>
          <div>
            <Button placeholder className='bg-orange-600' onClick={() => setAbrirModalInvestigaciones(true)}>Añadir Investigacion</Button>
              {abrirModalInvestigaciones &&
                <ModalAddInvestigacion
                  setModalAdd={setAbrirModalInvestigaciones}
                  id={datosTitulado.tituladoId}
                />
              }
          </div>

          <div>
            <Button placeholder className='bg-green-600' onClick={() => setAbrirModalProduccion(true)}>Añadir Producción Intelectual</Button>
            {abrirModalProduccion &&
                <ModalProduccionIntelectualAdd
                setModalAdd={setAbrirModalProduccion}
                id={datosTitulado.tituladoId}
                />
              }
          </div>
          

        </div>
        
        
        
      </div>
      <div className='flex flex-col gap-3'>
                      <label htmlFor="" className='text-zinc-600 m-5'>Cambiar Contraseña</label>
                      <div className='flex gap-8'>
                      <Switch 
                              color='blue'
                              crossOrigin="anonymous" 
                              checked={mostrarDatosUsuario} 
                              onChange={handleSwitchChange}  
                              className='ml-5 label:m-5'                              
                              
                          />
                        <Typography placeholder className='text-bold'>(Para Editar la Contraseña)</Typography>

                      </div>
                          

                    {mostrarDatosUsuario && (
                      <>
                          {alerta && 
                              <Stack sx={{ width: '100%' }} spacing={2} className='mb-3'>
                                  <Alert variant="filled" severity="error">
                                      {alertaMensaje}
                                  </Alert>
                              </Stack>
                          }
                          <div className='m-5 flex flex-col md:flex-row gap-4 mt-3'>                        
                              <Input
                                  crossOrigin="anonymous" 
                                  label='Password'
                                  variant="standard" 
                                  onChange={e => setPassword({...password, password: e.target.value})}
                                  type='password'                         
                                  className=' placeholder:text-slate-500'
                              />
                              <Input
                                  crossOrigin="anonymous" 
                                  label='Repetir Password'
                                  variant="standard" 
                                  onChange={e => setPassword({...password, repeatPassword: e.target.value})}
                                  type='password'                         
                                  className=' placeholder:text-slate-500'
                              />
                          </div>

                          <Button 
                              placeholder className=' bg-violet-950 hover:bg-violet-600 text-white m-1 rounded-xl'
                              onClick={handlePassword}
                          >
                              Guardar Contraseña
                          </Button>
                      </>
                      )}
                      
                      
        </div>

          </form>
        </DashboardPerfil>
      
      <ToastContainer/>
    </div>
  
  )
}

export default ActualizarInformacion
