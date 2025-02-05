import React from 'react'

interface Props {
    titulo: string,
    opciones: {value: string | number | []; label: string}[],
    value: string | number
    onChange: React.ChangeEventHandler<HTMLSelectElement>
    name: string
}

const Select = ({titulo, opciones, value, onChange, name}: Props) => {
  return (
    <div className="relative h-10 min-w-[200px] mt-3">
        <select
            className="peer h-full w-full rounded-[7px] border border-menuColor2 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-menuColor2 empty:!bg-menuColor2 focus:border-2 focus:border-menuColor2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-gray-700"
            value={value}
            onChange={onChange}
            name={name}

        >
            {opciones.map((opcion, index) => (
                <option key={index} value={opcion.value}>
                    {opcion.label}
                </option>
            ))}
        </select>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-menuColor2 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-menuColor2 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-menuColor2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-menuColor2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 text-gray-600">
      {titulo}
    </label>
  </div>
  )
}

export default Select