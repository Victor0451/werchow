import {
    CAMBIAR_TITULAR, REGISTRAR_VIEJO_TITULAR
} from "../actions/types";

//CADA REDUCER TIENE SU ṔROPIO STATE

const initialState = {
    fichas: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        case CAMBIAR_TITULAR:
            return {
                ...state,
                fichas: state.fichas.map(ficha =>
                    ficha.id === action.payload.id
                        ? (ficha = action.payload)
                        : ficha
                )
            };

        case REGISTRAR_VIEJO_TITULAR:
            return {
                ...state,
                fichas: [...state.fichas, action.payload]
            };

        // case MOSTRAR_HISTORIA:
        //     return {
        //         ...state,
        //         historia: action.payload
        //     };

        // case MOSTRAR_ADHERENTE:
        //     return {
        //         ...state,
        //         adherente: action.payload
        //     };

        // case ELIMINAR_PRODUCTO:
        //     return {
        //         ...state,
        //         productos: state.productos.filter(
        //             producto => producto.id !== action.payload
        //         )
        //     };




        default:
            return state;
    }
}