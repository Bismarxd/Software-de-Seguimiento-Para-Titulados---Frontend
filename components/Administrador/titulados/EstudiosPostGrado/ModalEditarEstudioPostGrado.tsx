import React, {useState, useEffect} from 'react'
import Alert from '@mui/material/Alert';
import { Input,Select, Option, Typography } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { toast } from 'react-toastify'

type Props = {
    setModalEditar: React.Dispatch<React.SetStateAction<boolean>>,
    estudio: any
  }
 
const ModalEditarEstudioPostGrado = (props: Props) => {
    console.log(props.estudio)
    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')

    const [datosEditados, setDatosEditados] = useState(props.estudio)

    const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
        e.preventDefault();
         // Verificar si algún campo está vacío
      const camposVacios = Object.entries(datosEditados).filter(([key, value]) => value === "");
    
      if (camposVacios.length > 0) {
          setAlerta(true);
          setAlertaMensaje(`Los siguientes campos están vacíos: ${camposVacios.map(([key]) => key).join(", ")}`);
          setTimeout(() => {
            setAlerta(false)
          }, 5000)
          return; // Detener la función si hay campos vacíos
      }

        const user = localStorage.getItem('userId');
        // Agregar el usuario a los datos editados
        const datosEditadosConUsuario = {
            ...datosEditados,
            adminId: user // Asegúrate de tener un identificador válido del usuario
        };
        axios.put(`${process.env.NEXT_PUBLIC_URL}/titulado/editar_estudio_titulado/${datosEditados.id}`, datosEditadosConUsuario)
        .then(result => {
            if (result.data.status) {
              
              props.setModalEditar(false)  
              toast.info('Estudio Editado Correctamente', {
                autoClose: 2000,
                onClose: () => window.location.reload()
              })           
            } else {
              console.log(result.data.Error)
              
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className='fixed top-0 left-0 w-[100%] h-[100%]  bg-[#00000080] flex items-center justify-center z-50'>
        <div className='p-8 rounded-2xl bg-white relative'>
            <span
                className='absolute top-3 right-3 cursor-pointer text-stone-900 text-3xl'
                onClick={() => props.setModalEditar(false)}
            >X</span>
             <h1 className='text-slate-900 mb-10 text-2xl text-center'>Editar Estudio PostGrado</h1>

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
                    label="Titulo del Curso"
                    placeholder={props.estudio.tituloCursoPostGrado}
                    onChange={e => setDatosEditados({...datosEditados, 'tituloCursoPostGrado': e.target.value})}     
                    name='tituloCursoPostGrado'
                />
                <Input 
                    crossOrigin={'anonimus'}
                    label="Año de inicio del curso"
                    placeholder={props.estudio.aInicioPostGrado}
                    type='number'
                    onChange={e => setDatosEditados({...datosEditados, 'aInicioPostGrado': e.target.value})}     
                    name='aInicioPostGrado'
                />
                <Input 
                    crossOrigin={'anonimus'}
                    label="Modalidad de graduación"
                    placeholder={props.estudio.modalidadGraduacionPostGrado}
                    onChange={e => setDatosEditados({...datosEditados, 'modalidadGraduacionPostGrado': e.target.value})}     
                    name='modalidadGraduacionPostGrado'
                />
                <Input 
                    crossOrigin={'anonimus'}
                    label="Año de graduación"
                    placeholder={props.estudio.aGraduacionPostGrado}
                    type='number'
                    onChange={e => setDatosEditados({...datosEditados, 'aGraduacionPostGrado': e.target.value})}     
                    name='aGraduacionPostGrado'
                />
                <Select
                    placeholder
                    label="Grado Academico"
                    onChange={e => setDatosEditados({...datosEditados, 'gradoAcademicoPostGrado': e})}
                    name="gradoAcademicoPostGrado"
                    // onChange={handleChange}
                    // titulo='Grado Academico'
                    // type='text'
                    // value={gradoAcademico}
                    // name='gradoAcademicoPostGrado'
                    // placeholder='Ej: Maestría, Doctorado'
                >
                    <Option value="maestria">Maestria</Option>
                    <Option value="doctorado">Doctorado</Option>
                </Select>
                <Select
                    placeholder
                    label="Tipo de Estudio(*)"             
                    onChange={e => setDatosEditados({...datosEditados, 'tipoEstudioPostGrado': e})}
                    name="tipoEstudioPostGrado"
                >
                    <Option value="maestria">Maestría</Option>
                    <Option value="diplomado">Diplomado</Option>
                    <Option value="especializacion">Especialización</Option>
                    <Option value="doctorado">Doctorado</Option>
                    <Option value="post doctorado">Postdoctorado</Option>
                    <Option value="certificación Profesional">Certificación Profesional</Option>
                    <Option value="otro">Otro</Option>
                </Select>
                <Input 
                    crossOrigin={'anonimus'}
                    label="titulo del trabajo final"
                    placeholder={props.estudio.tituloTrabajoPostGrado}
                    onChange={e => setDatosEditados({...datosEditados, 'tituloTrabajoPostGrado': e.target.value})}     
                    name='tituloTrabajoPostGrado'
                />
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

export default ModalEditarEstudioPostGrado