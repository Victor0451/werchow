import React, { Component } from "react";
import toastr from "../../utils/toastr";

import { connect } from "react-redux";
import {
  mostrarTitular,
  mostrarTitularApellido,
  mostrarTitularDNI
} from "../../actions/titularActions";
import ListadoApellidoTit from "./ListadoApellidoTit";

class BuscarTitular extends Component {
  state = {
    contrato: "",
    apellido: "",
    dni: "",

    titular: [],
    titularesApe: []
  };

  leerDatos = e => {
    this.setState({ [e.target.name]: e.target.value });
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

          if (titular) {
            this.props.history.push(`/titulares/${titular.CONTRATO}`);
          }
          if (!titular) {
            toastr.warning(
              "El numero de socio ingresado no existe",
              "ATENCION"
            );
          }
        }, 80);
      }
    }
  };

  buscarApellido = e => {
    e.preventDefault();

    const { apellido } = this.state;

    if (apellido === "") {
      toastr.warning(
        "Debes ingresar un apellido para buscar a un socio",
        "ATENCION"
      );
    } else {
      if (apellido) {
        this.props.mostrarTitularApellido(apellido);

        setTimeout(() => {
          const { titular } = this.props;

          if (titular) {
            this.setState({
              titularesApe: titular
            });
          }
          if (!titular) {
            toastr.warning(
              "El numero de socio ingresado no existe",
              "ATENCION"
            );
          }
        }, 80);
      }
    }
  };

  buscarDNI = e => {
    e.preventDefault();

    const { dni } = this.state;

    if (dni === "") {
      toastr.warning("Debes ingresar el DNI del socio que buscas", "ATENCION");
    } else {
      if (dni) {
        this.props.mostrarTitularDNI(dni);

        setTimeout(() => {
          const { titular } = this.props;

          if (titular === "no existe dni") {
            toastr.warning(
              "El DNI ingresado no pertenece a un socio registrado",
              "ATENCION"
            );
          } else {
            this.props.history.push(`/titulares/${titular.CONTRATO}`);
          }
        }, 80);
      }
    }
  };

  render() {
    const { titularesApe } = this.state;
    return (
      <div className="form-style-8 ">
        <h2>Buscar Socio</h2>

        <form onSubmit={this.buscarTitular} className="border p-2">
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

        <hr className="mt-4" />

        <form className="mt-4 border p-2" onSubmit={this.buscarApellido}>
          <div className="row">
            <div className="col-md-6">
              <p className="has-dynamic-label">
                <input
                  type="text"
                  className=""
                  id="dynamic-label-input"
                  name="apellido"
                  onChange={this.leerDatos}
                  placeholder="Ingrese Apellido"
                />
                <label>Apellido</label>
              </p>
            </div>

            <div className="col-md-6">
              <button
                className="btn btn-primary  btn-block mt-4"
                data-toggle="modal"
                data-target=".bd-example-modal-xl"
              >
                Buscar
              </button>
            </div>
          </div>
        </form>

        {Object.entries(titularesApe).length === 0 ? (
          ""
        ) : titularesApe ? (
          <ListadoApellidoTit titulares={titularesApe} />
        ) : null}

        <hr className="mt-4" />

        <form className="mt-4 border p-2" onSubmit={this.buscarDNI}>
          <div className="row">
            <div className="col-md-6">
              <p className="has-dynamic-label">
                <input
                  type="text"
                  className=""
                  id="dynamic-label-input"
                  name="dni"
                  onChange={this.leerDatos}
                  placeholder="Ingrese DNI"
                />
                <label>DNI</label>
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
    );
  }
}

//state
const mapStateToProps = state => ({
  titular: state.titulares.titular
});

export default connect(
  mapStateToProps,
  { mostrarTitular, mostrarTitularApellido, mostrarTitularDNI }
)(BuscarTitular);
