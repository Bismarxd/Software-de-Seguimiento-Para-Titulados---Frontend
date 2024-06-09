import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";

interface Props {
    texto: string
}

const Boton = ({texto}: Props) => {
  return (
    <div>
     <button className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)] gap-3">{texto} <IoIosAddCircleOutline /></button>
    </div>
  )
}

export default Boton