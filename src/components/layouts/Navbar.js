import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import Logout from "../auth/Logout";

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    //Links para usuarios logeados
    const authLinks = (
      <Fragment>
        {/* {user && user.perfil === 'admin' ? <RegisterModal /> : ''} */}
        <div
          className="collapse navbar-collapse d-flex justify-content-start"
          id="navbarColor02"
        >
          <ul className="navbar-nav ">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home{" "}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to=""
                className="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Titulares{" "}
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/titulares" className="dropdown-item text-dark">
                  Listado de Socios
                </Link>

                <hr />

                <Link
                  to={`/verificaciones/${"tit"}`}
                  className="dropdown-item text-dark"
                >
                  Ingresar Nuevo Socio
                </Link>

                <hr />

                <Link to="/titular/buscar" className="dropdown-item text-dark">
                  Buscar Socio
                </Link>
              </div>
            </li>

            <li className="nav-item dropdown">
              <Link
                to=""
                className="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Adherentes{" "}
              </Link>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link
                  to={`/verificaciones/${"adh"}`}
                  className="dropdown-item text-dark"
                >
                  Agregar un Adherente
                </Link>
              </div>
            </li>

            <li className="nav-item dropdown">
              <Link
                to=""
                className="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Fichas{" "}
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link
                  to="/ficha/imprimirsolicitud"
                  className="dropdown-item text-dark"
                >
                  Imprimir Solicitud
                </Link>

                <hr />

                <Link
                  to="/ficha/cambiotitular"
                  className="dropdown-item text-dark"
                >
                  Cambio de Titular
                </Link>

                <hr />

                <Link
                  to="/ficha/bajaadherente"
                  className="dropdown-item text-dark"
                >
                  Baja de Adherentes
                </Link>

                <hr />

                <Link to="/ficha/bajaficha" className="dropdown-item text-dark">
                  Baja de Ficha
                </Link>
              </div>
            </li>

            {isAuthenticated && user.perfil === 1 ? (
              <li className="nav-item dropdown">
                <Link
                  to=""
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Usuarios{" "}
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/register" className="dropdown-item text-dark">
                    Registrar Usuario
                  </Link>

                  <hr />

                  <Link to="/edit" className="dropdown-item text-dark">
                    Modificacion de Usuario
                  </Link>
                </div>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        <span className="badge badge-light text-uppercase mr-2">
          {user ? `Bienvenido  ${user.usuario}` : ""}
        </span>
        <Logout />
      </Fragment>
    );

    //Links para Visitantes
    const guestLinks = (
      <Fragment>
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarColor02"
        >
          <span className="badge badge-danger text-uppercase">
            Debes iniciar sesion
          </span>
        </div>
      </Fragment>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          Werchow{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Navbar);
