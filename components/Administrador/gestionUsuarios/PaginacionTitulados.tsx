import React from 'react'
import { Tooltip } from 'react-tooltip';
import { FaEye } from "react-icons/fa";
import { useRouter } from 'next/router';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'

//Variables typescript
type Props = {
    columnas: GridColDef[],
    filas: object[],
}


const PaginacionTitulados = (props: Props) => {

    const router = useRouter()

    //para traer los titulados
    const handleVerDetalles = (id: number) => {
        router.push(`/administrador/verTitulado/${id}`)
    }

    const columnaAcciones: GridColDef = {
        field: "acciones",
        headerName: "Acciones",
        width: 200,
        renderCell: (params) => {
            return(
                <div className="flex gap-5">
                
                    <Tooltip id='my-tooltip'/>
                    <div 
                        className='hover:cursor-pointer'
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content="Ver"
                    >
                        <FaEye 
                            className='text-green-600 text-xl m-4'
                            onClick={() => handleVerDetalles(params.id)}
                        />
                    </div>
                </div>
            )
        }
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
                        pageSize: 5
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

export default PaginacionTitulados
