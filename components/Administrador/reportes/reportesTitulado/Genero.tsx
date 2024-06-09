import React, {useState, useEffect} from 'react'
import {
    List,
    ListItem,
    ListItemSuffix,
    Chip,
    Card,
  } from "@material-tailwind/react";
//graficos
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import axios from 'axios';
import InformacionSistema from './InformacionSistema';

const Genero = () => {

    const [nMasculino, setNMasculino] = useState(0)
    const [nFemenino, setNFemenino] = useState(0)

    useEffect(() => {

        

        //para obtener la cantidad de genero
        axios(`${process.env.NEXT_PUBLIC_URL}/reportes/contarGenero`)
        .then(result => {
            if(result.data.status)
                {
                    setNMasculino(result.data.result[0].count)
                    setNFemenino(result.data.result[1].count)
                }
        }).catch(err => console.log(err))
    },[]) 
  return (
    <div className='flex gap-2 mt-5'>
                <Card className="w-auto h-auto" placeholder>
                    <Typography>Genero</Typography>
                    <List placeholder className='mt-3'>
                        <ListItem placeholder>
                        Titulados Masculinos
                        <ListItemSuffix placeholder>
                            <Chip
                            value={nMasculino}
                            variant="ghost"
                            size="sm"
                            className="rounded-full"
                            />
                        </ListItemSuffix>
                        </ListItem>
                        <ListItem placeholder>
                        Titulados Femenino
                        <ListItemSuffix placeholder>
                            <Chip
                            value={nFemenino}
                            variant="ghost"
                            size="sm"
                            className="rounded-full"
                            />
                        </ListItemSuffix>
                        </ListItem>
                        
                    </List>
                </Card>
                <PieChart
                    series={[
                        {
                        data: [
                            { id: 0, value: nMasculino, label: 'Masculino' },
                            { id: 1, value: nFemenino, label: 'Femenino' },
                            
                        ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </div>
  )
}

export default Genero