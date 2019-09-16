import {
    MOSTRAR_PAGOS
} from "./types";

import axios from "axios";

export const mostrarPagosTitular = (id) => async dispatch => {
    const respuesta = await axios.get(`http://190.231.32.232:5002/api/werchow/pagos/pagos/${id}`);
    dispatch({
        type: MOSTRAR_PAGOS,
        payload: respuesta.data
    });
};

// export const mostrarAdherentesDelTitular = id => async dispatch => {
//     const respuesta = await axios.get(`http://190.231.32.232:5002/getadherent/${id}`);

//     dispatch({
//         type: MOSTRAR_ADHERENTESTITULAR,
//         payload: respuesta.data
//     });
// };

   // export const borrarProducto = id => async dispatch => {
   //   await axios.delete(`http://190.231.32.232:5002/productos/${id}`);

   //   dispatch({
   //     type: ELIMINAR_PRODUCTO,
   //     payload: id
   //   });
   // };

   // export const agregarProducto = producto => async dispatch => {
   //   const respuesta = await axios.post(
   //     "http://190.231.32.232:5002/productos",
   //     producto
   //   );

   //   dispatch({
   //     type: AGREGAR_PRODUCTO,
   //     payload: respuesta.data
   //   });
   // };

   // export const editarProducto = producto => async dispatch => {
   //   const respuesta = await axios.put(
   //     `http://190.231.32.232:5002/productos/${producto.id}`,
   //     producto
   //   );

   //   dispatch({
   //     type: EDITAR_PRODUCTO,
   //     payload: respuesta.data
   //   });
   // };