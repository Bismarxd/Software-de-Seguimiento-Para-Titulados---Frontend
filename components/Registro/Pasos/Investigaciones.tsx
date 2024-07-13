import React, {useContext, useState, useEffect} from 'react'
import { RegistroContext } from '@/context/RegistroContext'
import Input from '@/components/Diseño/Input'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button,
} from '@tremor/react';
import axios from 'axios';
import Select from '@/components/Diseño/Select';

const Investigaciones = () => {
  const [alerta, setAlerta] = useState(false)
  const [alertaMensaje, setAlertaMensaje] = useState('')

  const {investigaciones, setInvestigaciones} = useContext<any>(RegistroContext)
  const [tabla, setTabla] = useState(false)

  const [publicacion, setPublicacion] = useState([])

  //Estados para almacenar los datos ingresados en el formulario
  const [aInvestigacion, setAInvestigacion] = useState('')
  const [tema, setTema] = useState('')
  const [institucion, setInstitucion] = useState('')
  const [publicacionId, setPublicacionId] = useState('')
  const [nombrePublicacionId, setNombrePublicacionId] = useState('')

    useEffect(() => {
      //traer los grados academicos
      axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/obtener_publicaciones`)
      
      .then(result => {
      if (result.data.status) {
          const datosPublicacion: any = [ {value: "", label: ""}, ...result.data.result.map((item: any) => ({
              value: item.id,
              label: item.tipoPublicacion
          }))]
          setPublicacion(datosPublicacion)
          
      }else {
          alert(result.data.Error)
      }
      }).catch(err => console.log(err))

    }, [])

  // Función para manejar el envío del formulario
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTabla(true)
    // Comprobar que se hayan ingresado el nombre y el apellido
    if (tema.trim() !== '' && aInvestigacion.trim() !== '' && institucion.trim() !== '' && publicacionId !== '') {
      // Generar un nuevo elemento con el nombre y el apellido
      const nuevoElemento = {
                              aInvestigacion: aInvestigacion, 
                              temaInvestigacion: tema, 
                              institucionInvestigacion: institucion, 
                              publicacionId: publicacionId,    
                              nombrePublicacionId: nombrePublicacionId,                             
                            };
      // Añadir el nuevo elemento al estado
      setInvestigaciones([...investigaciones, nuevoElemento]);
      // Limpiar los campos del formulario después de agregar el elemento
      setAInvestigacion('');
      setTema('');
      setInstitucion('');
      setPublicacionId('');
    }else 
    {
      setTabla(false)
      setAlerta(true)
      setAlertaMensaje('Todos los campos son obligatorios')
      setTimeout(() => {
        setAlerta(false)
      }, 5000)
    }
  };

  const handleChange = async (e: any) => {
    console.log(e.target);
    
    
    const { name, value } = e.target
    if (name === 'aInvestigacion') {
      setAInvestigacion(value)
    } else if (name === 'temaInvestigacion') {
      setTema(value)
    } else if (name === 'institucionInvestigacion') {
      setInstitucion(value)
    } else if (name === 'publicacionId') {
      setPublicacionId(value)
    } 
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/publicacion/${value}`);
      if (response.status === 200) {
        setNombrePublicacionId(response.data.titulo);
      } else {
        console.error("Error al obtener el estado laboral:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener el estado laboral:", error);
    }
  }

  const handleEliminar = (index: any) => {
    const nuevaLista = [...investigaciones];
    nuevaLista.splice(index, 1);
    setInvestigaciones(nuevaLista);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      {alerta && 
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                {alertaMensaje}
              </Alert>
            </Stack>
        }
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <Input
            placeholder=''
            onChange={handleChange}
            titulo='Año de Investigación(*)'
            type='number'
            value={aInvestigacion}
            name='aInvestigacion'
          />
          <Input
            placeholder=''
            onChange={handleChange}
            titulo='Tema de Investigación(*)'
            type='text'
            value={tema}
            name='temaInvestigacion'
          />
          <Input
            placeholder=''
            onChange={handleChange}
            titulo='Institución(*)'
            type='text'
            value={institucion}
            name='institucionInvestigacion'
          />
          <Select
            onChange={handleChange}
            titulo='Tipo de Publicación(*)'
            opciones={publicacion}
            value={publicacionId}
            name='publicacionId'
          />
        </div>
        <div className='m-3'>
          <button
            className='p-2 m-3 bg-green-900 text-white rounded-2xl hover:bg-green-500'
          >Agregar</button>
        </div>
      </form>

      {/* Mostrar los elementos en tiempo real */}
      <ul>
        <div className='mx-auto max-w-4xl text-[px] md:text-xs'>
         {tabla &&
           <Table>
           <TableHead>
             <TableRow className='text-slate-600 '>
               <TableHeaderCell>Año de <br/> Investigación</TableHeaderCell>
               <TableHeaderCell>Tema de <br/> Investigación</TableHeaderCell>
               <TableHeaderCell>Institución de la <br/> Investigación</TableHeaderCell>
               <TableHeaderCell>Tipo de <br/> Publicación</TableHeaderCell>
             </TableRow>
           </TableHead>
           

           <TableBody className=''>
             {investigaciones.map((elemento: any, index: any) => (
                   <TableRow key={index} className=''>
                       <TableCell>{elemento.aInvestigacion}</TableCell>
                       <TableCell>{elemento.temaInvestigacion}</TableCell>
                       <TableCell>{elemento.institucionInvestigacion}</TableCell>
                       <TableCell>{elemento.nombrePublicacionId}</TableCell>
                       <TableCell>
                       <Button className='p-2 px-6 bg-red-800 hover:bg-red-400 text-white m-4 rounded-lg w-[50%]' onClick={() => handleEliminar(index)}>Eliminar</Button>
                       </TableCell>
                   </TableRow>
             ))}
           </TableBody>
         </Table>
         }
        </div>
      </ul>
    </div>
  )
}

export default Investigaciones
