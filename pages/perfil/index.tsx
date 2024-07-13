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
    ubicacion: '',
    estado: 0,
    activo: 0,
  }]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/ofertas/obtener_ofertas`)
      .then(result => {
        if (result.data.status) {
          setDatosTrabajo(result.data.result);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleVerMasClick = (id: any) => {
    if (selectedOfertaId === id) {
      setSelectedOfertaId(null); // Cerrar el modal si ya está abierto
    } else {
      setSelectedOfertaId(id); // Abrir el modal para la oferta seleccionada
    }
  };

  // Define las URLs de las imágenes de fondo
  const backgroundImages = [
    'Imagenes Perfil/fondoPerfil2.jpg',
    'Imagenes Perfil/fondoPerfil1.jpg',
    'Imagenes Perfil/fondoPerfil1.jpg'
  ];

  return (
    <div className='w-full h-screen object-cover flex'>
      <DashboardPerfil>
      <div className='grid grid-cols-1 gap-5 m-3'>
          {datosTrabajo.filter(item => item.estado === 1 && item.activo === 1).map((item, index) => (
            <div key={item.id}>
              <Card
                placeholder
                className="mt-6 w-auto text-white"
                style={{
                  backgroundImage: `url('fondo5.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <CardBody className='m-3 text-xs' placeholder>
                  <FaPaperclip className='text-3xl m-4' />
                  <Typography color="blue-gray" className="mb-2 text-[10px] md:text-xl" placeholder>
                    {item.titulo}
                  </Typography>
                  <div className='grid grid-cols-2 gap-2'>
                    <Typography placeholder variant="h6" color="blue-gray" className="mb-2 bg-sky-800 bg-opacity-20 text-white rounded-xl flex justify-between">
                      <CiCalendarDate className='text-white text-xs md:text-xl ml-2' />
                      <Typography placeholder className='hidden md:flex'>Fecha Limite:</Typography>
                      <label htmlFor="" className='mr-3 text-[8px] md:text-xl'>
                        {item.fechaVencimiento}
                      </label>
                    </Typography>
                    <Typography placeholder variant="h6" color="blue-gray" className="mb-2 text-white bg-green-600 bg-opacity-20  rounded-xl flex justify-between">
                      <MdOutlineMoneyOffCsred className='text-white text-xs md:text-xl ml-2' />
                      <Typography placeholder className='hidden md:flex'>Salario:</Typography>
                      <label htmlFor="" className='mr-3 text-[8px] md:text-xl'>
                        {item.salario} Bs.
                      </label>
                    </Typography>
                    <Typography placeholder variant="h6" color="blue-gray" className="mb-2 text-white bg-indigo-800 bg-opacity-20 rounded-xl flex justify-between">
                      <FaPhoneVolume className='text-white text-xs md:text-xl ml-2 '/>
                      <Typography placeholder className='hidden md:flex'>Contacto:</Typography>
                      <label htmlFor="" className='mr-3 text-[8px] md:text-xl'>
                        {item.telefono}
                      </label>
                    </Typography>
                  </div>
                  <Typography placeholder variant="h6" color="blue-gray" className="mb-2 text-white bg-slate-500 bg-opacity-20 rounded-xl flex justify-between">
                    <FaLocationDot className='text-white text-xs md:text-xl ml-2'/>
                    <Typography placeholder className='hidden md:flex'>Ubicación:</Typography>
                    <label htmlFor="" className='mr-3 text-xs md:text-xl'>
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
                    className="flex text-white items-center gap-2"
                    onClick={() => handleVerMasClick(item.id)}
                  >
                    {selectedOfertaId === item.id ? 'Ver Menos' : 'Ver Más'}
                    <FaLongArrowAltRight />
                  </Button>
                  <Collapse open={selectedOfertaId === item.id}>
                    <Card placeholder className="my-4 mx-auto w-8/12 p-2 bg-opacity-10">
                      <CardBody placeholder style={{ overflowWrap: 'break-word' }}>
                        <Typography placeholder className='text-xs md:text-xl text-white'>
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
      </DashboardPerfil>
      
    </div>
  );
};

export default Index;
