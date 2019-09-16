import React, { Component } from "react";
import toastr from "../../utils/toastr";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import GrupoSelect from "react-select";
import { grupos } from "../layouts/Arrays/arrays";

import { connect } from "react-redux";
import { mostrarTitular } from "../../actions/titularActions";
import {
  cambioGrupo,
  cambioCuota,
  registrarTitularViejo
} from "../../actions/fichasActions";
import { registrarHistoria } from "../../actions/historiaActions";

class CambioGrupo extends Component {
  state = {
    contrato: "",
    titular: [],
    GRUPO: "",
    CUOTA: ""
  };

  componentDidMount() {
    const contrato = this.props.match.params.id;

    if (contrato) {
      this.buscarTitularDirecto(contrato);
      document.getElementById("busqueda").hidden = true;
      document.getElementById("cambio").hidden = false;
    }
  }

  leerDatos = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (value, state) => {
    this.setState({ [state]: value.value });
  };

  buscarTitularDirecto = contrato => {
    if (contrato) {
      this.props.mostrarTitular(contrato);

      setTimeout(() => {
        const { titular } = this.props;

        this.setState({
          titular: titular
        });
      }, 150);
    }
  };

  buscarTitular = e => {
    e.preventDefault();

    const { contrato } = this.state;

    if (contrato === "") {
      toastr.warning("Debes ingresar un numero de socio", "ATENCION");
    } else {
      if (contrato) {
        this.props.mostrarTitular(contrato);

        setTimeout(() => {
          const { titular } = this.props;

          this.setState({
            titular: titular
          });

          if (titular) {
            document.getElementById("busqueda").hidden = true;
            document.getElementById("cambio").hidden = false;
          }
        }, 150);
      }
    }
  };

  historialGrupo = () => {
    let tmp = new Date(Date.now());
    let fecha = tmp.toISOString().split("T")[0];

    const { contrato, GRUPO, titular } = this.state;

    const { user } = this.props.auth;

    const historia = {
      CONTRATO: contrato,
      OPERADOR: user.usuario,
      ANTERIOR: `GRUPO ACTUAL: ${titular.GRUPO}`,
      NUEVO: `CAMBIO DE GRUPO A ${GRUPO}`,
      FECHA: fecha
    };

    this.props.registrarHistoria(historia);
  };

  changeGrupo = () => {
    const { GRUPO, contrato } = this.state;

    const cambioGrupo = {
        GRUPO,
        CONTRATO: contrato
    }

    confirmAlert({
      title: "Atencion",
      message: "¿Realmente desea realizar el cambio de titular?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            this.props.cambioGrupo(cambioGrupo);

            setTimeout(() => {
                this.historialGrupo()
            }, 100);

            
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
    const { titular } = this.state;
    return (
      <div>
        <div className="form-style-8 " id="busqueda">
          <h2>Cambio de Titular</h2>

          <form onSubmit={this.buscarTitular}>
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

        <div className="form-style-8 " id="cambio" hidden>
          <h2>Titular: </h2>

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
                    Cambiar Grupo
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
                    <u>Cambio de Grupo</u>
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
              <div className="modal-body col-md-12 d-fex justify-content-beteewn">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
                  <div className="form-group ">
                    <label className="badge badge-info">
                      {" "}
                      GRUPO ACTUAL: {titular.GRUPO}
                    </label>
                    <GrupoSelect
                      options={grupos}
                      placeholder={"Grupo"}
                      onChange={value => this.handleChange(value, "GRUPO")}
                    />
                  </div>
                </form>
                <div className="">
                  <Link
                    to={"#"}
                    className="btn btn-block btn-primary"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.changeGrupo()}
                  >
                    Cambiar Grupo
                  </Link>
                </div>
              </div>
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
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    mostrarTitular,
    cambioGrupo,
    cambioCuota,
    registrarTitularViejo,
    registrarHistoria
  }
)(CambioGrupo);
