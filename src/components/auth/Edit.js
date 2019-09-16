import React, { Component } from "react";

import { connect } from "react-redux";
import { mostrarOperador, edit } from "../../actions/authActions";

class Register extends Component {
  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  contrasenaRef = React.createRef();
  perfilRef = React.createRef();
  estadoRef = React.createRef();
  codigoRef = React.createRef();
  findUserRef = React.createRef();

  state = {
    nombre: "",
    apellido: "",
    codigo: "",
    perfil: "",
    contrasena: "",
    finduser: ""
  };

  findUser = e => {
    e.preventDefault();
    const finduser = this.findUserRef.current.value;
    this.props.mostrarOperador(finduser);

    setTimeout(() => {
      const {
        usuario,
        nombre,
        apellido,
        contrasena,
        perfil,
        codigo,
        estado,
        id
      } = this.props.operador;

      this.setState({
        usuario: usuario,
        nombre: nombre,
        apellido: apellido,
        contrasena: contrasena,
        perfil: perfil,
        codigo: codigo,
        estado: estado,
        id: id
      });

      document.getElementById("finduser").hidden = true;
      document.getElementById("edituser").hidden = false;
    }, 300);
  };

  onSubmit = e => {
    e.preventDefault();

    const operadorEdit = {
      id: this.state.id,
      usuario: this.state.usuario,
      contrasena: this.contrasenaRef.current.value,
      apellido: this.apellidoRef.current.value,
      nombre: this.nombreRef.current.value,
      perfil: this.perfilRef.current.value,
      codigo: this.codigoRef.current.value,
      estado: this.estadoRef.current.value
    };

    this.props.edit(operadorEdit);
  };

  render() {
    const {
      usuario,
      contrasena,
      apellido,
      nombre,
      perfil,
      codigo,
      estado
    } = this.state;
    return (
      <div>
        <div className="container">
          <div className="form-style-8" id="finduser">
            <h2>Ingresa el nombre de usuario</h2>

            <form className="row" onSubmit={this.findUser}>
              <div className="form-group col-md-6">
                <p className="has-dynamic-label">
                  <input
                    type="text"
                    className=""
                    ref={this.findUserRef}
                    id="in-range-input"
                    name="finduser"
                    placeholder="Usuario"
                  />
                  <label>Usuario</label>
                </p>
              </div>
              <div className="col-md-6 mt-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Verificar
                </button>
              </div>
            </form>
          </div>

          <div className="d-flex justify-content-center h-100">
            <div className="card mt-4 col-md-12" id="edituser" hidden>
              {this.state.msg ? (
                <div className="alert alert-danger">{this.state.msg}</div>
              ) : null}
              <div className="card-header">
                <h3>Modificar Cuenta</h3>
                <div className="d-flex justify-content-end social_icon"></div>
              </div>
              <div className="card-body mt-4">
                <form onSubmit={this.onSubmit}>
                  <div className="row ">
                    <div className="col-md-6">
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="nombre"
                          placeholder="Nombre"
                          defaultValue={nombre}
                          ref={this.nombreRef}
                        />
                      </div>

                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="apellido"
                          placeholder="Apellido"
                          defaultValue={apellido}
                          ref={this.apellidoRef}
                        />
                      </div>

                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <select
                          className="form-control"
                          name="perfil"
                          ref={this.perfilRef}
                        >
                          <option value={perfil}>{perfil}</option>
                          <option value="1">Admin</option>
                          <option value="2">Ventas</option>
                        </select>
                      </div>

                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="codigo"
                          placeholder="Codigo"
                          defaultValue={codigo}
                          ref={this.codigoRef}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="usuario"
                          placeholder="Usuario"
                          value={usuario}
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          name="contrasena"
                          placeholder="Contraseña"
                          defaultValue={contrasena}
                          ref={this.contrasenaRef}
                        />
                      </div>

                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <select
                          className="form-control"
                          name="estado"
                          ref={this.estadoRef}
                        >
                          <option value={estado}>{estado}</option>
                          <option value="1">Activo</option>
                          <option value="0">Baja</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row form-group  ">
                    <div className=" col-md-12">
                      <input
                        type="submit"
                        value="Registrar"
                        className="btn btn-primary btn-block login_btn"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  operador: state.operadores.operador
});

export default connect(
  mapStateToProps,
  { mostrarOperador, edit }
)(Register);
