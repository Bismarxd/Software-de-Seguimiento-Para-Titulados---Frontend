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

const InformacionSistema = () => {
    const [nTitulados, setNTitulados] = useState('')
    const [nAdministradores, setNAdministradores] = useState('')
    const [nOfertas, setNOfertas] = useState('')

    useEffect(() => {

        //para obtener la cantidad de titulados
        axios(`${process.env.NEXT_PUBLIC_URL}/reportes/cantidad_titulados`)
        .then(result => {
            if(result.data.status)
                {
                    setNTitulados(result.data.cantidad)
                }
        }).catch(err => console.log(err))

        //para obtener la cantidad de administradores
        axios(`${process.env.NEXT_PUBLIC_URL}/reportes/cantidad_administradores`)
        .then(result => {
            if(result.data.status)
                {
                    setNAdministradores(result.data.cantidad)
                }
        }).catch(err => console.log(err))

        //para obtener la cantidad de ofertas laborales
        axios(`${process.env.NEXT_PUBLIC_URL}/reportes/cantidad_ofertas`)
        .then(result => {
            if(result.data.status)
                {
                    setNOfertas(result.data.cantidad)
                }
        }).catch(err => console.log(err))

        
    },[]) 

  return (
    <Card className="w-[90%]" placeholder>
                <Typography>Información Sistema</Typography>
                <List placeholder className='mt-3'>
                    <ListItem placeholder>
                    Nro. de Titulados
                    <ListItemSuffix placeholder>
                        <Chip
                        value={nTitulados}
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        />
                    </ListItemSuffix>
                    </ListItem>
                    <ListItem placeholder>
                    Nro. de Administradores
                    <ListItemSuffix placeholder>
                        <Chip
                        value={nAdministradores}
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        />
                    </ListItemSuffix>
                    </ListItem>
                    <ListItem placeholder>
                    Nro. de Ofertas de Trabajo
                    <ListItemSuffix placeholder>
                        <Chip
                        value={nOfertas}
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        />
                    </ListItemSuffix>
                    </ListItem>
                </List>
            </Card>
  )
}

export default InformacionSistema