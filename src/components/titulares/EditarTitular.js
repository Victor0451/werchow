import React, { Component } from "react";
import FormEditarTitular from "./FormEditarTitular";

//redux
import { connect } from "react-redux";
import { mostrarTitular, editarTitular } from "../../actions/titularActions";
import { registrarHistoria } from "../../actions/historiaActions";

class EditarTitular extends Component {
  altaRef = React.createRef();
  apellidosRef = React.createRef();
  movilRef = React.createRef();
  contratoRef = React.createRef();
  nacimientoRef = React.createRef();
  nombresRef = React.createRef();
  nro_docRef = React.createRef();
  sexoRef = React.createRef();
  telefonoRef = React.createRef();
  vigenciaRef = React.createRef();
  calleRef = React.createRef();
  nro_calleRef = React.createRef();
  domi_cobrRef = React.createRef();
  dom_labRef = React.createRef();
  barrioRef = React.createRef();

  state = {
    LOCALIDAD: "",
    GRUPO: "",
    ZONA: "",
    OBRA_SOC: "",
    PLAN: "",
    PRODUCTOR: "",
    SUCURSAL: "",
    error: false,

    titular: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.mostrarTitular(id);
  }

  componentWillReceiveProps(nextProps) {
    const { titular } = nextProps;

    this.setState({
      titular: titular
    });
  }

  handleChange = (value, state) => {
    this.setState({ [state]: value.value });
  };

  modificarTit = e => {
    e.preventDefault();

    const { titular } = this.props;

    if (this.state.LOCALIDAD === "") {
      this.setState({
        LOCALIDAD: titular.LOCALIDAD
      });
    }
    if (this.state.ZONA === "") {
      this.setState({
        ZONA: titular.ZONA
      });
    }
    if (this.state.OBRA_SOC === "") {
      this.setState({
        OBRA_SOC: titular.OBRA_SOC
      });
    }
    if (this.state.PLAN === "") {
      this.setState({
        PLAN: titular.PLAN
      });
    }
    if (this.state.PRODUCTOR === "") {
      this.setState({
        PRODUCTOR: titular.PRODUCTOR
      });
    }
    if (this.state.SUCURSAL === "") {
      this.setState({
        SUCURSAL: titular.SUCURSAL
      });
    }
    if (this.state.GRUPO === "") {
      this.setState({
        GRUPO: titular.GRUPO
      });
    }

    setTimeout(() => {
      const {
        LOCALIDAD,
        GRUPO,
        ZONA,
        OBRA_SOC,
        PLAN,
        PRODUCTOR,
        SUCURSAL
      } = this.state;

      const titularModf = {
        ALTA: this.altaRef.current.value,
        APELLIDOS: this.apellidosRef.current.value,
        MOVIL: this.movilRef.current.value,
        CONTRATO: this.contratoRef.current.value,
        NACIMIENTO: this.nacimientoRef.current.value,
        NOMBRES: this.nombresRef.current.value,
        NRO_DOC: this.nro_docRef.current.value,
        SEXO: this.sexoRef.current.value,
        TELEFONO: this.telefonoRef.current.value,
        VIGENCIA: this.vigenciaRef.current.value,
        CALLE: this.calleRef.current.value,
        NRO_CALLE: this.nro_calleRef.current.value,
        DOMI_COBR: this.domi_cobrRef.current.value,
        DOM_LAB: this.dom_labRef.current.value,
        BARRIO: this.barrioRef.current.value,
        LOCALIDAD,
        GRUPO,
        ZONA,
        OBRA_SOC,
        PLAN,
        PRODUCTOR,
        SUCURSAL
      };

      this.props.editarTitular(titularModf);

      this.historial();
    }, 100);
  };

  historial = e => {
    let tmp = new Date(Date.now());
    let fecha = tmp.toISOString().split("T")[0];

    const { user } = this.props.auth;
    const { titular } = this.state;

    const historia = {
      CONTRATO: this.contratoRef.current.value,
      OPERADOR: user.usuario,
      ANTERIOR: "----------",
      NUEVO: `TITULAR ${titular.APELLIDOS}, ${titular.NOMBRES} EDITADO POR: ${user.usuario}`,
      FECHA: fecha
    };

    this.props.registrarHistoria(historia);
  };

  render() {
    const { titular } = this.state;
    return (
      <div>
        <FormEditarTitular
          titular={titular}
          altaRef={this.altaRef}
          apellidosRef={this.apellidosRef}
          movilRef={this.movilRef}
          productorRef={this.productorRef}
          contratoRef={this.contratoRef}
          nacimientoRef={this.nacimientoRef}
          nombresRef={this.nombresRef}
          nro_docRef={this.nro_docRef}
          sexoRef={this.sexoRef}
          telefonoRef={this.telefonoRef}
          vigenciaRef={this.vigenciaRef}
          calleRef={this.calleRef}
          nro_calleRef={this.nro_calleRef}
          domi_cobrRef={this.domi_cobrRef}
          dom_labRef={this.dom_labRef}
          barrioRef={this.barrioRef}
          modificarTit={this.modificarTit}
          handleChange={this.handleChange}
        />
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
  { mostrarTitular, editarTitular, registrarHistoria }
)(EditarTitular);
