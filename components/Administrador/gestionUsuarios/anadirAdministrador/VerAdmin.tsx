import React from 'react'
import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";

  interface VerAdminProps {
    openDrawer: any;
    closeDrawer: any;
    modalVer: any;
    admin: any;
}

const VerAdmin: React.FC<VerAdminProps> = ({openDrawer, closeDrawer, modalVer, admin}) => {
    
  return (
    <Drawer placeholder open={modalVer} onClose={closeDrawer} className="p-4" placement="top">
    <div className="mb-6 flex items-center justify-between">
      <Typography placeholder variant="h5" color="blue-gray">
            {admin.nombre} {admin.apellidoPaterno} {admin.apellidoMaterno}
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
        Celular : {admin.celular}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        C.I. : {admin.ci}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Dirección : {admin.direccion}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Fecha de Nacimiento : {admin.fechaNacimiento}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Genero : {admin.sexo}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Email : {admin.email}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Cargo : {admin.tituloCargo}
      </Typography>
      <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">
        Descripción del Cargo : {admin.descripcionCargo}
      </Typography>
      
     
    </div>
  
    
    </Drawer>
  )
}

export default VerAdmin