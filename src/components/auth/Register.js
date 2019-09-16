import React, { Component } from "react";

import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Register extends Component {
  state = {
    nombre: "",
    apellido: "",
    estado: "",
    perfil: "",
    usuario: "",
    contrasena: "",
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      usuario,
      contrasena,
      apellido,
      nombre,
      perfil,
      estado
    } = this.state;

    // Create user object
    const newOperador = {
      usuario,
      contrasena,
      apellido,
      nombre,
      perfil,
      estado
    };

    // Attempt to register
    this.props.register(newOperador);
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="d-flex justify-content-center h-100">
            <div className="card mt-4 col-md-12">
              {this.state.msg ? (
                <div className="alert alert-danger">{this.state.msg}</div>
              ) : null}
              <div className="card-header">
                <h3>Registrarse</h3>
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
                          onChange={this.onChange}
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
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <select
                          onChange={this.onChange}
                          defaultValue={"Default"}
                          className="form-control"
                          name="perfil"
                        >
                          <option value="Default">Perfil</option>
                          <option value="1">Admin</option>
                          <option value="2">Ventas</option>
                        </select>
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
                          onChange={this.onChange}
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
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <select
                          onChange={this.onChange}
                          defaultValue={"Default"}
                          className="form-control"
                          name="estado"
                        >
                          <option value="Default">Estado</option>
                          <option value="1">Activo</option>
                          <option value="0">Baja</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row form-group mt-4 ">
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register);
