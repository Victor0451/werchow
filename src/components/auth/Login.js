import React, { Component } from "react";

import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Login extends Component {
  state = {
    modal: false,
    usuario: "",
    contrasena: "",
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id.id === "LOGIN_FAIL") {
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

    const { usuario, contrasena } = this.state;

    const user = {
      usuario,
      contrasena
    };

    // Attempt to login
    this.props.login(user);

    setTimeout(() => {
      if (this.props.isAuthenticated === true) {
        window.location.replace("/");
      }
    }, 200);
  };

  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card mt-4">
            {this.state.msg ? (
              <div className="alert alert-danger">{this.state.msg}</div>
            ) : null}
            <div className="card-header">
              <h3>Iniciar Sesion</h3>
              <div className="d-flex justify-content-end social_icon"></div>
            </div>
            <div className="card-body mt-4">
              <form onSubmit={this.onSubmit}>
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
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Recuerdame
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Si no tienes una cuenta, comunicate con el administrador
              </div>
              <div className="d-flex justify-content-center"></div>
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
  { login, clearErrors }
)(Login);
