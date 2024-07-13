import React, {useState, useEffect} from 'react'
import { Input,Select, Option, Typography } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';

interface AreaTrabajo {
  id: string | number,
  tituloAreaTrabajo: string
}
interface ModalidadTitulacion {
  id: string | number,
  tituloModalidadTitulacion: string
}
interface FormaTrabajo {
  id: string | number,
  tituloFormaTrabajo: string
}

interface PropsDatos {
  aIngreso: string,
  aEgreso: string,
  aTitulacion: string,
  aExperienciaLaboral: string,
  gradoAcademicoId: string;
  tituloGradoAcademico: string,
  tituloModalidadTitulacion: string,
  modalidadTitulacionId: string,
  tituloFormaTrabajo: string,
  formaTrabajoId: string,
  tituloAreaTrabajo: string,
  areaTrabajoId: string,
}

type Props = {
  setModalEditar: React.Dispatch<React.SetStateAction<boolean>>,
  datos : PropsDatos
}

const ModalEditarDatosSecundarios = ({setModalEditar, datos}: Props) => {

  const router = useRouter()
  const [alerta, setAlerta] = useState(false)
  const [alertaMensaje, setAlertaMensaje] = useState('')
  const [gradosAcademicos, setGradosAcademicos] = useState([
    {
      value: '',
      label: ''
    }
  ])
  const [modalidadesTitulacion, setModalidadesTitulacion] = useState([
    {   
      value: '',
      label: ''
  }
  ])
  const [areasTrabajo, setAreasTrabajo] = useState([
    {
      value: '',
      label: ''
    }
  ])
  const [formaTrabajo, setFormaTrabajo] = useState([
    {
      value: '',
      label: ''
    }
  ])

  const [datosEditados, setDatosEditados] = useState(datos)


  useEffect(() => {
       //traer los grados academicos
       axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/grados_academicos`)
       .then(result => {
       if (result.data.status) {
           const datosGrados = [ {value: "", label: ""}, ...result.data.result.map((item: any) => ({
               value: item.id,
               label: item.tituloGradoAcademico
           }))]

           setGradosAcademicos(datosGrados)
       }else {
           alert(result.data.Error)
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
           alert(result.data.Error)
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
           alert(result.data.Error)
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
           alert(result.data.Error)
       }
       }).catch(err => console.log(err))
  })

  const handleClick = (e: any) => {
    e.preventDefault()
    const {url} = router.query

    const user = localStorage.getItem('userId');
    // Agregar el usuario a los datos editados
   const datosEditadosConUsuario = {
       ...datosEditados,
       adminId: user // Asegúrate de tener un identificador válido del usuario
   };

    axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/editar_datos_titulado/${url}`, datosEditadosConUsuario)
    .then(result => {
      if(result.data.status)
        {
          setModalEditar(false)  
          toast.info('Datos Editado(s) Correctamente', {
            autoClose: 2000,
            onClose: () => window.location.reload()
          })
        }  else {
          console.log(result.data.Error)
          
        }
    }).catch(err => console.log(err))
  }

  return (
    <div className='w-[100%] h-[200%] absolute top-0 left-0 bg-[#00000080] flex items-center justify-center z-50'>
      <div className='p-8 rounded-2xl bg-white relative'>
        <span
          className='absolute top-3 right-3 cursor-pointer text-stone-900 text-3xl'
          onClick={() => setModalEditar(false)}
          >X
        </span>
        <h1 className='text-slate-900 mb-10 text-2xl text-center'>Editar Datos Secundarios</h1>
        <form 
          className=' text-slate-800'
        >  
        {alerta && 
          <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
              {alertaMensaje}
              </Alert>
          </Stack>
        } 
        <div className='grid grid-cols-3 gap-x-20 gap-y-5'>
          <Input 
            crossOrigin={'anonimus'}
            label="Año de Ingreso"
            type='number'
            placeholder={datos.aIngreso}
            onChange={e => setDatosEditados({...datosEditados, 'aIngreso': e.target.value})}     
            name='aIngreso'
          />

          <Input 
            crossOrigin={'anonimus'}
            label="Año de Egreso"
            type='number'
            placeholder={datos.aIngreso}
            onChange={e => setDatosEditados({...datosEditados, 'aEgreso': e.target.value})}     
            name='aEgreso'
          />

          <Input 
            crossOrigin={'anonimus'}
            label="Año de Titulación"
            type='number'
            placeholder={datos.aIngreso}
            onChange={e => setDatosEditados({...datosEditados, 'aTitulacion': e.target.value})}     
            name='aTitulacion'
          />

          <Input 
            crossOrigin={'anonimus'}
            label="Años de Experiencia Laboral"
            type='number'
            placeholder={datos.aIngreso}
            onChange={e => setDatosEditados({...datosEditados, 'aExperienciaLaboral': e.target.value})}     
            name='aExperienciaLaboral'
          />

          <div>
            <Typography placeholder>Grado Academico</Typography>
            <Select 
              placeholder 
              value={datosEditados.tituloGradoAcademico}                                    
              onChange={(value: any) => setDatosEditados({...datosEditados, gradoAcademicoId: value})}
              name="tituloGradoAcademico"  
            >
                  {gradosAcademicos.map(item => (
                      <Option key={item.value} value={item.value}>
                          {item.label}
                      </Option>
                  ))}
            </Select>

          </div>

          <div>
            <Typography placeholder>Modalidad de Titulación<nav></nav></Typography>
            <Select 
              placeholder 
              value={datosEditados.tituloModalidadTitulacion}                                    
              onChange={(value: any) => setDatosEditados({...datosEditados, modalidadTitulacionId: value})}
              name="modalidadTitulacionId"  
            >
                  {modalidadesTitulacion.map(item => (
                      <Option key={item.value} value={item.value}>
                          {item.label}
                      </Option>
                  ))}
            </Select>

          </div>

          <div>
            <Typography placeholder>Áreas de Trabajo<nav></nav></Typography>
            <Select 
              placeholder 
              value={datosEditados.tituloAreaTrabajo}                                    
              onChange={(value: any) => setDatosEditados({...datosEditados, areaTrabajoId: value})}
              name="areaTrabajoId"  
            >
                  {areasTrabajo.map(item => (
                      <Option key={item.value} value={item.value}>
                          {item.label}
                      </Option>
                  ))}
            </Select>

          </div>

          <div>
            <Typography placeholder>Forma de Trabajo<nav></nav></Typography>
            <Select 
              placeholder 
              value={datosEditados.tituloFormaTrabajo}                                    
              onChange={(value: any) => setDatosEditados({...datosEditados, formaTrabajoId: value})}
              name="formaTrabajoId"  
            >
                {formaTrabajo.map(item => (
                    <Option key={item.value} value={item.value}>
                        {item.label}
                    </Option>
                ))}
            </Select>

          </div>
        </div>

        <button 
            className='w-[100%] p-3 rounded bg-sky-600 text-white font-semibold cursor-pointer hover:bg-sky-400 uppercase m-4 text-lg'
            onClick={handleClick}
            >
            Aceptar
        </button>
          
        </form>
      </div>
    </div>
  )
}

export default ModalEditarDatosSecundarios