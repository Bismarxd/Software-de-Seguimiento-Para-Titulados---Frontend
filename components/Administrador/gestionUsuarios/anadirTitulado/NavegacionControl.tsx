
import React, {useState, useContext} from 'react'
import { PasoContext } from '@/context/PasoContext'
import axios from 'axios'

interface Props {
  handleClick: any,
  pasoActual: number,
  pasos: string[]
}

const NavegacionControl = ({handleClick, pasoActual, pasos }: Props) => {


 
  return (
    <div className='container flex justify-around mt-8 mb-8'>
        {/* atras */}
        <button 
          onClick={() => handleClick()}
          className='relative z-0 h-12 rounded-full  px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-900 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500 bg-blue-900'
        >
            Atras
        </button>

        {/* adelante */}
        <button 
          onClick={ () => {
                    handleClick('siguiente');
                    // handleInsertar()
                  }}
          className='relative z-0 h-12 rounded-full  px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-green-950 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500 bg-green-950'
        >
            {pasoActual === pasos.length - 1 ? "Finalizar" : "Siguiente"}
        </button> 

    </div>
  )
}

export default NavegacionControl