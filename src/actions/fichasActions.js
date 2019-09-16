import {
    CAMBIAR_TITULAR,
    REGISTRAR_VIEJO_TITULAR,
    CAMBIAR_GRUPO,
    CAMBIAR_CUOTA
  } from "./types";
  
  import axios from "axios";
  import toastr from "../utils/toastr";
  
  export const cambioTitular = adherente => async dispatch => {
    await axios
      .put(
        `http://190.231.32.232:5002/api/mutual/fichas/cambiotitular/${adherente.CONTRATO}`,
        adherente
      )
  
      .then(
        res =>
          dispatch({
            type: CAMBIAR_TITULAR,
            payload: res.data
          }),
        toastr.success("El cambio de grupo se aplico correctamente", "ATENCION")
      )
  
      .catch(err => {
        console.log(err);
        toastr.warning(
          "Algo salio mal, no se registraron los cambios",
          "ATENCION"
        );
      });
  };
  
  export const cambioGrupo = cambioGrupo => async dispatch => {
    await axios
      .put(
        `http://190.231.32.232:5002/api/mutual/fichas/cambiogrupo/${cambioGrupo.CONTRATO}`,
        cambioGrupo
      )
  
      .then(
        res =>
          dispatch({
            type: CAMBIAR_GRUPO,
            payload: res.data
          }),
        toastr.success("El cambio de titular se aplico correctamente", "ATENCION")
      )
  
      .catch(err => {
        console.log(err);
        toastr.warning(
          "Algo salio mal, no se registraron los cambios",
          "ATENCION"
        );
      });
  };
  
  export const cambioCuota = CUOTA => async dispatch => {
    await axios
      .put(`http://190.231.32.232:5002/api/mutual/fichas/cambiogrupo/${CUOTA}`)
  
      .then(
        res =>
          dispatch({
            type: CAMBIAR_CUOTA,
            payload: res.data
          }),
        toastr.success("El cambio de cuota se aplico correctamente", "ATENCION")
      )
  
      .catch(err => {
        console.log(err);
        toastr.warning(
          "Algo salio mal, no se registraron los cambios",
          "ATENCION"
        );
      });
  };
  
  export const registrarTitularViejo = titular => async dispatch => {
    await axios
      .post("http://190.231.32.232:5002/api/mutual/fichas/viejotitular", titular)
  
      .then(
        res =>
          dispatch({
            type: REGISTRAR_VIEJO_TITULAR,
            payload: res.data
          }),
        toastr.success("El cambio de titular se aplico correctamente", "ATENCION")
      )
  
      .catch(err => {
        console.log(err);
        toastr.warning(
          "Algo salio mal, no se registraron los cambios",
          "ATENCION"
        );
      });
  };
  
  // export const mostrarHistoria = (id) => async dispatch => {
  //     const respuesta = await axios.get(`http://190.231.32.232:5002/api/mutual/historia/historias/${id}`);
  //     dispatch({
  //         type: MOSTRAR_HISTORIA,
  //         payload: respuesta.data
  //     });
  // };
  
  //   export const ultimoMemo = id => async dispatch => {
  //     const respuesta = await axios.get(`http://190.231.32.232:5002/api/mutual/memo/lastmemo/${id}`);
  //     dispatch({
  //       type: ULTIMO_MEMO,
  //       payload: respuesta.data
  //     });
  //   };
  
  // export const borrarProducto = id => async dispatch => {
  //   await axios.delete(`http://190.231.32.232:5002/productos/${id}`);
  
  //   dispatch({
  //     type: ELIMINAR_PRODUCTO,
  //     payload: id
  //   });
  // };
  
  // export const agregarProducto = producto => async dispatch => {
  //   const respuesta = await axios.post(
  //     "http://190.231.32.232:5002/productos",
  //     producto
  //   );
  
  //   dispatch({
  //     type: AGREGAR_PRODUCTO,
  //     payload: respuesta.data
  //   });
  // };
  