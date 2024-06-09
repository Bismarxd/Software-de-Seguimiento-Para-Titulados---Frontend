import React from 'react'


interface Props {
    texto: string
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    value: string | number
    name: string
}

const Radio = ({texto, handleChange, value, name} : Props) => {
  return (
    <div className="flex flex-col text-xs">
        <h3 className='text-gray-600'>{texto}</h3>
        <div className='flex' onChange={handleChange}>
            <div className="inline-flex items-center">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
                <input 
                    
                    value={value}
                    name={name}
                    type="radio"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-cyan-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-cyan-500 before:opacity-0 before:transition-opacity checked:border-cyan-900 checked:before:bg-cyan-900 hover:before:opacity-10"
                    id="html" />
                <span
                    className="absolute text-cyan-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="html">
                Si
                </label>
            </div>
            <div className="inline-flex items-center">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="react">
                <input 
                    
                    value={value}
                    name={name}
                    type="radio"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-cyan-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-cyan-500 before:opacity-0 before:transition-opacity checked:border-cyan-900 checked:before:bg-cyan-900 hover:before:opacity-10"
                    id="react" checked />
                <span
                    className="absolute text-cyan-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="react">
                No
                </label>
            </div>
        </div>
        
    </div> 
  )
}

export default Radio