import React from 'react'
import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";

  interface Props {
    openDrawer: any;
    closeDrawer: any;
    modalVer: any;
    oferta: any;
  }

const ModalVerOferta = ({openDrawer, closeDrawer, modalVer, oferta} : Props) => {
  return (
    <Drawer placeholder open={modalVer} onClose={closeDrawer} className="p-4" placement="top">
    <div className="mb-6 flex items-center justify-between">
      <Typography placeholder variant="h5" color="blue-gray">
            {oferta.titulo}
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
        Empresa : {oferta.empresa}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Fecha Limite : {oferta.fechaVencimiento}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Salario : {oferta.salario}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Teléfono : {oferta.telefono}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Ubicación : {oferta.ubicacion}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Descripción : {oferta.descripcion}
      </Typography>
    </div>
  
    
    </Drawer>
  )
}

export default ModalVerOferta