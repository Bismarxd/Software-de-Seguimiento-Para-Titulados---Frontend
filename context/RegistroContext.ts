import { createContext } from "react";

interface RegistroContextType {
    datosTitulado: any;
    setDatosTitulado: React.Dispatch<React.SetStateAction<any>>;
    estudiosPostGrado: any;
    setEstudiosPostGrado: React.Dispatch<React.SetStateAction<any>>;
    actividadesLaborales: any;
    setActividadesLaborales: React.Dispatch<React.SetStateAction<any>>;
    investigaciones: any;
    setInvestigaciones: React.Dispatch<React.SetStateAction<any>>;
    produccionesIntelectuales: any;
    setProduccionesIntelectuales: (value: any) => void;
  }

export const RegistroContext = createContext<RegistroContextType | null>(null);