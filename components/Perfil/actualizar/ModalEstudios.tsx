import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Input from '@/components/Diseño/Input'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify'
import axios from 'axios'

type Props = {
    setAbrirModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalEstudios = (props: Props) => {
    const router = useRouter()

    const [alerta, setAlerta] = useState(false)
    const [alertaMensaje, setAlertaMensaje] = useState('')

    const [ofertasLaborales, setOfertasLaborales] = useState({
        titulo: "",
        empresa: "",
        ubicacion: "",
        telefono: "",
        salario: "",
        fechaVencimiento: "",
        descripcion: "",
        estado: 1
       
    })

    

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setOfertasLaborales({...ofertasLaborales, [name]: value})
    
      }

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // Verificar si algún campo está vacío
      const camposVacios = Object.entries(ofertasLaborales).filter(([key, value]) => value === "");

      if (camposVacios.length > 0) {
          setAlerta(true);
          setAlertaMensaje(`Los siguientes campos están vacíos: ${camposVacios.map(([key]) => key).join(", ")}`);
          setTimeout(() => {
            setAlerta(false)
          }, 5000)
          return; // Detener la función si hay campos vacíos
      }
        axios.post(`${process.env.NEXT_PUBLIC_URL}/ofertas/add_ofertas`, ofertasLaborales)
        .then(result => {
            if (result.data.status) {
              
              props.setAbrirModal(false)  
              toast.success('Oferta Laboral Aregada Correctamente', {
                autoClose: 2000,
                onClose: () => window.location.reload()
              })           
            } else {
              console.log(result.data.error)
              
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className='w-[100%] h-[200%] absolute top-0 left-0 bg-[#00000080]  flex items-center justify-center z-50'>
      <div className='p-8 rounded-2xl bg-white relative'>

        <span
          className='absolute top-3 right-3 cursor-pointer text-stone-900 text-3xl'
          onClick={() => props.setAbrirModalEstudios(false)}
        >X</span>
        <h1 className='text-slate-900 mb-10 text-2xl text-center'>Añadir EstudioPostGrado</h1>

        <form 
          className=' text-slate-800'
          onSubmit={handleSubmit}
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
                        titulo='Titulo'
                        onChange={handleChange}
                        value={ofertasLaborales['titulo']}
                        type='text'
                        name='titulo'                      
                    />
                    <Input 
                        titulo='Empresa'
                        value={ofertasLaborales['empresa']}
                        type='text'
                        name='empresa'
                        onChange={handleChange}                      
                    />  
                    <Input 
                        titulo='Ubicación'
                        value={ofertasLaborales['ubicacion']}
                        type='text'
                        name='ubicacion'
                        onChange={handleChange}                      
                    />  
                    <Input 
                        titulo='Teléfono o Celular'
                        value={ofertasLaborales['telefono']}
                        type='number'
                        name='telefono'
                        onChange={handleChange}                      
                    />  
                    <Input 
                        titulo='Salario'
                        value={ofertasLaborales['salario']}
                        type='number'
                        name='salario'
                        onChange={handleChange}                    
                    />  
                    <Input 
                        titulo='Fecha de Vencimiento'
                        value={ofertasLaborales['fechaVencimiento']}
                        type='date'
                        name='fechaVencimiento'
                        onChange={handleChange}                      
                    />  
                    <Input 
                        titulo='Descripción'
                        value={ofertasLaborales['descripcion']}
                        type='text'
                        name='descripcion'
                        onChange={handleChange}                     
                    />           
            </div>
        
            <button 
                className='w-[100%] p-3 rounded bg-menuColor2 text-white font-semibold cursor-pointer hover:bg-menuColor1 uppercase m-4'
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

export default ModalEstudios