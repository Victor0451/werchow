import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import FormNuevoTitular from "./FormNuevoTitular";

//redux
import { connect } from "react-redux";
import { agregarTitular, ultimoContrato } from "../../actions/titularActions";
import { registrarHistoria } from "../../actions/historiaActions";

class NuevoTitular extends Component {
  ContratoRef = React.createRef();
  AltaRef = React.createRef();
  VigenciaRef = React.createRef();
  nro_docRef = React.createRef();

  state = {
    ALTA: "",
    APELLIDOS: "",
    MOVIL: "",
    OPERADOR: "",
    PRODUCTOR: "",
    CONTRATO: "",
    CUOTA: "",
    GRUPO: "",
    ZONA: "",
    NACIMIENTO: "",
    NOMBRES: "",
    NRO_DOC: "",
    OBRA_SOC: "",
    PLAN: "",
    RECIBO: "",
    SEXO: "",
    SUCURSAL: "",
    TELEFONO: "",
    VIGENCIA: "",
    CALLE: "",
    NRO_CALLE: "",
    DOMI_COBR: "",
    DOM_LAB: "",
    BARRIO: "",
    LOCALIDAD: "",
    EMPRESA: "W",
    MOD_5: "",
    TSEG: "",
    error: false,

    newContrato: ""
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

    const { user } = this.props.auth;

    const historia = {
      CONTRATO: this.ContratoRef.current.value,
      OPERADOR: user.usuario,
      ANTERIOR: "----------",
      NUEVO: `ALTA FICHA: ${this.state.APELLIDOS}, ${this.state.NOMBRES}`,
      FECHA: fecha
    };

    this.props.registrarHistoria(historia);
  };

  nuevoTitular = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const {
      SUCURSAL,
      PLAN,
      SUB_PLAN,
      GRUPO,
      ZONA,
      OBRA_SOC,
      PRODUCTOR,
      LOCALIDAD,
      APELLIDOS,
      MOVIL,
      CUOTA,
      NACIMIENTO,
      NOMBRES,
      RECIBO,
      SEXO,
      TELEFONO,
      CALLE,
      NRO_CALLE,
      DOMI_COBR,
      DOM_LAB,
      BARRIO,
      EMPRESA,
      MOD_5,
      TSEG
    } = this.state;

    const titular = {
      SUCURSAL,
      PLAN,
      SUB_PLAN,
      GRUPO,
      ZONA,
      OBRA_SOC,
      CONTRATO: this.ContratoRef.current.value,
      APELLIDOS,
      MOVIL,
      OPERADOR: user.usuario,
      PRODUCTOR,
      CUOTA,
      NACIMIENTO,
      ALTA: this.AltaRef.current.value,
      VIGENCIA: this.VigenciaRef.current.value,
      NOMBRES,
      NRO_DOC: this.nro_docRef.current.value,
      RECIBO,
      TSEG,
      MOD_5,
      SEXO,
      TELEFONO,
      CALLE,
      NRO_CALLE,
      DOMI_COBR,
      DOM_LAB,
      BARRIO,
      LOCALIDAD,
      EMPRESA,
      ESTADO: true
    };

    if (
      APELLIDOS === "" ||
      NOMBRES === "" ||
      TELEFONO === "" ||
      GRUPO === "" ||
      OBRA_SOC === "" ||
      ZONA === "" ||
      PLAN === "" ||
      PRODUCTOR === "" ||
      SUCURSAL === ""
    ) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false });

    if (TSEG !== "") {
      titular.MOD_5 = this.AltaRef.current.value;
    }

    console.log(titular);
    //this.props.agregarTitular(titular);

    confirmAlert({
      title: "Atencion",
      message: "¿Desea Ingresar Adherentes?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            this.historial();

            this.props.history.push(`/adherentes/nuevo/${titular.CONTRATO}`);
          }
        },

        {
          label: "No",
          onClick: () => {
            this.props.history.push(`/titulares/${titular.CONTRATO}`);
          }
        }
      ]
    });
  };

  componentDidMount() {
    this.props.ultimoContrato();
  }

  componentWillReceiveProps(nextProps) {
    const { titulares } = nextProps;

    const lastContrato = titulares.lastcontrato.CONTRATO;

    const newContrato = lastContrato + 1;

    this.setState({
      newContrato: newContrato
    });
  }

  render() {
    const dni = this.props.match.params.id;

    return (
      <div>
        <FormNuevoTitular
          handleChange={this.handleChange}
          leerDatos={this.leerDatos}
          nuevoTitular={this.nuevoTitular}
          error={this.state.error}
          newContrato={this.state.newContrato}
          ContratoRef={this.ContratoRef}
          AltaRef={this.AltaRef}
          VigenciaRef={this.VigenciaRef}
          nro_docRef={this.nro_docRef}
          dni={dni}
          historial={this.historial}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  titulares: state.titulares,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { agregarTitular, ultimoContrato, registrarHistoria }
)(NuevoTitular);
