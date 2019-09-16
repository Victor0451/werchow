import {
    MOSTRAR_ADHERENTESTITULAR, MOSTRAR_ADHERENTE, EDITAR_ADHERENTE, AGREGAR_ADHERENTE
} from "../actions/types";

//CADA REDUCER TIENE SU ṔROPIO STATE

const initialState = {
    adherentes: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MOSTRAR_ADHERENTESTITULAR:
            return {
                ...state,
                adherentes: action.payload
            };

        case MOSTRAR_ADHERENTE:
            return {
                ...state,
                adherente: action.payload
            };

        case AGREGAR_ADHERENTE:
            return {
                ...state,
                adherentes: [...state.adherentes, action.payload]
            };

        case EDITAR_ADHERENTE:
            return {
                ...state,
                adherentes: state.adherentes.map(adherente =>
                    adherente.NRO_DOC === action.payload.id
                        ? (adherente = action.payload)
                        : adherente
                )
            };

        default:
            return state;
    }
}