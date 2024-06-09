import React, {useEffect, useState, useRef} from 'react'

interface Step {
    description: string;
    completed: boolean;
    highlighted: boolean;
    selected: boolean;
}

interface Props {
    pasos: string[];
    pasoActual: number;
}

 

const BarraControl = ({pasos, pasoActual}: Props) => {

    const [nuevoPaso, setNuevoPaso] = useState([])
    const pasoRef = useRef<any>(0);

    const actualizarPaso = (pasoNumero: number, pasos: []) => {
        const nuevoPaso: Step[] = [...pasos]
        let count = 0;
        while(count < nuevoPaso.length){
            if (count === pasoNumero) {
                nuevoPaso[count] = {
                    ...nuevoPaso[count],
                    highlighted: true,
                    selected: true,
                    completed: true
                }
                count++;
            }

            else if(count < pasoNumero){
                nuevoPaso[count] = {
                    ...nuevoPaso[count],
                    highlighted: false,
                    selected: true,
                    completed: true
                }
                count++;
            }
            else{
                nuevoPaso[count] = {
                    ...nuevoPaso[count],
                    highlighted: false,
                    selected: false,
                    completed: false
                }
                count++;
            }
        }
        return nuevoPaso;
    }

    useEffect(() => {

        const estadoPaso: Step[] = pasos.map((paso: string, index: number): Step =>
            Object.assign(
                {}, 
            {
                description: paso,
                completed: false,
                highlighted: index === 0 ? true : false,
                selected: index === 0 ? true : false
            })
        );

        pasoRef.current = estadoPaso;
        const current: any = actualizarPaso(pasoActual - 1, pasoRef.current)
        setNuevoPaso(current);

    }, [pasos, pasoActual])

    const mostrarPasos = nuevoPaso.map((paso, index) => {
        return (
            (
                <div 
                    key={index}
                    className={
                        index !== nuevoPaso.length -1 ? "w-full flex items-center " :
                        "flex items-center"
                    }>

                    <div className='relative flex flex-col items-center text-teal-950'>
                        <div 
                            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
                                paso.selected 
                                    ? "bg-sky-800 text-white font-bold border border-sky-400" 
                                    : "" 
                                }`}>
                                {paso.completed ? (
                                    <span className='text-white font-bold text-xl'>&#10003;</span>
                                ) : (index + 1)}
                        </div>
            
                        <div
                            className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${paso.highlighted ? "text-gray-900" : "text-gray-400"}`}
                        >
                            {paso.description}
                        </div>
                    </div>
                    <div className={`flex-auto border-t-2 transition duration-500 ease-in-out 
                        ${paso.completed ? "border-menuColor1" : "border-gray-300"}`}>           
                    </div>
                </div>
            )
        )
    } )
  return (
    <div className='mx-4 p-4 flex justify-between items-center'>
        {mostrarPasos}     
    </div>
  )
}

export default BarraControl