import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const Verificacion = () => {
  const router = useRouter();
  const { token } = router.query;
  
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Verificar el token cuando el componente se monta
    const verificarToken = async () => {
      try {

        setMensaje('valido')
      } catch (error) {

        setMensaje('no valido')
      }
    };

    verificarToken();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Verificación de Correo Electrónico</h1>
        <p>{mensaje}</p>
      </div>
    </div>
  );
};

export default Verificacion;
