import { combineReducers } from "redux";
import authReducers from "../reducers/authReducers";
import errorReducers from "../reducers/errorReducers";
import titularReducers from "./titularReducer";
import adherentesReducers from "./adherentesReducers";
import pagosReducers from "./pagosReducers";
import pagobcoReducers from "./pagobcoReducers";
import memosReducers from "./memosReducers";
import historiaReducers from "./historiaReducers";
import fichasReducers from "./fichasReducers";
import prestamosReducers from "./prestamosReducers";
import verificacionesReducers from "./verificacionesReducers";

export default combineReducers({
  auth: authReducers,
  error: errorReducers,
  titulares: titularReducers,
  adherentes: adherentesReducers,
  pagos: pagosReducers,
  pagobco: pagobcoReducers,
  memos: memosReducers,
  historia: historiaReducers,
  fichas: fichasReducers,
  prestamos: prestamosReducers,
  operadores: authReducers,
  verificaciones: verificacionesReducers
});
