import React, {useState, useEffect} from 'react'
import Alert from '@mui/material/Alert';
import { Input,Select, Option, Typography } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { toast } from 'react-toastify'
import ProduccionesIntelectuales from '@/components/Registro/Pasos/ProduccionesIntelectuales';

type Props = {
  setModalEditar: React.Dispatch<React.SetStateAction<boolean>>,
  produccion: any
}

const ModalProduccionIntelectualEditar = (props: Props) => {
  
  const [alerta, setAlerta] = useState(false)
  const [alertaMensaje, setAlertaMensaje] = useState('')

  const [publicacion, setPublicacion] = useState([{
    value: '',
    label: ''
  }])
  const [formaTrabajo, setFormaTrabajo] = useState([{
    value: '',
    label: ''
  }])

  const [datosEditados, setDatosEditados] = useState(props.produccion)

   const handleSelectChangeTipo = (value: string) => {
    setDatosEditados({ ...datosEditados, publicacionId: value });
  };

  const handleSelectChangeForma = (value: string) => {
    setDatosEditados({ ...datosEditados, formaTrabajoProduccionId: value });
  };
  
  useEffect(() => {

    //traer las publicaciones
    axios.get('http://localhost:8000/titulado/obtener_publicaciones')
    .then(result => {
    if (result.data.status) {
        const datosPublicacion = [ {value: "", label: ""}, ...result.data.result.map((item) => ({
            value: item.id,
            label: item.tipoPublicacion
        }))]
        setPublicacion(datosPublicacion)
        
    }else {
        alert(result.data.Error)
    }
    }).catch(err => console.log(err))

    //traer las forma de trabajo
    axios.get('http://localhost:8000/titulado/obtener_forma_trabajo')
    .then(result => {
    if (result.data.status) {
        const datosFormaTrabajo = [ {value: "", label: ""}, ...result.data.result.map((item) => ({
            value: item.id,
            label: item.nombreFormaTrabajoProduccion
        }))]
        setFormaTrabajo(datosFormaTrabajo)
        
    }else {
        alert(result.data.Error)
    }
    }).catch(err => console.log(err))

  }, [])


  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     // Verificar si algún campo está vacío
  // const camposVacios = Object.entries(datosEditados).filter(([key, value]) => value === "");

  // if (camposVacios.length > 0) {
  //     setAlerta(true);
  //     setAlertaMensaje(`Los siguientes campos están vacíos: ${camposVacios.map(([key]) => key).join(", ")}`);
  //     setTimeout(() => {
  //       setAlerta(false)
  //     }, 5000)
  //     return; // Detener la función si hay campos vacíos
  // }
    axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/editar_produccion_titulado/${datosEditados.produccionId}`, datosEditados)
    .then(result => {
        if (result.data.status) {
          
          props.setModalEditar(false)  
          toast.info('Oferta Editada Correctamente', {
            autoClose: 2000,
            onClose: () => window.location.reload()
          })           
        } else {
          console.log(result.data.Error)
          
        }
    }).catch(err => console.log(err))
}


  return (
    <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-[#00000080] flex items-center justify-center z-50'>
    <div className='p-8 rounded-2xl bg-white relative'>
      <span
        className='absolute top-3 right-3 cursor-pointer text-stone-900 text-3xl'
        onClick={() => props.setModalEditar(false)}
      >X</span>
      <h1 className='text-slate-900 mb-10 text-2xl text-center'>Editar Producción Intelectual</h1>

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
          <div className='grid grid-cols-3 gap-x-20 gap-y-3'>
            <Input 
              crossOrigin={'anonimus'}
              label="Año"
              type='number'
              placeholder={props.produccion.aProduccion}
              onChange={e => setDatosEditados({...datosEditados, 'aProduccion': e.target.value})}     
              name='aProduccion'
            />
            <Input 
              crossOrigin={'anonimus'}
              label="Tema"
              type='text'
              placeholder={props.produccion.temaProduccion}
              onChange={e => setDatosEditados({...datosEditados, 'temaProduccion': e.target.value})} 
              name='temaProduccion'    
            />
            <Input 
              crossOrigin={'anonimus'}
              label="Institución"
              type='text'
              placeholder={props.produccion.institucionProduccion}
              onChange={e => setDatosEditados({...datosEditados, 'institucionProduccion': e.target.value})}
              name='institucionProduccion'
            />
              <div>
                <Typography placeholder>Tipo de Publicación</Typography>
                <Select 
                  placeholder 
                  value={datosEditados.publicacionId}
                  onChange={handleSelectChangeTipo}
                  name="publicacionId"  
                >
                  {publicacion.map(item => {
                    return (
                      <Option key={item.value} value={item.value}>
                          {item.label}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              

              <div>
                <Typography placeholder>Forma de Trabajo</Typography>
                <Select 
                placeholder 
                value={datosEditados.formaTrabajoId}
                onChange={handleSelectChangeForma}
                name="formaTrabajoId"  
              >
                {formaTrabajo.map(item => {
                  return (
                    <Option key={item.value} value={item.value}>
                        {item.label}
                    </Option>
                  )
                })}
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
      <div>
              
      </div>
    </div>
    
  </div>
  )
}

export default ModalProduccionIntelectualEditar