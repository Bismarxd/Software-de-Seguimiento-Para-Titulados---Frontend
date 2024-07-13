import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();

  const handleGoBack = () => {
    router.push('/')
  };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image alt='' src={'/pagina404.svg'} width={300} height={300}/>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Página no encontrada</h1>
          <p className="text-lg text-gray-600 mb-4">La página que estás buscando no existe.</p>
          <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleGoBack}
      >
        Volver
      </button>
          
        </div>
      );

}

export default Index