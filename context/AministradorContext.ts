import { createContext } from "react";

interface AdministradorContextType {
    datosBasicos: any;
    setDatosBasicos: React.Dispatch<React.SetStateAction<any>>;
    datosAdministrador: any;
    setDatosAdministrador: React.Dispatch<React.SetStateAction<any>>;
  }

export const AdministradorContext = createContext<AdministradorContextType | undefined>(undefined)