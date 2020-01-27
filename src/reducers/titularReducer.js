import {
  MOSTRAR_TITULARES,
  MOSTRAR_TITULAR,
  AGREGAR_TITULAR,
  ULTIMO_CONTRATO_TITULAR,
  EDITAR_TITULAR,
  BAJA_TITULAR,
  MOSTRAR_CUOTA
} from "../actions/types";

//CADA REDUCER TIENE SU ṔROPIO STATE

const initialState = {
  titulares: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_TITULARES:
      return {
        ...state,
        titulares: action.payload
      };

    case MOSTRAR_TITULAR:
      return {
        ...state,
        titular: action.payload
      };

    case MOSTRAR_CUOTA:
      return {
        ...state,
        cuota: action.payload
      };

    case ULTIMO_CONTRATO_TITULAR:
      return {
        ...state,
        lastcontrato: action.payload
      };

    case BAJA_TITULAR:
      return {
        ...state,
        titulares: state.titulares.map(titular =>
          titular.CONTRATO === action.payload.id
            ? (titular = action.payload)
            : titular
        )
      };

    case AGREGAR_TITULAR:
      return {
        ...state,
        titulares: [...state.titulares, action.payload]
      };

    case EDITAR_TITULAR:
      return {
        ...state,
        titulares: state.titulares.map(titular =>
          titular.CONTRATO === action.payload.id
            ? (titular = action.payload)
            : titular
        )
      };

    default:
      return state;
  }
}
