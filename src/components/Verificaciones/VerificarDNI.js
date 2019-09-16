import React, { Component } from "react";
import toastr from "../../utils/toastr";

//redux
import { connect } from "react-redux";
import {
  verificarDNITit,
  verificarDNIAdh
} from "../../actions/verificacionesActions";

class VerificarDNI extends Component {
  state = {
    dni: "",
    CONTRATO: "",
    NRO_DOC: "",
    tit: false,
    adh: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id === "tit") {
      this.setState({ tit: true });
    } else {
      if (id === "adh") {
        this.setState({ adh: true });
      }
    }
  }

  leerDatos = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkDNI = e => {
    e.preventDefault();

    const { dni } = this.state;

    if (dni === "") {
      toastr.warning("Debes ingresar un DNI", "ATENCION");
    } else {
      if (Object.keys(dni).length < 7) {
        toastr.warning("El DNI debe tener como minimo 7 digitos", "ATENCION");
      } else {
        this.props.verificarDNITit(dni);
        this.props.verificarDNIAdh(dni);

        setTimeout(() => {
          const { titular, adherent } = this.props;
          console.log(titular);
          const { dni } = this.state;

          if (titular && this.state.tit === true) {
            if (titular.ESTADO === 0) {
              toastr.error(
                "El DNI ingresado pertenece a un socio registrado dado de baja",
                "ATENCION"
              );
              this.props.history.push(`/titulares/${titular.CONTRATO}`);
            }
            if (titular.ESTADO === 1) {
              toastr.warning(
                "El DNI ingresado pertenece a un socio registrado",
                "ATENCION"
              );
              this.props.history.push(`/titulares/${titular.CONTRATO}`);
            }
            if (titular === "no existe dni") {
              if (adherent === "no existe dni") {
                toastr.success(
                  "El DNI ingresado no pertenece a ningun socio registrado",
                  "ATENCION"
                );
                this.props.history.push(
                  `/titular/nuevo/${dni}`,
                  adherent.CONTRATO
                );
              } else {
                toastr.warning(
                  `El DNI ingresado pertenece al adherente ${adherent.APELLIDOS}, ${adherent.NOMBRES} de la ficha N° ${adherent.CONTRATO}`,
                  "ATENCION"
                );
              }
            }
          }
          if (adherent && this.state.adh === true) {
            if (adherent.ESTADO === 0) {
              toastr.error(
                "El DNI ingresado pertenece a un adherente dado de baja",
                "ATENCION"
              );
              this.props.history.push(`/titulares/${adherent.CONTRATO}`);
            }
            if (adherent.ESTADO === 1) {
              toastr.warning(
                "El DNI ingresado pertenece a un adherente registrado",
                "ATENCION"
              );
              this.props.history.push(`/titulares/${adherent.CONTRATO}`);
            }
            if (adherent === "no existe dni") {
              if (titular === "no existe dni") {
                toastr.success(
                  "El DNI ingresado no pertenece a ningun socio registrado",
                  "ATENCION"
                );
                this.props.history.push(`/adherentes/nuevo/${dni}`);
              } else {
                toastr.warning(
                  `El DNI ingresado pertenece al titular ${titular.APELLIDOS}, ${titular.NOMBRES} de la ficha N° ${titular.CONTRATO}`,
                  "ATENCION"
                );
              }
            }
          }
        }, 150);
      }
    }
  };

  render() {
    return (
      <div className="form-style-8">
        <h2>Ingresa el DNI para vefiricar si existe en el sistema</h2>

        <form className="row" onSubmit={this.checkDNI}>
          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="number"
                className=""
                onChange={this.leerDatos}
                id="in-range-input"
                name="dni"
                minLength="8"
                placeholder="DNI"
              />
              <label>DNI</label>
            </p>
          </div>
          <div className="col-md-6 mt-4">
            <button type="submit" className="btn btn-primary btn-block">
              Verificar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  titular: state.verificaciones.titular,
  adherent: state.verificaciones.adherent
});

export default connect(
  mapStateToProps,
  { verificarDNITit, verificarDNIAdh }
)(VerificarDNI);
