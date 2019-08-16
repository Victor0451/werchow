import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';



//REDUX
import { Provider } from "react-redux";
import store from "../store";
import Navbar from './layouts/Navbar';
import Home from './Home';
import Titulares from './titulares/Titulares';
import Titular from './titulares/Titular';
import NuevoTitular from './titulares/NuevoTitular';
import NuevoAdherente from './adherentes/NuevoAdherente';
import NuevoAdhTitular from './adherentes/NuevoAdhTitular';
import BuscarTitular from './titulares/BuscarTitular';
import Pagos from './pagos/pagos';
import Pagobco from './pagos/pagobco';
import EditarTitular from './titulares/EditarTitular';
import Memo from './memo/memo';
import NuevoMemo from './memo/NuevoMemo'
import Historia from './historia/Historia';

export default class Router extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>

          <Navbar />

          <Switch>
            <Route exact path={'/'} component={Home} />

            {/* TITULARES */}

            <Route exact path={'/titulares'} component={Titulares} />
            <Route exact path={'/titulares/:id'} component={Titular} />
            <Route exact path={'/titular/nuevo'} component={NuevoTitular} />
            <Route exact path={'/titular/buscar'} component={BuscarTitular} />
            <Route exact path={'/titulares/editar/:id'} component={EditarTitular} />
            <Route exact path={'/titulares/historia/:id'} component={Historia} />



            {/* ADHERENTES */}

            <Route exact path={'/adherentes/nuevo/:id'} component={NuevoAdherente} />
            <Route exact path={'/adherentes/nuevo'} component={NuevoAdhTitular} />

            {/* PAGOS */}
            <Route exact path={'/pagos/cuotas/:id'} component={Pagos} />
            <Route exact path={'/pagos/debitos/:id'} component={Pagobco} />


            {/* MEMOS */}
            <Route exact path={'/memo/:id'} component={Memo} />
            <Route exact path={'/memo/nuevo/:id'} component={NuevoMemo} />


          </Switch>
        </BrowserRouter>

      </Provider>
    )
  }
}