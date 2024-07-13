import React, {useState} from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { Tooltip } from 'react-tooltip';
import { FaRegTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import ModalEditar from './ModalEditar';
import ModalVerOferta from './ModalVerOferta';

//Variables typescript
type Props = {
    columnas: GridColDef[],
    filas: object[],
}

const PaginacionOfertas = (props: Props) => {

    const [estado, setEstado] = useState(1)
    const [abrirModal, setAbrirModal] = useState(false);
    const [id, setId] = useState(0)
    const [adminId, setAdminId] = useState<number>(0)

    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [oferta, setOferta] = useState('')

    //pare editar
    const handleEditar = (id: number) => {
        const adminIdLocal = Number(localStorage.getItem('userId'))
        setAdminId(adminIdLocal)
        setAbrirModal(true)
        setId(id)
    }

    //Para Ver
    const handleVer = (oferta :any) => {
        setModalVer(true)
        setOferta(oferta)
    }

    //para editar los estados
    const handleEstado = async (id: number, estado: number) => {
        try {
            const nuevoEstado = estado === 1 ? 0 : 1;
            
            // Cambiar el estado localmente antes de la solicitud al backend
            setEstado(nuevoEstado);
    
            // Realizar la solicitud al backend para actualizar el estado en la base de datos
            await axios.post(`${process.env.NEXT_PUBLIC_URL}/ofertas/editar_estado/${id}`, { estado: nuevoEstado })
                .then(result => {
                    if (result.data.status) {
                        toast.info('Estado Actualizado', {
                            autoClose: 2000,
                            onClose: () => window.location.reload()
                        })
                    } else {
                        console.log('Error al actualizar el estado en el backend');
                    }
                })
                .catch(err => {
                    console.log('Error al realizar la solicitud al backend:', err);
                    // Revertir el estado local si hay un error en la solicitud al backend
                    setEstado(estado);
                });
            
        } catch (error) {
            console.log('Error al cambiar de estado:', error);
        } 
        
    }

    //para eliminar
    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Esta seguro?",
            text: "Esta acción es irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                const adminIdLocal = localStorage.getItem('userId');
                axios.delete(`${process.env.NEXT_PUBLIC_URL}/ofertas/eliminar_oferta/`+id, {
                    data: {adminId : adminIdLocal}
                })
                .then(result => {
                    if (result.data.status) {
                        toast.error('Oferta Laboral Eliminada Correctamente', {                     
                                autoClose: 2000,
                                onClose: () => window.location.reload()
                            } 
                            )
                    } else {
                        console.log(result.data.Error);
                        
                    }
    
                }).catch(err => console.log(err))
            }
          });

       
        
    }
    
    const columnaEstado: GridColDef = {
        field: "estado",
        headerName: "Estado",
        width: 100,   
        renderCell: (params) => {
            return(
                <div
                    className={`text-center rounded-full text-white w-6 h-6 flex items-center justify-center m-3 hover:cursor-pointer
                    ${params.row.estado === 1 ? 'bg-green-800' : 'bg-red-800'}`}
                    onClick={() => handleEstado(params.row.id, params.row.estado)}
                >
                </div>
            )
        }   
    }

    const columnaAcciones: GridColDef = {
        field: "acciones",
        headerName: "Acciones",
        width: 200,
        renderCell: (params) => {
            return(
                <div className="flex gap-5">
                    <div 
                        className='hover:cursor-pointer'
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content="Editar"
                        onClick={() => handleEditar(params.row.id)}
                    >
                        <FaRegEdit 
                            className='text-blue-600 text-xl m-4'
                        />
                        
                    </div>
                
                   
                    <div 
                        className="hover:cursor-pointer" 
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content="Eliminar"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <FaRegTrashAlt 
                            className='text-red-600 text-xl m-4'
                            
                        />
                    </div>
                    <Tooltip id='my-tooltip'/>
                    <div 
                        className='hover:cursor-pointer'
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content="Ver"
                        onClick={() => handleVer(params.row)}
                    >
                        <FaEye 
                            className='text-green-600 text-xl m-4'
                        />
                    </div>
                </div>
            )
        }
    }

  return (
    <div className='m-5'>
    <DataGrid
        className='bg-slate-500'
        sx={{
            '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            
            color: "black",
            fontWeight: 200,
        },
        '& .MuiDataGrid-pagination': {
            // Estilos personalizados para la paginación
            // Por ejemplo, para cambiar el color del texto en la paginación a rojo:
            color: 'red',
        },
        }}
        rows={props.filas}
        columns={[...props.columnas, columnaEstado, columnaAcciones]}
        initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 3
                },
            }
        }}
        slots={{toolbar:GridToolbar}}
        slotProps={{
            toolbar:{
                showQuickFilter:true,
                quickFilterProps:{debounceMs: 500}
            }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector       
    />

    {modalVer && 
        <ModalVerOferta
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
            modalVer={modalVer}
            oferta = {oferta}
        />

    }
    {abrirModal &&
        <ModalEditar
            setAbrirModal={setAbrirModal}
            id={id}
            adminId={adminId}
        />
    }
</div>
  )
}

export default PaginacionOfertas
