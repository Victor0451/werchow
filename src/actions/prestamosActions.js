import { MOSTRAR_PRESTAMOS } from "./types";

import axios from "axios";

export const mostrarPrestamos = id => async dispatch => {
  const respuesta = await axios.get(
    `http://190.231.32.232:5002/api/prestamos/prestamos/${id}`
  );
  dispatch({
    type: MOSTRAR_PRESTAMOS,
    payload: respuesta.data
  });
};
