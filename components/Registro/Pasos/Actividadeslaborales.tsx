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


const tipoEstudio = [
  {
    value: "",
    label: ""
  },
  {
    value: "si",
    label: "Si"
  },
  {
    value: "no",
    label: "No"
  }
] 

const ActividadesLaborales = () => {
  const [alerta, setAlerta] = useState(false)
  const [alertaMensaje, setAlertaMensaje] = useState('')

  const {actividadesLaborales, setActividadesLaborales} = useContext<any>(RegistroContext)
  const [tabla, setTabla] = useState(false)
  
  const [estadosLaboral, setEstadosLaboral] = useState([])

  // Estado para almacenar el nombre y apellido ingresados en el formulario
  const [aIngreso, setAIngreso] = useState('');
  const [aFinalisacion, setAFinalisacion] = useState('');
  const [estaTrabajando, setEstaTrabajando] = useState('');
  const [cargoOTarea, setCargoOTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [estado, setEstado] = useState('');
  const [nombreEstado, setNombreEstado] = useState('');


  

  // Función para manejar el envío del formulario
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTabla(true)
    
    // Comprobar que se hayan ingresado el nombre y el apellido
    if (institucion.trim() !== '' && cargoOTarea.trim() !== '' && estaTrabajando.trim() !== '') {
      // Generar un nuevo elemento con el nombre y el apellido
      const nuevoElemento = {
                              aIngresoTrabajo: aIngreso, 
                              aFinalisacionTrabajo: aFinalisacion, 
                              estaTrabajando: estaTrabajando, 
                              cargoOTareaTrabajo: cargoOTarea, 
                              duracionTrabajo: duracion, 
                              institucionTrabajo: institucion, 
                              estadoActividadLaboralId: estado, 
                              nombreEstadoLaboral : nombreEstado
                            };
      // Añadir el nuevo elemento al estado
      setActividadesLaborales([...actividadesLaborales, nuevoElemento]);
      // Limpiar los campos del formulario después de agregar el elemento
      setAIngreso('');
      setAFinalisacion('');
      setEstaTrabajando('');
      setCargoOTarea('');
      setDuracion('');
      setInstitucion('');
      setEstado('');
    } else 
    {
      setAlerta(true)
      setTabla(false)
      setAlertaMensaje('Algunos Campos son Obligatorios')
      setTimeout(() => {
        setAlerta(false)
      }, 5000)
    }
  };

  const handleChange = async (e: any) => {
    console.log(e.target);
    
    
    const { name, value } = e.target
    if (name === 'aIngresoTrabajo') {
      setAIngreso(value)
    } else if (name === 'aFinalisacionTrabajo') {
      setAFinalisacion(value)
    } else if (name === 'estaTrabajando') {
      setEstaTrabajando(value)
    } else if (name === 'cargoOTareaTrabajo') {
      setCargoOTarea(value)
    } else if (name === 'duracionTrabajo') {
      setDuracion(value)
    } else if (name === 'institucionTrabajo') {
      setInstitucion(value)
    } else if (name === 'estadoActividadLaboralId') {
      setEstado(value)     
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/estado_laboral/${value}`);
      if (response.status === 200) {
        setNombreEstado(response.data.titulo);
      } else {
        console.error("Error al obtener el estado laboral:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener el estado laboral:", error);
    }
  }
  
  
  const handleEliminar = (index: any) => {
    const nuevaLista = [...actividadesLaborales];
    nuevaLista.splice(index, 1);
    setActividadesLaborales(nuevaLista);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        {alerta && 
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                {alertaMensaje}
              </Alert>
            </Stack>
        }
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>

          <Input
            onChange={handleChange}
            titulo='Institución u Empresa(*)'
            placeholder='Ej: Clínica Los Olivos'
            type='text'
            value={institucion}
            name='institucionTrabajo'
          />

          <Input
            placeholder=''
            onChange={handleChange}
            titulo='Año de Ingreso'
            type='number'
            value={aIngreso}
            name='aIngresoTrabajo'
          />

          <Input
            onChange={handleChange}
            placeholder=''
            titulo='Cargo o Tarea Realizada(*)'
            type='text'
            value={cargoOTarea}
            name='cargoOTareaTrabajo'
          />

          <Select
            onChange={handleChange}
            titulo='Esta Trabajando?(*)'
            opciones={tipoEstudio}
            value={estaTrabajando}
            name='estaTrabajando'
          />
          

         {estaTrabajando === 'no' &&
             <Input
                placeholder=''
                onChange={handleChange}
                titulo='Año de Finalisación(*)'
                type='number'
                value={aFinalisacion}
                name='aFinalisacionTrabajo'
           />
         }

          
          

          <div className='flex gap-2 items-end'>
          <Input
            placeholder=''
            onChange={handleChange}
            titulo='Tiempo de Trabajo'
            type='number'
            value={duracion}
            name='duracionTrabajo'
          />
          <label className='text-gray-500'>años</label>
          </div>

          
          
         

          {/* <Input
            onChange={handleChange}
            titulo='Estado'
            type='text'
            value={actividadesLaborales['estadoActividadLaboralId']}
            name='estadoActividadLaboralId'
          /> */}
        </div>
      
        <div className='m-3'>
        <button
            className='p-2 m-3 bg-green-900 text-white rounded-2xl hover:bg-green-500'
          >Agregar</button>
        </div>
        
      </form>
       {/* Mostrar los elementos en tiempo real */}
       <ul>
        <div className='mx-auto max-w-4xl text-[8px] md:text-xs'>
         {tabla && 
           <Table>
           <TableHead>
             <TableRow className='text-slate-600 '>
               <TableHeaderCell>Año de <br/> Ingreso</TableHeaderCell>
               <TableHeaderCell>Año de <br/> Finalisación</TableHeaderCell>
               <TableHeaderCell>Sigue <br/> Trabajando</TableHeaderCell>
               <TableHeaderCell>Cargo <br/> o <br/> Área</TableHeaderCell>
               <TableHeaderCell>Duración</TableHeaderCell>
               <TableHeaderCell>Institución</TableHeaderCell>
             </TableRow>
           </TableHead>
           

           <TableBody className=''>
             {actividadesLaborales.map((elemento: any, index: any) => (
                   <TableRow key={index} className=''>
                       <TableCell>{elemento.aIngresoTrabajo}</TableCell>
                       <TableCell>{elemento.aFinalisacionTrabajo}</TableCell>
                       <TableCell>{elemento.estaTrabajando}</TableCell>
                       <TableCell>{elemento.cargoOTareaTrabajo}</TableCell>
                       <TableCell>{elemento.duracionTrabajo}</TableCell>
                       <TableCell>{elemento.institucionTrabajo}</TableCell>

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

export default ActividadesLaborales
