import React from 'react'
import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";

  type Props = {
    openDrawer: any;
    closeDrawer: any;
    modalVer: any;
    estudio: any;
  }

const ModalVerEstudioPostGrado = ({openDrawer, closeDrawer, modalVer, estudio}: Props) => {
  return (
    <Drawer placeholder open={modalVer} onClose={closeDrawer} className="p-4" placement="top">
    <div className="mb-6 flex items-center justify-between">
      <Typography placeholder variant="h5" color="blue-gray">
            {estudio.tituloCursoPostGrado }
      </Typography>
      <IconButton placeholder variant="text" color="blue-gray" onClick={closeDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
    </div>
    <div className='grid grid-cols-2'>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
      Año de Inicio del curso : {estudio.aInicioPostGrado}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
      Modalidad de Graduación : {estudio.modalidadGraduacionPostGrado}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
      Año de Graduación : {estudio.aGraduacionPostGrado}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
      Grado Academico: {estudio.gradoAcademicoPostGrado}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
      Tipo de Estudio: {estudio.tipoEstudioPostGrado}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
      Titulo del Trabajo Final: {estudio.tituloTrabajoPostGrado}
      </Typography>
    </div>
  
    
  </Drawer>
  )
}

export default ModalVerEstudioPostGrado