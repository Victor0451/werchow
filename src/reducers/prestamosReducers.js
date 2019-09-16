import { MOSTRAR_PRESTAMOS } from "../actions/types";

//CADA REDUCER TIENE SU ṔROPIO STATE

const initialState = {
  prestamos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_PRESTAMOS:
      return {
        ...state,
        prestamos: action.payload
    };

    default:
      return state;
  }
}
