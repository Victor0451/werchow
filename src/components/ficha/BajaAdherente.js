import React, { Component } from "react";
import toastr from "../../utils/toastr";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { connect } from "react-redux";
import { mostrarTitular } from "../../actions/titularActions";
import {
  mostrarAdherentesDelTitular,
  bajaAdherente
} from "../../actions/adherenteActions";
import { registrarHistoria } from "../../actions/historiaActions";

class BajaAdherente extends Component {
  state = {
    contrato: "",
    titular: [],
    adherentes: []
  };

  componentDidMount() {
    const contrato = this.props.match.params.id;

    if (contrato) {
      this.buscarAdherentesDirecto(contrato);
      document.getElementById("busqueda").hidden = true;
      document.getElementById("baja").hidden = false;
    }
  }

  leerDatos = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buscarAdherentesDirecto = contrato => {
    if (contrato) {
      this.props.mostrarAdherentesDelTitular(contrato);
      this.props.mostrarTitular(contrato);

      setTimeout(() => {
        const { titular, adherentes } = this.props;

        this.setState({
          titular: titular,
          adherentes: adherentes
        });
      }, 150);
    }
  };

  buscarAdherentes = e => {
    e.preventDefault();

    const { contrato } = this.state;

    if (contrato === "") {
      toastr.warning("Debes ingresar un numero de socio", "ATENCION");
    } else {
      if (contrato) {
        this.props.mostrarAdherentesDelTitular(contrato);
        this.props.mostrarTitular(contrato);

        setTimeout(() => {
          const { titular, adherentes } = this.props;

          this.setState({
            titular: titular,
            adherentes: adherentes
          });

          if (adherentes) {
            document.getElementById("busqueda").hidden = true;
            document.getElementById("baja").hidden = false;
          }
        }, 150);
      }
    }
  };

  historial = index => {
    let tmp = new Date(Date.now());
    let fecha = tmp.toISOString().split("T")[0];

    const { adherentes, contrato } = this.state;

    const { user } = this.props.auth;

    const historia = {
      CONTRATO: contrato,
      OPERADOR: user.usuario,
      ANTERIOR: "ADHERENTE ACTIVO",
      NUEVO: `BAJA ADHERENTE: ${adherentes[index].APELLIDOS}, ${adherentes[index].NOMBRES}`,
      FECHA: fecha
    };

    this.props.registrarHistoria(historia);
  };

  bajaAdhSocio = index => {
    const { adherentes } = this.state;
    const id = adherentes[index].NRO_DOC;

    confirmAlert({
      title: "Atencion",
      message: "¿Realmente desea dar de baja a este adherente?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            this.props.bajaAdherente(id);
            this.historial(index);
          }
        },

        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  render() {
    const { titular, adherentes } = this.state;

    return (
      <div>
        <div className="form-style-8 " id="busqueda">
          <h2>Baja de Adherentes</h2>

          <form onSubmit={this.buscarAdherentes}>
            <div className="row">
              <div className="col-md-6">
                <p className="has-dynamic-label">
                  <input
                    type="text"
                    className=""
                    id="dynamic-label-input"
                    name="contrato"
                    onChange={this.leerDatos}
                    placeholder="Ingresar N° de Socio"
                  />
                  <label>N° de Socio</label>
                </p>
              </div>

              <div className="col-md-6">
                <button className="btn btn-primary  btn-block mt-4">
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="form-style-8 " id="baja" hidden>
          {Object.entries(adherentes).length === 0 ? (
            <h1 className="text-center d-flex justify-content-center alert alert-warning border">
              <i className="fas fa-users">
                {" "}
                El N° de socio ingresaro no existe o no posee adherentes
                registrados
              </i>
            </h1>
          ) : (
            <div>
              <div className="jumbotron">
                {titular.ESTADO === 1 ? (
                  <div className="row mt-4 alert alert-success justify-content-center">
                    <h5 className="text-center">
                      <strong>FICHA ACTIVA</strong>{" "}
                    </h5>
                  </div>
                ) : titular.ESTADO === 0 ? (
                  <div className="row mt-4 alert alert-danger justify-content-center">
                    <h5 className="text-center">
                      <strong>FICHA EN BAJA</strong>{" "}
                    </h5>
                  </div>
                ) : (
                  <div className="row mt-4 alert alert-warning justify-content-center">
                    <h5 className="text-center">
                      <strong>ERROR</strong>{" "}
                    </h5>
                  </div>
                )}

                <div className="row">
                  <div className="col-md-12">
                    <h1 className="display-3">
                      {" "}
                      {titular.APELLIDOS} {titular.NOMBRES}{" "}
                    </h1>
                  </div>
                </div>

                <div className="row mt-4 alert alert-secondary">
                  <div className="col-md-4">
                    <h3>Contrato: {titular.CONTRATO}</h3>
                  </div>

                  <div className="col-md-4">
                    <h3>
                      {" "}
                      GRUPO:{""} {titular.GRUPO}
                    </h3>
                  </div>

                  <div className="col-md-4">
                    <h3>Sucursal: {titular.SUCURSAL}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          <hr className="my-4" />

          {titular.ESTADO === 1 ? (
            <div className="jumbotron mt-4">
              <div className="mt-4 p-4 border">
                <h3 className="text-center mb-4 font-weight-bold">Opciones</h3>

                <div
                  className="btn-group col-md-12 d-flex justify-content-center"
                  role="group"
                  aria-label="Button group with nested dropdown"
                >
                  <Link
                    to={"#"}
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target=".bd-example-modal-xl"
                  >
                    Ver Adherentes
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="alert alert-primary text-center">
                {" "}
                <strong>
                  {" "}
                  Esta Ficha esta en baja, no se pueden aplicar opciones{" "}
                </strong>
              </div>
            </div>
          )}
        </div>

        <div
          className="modal fade bd-example-modal-xl"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myExtraLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content p-2 ">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">
                  <strong>
                    <u>Adherentes</u>
                  </strong>
                </h3>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <table className="table table-hover">
                <thead className="alert alert-dark">
                  <tr>
                    <th scope="col">Contrato</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">DNI</th>
                    <th scope="col">ESTADO</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody className="">
                  {adherentes.map((adherente, index) => (
                    <tr key={index}>
                      <td>{adherente.CONTRATO}</td>
                      <td>{adherente.APELLIDOS}</td>
                      <td>{adherente.NOMBRES}</td>
                      <td>{adherente.NRO_DOC}</td>

                      {adherente.ESTADO === 1 ? (
                        <td>ACTIVO</td>
                      ) : adherente.ESTADO === 0 ? (
                        <td>BAJA</td>
                      ) : (
                        ""
                      )}

                      {adherente.ESTADO === 1 ? (
                        <td>
                          <Link
                            to={"#"}
                            className="btn btn-danger btn-block"
                            onClick={() => this.bajaAdhSocio(index)}
                          >
                            Dar de Baja
                          </Link>
                        </td>
                      ) : adherente.ESTADO === 0 ? (
                        <td></td>
                      ) : (
                        ""
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//state
const mapStateToProps = state => ({
  titular: state.titulares.titular,
  adherentes: state.adherentes.adherentes,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    mostrarAdherentesDelTitular,
    mostrarTitular,
    bajaAdherente,
    registrarHistoria
  }
)(BajaAdherente);
