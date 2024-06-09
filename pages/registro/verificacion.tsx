import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const Verificacion = () => {
  const router = useRouter();
  const { token } = router.query;
  console.log(token);
  
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Verificar el token cuando el componente se monta
    const verificarToken = async () => {
      try {
        const decoded = jwt.verify(token, 'secreto');
        // Token válido, continuar con la lógica de confirmación...
        console.log('Correo electrónico confirmado:', decoded.email);
        setMensaje('valido')
      } catch (error) {
        // Token inválido o expirado, manejar el error...
        console.error('Error al verificar el token:', error.message);
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
