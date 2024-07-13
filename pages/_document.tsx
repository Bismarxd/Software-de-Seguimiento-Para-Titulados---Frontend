import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body style={{ 
        backgroundImage: `url('/fondo5.jpg')`, 
        backgroundSize: '100vw 100vh', // Utiliza 100vw y 100vh para cubrir completamente el viewport
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // opcional: fija la imagen en el viewport mientras se desplaza
        }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

