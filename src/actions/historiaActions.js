import { MOSTRAR_HISTORIA, REGISTRAR_HISTORIA } from "./types";

import axios from "axios";

export const mostrarHistoria = id => async dispatch => {
  const respuesta = await axios.get(
    `http://190.231.32.232:5002/api/werchow/historia/historias/${id}`
  );
  dispatch({
    type: MOSTRAR_HISTORIA,
    payload: respuesta.data
  });
};

export const mostrarHistoriaFox = id => async dispatch => {
  const respuesta = await axios.get(
    `http://190.231.32.232:5002/api/werchow/historia/historiasfox/${id}`
  );
  dispatch({
    type: MOSTRAR_HISTORIA,
    payload: respuesta.data
  });
};

export const registrarHistoria = historia => async dispatch => {
  const respuesta = await axios.post(
    "http://190.231.32.232:5002/api/werchow/historia/nuevo",
    historia
  );
  dispatch({
    type: REGISTRAR_HISTORIA,
    payload: respuesta.data
  });
};
