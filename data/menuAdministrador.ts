import { IconType } from "react-icons";
import { CiUser, CiHome, CiTimer, CiMemoPad  } from "react-icons/ci";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi"
import { GrConfigure } from "react-icons/gr";

export interface MenuItem {
    id: number;
    title: string;
    url: string;
    icon: IconType
}

export const menu: MenuItem[] = [
    {       
        id: 1,
        title: "Inicio",
        url: "/administrador",
        icon: CiHome  
          
    },
    {       
        id: 2,
        title: "Usuarios",
        url: "/administrador/usuarios",
        icon: CiUser ,
          
    },
    {       
        id: 3,
        title: "Titulados",
        url: "/administrador/titulados",
        icon: FaUserGraduate,
          
    },
    {       
        id: 4,
        title: "Ofertas Laborales",
        url: "/administrador/laborales",
        icon: CiMemoPad ,
          
    },
    {       
        id: 5,
        title: "Configuración",
        url: "/administrador/configuracion",
        icon: GrConfigure ,
          
    },
    {       
        id: 6,
        title: "Reportes",
        url: "/administrador/reportes",
        icon: HiOutlineDocumentReport,
          
    }
]