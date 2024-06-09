import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";


export default function Home() {

  const [valor, setValor] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/login`, valor)
    .then(result => {
   
       if (result.data.loginStatus) {
        if (result.data.result[0].administrador) {
          localStorage.setItem('valid', true.toString())
          router.push('/administrador')
          localStorage.setItem('userId', result.data.result[0].id)
        } else {
          if (result.data.result[0].estado) {
            localStorage.setItem('valid', true.toString())
            router.push('/perfil')
            localStorage.setItem('userId', result.data.result[0].id)
          }else{
            setError('Su cuenta no se encuentra activa')
            setTimeout(() => {
              setError('')
            }, 3000)
          }
          
        }
       }else {
        setError(result.data.Error)
        setTimeout(() => {
          setError('')
        }, 3000)
       }
    }
    ).catch(err => console.log("Es el error"+err))
  }

  return (
    <body className="bg-gradient-to-r from-[#c91313a6] from-10% via-[#9d6cd2] via-30% to-[#2e14a3a8] to-90% flex items-center justify-center">
      <div className="max-w-[960px] grid grid-cols-2 items-center p-5 rounded-2xl bg-sky-800 gap-20">
        <div className="relative bg-[#6363637c]">
          <Image src="/Imagenes Login/signup-background.svg" className="opacity-20" alt="" width={400} height={400}/>
          <Image src="/Imagenes Login/logo.jpg"  className="absolute top-20 left-10 opacity-80 rounded-full" alt="" width={300} height={300}/>
        </div>

        <div className="max-w-80 grid gap-5">
          <h1 className="text-4xl font-bold text-white">Seguimiento de Titulados</h1>

          {error ? (
              <div
                className="text-white flex justify-center p-2 bg-red-700 rounded-xl"
              >
                {error && error}</div>
          ) : null}

          <form 
              className="space-y-6 text-white"
              onSubmit={handleSubmit}
          >
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white rounded-full p-2 flex items-center justify-center text-blue-900">
                <FaUser />
              </div>
              <input 
                  type="email" 
                  placeholder="Usuario" 
                  className="w-80 bg-cyan-600 py-2 px-12 rounded-full focus:bg-fondo2 focus:outline-none focus:ring focus:ring-azulNeon focus:drop-shadow-lg placeholder:text-white"
                  onChange={e => setValor({...valor, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <div className="absolute top-1 left-1 bg-white rounded-full p-2 flex items-center justify-center text-blue-900">
                <FaLock />
              </div>
              <input 
                  type="password" 
                  placeholder="Contraseña" 
                  className="w-80 bg-cyan-600 py-2 px-12 rounded-full focus:bg-fondo2 focus:outline-none focus:ring focus:ring-azulNeon focus:drop-shadow-lg placeholder:text-white"
                  onChange={e => setValor({...valor, password: e.target.value})}
              />
            </div>

            <button className="bg-gradient-to-r from-blue-900 to-cyan-700 w-80 font-semibold rounded-full py-2 group relative inline-flex h-12 items-center justify-center overflow-hidden bg-neutral-950 px-6 text-neutral-200"><span>Ingresar</span><div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>
          </form>

          <div className="text-white border-t border-blanco2 pt-4 space-y-4 text-sm">
              <p>No estas registrado?
                <Link 
                  className="text-cyan-600 font-semibold cursor-pointer"
                  href={'/registro'}
                >
                Registrate
                </Link>
              </p>
            
            
            <p>Olvidaste tu Contraseña?
              <Link 
                href={'/recuperar'}
                className="text-cyan-600 font-semibold cursor-pointer"
              >
                Recuperar contraseña
              </Link>
            </p>
          </div>

        </div>

      </div>
    </body>
  );
}
