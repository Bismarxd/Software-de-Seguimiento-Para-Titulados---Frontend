import React, {useState, useEffect, useRef} from 'react'
import {
    List,
    ListItem,
    ListItemSuffix,
    Chip,
    Card,
  } from "@material-tailwind/react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//graficos
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import axios from 'axios';
import { Button } from '@tremor/react';
import InformacionSistema from './InformacionSistema';
import Genero from './Genero';
import GradoAcademico from './GradoAcademico';
import ModalidadesTitulacion from './ModalidadesTitulacion';
import FormaTrabajo from './FormaTrabajo';
import AreaTrabajo from './AreaTrabajo';

const ReportesTitulados: React.FC = () => {
  const informacionRef = useRef<HTMLDivElement | null>(null);
  const modalidadesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (informacionRef.current && modalidadesRef.current) {
      console.log('Refs have been assigned:', informacionRef.current, modalidadesRef.current);
    } else {
      console.error('One or more refs are null in useEffect');
    }
  }, []);

  const handleGenerarPDF = async () => {
    const informacionContent = informacionRef.current;
    const modalidadesContent = modalidadesRef.current;

    if (informacionContent && modalidadesContent) {
      try {
        // Capturar contenido de InformacionSistema, Genero y GradoAcademico
        const informacionCanvas = await html2canvas(informacionContent, { useCORS: true });
        const informacionImgData = informacionCanvas.toDataURL('image/png');

        // Capturar contenido de ModalidadesTitulacion
        const modalidadesCanvas = await html2canvas(modalidadesContent, { useCORS: true });
        const modalidadesImgData = modalidadesCanvas.toDataURL('image/png');

        // Generar PDF
        const pdf = new jsPDF();
        const imagen = '/Imagenes Login/margen.jpeg'
        
        // Agrega contenido al PDF
        pdf.addImage(imagen, 'JPEG', 0, 0, pdf.internal.pageSize.width, 20);

        pdf.addImage(informacionImgData, 'PNG', 20, 20, 180, 180);
        pdf.addPage();
        pdf.addImage(modalidadesImgData, 'PNG', 15, 15, 200, 200);
        pdf.save('reporte.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    } else {
      console.error('One or more content refs are null');
    }
  };

  return (
    <div className='bg-white flex items-center justify-center w-[80%] m-5 rounded-xl p-3'>
        <div className='flex flex-col gap-2' >
          <Button
            className=' bg-teal-800 hover:bg-teal-500 text-white rounded-xl ml-40 m-5'
            onClick={handleGenerarPDF}
          >
            Generar Reporte General (pdf)
          
          </Button>
          <div ref={informacionRef}>
            <InformacionSistema/>
            <Genero/>
            <GradoAcademico/>
          </div>
          <div ref={modalidadesRef}>
            <ModalidadesTitulacion/>
            <FormaTrabajo/>
            <AreaTrabajo/>
          </div>
            
          
          
  
        </div>
        
    </div>
  )
}

export default ReportesTitulados