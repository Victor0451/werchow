import React, { Component } from "react";
import FormEditarAdherente from "./FormEditarAdherente";

//redux
import { connect } from "react-redux";
import {
  mostrarAdhByDNI,
  editarAdherente
} from "../../actions/adherenteActions";
import { registrarHistoria } from "../../actions/historiaActions";

class EditarAdherente extends Component {
  altaRef = React.createRef();
  apellidosRef = React.createRef();
  contratoRef = React.createRef();
  nacimientoRef = React.createRef();
  nombresRef = React.createRef();
  nro_docRef = React.createRef();
  sexoRef = React.createRef();
  telefonoRef = React.createRef();
  vigenciaRef = React.createRef();

  state = {
    OBRA_SOC: "",
    PLAN: "",
    TSEG: "",
    MOD_5: "",

    error: false,

    adherente: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.mostrarAdhByDNI(id);
  }

  componentWillReceiveProps(nextProps) {
    const { adherente } = nextProps;

    this.setState({
      adherente: adherente
    });
  }

  handleChange = (value, state) => {
    this.setState({ [state]: value.value });
  };

  modfAdh = e => {
    e.preventDefault();

    const { adherente } = this.state;

    if (this.state.OBRA_SOC === "") {
      this.setState({
        OBRA_SOC: adherente.OBRA_SOC
      });
    }
    if (this.state.PLAN === "") {
      this.setState({
        PLAN: adherente.PLAN
      });
    }
    if (this.state.TSEG === "") {
      this.setState({
        TSEG: adherente.TSEG
      });
    } else {
      let tmp = new Date(Date.now());
      let fecha = tmp.toISOString().split("T")[0];
      this.setState({
        MOD_5: fecha
      });
    }

    setTimeout(() => {
      const { OBRA_SOC, PLAN, TSEG, MOD_5 } = this.state;

      const adhEdit = {
        OBRA_SOC,
        PLAN,
        TSEG,
        MOD_5,
        NOMBRES: this.nombresRef.current.value,
        APELLIDOS: this.apellidosRef.current.value,
        CONTRATO: this.contratoRef.current.value,
        NACIMIENTO: this.nacimientoRef.current.value,
        ALTA: this.altaRef.current.value,
        VIGENCIA: this.vigenciaRef.current.value,
        NRO_DOC: this.nro_docRef.current.value
      };

      this.props.editarAdherente(adhEdit);
    }, 100);
  };

  historial = e => {
    let tmp = new Date(Date.now());
    let fecha = tmp.toISOString().split("T")[0];

    const { user } = this.props.auth;
    const { adherente } = this.state;
    const historia = {
      CONTRATO: this.contratoRef.current.value,
      OPERADOR: user.usuario,
      ANTERIOR: "----------",
      NUEVO: `ADHERENTE ${adherente.APELLIDOS}, ${adherente.NOMBRES} EDITADO POR: ${user.usuario}`,
      FECHA: fecha
    };

    this.props.registrarHistoria(historia);
  };

  render() {
    const { adherente } = this.state;

    return (
      <div>
        <FormEditarAdherente
          adherente={adherente}
          error={this.state.error}
          altaRef={this.altaRef}
          apellidosRef={this.apellidosRef}
          contratoRef={this.contratoRef}
          nacimientoRef={this.nacimientoRef}
          nombresRef={this.nombresRef}
          nro_docRef={this.nro_docRef}
          sexoRef={this.sexoRef}
          vigenciaRef={this.vigenciaRef}
          handleChange={this.handleChange}
          modfAdh={this.modfAdh}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  adherente: state.adherentes.adherente,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { mostrarAdhByDNI, editarAdherente, registrarHistoria }
)(EditarAdherente);
