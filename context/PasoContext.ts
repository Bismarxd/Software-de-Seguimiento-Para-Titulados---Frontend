import { createContext } from "react";
interface PasoContextType {
    datosUsuario: any;
    setDatosUsuario: React.Dispatch<React.SetStateAction<any>>;
    datosTitulado: any;
    setDatosTitulado: React.Dispatch<React.SetStateAction<any>>;
    estudiosPostGrado: any;
    setEstudiosPostGrado: React.Dispatch<React.SetStateAction<any>>;
    actividadesLaborales: any;
    setActividadesLaborales: React.Dispatch<React.SetStateAction<any>>;
    investigaciones: any;
    setInvestigaciones: React.Dispatch<React.SetStateAction<any>>;
    produccionesIntelectuales: any;
    setProduccionesIntelectuales: React.Dispatch<React.SetStateAction<any>>;
    datosFinales: any;
    setDatosFinales: React.Dispatch<React.SetStateAction<any>>;
    alerta: boolean;
    setAlerta: React.Dispatch<React.SetStateAction<boolean>>;
    alertaMensaje: string;
    setAlertaMensaje: React.Dispatch<React.SetStateAction<string>>;
  }

  export const PasoContext = createContext<PasoContextType | null>(null);