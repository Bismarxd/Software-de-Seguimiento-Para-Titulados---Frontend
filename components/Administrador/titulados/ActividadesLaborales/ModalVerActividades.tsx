import React from 'react'
import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";

const ModalVerActividades = ({openDrawer, closeDrawer, actividad, modalVer}) => {
  console.log(actividad)
  return (
    <Drawer placeholder open={modalVer} onClose={closeDrawer} className="p-4" placement="top">
        <div className="mb-6 flex items-center justify-between">
          <Typography placeholder variant="h5" color="blue-gray">
                {actividad.institucionTrabajo}
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
            Institución u Empresa: {actividad.institucionTrabajo}
          </Typography>
          <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
            Año de Ingreso: {actividad.aIngresoTrabajo}
          </Typography>
          <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
            Año de Finalisación : {actividad.aFinalisacionTrabajo}
          </Typography>
          <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
            Cargo o Tarea: {actividad.cargoOTareaTrabajo}
          </Typography>

          <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
            Duración: {actividad.duracionTrabajo}
          </Typography>

          <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
            Esta Trabajando: {actividad.estaTrabajando}
          </Typography>

          <Typography placeholder color="gray" className="mb-8 pr-4 font-normal">         
            Estado: {actividad.tituloEstado}
          </Typography>

        </div>
        
        
      </Drawer>
  )
}

export default ModalVerActividades