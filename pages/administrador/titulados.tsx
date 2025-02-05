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
import { useRouter } from 'next/router'
import axios from 'axios';

interface  GradoAcademico {
    id: number;
    tituloGradoAcademico: string;
}

interface  Modalidad {
    id: number;
    tituloModalidadTitulacion: string;
}

interface  Area {
    id: number;
    tituloAreaTrabajo: string;
}

interface  Forma {
    id: number;
    tituloFormaTrabajo: string;
}

interface Titulado {
    id: number;
    administrador: number;
    activo: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    ci: string;
    gradoAcademicoId?: number;
    modalidadTitulacionId?: number;
    areaTrabajoId?: number;
    formaTrabajoId?: number;
  }

const Titulados = () => {
    const [input, setInput] = useState('');
    const [datosTitulado, setDatosTitulado] = useState<Titulado[]>([]);
    const [tabla, setTabla] = useState(false)

    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedModalidad, setSelectedModalidad] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedForma, setSelectedForma] = useState('');

    const [gradosAcademicos, setGradosAcademicos] = useState<GradoAcademico[]>([]);
    const [modalidadesTitulacion, setModalidadesTitulacion] = useState<Modalidad[]>([])
    const [areasTrabajo, setAreasTrabajo] = useState<Area[]>([])
    const [formaTrabajo, setFormaTrabajo] = useState<Forma[]>([])
    const [isLoading, setIsLoading] = useState(true); // Estado de carga inicial

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/obtener_titulados`)
            .then(result => {
                if (result.data.status) {
                    const administradores = (result.data.result as Titulado[]).filter(titulado => titulado.administrador === 0 && titulado.activo === 1);
                    setDatosTitulado(administradores);
                    setIsLoading(false); // Finaliza la carga

                    
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(
                err => console.log(err)// Finaliza la carga en caso de error
            );

         // Obtener los grados académicos
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/grados_academicos`)
        .then(result => {
            if (result.data.status) {
                setGradosAcademicos(result.data.result);
            } else {
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));

        // Obtener las modaliades de titulación
        axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/modalidades_titulacion`)
        .then(result => {
            if (result.data.status) {
                setModalidadesTitulacion(result.data.result);
            } else {
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));

         // Obtener las areas de trabajo
         axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/areas_trabajo`)
         .then(result => {
             if (result.data.status) {
                 setAreasTrabajo(result.data.result);
             } else {
                 alert(result.data.Error);
             }
         })
         .catch(err => console.log(err));

          // Obtener las formas de trabajo
          axios.get(`${process.env.NEXT_PUBLIC_URL}/titulado/formas_trabajo`)
          .then(result => {
              if (result.data.status) {
                  setFormaTrabajo(result.data.result);
              } else {
                  alert(result.data.Error);
              }
          })
          .catch(err => console.log(err));
    }, []);

    const onChange = (e: any) => {
        setInput(e.target.value);
        setTabla(true);
        if (e.target.value === "") {
            setTabla(false);
        }
    };

    const handleGradoChange = (e: any) => {
        setSelectedGrado(e.target.value);
        setTabla(true);
        if (e.target.value === "") {
            setTabla(false);
        }
    };

    const handleModalidadChange = (e: any) => {
        setSelectedModalidad(e.target.value);
        setTabla(true);
        if (e.target.value === "") {
            setTabla(false);
        }
    };

    const handleAreaChange = (e: any) => {
        setSelectedArea(e.target.value);
        setTabla(true);
        if (e.target.value === "") {
            setTabla(false);
        }
    };

    const handleFormaChange = (e: any) => {
        setSelectedForma(e.target.value);
        setTabla(true);
        if (e.target.value === "") {
            setTabla(false);
        }
    };

    const filtroTitulado = datosTitulado.filter(item => {
        const nombreCoincide = item.nombre && typeof item.nombre === 'string' && item.nombre.toString().startsWith(input.toString());
        const ciCoincide = item.ci && typeof item.ci === 'string' && item.ci.toString().startsWith(input.toString());

         // Verificar si item y item.gradoAcademicoId existen antes de acceder a ellos
        const gradoCoincide = selectedGrado === '' || (item && item.gradoAcademicoId && item.gradoAcademicoId.toString() === selectedGrado.toString());

        const modalidadCoincide = selectedModalidad === '' || (item && item.modalidadTitulacionId && item.modalidadTitulacionId.toString() === selectedModalidad.toString());

        const areaCoincide = selectedArea === '' || (item && item.areaTrabajoId && item.areaTrabajoId.toString() === selectedArea.toString());

        const formaCoincide = selectedForma === '' || (item && item.formaTrabajoId && item.formaTrabajoId.toString() === selectedForma.toString());

        return (nombreCoincide || ciCoincide) && gradoCoincide && modalidadCoincide && areaCoincide && formaCoincide;
    });
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

                    <div className="flex gap-4 relative w-[80%] mx-auto mt-10">

                        {/* Grado Academico */}
                        <select
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleGradoChange}
                            value={selectedGrado}
                        >
                            <option value="">Grado Académico</option>
                            {gradosAcademicos.map(grado => (
                                <option key={grado.id} value={grado.id}>{grado.tituloGradoAcademico}</option>
                            ))}
                        </select>

                        {/* Modalidad de graduación */}
                        <select
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleModalidadChange}
                            value={selectedModalidad}
                        >
                            <option value="">Modalidad de Graduación</option>
                            {modalidadesTitulacion.map(modalidad => (
                                <option key={modalidad.id} value={modalidad.id}>{modalidad.tituloModalidadTitulacion}</option>
                            ))}
                        </select>

                            {/* Área de Trabajo */}
                        <select
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleAreaChange}
                            value={selectedArea}
                        >
                            <option value="">Área de Trabajo</option>
                            {areasTrabajo.map(area => (
                                <option key={area.id} value={area.id}>{area.tituloAreaTrabajo}</option>
                            ))}
                        </select>

                            {/*Forma de Trabajo*/}
                        <select
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleFormaChange}
                            value={selectedForma}
                        >
                            <option value="">Forma de Trabajo</option>
                            {formaTrabajo.map(forma => (
                                <option key={forma.id} value={forma.id}>{forma.tituloFormaTrabajo}</option>
                            ))}
                        </select>
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
                                            (input || selectedGrado || selectedModalidad || selectedArea || selectedForma) && 
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