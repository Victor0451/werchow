import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

import PropsTypes from "prop-types";

class Logout extends Component {
  static propsTypes = {
    logout: PropsTypes.func.isRequired
  };

  logOuts = () => {
    this.props.logout();
    window.location.replace("/");
  };

  render() {
    return (
      <Fragment>
        <Link className="nav-item text-white" onClick={this.logOuts} to="/">
          Cerrar Sesion
        </Link>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
