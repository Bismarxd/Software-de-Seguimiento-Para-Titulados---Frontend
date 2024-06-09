import React, {useContext, useState, useEffect} from 'react'
import { PasoContext } from '@/context/PasoContext'
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

const ProduccionesIntelectual = () => {
  const [alerta, setAlerta] = useState(false)
  const [alertaMensaje, setAlertaMensaje] = useState('')

  const {produccionesIntelectuales, setProduccionesIntelectuales} = useContext(PasoContext)
  const [tabla, setTabla] = useState(false)

  const [publicacion, setPublicacion] = useState([])
  const [formaTrabajo, setFormaTrabajo] = useState([])

  //Estados para almcenar los datos ingresados en el formulario
  const [aProduccion, setAProduccion] = useState('')
  const [tema, setTema] = useState('')
  const [institucion, setInstitucion] = useState('')
  const [publicacionId, setPublicacionId] = useState('')
  const [formaTrabajoId, setFormaTrabajoId] = useState('')
  const [nombrePublicacionId, setNombrePublicacionId] = useState('')
  const [nombreFormaTrabajoId, setNombreFormaTrabajoId] = useState('')

  useEffect(() => {

    //traer los grados academicos
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

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setTabla(true)
    
    // Comprobar que se hayan ingresado el nombre y el apellido
    if (tema.trim() !== '' && aProduccion.trim() !== '' && institucion.trim() !== '' && publicacionId.trim() !== '' &&      formaTrabajoId !== '') {
      // Generar un nuevo elemento con el nombre y el apellido
      const nuevoElemento = {
                              aProduccion: aProduccion, 
                              temaProduccion: tema, 
                              institucionProduccion: institucion, 
                              publicacionId: publicacionId,    
                              nombrePublicacionId: nombrePublicacionId,
                              formaTrabajoProduccionId: formaTrabajoId,    
                              nombreFormaTrabajoId: nombreFormaTrabajoId,                                  
                            };
      // Añadir el nuevo elemento al estado
      setProduccionesIntelectuales([...produccionesIntelectuales, nuevoElemento]);
      // Limpiar los campos del formulario después de agregar el elemento
      setAProduccion('');
      setTema('');
      setInstitucion('');
      setPublicacionId('');
      setFormaTrabajoId('')
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
    
    
    const { name, value } = e.target
    if (name === 'aProduccion') {
      setAProduccion(value)
    } else if (name === 'temaProduccion') {
      setTema(value)
    } else if (name === 'institucionProduccion') {
      setInstitucion(value)
    } else if (name === 'publicacionId') {
      setPublicacionId(value)
    } else if (name === 'formaTrabajoId') {
      setFormaTrabajoId(value)
    }

    try {
      const response = await axios.get(`http://localhost:8000/titulado/publicacion/${value}`);
      if (response.status === 200) {
        setNombrePublicacionId(response.data.titulo);
      } else {
        console.error("Error al obtener el estado laboral:", response.statusText);
      }
      } catch (error) {
      console.error("Error al obtener el estado laboral:", error);
    }

    try {
      const response = await axios.get(`http://localhost:8000/titulado/formaTrabajo/${value}`);
      if (response.status === 200) {
        setNombreFormaTrabajoId(response.data.titulo);
      } else {
        console.error("Error al obtener el estado laboral:", response.statusText);
      }
      } catch (error) {
      console.error("Error al obtener el estado laboral:", error);
    }

  }

  const handleEliminar = (index: any) => {
    const nuevaLista = [...produccionesIntelectuales];
    nuevaLista.splice(index, 1);
    setProduccionesIntelectuales(nuevaLista);
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
        <div className='grid grid-cols-3 gap-5'>
          <Input
              onChange={handleChange}
              titulo='Año de la Producción Intelectual'
              type='number'
              value={aProduccion}
              name='aProduccion'
          />

          <Input
              onChange={handleChange}
              titulo='Tema de Investigación'
              type='text'
              value={tema}
              name='temaProduccion'
          />

          <Input
              onChange={handleChange}
              titulo='Institución'
              type='text'
              value={institucion}
              name='institucionProduccion'
          />

          <Select
              onChange={handleChange}
              titulo='Tipo de Publicación'
              opciones={publicacion}
              value={publicacionId}
              name='publicacionId'
            />

          <Select
            onChange={handleChange}
            titulo='Forma de Trabajo'
            opciones={formaTrabajo}
            value={formaTrabajoId}
            name='formaTrabajoId'
          />

        </div>
        <div className='m-3'>
          <button
            className='p-2 m-3 bg-green-900 text-white rounded-2xl hover:bg-green-500'
            >Agregar
          </button>
        </div>

      </form>

      {/* Mostrar los elementos en tiempo real */}
      <ul>
        <div className='mx-auto max-w-4xl text-xs'>
          {tabla && 
            <Table>
            <TableHead>
              <TableRow className='text-slate-600 '>
                <TableHeaderCell>Año de la<br/> Producción</TableHeaderCell>
                <TableHeaderCell>Tema de la<br/> Producción</TableHeaderCell>
                <TableHeaderCell>Institución de la <br/> Producción</TableHeaderCell>
                <TableHeaderCell>Tipo de <br/> Publicación</TableHeaderCell>
                <TableHeaderCell>Forma de <br/> Trabajo</TableHeaderCell>
              </TableRow>
            </TableHead>
            

            <TableBody className=''>
              {produccionesIntelectuales.map((elemento, index) => (
                    <TableRow key={index} className=''>
                        <TableCell>{elemento.aProduccion}</TableCell>
                        <TableCell>{elemento.temaProduccion}</TableCell>
                        <TableCell>{elemento.institucionProduccion}</TableCell>
                        <TableCell>{elemento.nombrePublicacionId}</TableCell>
                        <TableCell>{elemento.nombreFormaTrabajoId}</TableCell>
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

export default ProduccionesIntelectual
