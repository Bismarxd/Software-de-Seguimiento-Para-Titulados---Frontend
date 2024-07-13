import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Input from '@/components/Diseño/Input'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify'
import axios from 'axios'
import { Typography, Chip, Card } from '@mui/material';

type PropsEmpresa = {
  titulo: string;
  empresa: string;
  telefono: string;
  salario: number;
  fechaVencimiento: string;
  ubicacion: string;
  descripcion: string;

}

type Props = {
    setAbrirModal: React.Dispatch<React.SetStateAction<boolean>>,
    oferta : PropsEmpresa
}

const VerModalOfertas = (props: Props) => {
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
    <div className='w-[100%] h-[100%] absolute top-0 left-0 bg-[#00000080] flex items-center justify-center z-50'>
      <div className='p-8 rounded-2xl bg-white relative'>

        <span
          className='absolute top-3 right-3 cursor-pointer text-stone-900 text-3xl'
          onClick={() => props.setAbrirModal(false)}
        >X</span>
        <div className="max-w-full animate-pulse">
        <Typography variant="h6">{props.oferta.titulo}</Typography>
            
        <Card className="mb-4 flex flex-col gap-3 p-3">
            <Chip label={`Empresa:${props.oferta.empresa}`} color="default" />
            <div className='flex gap-3'>
                <Chip label={`Telefono:${props.oferta.telefono}`} color="primary" />
                <Chip label={`Salario:${props.oferta.salario} Bs.`} color="success" />
            </div>
            
            <Chip label={`Fecha de Vencimiento:${props.oferta.fechaVencimiento}`} color="secondary" />
            <Chip label={`Ubicación:${props.oferta.ubicacion}`} color="warning" />
  
            <Typography variant="h6">Descripción:</Typography>
                        <Typography 
                            style={{ 
                                whiteSpace: 'pre-wrap', 
                                wordBreak: 'break-word' 
                              }}
 
                        >
                          {props.oferta.descripcion}
                        </Typography>
          
        </Card>

           
        </div>
        
      </div>
      
    </div>
  )
}

export default VerModalOfertas