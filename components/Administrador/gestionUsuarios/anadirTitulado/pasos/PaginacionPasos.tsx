import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import Link from 'next/link'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'




type Props = {
    columnas: GridColDef[],
    filas:object[],
    // slug:string,
    // urlBorrar: string
    // urlVer: string
}

const PaginacionPasos = (props: Props) => {

    console.log(props.filas);
    
    

    const router = useRouter()


    // const handleVerDetalles = (id: number) => {
    //     router.push(`${props.urlVer}/${id}`)
    // }

    const handleDelete = (id: number) => {
        const confirmar = window.confirm('Esta Seguro de que desea eliminar?')
        if (confirmar) {
            
        }
        console.log(id);
        
    }
    

    const columnaAcciones: GridColDef = {
        field: "acciones",
        headerName: "Acciones",
        width: 200,
        // renderCell: (params) => {
        //     return(
        //         <div className="flex gap-5">
        //             <Link href="">
        //                 <Image src="/view.svg" alt="" width={20} height={20}/>
        //             </Link>
        //             <div className="delete hover:cursor-pointer" onClick={() => handleDelete(params.row.id)}>
        //                 <Image src="/delete.svg" alt="" width={20} height={20}/>
        //             </div>
        //             <button 
        //                 className='text-white bg-[#3391c4] hover:bg-[#1e5d86] px-3 py-1 rounded-md '
        //                 onClick={() => handleVerDetalles(params.row.id)}                       
        //             >
        //                 Ver
        //             </button>
        //         </div>
        //     )
        // }
    }

  return (
    <div className='m-5'>
        <DataGrid
            className="bg-[#132b3e]"
            sx={{
                '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                 
                 color: "white",
                 fontWeight: 200,
              },
              '& .MuiDataGrid-pagination': {
                // Estilos personalizados para la paginación
                // Por ejemplo, para cambiar el color del texto en la paginación a rojo:
                color: 'red',
              },
            }}
            rows={props.filas}
            columns={props.columnas}
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

export default PaginacionPasos