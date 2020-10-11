import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({guardarBusquedaLetra}) => {
  //STATE DE ERROR
  const [error, guardarError] = useState(false);

  //STATE DE LO QUE INGRESA EL USUARIO
  const [busqueda, guardarBusqueda] = useState({
    artista: "",
    cancion: "",
  });

  //FUNCION QUE COLOCA LOS ELEMENTOS EN EL STATE
  const handleChange = (e) => {
    //ACTUALIZA EL STATE
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //EXTRAEMOS LOS VALORES DE LA BUSQUEDA PARA LA VALIDACION
  const { artista, cancion } = busqueda;

  //SUBMIT
  const getInfo = (e) => {
    //PARA QUE NO SE RECARGUE PAGINA
    e.preventDefault();
    //VALIDACION
    if (artista.trim() === "" || cancion.trim() === "") {
      guardarError(true);
      return;
    }
    //SI PASA VALIDACION NO HAY ERROR
    guardarError(false);
    //GUARDAMOS LA BUSQUEDA PARA CONSULTAR API
    guardarBusquedaLetra(busqueda);
  };

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            onSubmit={getInfo}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fieldset>
              {error ? (
                <Error mensaje="COMPLETA TODOS LOS CAMPOS" />
              ) : (
                <legend className="text-center">
                  BUSCADOR LETRA DE CANCIONES
                </legend>
              )}

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>ARTISTA</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      placeholder="NOMBRE DE ARTISTA"
                      onChange={handleChange}
                      value={artista}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>CANCION</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cancion"
                      placeholder="NOMBRE DE CANCION"
                      onChange={handleChange}
                      value={cancion}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-right">
                BUSCAR
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
