import {
    MOSTRAR_PAGOS
} from "../actions/types";

//CADA REDUCER TIENE SU ṔROPIO STATE

const initialState = {
    pagos: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MOSTRAR_PAGOS:
            return {
                ...state,
                pagos: action.payload
            };

        // case MOSTRAR_TITULAR:
        //     return {
        //         ...state,
        //         titular: action.payload
        //     };

        // case BUSCAR_TITULAR:
        //     return {
        //         ...state,
        //         titular: action.payload
        //     };

        // // case ELIMINAR_PRODUCTO:
        // //     return {
        // //         ...state,
        // //         productos: state.productos.filter(
        // //             producto => producto.id !== action.payload
        // //         )
        // //     };

        // case AGREGAR_TITULAR:
        //     return {
        //         ...state,
        //         titulares: [...state.productos, action.payload]
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