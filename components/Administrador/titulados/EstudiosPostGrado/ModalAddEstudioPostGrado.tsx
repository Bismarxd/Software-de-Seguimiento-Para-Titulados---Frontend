import React, {useState, useEffect} from 'react'
import Alert from '@mui/material/Alert';
import { Input,Select, Option, Typography } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { toast } from 'react-toastify'


type PropsModalAddEstudioPostGrado = {
  setModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | string[] | undefined;
};


const ModalAddEstudioPostGrado: React.FC<PropsModalAddEstudioPostGrado> = ({ setModalAdd, id }) => {
    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')
    const [archivo, setArchivo] = useState('');

    const [datos, setDatos] = useState({
      aInicioPostGrado: '',
      tituloCursoPostGrado: '',
      aGraduacionPostGrado: '',
      gradoAcademicoPostGrado: '',
      modalidadGraduacionPostGrado: '',
      tituloTrabajoPostGrado: '',
      tipoEstudioPostGrado: 0

    })

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        // Verificar si algún campo está vacío
      const camposVacios = Object.entries(datos).filter(([key, value]) => value === "");
    
      if (camposVacios.length > 0) {
          setAlerta(true);
          setAlertaMensaje('Hay algunos campos vacios');
          setTimeout(() => {
            setAlerta(false)
          }, 5000)
          return; // Detener la función si hay campos vacíos
      }

        axios.post(`${process.env.NEXT_PUBLIC_URL}/titulado/add_estudio`, {...datos, 'tituladoId':id})
            .then(result => {
                if (result.data.status) {
                setModalAdd(false)  
                toast.success('Añadida Correctamente', {
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
          onClick={() => setModalAdd(false)}
        >X</span>
        <h1 className='text-slate-900 mb-10 text-2xl text-center'>Añadir Estudio PostGrado</h1>
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
                onChange={e => setDatos({...datos, 'tituloCursoPostGrado': e.target.value})}     
                name='tituloCursoPostGrado'
            />
            <Input 
                crossOrigin={'anonimus'}
                label="Año de inicio del curso"
                type='number'
                onChange={e => setDatos({...datos, 'aInicioPostGrado': e.target.value})}     
                name='aInicioPostGrado'
            />
            <Input 
                crossOrigin={'anonimus'}
                label="Año de graduación"
                type='number'
                onChange={e => setDatos({...datos, 'aGraduacionPostGrado': e.target.value})}     
                name='aGraduacionPostGrado'
            />
            <Select
            placeholder
            label="Tipo de Estudio(*)"             
            onChange={(e: any) => setDatos({...datos, 'tipoEstudioPostGrado': e})}
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
            <Select
              placeholder
              label="Grado Academico"
              onChange={(e: any) => setDatos({...datos, 'gradoAcademicoPostGrado': e})}
              name="gradoAcademicoPostGrado"
            >
              <Option value="maestria">Maestria</Option>
              <Option value="doctorado">Doctorado</Option>
          </Select>
         
            
            <Input 
                crossOrigin={'anonimus'}
                label="Modalidad de graduación"
                onChange={e => setDatos({...datos, 'modalidadGraduacionPostGrado': e.target.value})}     
                name='modalidadGraduacionPostGrado'
            />
            
            
            <Input 
                crossOrigin={'anonimus'}
                label="titulo del trabajo final"
                onChange={e => setDatos({...datos, 'tituloTrabajoPostGrado': e.target.value})}     
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

export default ModalAddEstudioPostGrado