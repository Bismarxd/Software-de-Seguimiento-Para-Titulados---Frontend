import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {Calendar} from '@/components/ui/calendar'
import { useEffect } from 'react';

export default function GridDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date()); // Inicializa el estado con la fecha actual
  
  useEffect(() => {
    console.log(date); // Verifica que la fecha se está estableciendo correctamente
  }, [date]);
  return (
    <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-xl border  h-[65%] w-[70%] text-white"
  />
  );
}