import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Home from "./Home";
import Titulares from "./titulares/Titulares";
import Titular from "./titulares/Titular";
import NuevoTitular from "./titulares/NuevoTitular";
import NuevoAdherente from "./adherentes/NuevoAdherente";
import EditarAdherente from "./adherentes/EditarAdherente.js";
import BuscarTitular from "./titulares/BuscarTitular";
import Pagos from "./pagos/pagos";
import Pagobco from "./pagos/pagobco";
import EditarTitular from "./titulares/EditarTitular";
import Memo from "./memo/memo";
import NuevoMemo from "./memo/NuevoMemo";
import Historia from "./historia/Historia";
import CambioTitular from "./ficha/CambioTitular";
import BajaAdherente from "./ficha/BajaAdherente";
import BajaFicha from "./ficha/BajaFicha";
import VerificarDNI from "./Verificaciones/VerificarDNI";
import ListadoPrestamos from "./prestamos/ListadoPrestamos";
import Login from "./auth/Login";
import { USER_LOGEDED } from "../actions/types";
import Register from "./auth/Register";
import store from "../store";
import Edit from "./auth/Edit";
import ImprimirSolicitud from "./ficha/ImprimirSolicitud";

//REDUX
import { Provider } from "react-redux";

const token = sessionStorage.getItem("token");

if (token) {
  store.dispatch({ type: USER_LOGEDED });
}

export default class Router extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />

          {token ? (
            <Switch>
              {/* HOME */}

              <Route exact path={"/"} component={Home} />

              {/* AUHT */}

              <Route exact path={"/register"} component={Register} />
              <Route exact path={"/edit"} component={Edit} />

              {/* VERIFICACIONES */}
              <Route
                exact
                path={"/verificaciones/:id"}
                component={VerificarDNI}
              />

              {/* TITULARES */}

              <Route exact path={"/titulares"} component={Titulares} />
              <Route exact path={"/titulares/:id"} component={Titular} />

              <Route
                exact
                path={"/titular/nuevo/:id"}
                component={NuevoTitular}
              />
              <Route exact path={"/titular/buscar"} component={BuscarTitular} />
              <Route
                exact
                path={"/titulares/editar/:id"}
                component={EditarTitular}
              />
              <Route
                exact
                path={"/titulares/historia/:id"}
                component={Historia}
              />

              {/* ADHERENTES */}

              <Route
                exact
                path={"/adherentes/nuevo/:id"}
                component={NuevoAdherente}
              />
              <Route
                exact
                path={"/adherentes/editar/:id"}
                component={EditarAdherente}
              />

              {/* PAGOS */}
              <Route exact path={"/pagos/cuotas/:id"} component={Pagos} />
              <Route exact path={"/pagos/debitos/:id"} component={Pagobco} />

              {/* MEMOS */}
              <Route exact path={"/memo/:id"} component={Memo} />
              <Route exact path={"/memo/nuevo/:id"} component={NuevoMemo} />

              {/* FICHAS */}

              <Route
                exact
                path={"/ficha/imprimirsolicitud"}
                component={ImprimirSolicitud}
              />
              <Route
                exact
                path={"/ficha/cambiotitular"}
                component={CambioTitular}
              />
              <Route
                exact
                path={"/ficha/cambiotitular/:id"}
                component={CambioTitular}
              />
              <Route
                exact
                path={"/ficha/bajaadherente"}
                component={BajaAdherente}
              />
              <Route
                exact
                path={"/ficha/bajaadherente/:id"}
                component={BajaAdherente}
              />
              <Route
                exact
                path={"/ficha/bajaficha/:id"}
                component={BajaFicha}
              />
              <Route exact path={"/ficha/bajaficha/"} component={BajaFicha} />

              {/* PRESTAMOS */}
              <Route
                exact
                path={"/prestamos/listado/:id"}
                component={ListadoPrestamos}
              />
            </Switch>
          ) : (
            <Switch>
              {/* AUTH */}
              <Route exact path={"/login"} component={Login} />
              <Redirect to={"/login"} />
            </Switch>
          )}
        </BrowserRouter>
      </Provider>
    );
  }
}
