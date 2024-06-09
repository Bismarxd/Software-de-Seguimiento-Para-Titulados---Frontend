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


const ModalidadesTitulacion = () => {
    const [nGraduacion, setNGraduacion] = useState(0)
    const [nExamen, setNExamen] = useState(0)
    const [nTesis, setNTesis] = useState(0)
    const [nTrabajo, setNTrabajo] = useState(0)
    const [nProyecto, setNProyecto] = useState(0)
    const [nPETAENG, setNPETAENG] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/reportes/contarModalidades`)
        .then(result => {
            if(result.data.status)
                {
                    setNGraduacion(result.data.result[0].count)
                    setNExamen(result.data.result[1].count)
                    setNTesis(result.data.result[2].count)
                    setNTrabajo(result.data.result[3].count)
                    setNProyecto(result.data.result[4].count)
                    setNPETAENG(result.data.result[5].count)
                }
        }).catch(err => console.log(err))
    },[])
  return (
    <div className='flex items-center'>

        <Card className="w-auto h-auto" placeholder>
                    <Typography>Modalidades de Titulación</Typography>
                    <List placeholder className='mt-3'>
                        <ListItem placeholder>
                            Graduación por Excelencia
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nGraduacion}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Examen de Grado
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nExamen}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Tesis
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nTesis}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Trabajo Dirigido
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nTrabajo}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Proyecto de grado
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nProyecto}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            PETAENG
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nPETAENG}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>
                        
                    </List>
        </Card>
        
        <BarChart
            width={500}
            height={400}
            data={[
                { name: 'Graduación por Excelencia', cantidad: nGraduacion },
                { name: 'Examen de Grado', cantidad: nExamen },
                { name: 'Tesis', cantidad: nTesis },
                { name: 'Trabajo Dirigido', cantidad: nTrabajo },
                { name: 'Proyecto de Grado', cantidad: nProyecto },
                { name: 'PETAENG', cantidad: nPETAENG },
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
            <Bar dataKey="cantidad" fill="#A91E00" />
        </BarChart>
        
        
    </div>
   
  );
};

export default ModalidadesTitulacion;