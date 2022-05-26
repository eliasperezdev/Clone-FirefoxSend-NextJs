import Link from "next/link"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";

export default function Header() {

  const router = useRouter()

  const AuthContext = useContext(authContext)
  const {usuarioAutenticado, usuario, cerrarSesion} = AuthContext
  
  const AppContext = useContext(appContext)
  const {limpiarState} = AppContext

    useEffect(() => {
      usuarioAutenticado()
    })

    const redireccionar = () => {
      router.push("/")
      limpiarState()
    }

  return (
    <header className="py-8 flex flex-col md:flex-row item-center justify-between">
    <Link href="/">
        <img 
        onClick={()=> redireccionar()}
        className="w-64 mb-8 md:mb-0 cursor-pointer" src="logo.svg"/>
    </Link>        
    <div>{usuario ?<div className="flex items-center"> 
          <p className="mr-3">
            Hola {usuario.nombre}
          </p> 
          <button 
              type="button"
              onClick={()=> cerrarSesion()}
             className="bg-black ml-2 px-5 py-3 rounded-lg text-white font-bold uppercase"
          >
            Cerrar sesión
          </button>
          </div>: (<> 
            <Link href="/login">
                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase"> Iniciar Sesión</a>
            </Link>
            <Link href="/crearcuenta">
                <a className="bg-black ml-2 px-5 py-3 rounded-lg text-white font-bold uppercase">Crear cuenta</a>
            </Link></>) }
        </div>
    </header>
  )
}
