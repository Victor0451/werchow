import {
  MOSTRAR_TITULARES,
  MOSTRAR_TITULAR,
  AGREGAR_TITULAR,
  ULTIMO_CONTRATO_TITULAR,
  EDITAR_TITULAR,
  BAJA_TITULAR
} from "./types";

import axios from "axios";
import toastr from "../utils/toastr";

export const mostrarTitulares = () => async dispatch => {
  await axios
    .get("http://190.231.32.232:5002/api/werchow/maestro/titulares")
    .then(res =>
      dispatch({
        type: MOSTRAR_TITULARES,
        payload: res.data
      })
    )

    .catch(err => {
      console.log(err);
      toastr.error(
        "Algo salio mal, no se puede mostrar los socios, comunicate con sistemas ",
        "ATENCION"
      );
    });
};

export const ultimoContrato = () => async dispatch => {
  const respuesta = await axios.get(
    "http://190.231.32.232:5002/api/werchow/maestro/lastcontrato"
  );
  dispatch({
    type: ULTIMO_CONTRATO_TITULAR,
    payload: respuesta.data
  });
};

export const mostrarTitular = id => async dispatch => {
  await axios
    .get(`http://190.231.32.232:5002/api/werchow/maestro/titular/${id}`)

    .then(res =>
      dispatch({
        type: MOSTRAR_TITULAR,
        payload: res.data
      })
    )

    .catch(err => {
      console.log(err);
      toastr.warning("El N° de Socio ingresado no existe", "ATENCION");
    });
};

export const mostrarTitularApellido = apellido => async dispatch => {
  await axios
    .get(
      `http://190.231.32.232:5002/api/werchow/maestro/titularapellido/${apellido}`
    )

    .then(res =>
      dispatch({
        type: MOSTRAR_TITULAR,
        payload: res.data
      })
    )

    .catch(err => {
      console.log(err);
      toastr.warning("El N° de Socio ingresado no existe", "ATENCION");
    });
};

export const mostrarTitularDNI = dni => async dispatch => {
  await axios
    .get(`http://190.231.32.232:5002/api/werchow/maestro/dni/${dni}`)

    .then(res =>
      dispatch({
        type: MOSTRAR_TITULAR,
        payload: res.data
      })
    )

    .catch(err => {
      console.log(err);
      toastr.warning("El N° de Socio ingresado no existe", "ATENCION");
    });
};

export const bajaTitular = id => async dispatch => {
  await axios
    .put(`http://190.231.32.232:5002/api/werchow/maestro/baja/${id}`, id)

    .then(
      res =>
        dispatch({
          type: BAJA_TITULAR,
          payload: res.data
        }),
      toastr.success("El socio fue dado de baja", "ATENCION")
    )

    .catch(err => {
      console.log(err);
      toastr.error("Algo salio mal, no se registraron los cambios", "ATENCION");
    });
};

export const agregarTitular = titular => async dispatch => {
  await axios
    .post(`http://190.231.32.232:5002/api/werchow/maestro/nuevo`, titular)

    .then(
      res =>
        dispatch({
          type: AGREGAR_TITULAR,
          payload: res.data
        }),
      toastr.success("El socio fue registrado con exito", "ATENCION"),
      window.history.pushState(null, null, `/titulares/${titular.CONTRATO}`)
    )

    .catch(err => {
      console.log(err);
      toastr.error("Algo salio mal, no se registraron los cambios", "ATENCION");
    });
};

export const editarTitular = titularModf => async dispatch => {
  await axios
    .put(
      `http://190.231.32.232:5002/api/werchow/maestro/editar/${titularModf.CONTRATO}`,
      titularModf
    )

    .then(
      res =>
        dispatch({
          type: EDITAR_TITULAR,
          payload: res.data
        }),
      toastr.success("El socio fue editado con exito", "ATENCION"),
      window.history.back()
    )

    .catch(err => {
      console.log(err);
      toastr.error("Algo salio mal, no se registraron los cambios", "ATENCION");
      window.history.back();
    });
};
