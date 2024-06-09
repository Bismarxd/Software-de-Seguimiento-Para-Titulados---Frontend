import React, { useState, useEffect } from 'react';
import Dashboard from '@/components/Administrador/Dashboard';
import NavBar from '@/components/Administrador/NavBar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Button,
  } from '@tremor/react';
import Router, { useRouter } from 'next/router'
import axios from 'axios';

const Titulados = () => {
    const [input, setInput] = useState('');
    const [datosTitulado, setDatosTitulado] = useState([]);
    const [tabla, setTabla] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/obtener_titulados`)
            .then(result => {
                if (result.data.status) {
                    const administradores = result.data.result.filter(titulado => titulado.administrador === 0);
                setDatosTitulado(administradores);

                    
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    console.log(datosTitulado);
    

    const onChange = (e) => {
        setInput(e.target.value);
        setTabla(true)

        if(e.target.value === "")
            {
                setTabla(false)
            }
    };

    const filtroTitulado = datosTitulado.filter(item =>
        item.nombre && typeof item.nombre === 'string' && item.nombre.toString().startsWith(input.toString())
    );

    const router = useRouter()

    const handleVerDetalles = (id: number) => {
        router.push(`/administrador/verTitulado/${id}`)
    }

    return (
        <body className='bg-menuColor1'>
            <Dashboard>
                <main className='min-h-screen'>
                    <NavBar titulo='Titulados' />

                    <div className="relative max-w-md mx-auto mt-10">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>

                        <input 
                            type="search" 
                            id="default-search" 
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Titulado" 
                            onChange={onChange}
                            value={input}
                            required 
                        />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                    </div>

                    {tabla &&
                        <ul className='mt-10 bg-white m-3 rounded-xl'>
                        <Table>
                            <TableHead>
                                <TableRow className='text-slate-600 '>
                                    <TableHeaderCell>Nombre</TableHeaderCell>
                                    <TableHeaderCell>Apellido <br/> Paterno</TableHeaderCell>
                                    <TableHeaderCell>Apellido <br/> Materno</TableHeaderCell>
                                    <TableHeaderCell>Email</TableHeaderCell>
                                    <TableHeaderCell>Carnet de <br/> Identidad</TableHeaderCell>
                                    <TableHeaderCell>Acciones</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                                    <TableBody className='text-slate-600'>
                                        {
                                            input &&
                                            filtroTitulado.map(item => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.nombre}</TableCell>
                                                    <TableCell>{item.apellidoPaterno}</TableCell>
                                                    <TableCell>{item.apellidoMaterno}</TableCell>
                                                    <TableCell>{item.email}</TableCell>
                                                    <TableCell>{item.ci}</TableCell>
                                                    <TableCell className='grid grid-cols-2 text-[6px]'>
                                                        
                                                        <Button 
                                                            className=' bg-green-600 hover:bg-green-400 text-white m-1 rounded-lg' 
                                                            onClick={() => handleVerDetalles(item.id)}
                                                        >Ver</Button>
                                                    </TableCell>    
                                                </TableRow>
                                                
                                            ))
                                        }
                            </TableBody>
                        </Table>
                    </ul>
                    }

                    
                </main>
                
                
                
            </Dashboard>
        </body>
    );
};

export default Titulados;