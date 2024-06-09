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


const AreaTrabajo = () => {
    const [nEducativa, setNEducativa] = useState(0)
    const [nClinica, setNClinica] = useState(0)
    const [nSocial, setNSocial] = useState(0)
    const [nJuridica, setNJuridica] = useState(0)
    const [nOrganisacional, setNOrganisacional] = useState(0)
    const [nDeportiva, setNDeportiva] = useState(0)
    const [nOtro, setNOtro] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/reportes/contarAreasTrabajo`)
        .then(result => {
            if(result.data.status)
                {
                    setNEducativa(result.data.result[0].count)
                    setNClinica(result.data.result[1].count)
                    setNSocial(result.data.result[2].count)
                    setNJuridica(result.data.result[3].count)
                    setNOrganisacional(result.data.result[4].count)
                    setNDeportiva(result.data.result[5].count)
                    setNOtro(result.data.result[6].count)
                }
        }).catch(err => console.log(err))
    },[])
  return (
    <div className='flex items-center'>

        <Card className="w-auto h-auto" placeholder>
                    <Typography>Formas de Trabajo</Typography>
                    <List placeholder className='mt-3'>
                        <ListItem placeholder>
                        Psicología Educativa
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nEducativa}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Psicología Clínica
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nClinica}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Psicología Social
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nSocial}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Psicología Juridica y Forense
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nJuridica}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Psicología Organizacional
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nOrganisacional}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Psicología Deportiva
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nDeportiva}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>

                        <ListItem placeholder>
                            Otros
                            <ListItemSuffix placeholder>
                                <Chip
                                value={nOtro}
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
                { name: 'Psicología Educativa', cantidad: nEducativa },
                { name: 'Psicología Clínica', cantidad: nClinica },
                { name: 'Psicología Social', cantidad: nSocial },
                { name: 'Psicología Juridica y Forense', cantidad: nJuridica },
                { name: 'Psicología Organizacional', cantidad: nOrganisacional },
                { name: 'Psicología Deportiva', cantidad: nDeportiva },
                { name: 'Otros', cantidad: nOtro },
               
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
            <Bar dataKey="cantidad" fill="#07CB00" />
        </BarChart>
 
    </div>
   
  );
};

export default AreaTrabajo;