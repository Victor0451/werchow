import React, { Component } from "react";
import FormNuevoAdherente from "./FormNuevoAdherente";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

//redux
import { connect } from "react-redux";
import { agregarAdherente } from "../../actions/adherenteActions";
import { mostrarTitular } from "../../actions/titularActions";
import { registrarHistoria } from "../../actions/historiaActions";

class NuevoAdherente extends Component {
  AltaRef = React.createRef();
  VigenciaRef = React.createRef();
  Nro_DocRef = React.createRef();

  state = {
    CONTRATO: "",
    APELLIDOS: "",
    NACIMIENTO: "",
    NOMBRES: "",
    NRO_DOC: "",
    SEXO: "",
    PARENT: "",
    PLAN: "",
    SUB_PLAN: "",
    OBRA_SOC: "",
    PRODUCTOR: "",
    SUCURSAL: "",
    TSEG: "",
    MOD_5: "",
    ESTADO: true,
    error: false,
    id: ""
  };

  leerDatos = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (value, state) => {
    this.setState({ [state]: value.value });
  };

  historial = () => {
    let tmp = new Date(Date.now());
    let fecha = tmp.toISOString().split("T")[0];
    const { id } = this.props.match.params;

    const { user } = this.props.auth;

    const historia = {
      CONTRATO: id,
      OPERADOR: user.usuario,
      ANTERIOR: "----------",
      NUEVO: `ALTA ADHERENTE: ${this.state.APELLIDOS}, ${this.state.NOMBRES}`,
      FECHA: fecha
    };

    this.props.registrarHistoria(historia);
  };

  nuevoAdh = e => {
    e.preventDefault();

    const {
      APELLIDOS,
      NACIMIENTO,
      NOMBRES,
      SEXO,
      PARENT,
      PLAN,
      SUB_PLAN,
      OBRA_SOC,
      PRODUCTOR,
      SUCURSAL,
      CONTRATO,
      TSEG,
      MOD_5
    } = this.state;

    const { id } = this.props.match.params;

    const adherente = {
      SUCURSAL,
      PLAN,
      SUB_PLAN,
      OBRA_SOC,
      CONTRATO,
      APELLIDOS,
      PRODUCTOR,
      PARENT,
      NACIMIENTO,
      ALTA: this.AltaRef.current.value,
      VIGENCIA: this.VigenciaRef.current.value,
      NOMBRES,
      NRO_DOC: this.Nro_DocRef.current.value,
      SEXO,
      TSEG,
      MOD_5,
      ESTADO: true
    };

    if (
      APELLIDOS === "" ||
      NOMBRES === "" ||
      NACIMIENTO === "" ||
      PLAN === "" ||
      PARENT === ""
    ) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false });

    if (TSEG !== "") {
      adherente.MOD_5 = this.AltaRef.current.value;
    }

    this.props.agregarAdherente(adherente);

    confirmAlert({
      title: "Atencion",
      message: "¿Desea Ingresar Adherentes?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            this.props.history.push(`/verificaciones/${"adh"}`);
          }
        },

        {
          label: "No",
          onClick: () => {
            this.props.history.push(`/titulares/${id}`);
          }
        }
      ]
    });
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <FormNuevoAdherente
          id={id}
          leerDatos={this.leerDatos}
          nuevoAdh={this.nuevoAdh}
          error={this.state.error}
          AltaRef={this.AltaRef}
          VigenciaRef={this.VigenciaRef}
          handleChange={this.handleChange}
          Nro_DocRef={this.Nro_DocRef}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  adherente: state.adherente,
  titular: state.titulares.titular,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { agregarAdherente, mostrarTitular, registrarHistoria }
)(NuevoAdherente);
