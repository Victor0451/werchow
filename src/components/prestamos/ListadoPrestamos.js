import React, { Component } from "react";

import { connect } from "react-redux";
import { mostrarPrestamos } from "../../actions/prestamosActions";

class ListadoPrestamos extends Component {
  state = {
    prestamos: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.mostrarPrestamos(id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { prestamos } = nextProps;

    this.setState({
      prestamos: prestamos
    });
  }

  render() {
    const { prestamos } = this.state;

    if (Object.entries(prestamos).length === 0)
      return (
        <h1 className="text-center d-flex justify-content-center">
          <i className="fas fa-money-check-edit-alt">
            {" "}
            No Posee Prestamos Registrados
          </i>
        </h1>
      );

    return (
      <div className="container">
        <h1 className="mt-4 mb-4">
          <i className="fas fa-money-check-alt"> Prestamos </i>
        </h1>

        <table className="table table-hover">
          <thead className="alert alert-dark">
            <tr>
              <th scope="col">Fecha de Solicitud</th>
              <th scope="col">Capital</th>
              <th scope="col">Cuotas</th>
              <th scope="col">Valor de las cuotas</th>
              <th scope="col">Estado</th>
              <th scope="col">Operador</th>
            </tr>
          </thead>

          <tbody className="">
            {prestamos.map((prestamo, index) => (
              <tr key={index}>
                <td>{prestamo.ptm_fechasol}</td>
                <td>{prestamo.ptm_prestamo}</td>
                <td>{prestamo.ptm_cuotas}</td>
                <td>{prestamo.ptm_valcuota}</td>
                <td>{prestamo.ptm_estado}</td>
                <td>{prestamo.ptm_op}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

//state
const mapStateToProps = state => ({
  prestamos: state.prestamos.prestamos
});

export default connect(
  mapStateToProps,
  { mostrarPrestamos }
)(ListadoPrestamos);
