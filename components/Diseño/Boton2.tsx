import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Props {
    color: string
    texto: string
    onClick : React.MouseEventHandler<HTMLButtonElement>
}

const Boton2 = ({color, texto, onClick}: Props) => {
  return (
    <div>
        <button 
            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md border border-neutral-200 font-medium"
            onClick={onClick}    
        >
                <div 
                    className="inline-flex h-12 translate-x-0 items-center justify-center px-6 text-white transition group-hover:-translate-x-[150%] gap-3">
                        {texto}
                        <IoMdCloseCircleOutline />
                </div>
                <div 
                    className={`absolute inline-flex h-12 w-full translate-x-[100%] items-center justify-center ${color} px-6 text-neutral-50 transition duration-300 group-hover:translate-x-0 gap-3`}>
                        {texto}
                        <IoMdCloseCircleOutline />
                </div>
        </button>
    </div>
  )
}

export default Boton2