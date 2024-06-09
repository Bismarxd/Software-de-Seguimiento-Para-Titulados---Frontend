import React from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { FaRegTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify'

//Variables typescript
type Props = {
    columnas: GridColDef[],
    filas: object[],
}

const PaginacionAdministradores = (props: Props) => {

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
                        // onClick={() => handleEditar(params.row.id)}
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
            axios.delete(`${process.env.NEXT_PUBLIC_URL}/administradores/eliminar_administrador/`+id)
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
            className='bg-white'
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
    </div>
  )
}

export default PaginacionAdministradores