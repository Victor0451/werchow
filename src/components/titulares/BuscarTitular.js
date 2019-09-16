import React, { Component } from "react";
import toastr from "../../utils/toastr";

import { connect } from "react-redux";
import { mostrarTitular } from "../../actions/titularActions";

class BuscarTitular extends Component {
  state = {
    contrato: "",

    titular: []
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
          }if (!titular) {
            toastr.warning("El numero de socio ingresado no existe", "ATENCION");
          }
        }, 80);
      }
      
    }
  };

  render() {
    return (
      <div className="form-style-8 ">
        <h2>Buscar Socio</h2>

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
    );
  }
}

//state
const mapStateToProps = state => ({
  titular: state.titulares.titular
});

export default connect(
  mapStateToProps,
  { mostrarTitular }
)(BuscarTitular);
