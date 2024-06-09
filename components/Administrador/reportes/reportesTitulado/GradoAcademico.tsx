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


const GradoAcademico = () => {
    const [nLicenciatura, setNLicenciatura] = useState(0)
    const [nMagister, setNMagister] = useState(0)
    const [nDoctorado, setNDoctorado] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/reportes/contarGrados`)
        .then(result => {
            if(result.data.status)
                {
                    setNLicenciatura(result.data.result[0].count)
                    setNMagister(result.data.result[1].count)
                    setNDoctorado(result.data.result[2].count)
                }
        }).catch(err => console.log(err))
    },[])
  return (
    <div className='flex items-center'>
        
        <BarChart
            width={350}
            height={300}
            data={[
                { name: 'Licenciatura', cantidad: nLicenciatura},
                { name: 'Magister', cantidad: nMagister },
                { name: 'Doctorado', cantidad: nDoctorado },
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
            <Bar dataKey="cantidad" fill="#00457F" />
        </BarChart>
        
        <Card className="w-auto h-auto" placeholder>
                    <Typography>Grados Academicos</Typography>
                    <List placeholder className='mt-3'>
                        <ListItem placeholder>
                        Licenciatura
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nLicenciatura}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                        Maestria
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nMagister}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                        Doctorado
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nDoctorado}
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

export default GradoAcademico;