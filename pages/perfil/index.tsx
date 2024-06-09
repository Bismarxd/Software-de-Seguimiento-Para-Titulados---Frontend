import React, { useState, useEffect } from 'react';
import DashboardPerfil from '@/components/Perfil/DashboardPerfil';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Collapse,
} from "@material-tailwind/react";
import { FaPaperclip, FaLongArrowAltRight } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineMoneyOffCsred } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';

const Index = () => {
  const [selectedOfertaId, setSelectedOfertaId] = useState(null);
  const [datosTrabajo, setDatosTrabajo] = useState([{
    id: '',
    titulo: '',
    descripcion: '',
    fechaVencimiento: '',
    salario: '',
    telefono: '',
    ubicacion: ''
  }]);

  useEffect(() => {
    axios.get(`http://localhost:8000/ofertas/obtener_ofertas`)
      .then(result => {
        if (result.data.status) {
          setDatosTrabajo(result.data.result);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleVerMasClick = (id) => {
    if (selectedOfertaId === id) {
      setSelectedOfertaId(null); // Cerrar el modal si ya está abierto
    } else {
      setSelectedOfertaId(id); // Abrir el modal para la oferta seleccionada
    }
  };

  return (
    <div className='w-full h-screen object-cover flex'>
      <DashboardPerfil />
      <div className='grid grid-cols-1 gap-5 m-3 ml-96'>
        {datosTrabajo.map(item => (
          <div key={item.id}>
            <Card placeholder className="mt-6 w-auto">
              <CardBody className='m-3' placeholder>
                <FaPaperclip className='text-3xl m-4' />
                <Typography variant="h5" color="blue-gray" className="mb-2" placeholder>
                  {item.titulo}
                </Typography>
                <div className='grid grid-cols-2 gap-2'>
                  <Typography placeholder variant="h6" color="blue-gray" className="mb-2 bg-sky-800 text-white rounded-xl flex justify-between">
                    <CiCalendarDate className='text-white text-xl ml-2' />
                    <label htmlFor="" className='mr-3'>
                      {item.fechaVencimiento}
                    </label>
                  </Typography>
                  <Typography placeholder variant="h6" color="blue-gray" className="mb-2 text-white bg-green-600 rounded-xl flex justify-between">
                    <MdOutlineMoneyOffCsred className='text-white text-xl ml-2' />
                    <label htmlFor="" className='mr-3'>
                      {item.salario} Bs.
                    </label>
                  </Typography>
                  <Typography placeholder variant="h6" color="blue-gray" className="mb-2 text-white bg-indigo-800 rounded-xl flex justify-between">
                    <FaPhoneVolume className='text-white text-xl ml-2' />
                    <label htmlFor="" className='mr-3'>
                      {item.telefono}
                    </label>
                  </Typography>
                </div>
                <Typography placeholder variant="h6" color="blue-gray" className="mb-2 text-white bg-slate-500 rounded-xl flex justify-between">
                  <FaLocationDot className='text-white text-xl ml-2' />
                  <label htmlFor="" className='mr-3'>
                    {item.ubicacion}
                  </label>
                </Typography>
                {selectedOfertaId !== item.id && (
                  <Typography placeholder>
                    {item.descripcion.slice(0, 30)}
                    {item.descripcion.length > 30 ? '...' : ''}
                  </Typography>
                )}
              </CardBody>
              <CardFooter placeholder className="pt-0">
                <Button
                  placeholder
                  size="sm"
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={() => handleVerMasClick(item.id)}
                >
                  {selectedOfertaId === item.id ? 'Ver Menos' : 'Ver Más'}
                  <FaLongArrowAltRight />
                </Button>
                <Collapse open={selectedOfertaId === item.id}>
                  <Card placeholder className="my-4 mx-auto w-8/12 p-2">
                    <CardBody placeholder style={{ overflowWrap: 'break-word' }}>
                      <Typography placeholder>
                        {item.descripcion}
                      </Typography>
                    </CardBody>
                  </Card>
                </Collapse>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
