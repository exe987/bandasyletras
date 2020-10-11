import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';

function App() {
  //STATE DE BUSQUEDA DE LETRA PARA CONSULTAR API
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  //STATE DE LETRA
  const [ letra, guardarLetra ] = useState('');
  //STATE DE INFO DE BANDA
  const [info, guardarInfo] = useState({});

  //CONSULTAR API
  useEffect(()=>{
    //PARA QUE NO SE EJECUTE SI EL OBJETO DE BUSQUEDA DE LETRAS ESTA VACIO
    if(Object.keys(busquedaletra).length === 0)return;
    
    const consultarApiLetra = async () => {
      //EXTRAEMOS VALORES DE BUSQUEDALETRA
      const {artista, cancion} = busquedaletra;
      //CONSULTAMOS API CON AXIOS
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      

      /*PARA QUE LA PETICION SE ASINCRONA Y LA SEGUNDA NO DEBA ESPERAR A QUE TERMINE LA PRIMERA
      DENTRO DEL ARRAY DEL Promise.all ACLARAR EL VERBO CON EL CUAL VAMOS A EJECUTAR AXIOS 
      EN ESTE CASO .get POR MAS QUE POR DEFAULT FUNCIONE CON GET*/
      const [letra, informacion] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ]);
      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
      console.log(informacion.data.artists[0]);
    }

    consultarApiLetra();
  }, [busquedaletra])

  return (
   <Fragment>
     <Formulario
     guardarBusquedaLetra={guardarBusquedaLetra}
     />
     <div className='container mt-5'>
        <div className='row'>
            <div className='col-md-6'>
             <Info info={info}/>
            </div>
            <div className='col-md-6'>
            <Cancion
                letra={letra}
                />
            </div>
        </div>
     </div>
   </Fragment>
  );
}

export default App;
