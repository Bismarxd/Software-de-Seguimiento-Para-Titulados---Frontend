import React, {useState} from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { FaRegTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify'
import EditarAdmin from './anadirAdministrador/Pasos/EditarAdmin';
import VerAdmin from './anadirAdministrador/VerAdmin';

//Variables typescript
type Props = {
    columnas: GridColDef[],
    filas: object[],
}

const PaginacionAdministradores = (props: Props) => {

    const [abrirModal, setAbrirModal] = useState(false);
    const [id, setId] = useState(0)
    const [adminId, setAdminId] = useState<number>(0)

    const [modalVer, setModalVer] = useState(false)
    const openDrawer = () => setModalVer(true);
    const closeDrawer = () => setModalVer(false);

    const [admin, setAdmin] = useState('')

    //pare editar
    const handleEditar = (id: number) => {
        const adminIdLocal = Number(localStorage.getItem('userId'))
        setAdminId(adminIdLocal)
        setAbrirModal(true)
        setId(id)
    }

    //Para Ver
    const handleVer = (admin :any) => {
        setModalVer(true)
        setAdmin(admin)
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
                        onClick={() => handleDelete(params.row.personaId)}
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

     //para eliminar
  const handleDelete = (id: number) => {
    Swal.fire({
        title: "Esta seguro qu desea eliminar el administrador?",
        text: "Esta acción es irreversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            const adminId = localStorage.getItem('userId');
            axios.delete(`${process.env.NEXT_PUBLIC_URL}/administradores/eliminar_administrador/`+id, {
                data: { adminId: adminId } 
            })
            .then(result => {
                if (result.data.status) {
                    toast.error('Administrador Eliminado Correctamente', {                     
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
            columns={[...props.columnas, columnaAcciones]}
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
            <VerAdmin
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
                modalVer={modalVer}
                admin = {admin}
            />

        }

        {abrirModal &&
            <EditarAdmin
                setAbrirModal={setAbrirModal}
                id={id}
                adminId={adminId}
            />
        }
    </div>
  )
}

export default PaginacionAdministradores