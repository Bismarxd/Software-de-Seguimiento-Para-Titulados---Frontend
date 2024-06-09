import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
    List,
    ListItem,
    ListItemSuffix,
    Chip,
    Card,
  } from "@material-tailwind/react";
import axios from 'axios';
import { Typography } from '@mui/material';


const FormaTrabajo = () => {
    const [nProfesionalPlanta, setNProfesionalPlanta] = useState(0)
    const [nConsultoria, setNConsultoria] = useState(0)
    const [nTrabajoIndependiente, setNTrabajoIndependiente] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/reportes/contarFormasTrabajo`)
        .then(result => {
            if(result.data.status)
                {
                    setNProfesionalPlanta(result.data.result[0].count)
                    setNConsultoria(result.data.result[1].count)
                    setNTrabajoIndependiente(result.data.result[2].count)
                }
        }).catch(err => console.log(err))
    },[])
  return (
    <div className='flex items-center'>
       
        <BarChart
            width={500}
            height={400}
            data={[
                { name: 'Profesional de Planta', cantidad: nProfesionalPlanta },
                { name: 'Consultoria', cantidad: nConsultoria },
                { name: 'TRabajo Independiente', cantidad: nTrabajoIndependiente },
               
            ]}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 8 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#CCE518" />
        </BarChart>

        <Card className="w-auto h-auto" placeholder>
                    <Typography>Formas de Trabajo</Typography>
                    <List placeholder className='mt-3'>
                        <ListItem placeholder>
                            Profesional de Planta
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nProfesionalPlanta}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Consultoria
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nConsultoria}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Trabajo Independiente
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nTrabajoIndependiente}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        
                        
                    </List>
        </Card>
        
        
    </div>
   
  );
};

export default FormaTrabajo;