import { IconTree, IconType } from "react-icons";
import { CiHome, CiTimer } from "react-icons/ci"; 
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";

export interface MenuItem {
    id: number,
    title: string,
    url: string,
    icon: IconType
}

export const menuUsuario: MenuItem[] = [
    {       
        id: 1,
        title: "Inicio",
        url: "/perfil",
        icon: CiHome,
          
    },
    {       
        id: 2,
        title: "Información Adicional",
        url: "/perfil/informacionAdicional",
        icon: FaRegUserCircle,
          
    },
   
    {       
        id: 4,
        title: "Actualizar Información",
        url: "/perfil/actualizarInformacion",
        icon: MdBrowserUpdated,
          
    }
    // {       
    //     id: 5,
    //     title: "Cerrar Sesión",
    //     url: "/usuario/actividades",
    //     icon: FaRegWindowClose,
          
    // },
]