import {
    MOSTRAR_MEMOS, AGREGAR_MEMO, ULTIMO_MEMO
} from "../actions/types";

//CADA REDUCER TIENE SU ṔROPIO STATE

const initialState = {
    memos: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MOSTRAR_MEMOS:
            return {
                ...state,
                memos: action.payload
            };

        case ULTIMO_MEMO:
            return {
                ...state,
                memo: action.payload
            };

        case AGREGAR_MEMO:
            return {
                ...state,
                memos: [...state.memos, action.payload]
            };

        // case ELIMINAR_PRODUCTO:
        //     return {
        //         ...state,
        //         productos: state.productos.filter(
        //             producto => producto.id !== action.payload
        //         )
        //     };



        // case EDITAR_PRODUCTO:
        //     return {
        //         ...state,
        //         productos: state.productos.map(producto =>
        //             producto.id === action.payload.id
        //                 ? (producto = action.payload)
        //                 : producto
        //         )
        //     };
        default:
            return state;
    }
}