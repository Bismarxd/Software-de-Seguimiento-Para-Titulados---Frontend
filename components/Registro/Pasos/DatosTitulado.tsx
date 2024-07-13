import React, {useContext, useEffect, useState} from 'react'
import { RegistroContext } from '@/context/RegistroContext'
import Input from '@/components/Diseño/Input'
import Select from '@/components/Diseño/Select'
import { Typography } from '@material-tailwind/react'
import axios from 'axios'

interface GradoAcademico {
    id: string | number,
    tituloGradoAcademico: string,
    value: string | number | [];
    label: string;
}
interface AreaTrabajo {
    id: string | number,
    tituloAreaTrabajo: string,
    value: string | number | [];
    label: string;
}
interface ModalidadTitulacion {
    id: string | number,
    tituloModalidadTitulacion: string,
    value: string | number | [];
    label: string;
}
interface FormaTrabajo {
    id: string | number,
    tituloFormaTrabajo: string,
    value: string | number | [];
    label: string;
}

interface Props {
    aIngreso: number,
    aEgreso: number,
    aTitulacion: number,
    aExperienciaLaboral: number,
    gradoAcademicoId: number,
    modalidadTitulacionId: number,
    areaTrabajoId: number,
    formaTrabajoId: number,
    imagen: string,
    otro: any,
} 
  
  interface PropsContext {
    datosTitulado: Props ,
    setDatosTitulado: React.Dispatch<React.SetStateAction<Props>>
  }

const DatosTitulado = () => {

    const {datosTitulado, setDatosTitulado}: PropsContext = useContext<any>(RegistroContext)
    const [gradosAcademicos, setGradosAcademicos] = useState<GradoAcademico[]>([])
    const [modalidadesTitulacion, setModalidadesTitulacion] = useState<ModalidadTitulacion[]>([])
    const [areasTrabajo, setAreasTrabajo] = useState<AreaTrabajo[]>([])
    const [formaTrabajo, setFormaTrabajo] = useState<FormaTrabajo[]>([])

    const [otroArea, setOtroArea] = useState(false);
    

    useEffect(() => {
        //traer los grados academicos
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/grados_academicos`)
        .then(result => {
        if (result.data.status) {
            const datosGrados = [ {value: "", label: ""}, ...result.data.result.map((item: GradoAcademico) => ({
                value: item.id,
                label: item.tituloGradoAcademico
            }))]

            setGradosAcademicos(datosGrados)
        }else {
            alert(result.data.Error)
        }
        }).catch(err => console.log(err))

        //traer las modaliaes de titulacion
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/modalidades_titulacion`)
        .then(result => {
        if (result.data.status) {
            const datosModalidad= [ {value: "", label: ""}, ...result.data.result.map((item:ModalidadTitulacion) => ({
                value: item.id,
                label: item.tituloModalidadTitulacion
            }))]

            setModalidadesTitulacion(datosModalidad)
        }else {
            alert(result.data.Error)
        }
        }).catch(err => console.log(err))

        
        //traer las areas de trabajo
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/areas_trabajo`)
        .then(result => {
        if (result.data.status) {
            const datosAreas = [ {value: "", label: ""}, ...result.data.result.map((item: AreaTrabajo) => ({
                value: item.id,
                label: item.tituloAreaTrabajo
            }))]

            setAreasTrabajo(datosAreas)
        }else {
            alert(result.data.Error)
        }
        }).catch(err => console.log(err))

        //traer las formas de trabajo
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/formas_trabajo`)
        .then(result => {
        if (result.data.status) {
            const datosFormas = [ {value: "", label: ""}, ...result.data.result.map((item: FormaTrabajo) => ({
                value: item.id,
                label: item.tituloFormaTrabajo
            }))]

            setFormaTrabajo(datosFormas)
        }else {
            alert(result.data.Error)
        }
        }).catch(err => console.log(err))
    },[])

    const handleChange = (e: any) => {  
        const {name, value} = e.target;
        setDatosTitulado({...datosTitulado, [name]: value}) 
      }

      //Para area de trabajo
      const handleChangeArea = (e: any) => {  
        const {name, value} = e.target;
        setDatosTitulado({...datosTitulado, [name]: value}) 
      }
  return (
    <div>
        
        {/* años de ingreso, egreso, titulción y experiencia laboral */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
            {/* Año Ingreso */}
      
                <Input          
                    placeholder='Ej: 2008'     
                  titulo='Año de Ingreso(*)'
                  onChange={handleChange}
                  name='aIngreso'
                  value={datosTitulado["aIngreso"] || ""}     
                  type='number'

                />
              
            {/* Año Egreso */}
    
           
            <Input
                placeholder='Ej: 2013' 
                titulo='Año de Egreso(*)'
                onChange={handleChange}
                value={datosTitulado["aEgreso"] || ""}     
                name='aEgreso'               
                type='number'
                
            />
            

        {/* Año Titulación */}
               
            <Input
                placeholder='Ej: 2014' 
                titulo='Año de Titulación(*)'      
                name='aTitulacion'
                onChange={handleChange}
                value={datosTitulado["aTitulacion"] || ""}   
                type='number'
            />
        

        {/* Años Experiencia Laboral */}
      
            
            <Input
                placeholder='Ej: 2' 
                titulo='Años de Experiencia Laboral(*)'
                name='aExperienciaLaboral'
                onChange={handleChange}
                value={datosTitulado["aExperienciaLaboral"] || ""}   
                type='number'
            />
            


      </div>
        {/* grado Academico, modalidad de titulación, area de trabajo, forma de trabajo */}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {/* Grado Academico*/}

            
                <Select
                    titulo='Grado Académico(*)'
                    opciones={gradosAcademicos}
                    value={datosTitulado["gradoAcademicoId"] || ""}  
                    onChange={handleChange}
                    name='gradoAcademicoId' 
                />
            
        

        {/* Modalidad de Titulación*/}
        
                <Select
                    titulo='Modalidad de titulación(*)'
                    opciones={modalidadesTitulacion}
                    value={datosTitulado["modalidadTitulacionId"] || ""}  
                    onChange={handleChange}
                    name='modalidadTitulacionId'
                    
                />
               
           

        {/* Area de Trabajo*/}
       
                <Select
                    titulo='Area de Trabajo(*)'
                    opciones={areasTrabajo}
                    value={datosTitulado["areaTrabajoId"] || ""}  
                    onChange={handleChangeArea}
                    name='areaTrabajoId' 
                />

            {datosTitulado.areaTrabajoId === 7 && (
                     <Input
                     titulo='Escriba el area de trabajo'
                     name='otro'
                     placeholder='En caso de elegir otro especifique'
                     onChange={handleChange}
                     value={datosTitulado["otro"] || ""}   
                     type='text'
                 />
            )
                
            }
            

        {/* Forma de Trabajo*/}
        
                <Select
                     titulo='Forma de Trabajo(*)'
                     opciones={formaTrabajo}
                     value={datosTitulado["formaTrabajoId"] || ""}  
                     onChange={handleChange}
                     name='formaTrabajoId' 

                />
                    
           
      </div>

        {/* imagen */}
        <div className='w-[50%]'>
            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                {" "} Imagen
            </div>

            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
                <input
                    type="file"
                    accept='image/*' // Permite seleccionar archivos de imagen
                    name='imagen'
                    onChange={(e: any) => {
                        const file = e.target.files[0];
                        // Verificar si se seleccionó un archivo
                        if (file) {
                        setDatosTitulado({...datosTitulado, imagen: file});
                        } else {
                        // Si no se seleccionó ningún archivo, establece la imagen en null o algún valor predeterminado
                        setDatosTitulado({...datosTitulado, imagen: ''});
                        }
                    }}
                    className='p-1 px-2 appearance-none outline-none w-full text-gray-600'
                />
            </div>
        </div>
    </div>
  )
}

export default DatosTitulado
