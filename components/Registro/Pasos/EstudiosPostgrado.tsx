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

interface GradoAcademico {
  id: string | number,
  tituloGradoAcademico: string
}

const EstudiosPostGrado = () => {
  const [alerta, setAlerta] = useState(false)
  const [alertaMensaje, setAlertaMensaje] = useState('')

  const {estudiosPostGrado, setEstudiosPostGrado} = useContext(RegistroContext)
  const [tabla, setTabla] = useState(false)
  

  
  // Estado para almacenar el nombre y apellido ingresados en el formulario
  const [aInicio, setAInicio] = useState('');
  const [tituloCurso, setTituloCurso] = useState('');
  const [tipoEstudio, setTipoEstudio] = useState('');
  const [gradoAcademico, setGradoAcademico] = useState('');
  const [aGraduacion, setAGraduacion] = useState('');
  const [modalidadGraduacion, setModalidadGraduacion] = useState('');
  const [tituloTrabajo, setTituloTrabajo] = useState('');
  const [archivo, setArchivo] = useState('');

  

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormHTMLAttributes<HTMLFormElement>) => {
    e.preventDefault();
    setTabla(true)
    
    // Comprobar que se hayan ingresado el nombre y el apellido
    if (tituloCurso.trim() !== '' && aInicio.trim() !== '' && tipoEstudio.trim() !== '' && gradoAcademico.trim() !== '' && aGraduacion.trim() !== '' && modalidadGraduacion.trim() !== '' && tituloTrabajo.trim() !== '') 
      {
        
        // Generar un nuevo elemento con el nombre y el apellido
        const nuevoElemento = {
                                aInicioPostGrado: aInicio, 
                                tituloCursoPostGrado: tituloCurso, 
                                tipoEstudioPostGrado: tipoEstudio, 
                                gradoAcademicoPostGrado: gradoAcademico, 
                                aGraduacionPostGrado: aGraduacion, 
                                modalidadGraduacionPostGrado: modalidadGraduacion, 
                                tituloTrabajoPostGrado: tituloTrabajo, 
                              };
        // Añadir el nuevo elemento al estado
        setEstudiosPostGrado([...estudiosPostGrado, nuevoElemento]);
        // Limpiar los campos del formulario después de agregar el elemento
        setAInicio('');
        setTituloCurso('');
        setTipoEstudio('');
        setGradoAcademico('');
        setAGraduacion('');
        setModalidadGraduacion('');
        setTituloTrabajo('');

        setAlerta(false)
      } else 
      {
        setTabla(false)
        setAlerta(true)
        setAlertaMensaje('Todos los campos son obligatorios')
        setTimeout(() => {
          setAlerta(false)
        }, 5000)
      }
  };

  const handleChange = (e: any) => {
    
    const { name, value } = e.target
    if (name === 'aInicioPostGrado') {
      setAInicio(value)
    } else if (name === 'tituloCursoPostGrado') {
      setTituloCurso(value)
    } else if (name === 'tipoEstudioPostGrado') {
      setTipoEstudio(value)
    } else if (name === 'gradoAcademicoPostGrado') {
      setGradoAcademico(value)
    } else if (name === 'aGraduacionPostGrado') {
      setAGraduacion(value)
    } else if (name === 'modalidadGraduacionPostGrado') {
      setModalidadGraduacion(value)
    } else if (name === 'tituloTrabajoPostGrado') {
      setTituloTrabajo(value)
    }
  }

  const handleEliminar = (index: any) => {
    const nuevaLista = [...estudiosPostGrado];
    nuevaLista.splice(index, 1);
    setEstudiosPostGrado(nuevaLista);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file); // Almacenar el archivo en el estado
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
        <div className='grid grid-cols-3 gap-5'>
          <Input
            onChange={handleChange}
            titulo='Titulo del Curso'
            type='text'
            placeholder='Ej: Diplomado en Educación'
            value={tituloCurso}
            name='tituloCursoPostGrado'
          />
          <Input
            onChange={handleChange}
            titulo='Año de Inicio PostGrado'
            placeholder='Ej: 2020'
            type='number'
            value={aInicio}
            name='aInicioPostGrado'
          />

          <Input
            onChange={handleChange}
            titulo='Año de Graduación'
            placeholder='Ej: 2022'
            type='number'
            value={aGraduacion}
            name='aGraduacionPostGrado'
          />

          <Input
            onChange={handleChange}
            titulo='Tipo de Estudio'
            type='text'
            placeholder='Ej: maestria, diplomado, especialización, etc'
            value={tipoEstudio}
            name='tipoEstudioPostGrado'
            
          />

          <Input
            onChange={handleChange}
            titulo='Grado Academico'
            type='text'
            value={gradoAcademico}
            name='gradoAcademicoPostGrado'
            placeholder='Ej: Maestría, Doctorado'
          />

         

          <Input
            onChange={handleChange}
            titulo='Modalidad de Graduación'
            type='text'
            value={modalidadGraduacion}
            name='modalidadGraduacionPostGrado'
            placeholder='Ej: Tesis, Proyecto de grado, Examen, etc'
          />

          <Input
            onChange={handleChange}
            titulo='Titulo de Trabajo de Graduación'
            type='text'
            value={tituloTrabajo}
            name='tituloTrabajoPostGrado'
            placeholder='Ej: Análisis de Políticas Públicas'
          />
        </div>

        {/* titulo */}
        <div className='w-[50%]'>
            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                {" "} Subir Titulo PostGrado
            </div>

            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
                <input
                    type="file"
                    accept='image/*,application/pdf' // Permite seleccionar archivos de imagen
                    name='imagen'
                    onChange={handleFileChange}
                    className='p-1 px-2 appearance-none outline-none w-full text-gray-600'
                />
            </div>
        </div>
      
        <div className='m-3'>
          
        <button
            className='p-2 m-3 bg-green-900 text-white rounded-2xl hover:bg-green-500'
          >Agregar</button>
        </div>
        
      </form>
       {/* Mostrar los elementos en tiempo real */}
       <ul>
       <div className='mx-auto max-w-4xl text-xs'>
          {tabla && 
            <Table>
            <TableHead>
              <TableRow className='text-slate-600 '>
                <TableHeaderCell>Año de <br/> Inicio</TableHeaderCell>
                <TableHeaderCell>Titulo del <br/> Curso</TableHeaderCell>
                <TableHeaderCell>Tipo de <br/> Estudio</TableHeaderCell>
                <TableHeaderCell>Grado <br/> Academico</TableHeaderCell>
                <TableHeaderCell>Año de <br/> Graduación</TableHeaderCell>
                <TableHeaderCell>Modalidad <br/> de Graduación </TableHeaderCell>
                <TableHeaderCell>Titulo del <br/> Trabajo</TableHeaderCell>
              </TableRow>
            </TableHead>
            

            <TableBody className=''>
              {estudiosPostGrado.map((elemento, index) => (
                    <TableRow key={index} className=''>
                        <TableCell>{elemento.aInicioPostGrado}</TableCell>
                        <TableCell>{elemento.tituloCursoPostGrado}</TableCell>
                        <TableCell>{elemento.tipoEstudioPostGrado}</TableCell>
                        <TableCell>{elemento.gradoAcademicoPostGrado}</TableCell>
                        <TableCell>{elemento.aGraduacionPostGrado}</TableCell>
                        <TableCell>{elemento.modalidadGraduacionPostGrado}</TableCell>
                        <TableCell>{elemento.tituloTrabajoPostGrado}</TableCell>
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

export default EstudiosPostGrado
