import { Html, Head, Main, NextScript } from "next/document";
import colores from "@/utils/colores.js";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body className="bg-sky-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
