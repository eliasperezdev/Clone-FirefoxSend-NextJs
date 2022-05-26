import { useDropzone } from "react-dropzone";
import { useCallback, useContext } from "react";
import clienteAxios from "../config/axios";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Formulario from "./Formulario";


function Dropzone() {

  const  AppContext = useContext(appContext)
  const {mostrarAlerta, subirArchivo, cargando, crearEnlace} = AppContext

  const  AuthContext = useContext(authContext)
  const { usuario, autenticado } = AuthContext

  const onDropAccepted = useCallback(async (acceptedFiles) => {

    //Crear un form data
    const formData = new FormData()

    formData.append('archivo', acceptedFiles[0]);

    subirArchivo(formData, acceptedFiles[0].path)
  }, [])

  const onDropRejected = () => {
    mostrarAlerta("No se puedo subir")
  }


  const { getRootProps, getInputProps, isDragActive,  acceptedFiles} = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000})

  const archivos = acceptedFiles.map(archivo => (
    <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
      <p font-bold text-xl>{archivo.path}</p>
      <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2).toFixed(2))} MB</p>
    </li>
  ))

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">

        {acceptedFiles.length > 0 ? (
          <div className="mt-10 w-full">
            <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
            <ul>
              {archivos}
            </ul>
            {cargando? <p className="my-10 text-center text-gray-600">Cargando archivo...</p>: (
                <button
                type="button"
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800 "
                onClick={()=> crearEnlace()}
              >
                Crear enlace
              </button>
              )}

            {autenticado ? 
                   <Formulario />   
            : ""  }

          </div>
        ): (
          <div {...getRootProps({className: "dropzone w-full py-32"})}>
          <input className="h-100" {...getInputProps()} />
            {isDragActive ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> : 
              <div className="text-center">
                <p className="text-2xl text-center text-gray-600"> Selecciona un archivo o arrastralo aqui</p>
                <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800 " type="button">Selecciona archivos para subir</button>
              </div>
            }
            
        </div>
        )}



    </div>
  );
}

export default Dropzone;

