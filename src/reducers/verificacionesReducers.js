import { VERIFICAR_DNI_TIT, VERIFICAR_DNI_ADH } from "../actions/types";

//CADA REDUCER TIENE SU ṔROPIO STATE

const initialState = {
  verificaciones: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIFICAR_DNI_TIT:
      return {
        ...state,
        titular: action.payload
      };

    case VERIFICAR_DNI_ADH:
      return {
        ...state,
        adherent: action.payload
      };
    default:
      return state;
  }
}
