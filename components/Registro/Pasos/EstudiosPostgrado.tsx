import React, {useContext, useState, useEffect} from 'react'
import { RegistroContext } from '@/context/RegistroContext'
import {
  Card,
  Select,
  Option,
  Typography
} from "@material-tailwind/react";
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

  const {estudiosPostGrado, setEstudiosPostGrado} = useContext<any>(RegistroContext)
  const [tabla, setTabla] = useState(false)
  
  // Estado para almacenar el nombre y apellido ingresados en el formulario
  const [aInicio, setAInicio] = useState('');
  const [tituloCurso, setTituloCurso] = useState('');
  const [tipoEstudio, setTipoEstudio] = useState('');
  const [gradoAcademico, setGradoAcademico] = useState('');
  const [aGraduacion, setAGraduacion] = useState('');
  const [modalidadGraduacion, setModalidadGraduacion] = useState('');
  const [tituloTrabajo, setTituloTrabajo] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit: React.MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTabla(true)
    
    // Comprobar que se hayan ingresado los datos
    if (tituloCurso.trim() !== '' && aInicio.trim() !== '' && aGraduacion.trim() !== '' && tipoEstudio.trim() !== '' && tituloTrabajo.trim() !== '' && modalidadGraduacion.trim() !== '') 
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
            titulo='Titulo del Curso(*)'
            type='text'
            placeholder='Ej: Diplomado en Educación'
            value={tituloCurso}
            name='tituloCursoPostGrado'
          />
          <Input
            onChange={handleChange}
            titulo='Año de Inicio PostGrado(*)'
            placeholder='Ej: 2020'
            type='number'
            value={aInicio}
            name='aInicioPostGrado'
          />

          <Input
            onChange={handleChange}
            titulo='Año de Graduación(*)'
            placeholder='Ej: 2022'
            type='number'
            value={aGraduacion}
            name='aGraduacionPostGrado'
          />

          <Select
              placeholder
              label="Tipo de Estudio(*)"
              value={tipoEstudio}
              onChange={(e: any) => setTipoEstudio(e)}
              name="tipoEstudioPostGrado"
          >
              <Option value="maestria">Maestría</Option>
              <Option value="diplomado">Diplomado</Option>
              <Option value="especializacion">Especialización</Option>
              <Option value="doctorado">Doctorado</Option>
              <Option value="doctorado">Postdoctorado</Option>
              <Option value="doctorado">Certificación Profesional</Option>
              <Option value="doctorado">Otro</Option>
          </Select>

          <Select
            placeholder
            label="Grado Academico"
            value={gradoAcademico}
            onChange={(e: any) => setGradoAcademico(e)}
            name="gradoAcademicoPostGrado"
            // onChange={handleChange}
            // titulo='Grado Academico'
            // type='text'
            // value={gradoAcademico}
            // name='gradoAcademicoPostGrado'
            // placeholder='Ej: Maestría, Doctorado'
          >
              <Option value="diplomado">Maestria</Option>
              <Option value="especializacion">Doctorado</Option>
          </Select>
         

          <Input
            onChange={handleChange}
            titulo='Modalidad de Graduación(*)'
            type='text'
            value={modalidadGraduacion}
            name='modalidadGraduacionPostGrado'
            placeholder='Ej: Tesis, Proyecto de grado, Examen, etc'
          />

          <Input
            onChange={handleChange}
            titulo='Titulo de Trabajo de Graduación(*)'
            type='text'
            value={tituloTrabajo}
            name='tituloTrabajoPostGrado'
            placeholder='Ej: Análisis de Políticas Públicas'
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
       <div className='mx-auto max-w-xl md:max-w-4xl text-[8px] md:text-xs'>
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
              {estudiosPostGrado.map((elemento: any, index: any) => (
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
