import { VERIFICAR_DNI_TIT, VERIFICAR_DNI_ADH } from "./types";

import axios from "axios";

export const verificarDNITit = id => async dispatch => {
  await axios
    .get(`http://190.231.32.232:5002/api/werchow/maestro/dni/${id}`)

    .then(res =>
      dispatch({
        type: VERIFICAR_DNI_TIT,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const verificarDNIAdh = id => async dispatch => {
  await axios
    .get(`http://190.231.32.232:5002/api/werchow/adherent/dni/${id}`)

    .then(res =>
      dispatch({
        type: VERIFICAR_DNI_ADH,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};
