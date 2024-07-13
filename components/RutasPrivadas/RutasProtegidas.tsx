import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  tipoRol: any;
  children: any;
}

const RutasProtegidas = ({ tipoRol, children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('valid');
    const userType = localStorage.getItem('tipo');

    if (!isLoggedIn || !userType || !tipoRol.includes(userType)) {
      router.push('/pagina404'); // Redirigir a la página de inicio si no está autorizado
    }
  }, []);

  // Si el usuario no está autorizado, no renderizar nada
  if (!localStorage.getItem('valid') || !localStorage.getItem('tipo') || !tipoRol.includes(localStorage.getItem('tipo'))) {
    return null;
  }

  return <>{children}</>;
};

export default RutasProtegidas;