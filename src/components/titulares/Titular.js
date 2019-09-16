import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdherentesDelTit from "./AdherentesDelTit";
import Spinner from "../layouts/Spinner";
import Memo from "../memo/memo";
import InfoTitular from "./InfoTitular";
import AllPagos from "../pagos/AllPagos";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

//redux
import { connect } from "react-redux";
import { mostrarTitular, bajaTitular } from "../../actions/titularActions";
import { mostrarPagosTitular } from "../../actions/pagosActions";
import { mostrarPagobcoTitular } from "../../actions/pagobcoActions";

class Titular extends Component {
  state = {
    titular: {},
    pagos: {},
    pagobco: {},
    allPagos: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.mostrarTitular(id);

    this.props.mostrarPagosTitular(id);

    this.props.mostrarPagobcoTitular(id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { titular, pagos, pagobco, memo } = nextProps;

    if (titular) {
      if (titular.GRUPO < 3000) {
        let allPagos = pagos.concat(pagobco);
        this.setState({
          allPagos: allPagos
        });
      } else {
        let allPagos = pagobco.concat(pagos);
        this.setState({
          allPagos: allPagos
        });
      }
    }

    this.setState({
      titular: titular,
      pagos: pagos,
      pagobco: pagobco,
      memo: memo
    });
  }

  bajaSocio = e => {
    e.preventDefault();

    let id = this.state.titular.CONTRATO;

    confirmAlert({
      title: "Atencion",
      message: "¿Realmente desea dar de baja a este socio?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            this.props.bajaTitular(id);
          }
        },

        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  render() {
    const { titular, pagos, pagobco, allPagos } = this.state;

    if (!titular) return <Spinner />;

    const { id } = this.props.match.params;

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <Link to="/titulares" className="btn btn-secondary">
              <i className="fas fa-arrow-circle-left"></i> {""}
              Volver al Listado
            </Link>
          </div>
        </div>

        <div className="jumbotron" id="ficha">
          {titular.ESTADO === 1 ? (
            <div className="row mt-4 alert alert-success justify-content-center">
              <h5 className="text-center">
                <strong>FICHA ACTIVA</strong>{" "}
              </h5>
            </div>
          ) : titular.ESTADO === 0 ? (
            <div className="row mt-4 alert alert-danger justify-content-center">
              <h5 className="text-center">
                <strong>FICHA EN BAJA</strong>{" "}
              </h5>
            </div>
          ) : (
            <div className="row mt-4 alert alert-warning justify-content-center">
              <h5 className="text-center">
                <strong>ERROR</strong>{" "}
              </h5>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <h1 className="display-3">
                {" "}
                {titular.APELLIDOS} {titular.NOMBRES}{" "}
              </h1>
            </div>
          </div>

          <InfoTitular titular={titular} />
        </div>

        <hr className="my-4" />

        <div className="jumbotron">
          <div className="mt-4 p-4 border">
            <h3 className="text-center mb-4 font-weight-bold">Opciones</h3>

            {titular.ESTADO === 1 ? (
              <div>
                <div
                  className="btn-group col-md-12 d-flex justify-content-center row"
                  role="group"
                  aria-label="Button group with nested dropdown"
                >
                  <Link
                    to={`/titulares/editar/${titular.CONTRATO}`}
                    className="btn btn-warning col-md-3 mr-1"
                  >
                    Editar
                  </Link>

                  <Link
                    to={`/ficha/cambiotitular/${titular.CONTRATO}`}
                    className="btn btn-danger col-md-3 mr-1"
                  >
                    Cambiar de Titular
                  </Link>

                  <Link
                    to={`/memo/nuevo/${titular.CONTRATO}`}
                    className="btn btn-secondary col-md-3 mr-1"
                  >
                    Crear Memo
                  </Link>
                </div>

                <div
                  className="btn-group col-md-12 d-flex justify-content-center row mt-1"
                  role="group"
                  aria-label="Button group with nested dropdown"
                >
                  <Link
                    to={`/titulares/historia/${titular.CONTRATO}`}
                    className="btn btn-info col-md-3 mr-1"
                  >
                    Ultimas Modificaciones
                  </Link>

                  {/* <Link
                    to={`/verificaciones/${"adh"}`}
                    className="btn btn-primary col-md-3 mr-1"
                  >
                    Agregar Adherentes
                  </Link> */}

                  {titular.GRUPO === 6 ? (
                    <Link
                      to={`/prestamos/listado/${titular.CONTRATO}`}
                      className="btn btn-success col-md-3 mr-1"
                    >
                      Consultar Prestamos
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div
                className="btn-group col-md-12 d-flex justify-content-center"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <Link
                  to={`/titulares/historia/${titular.CONTRATO}`}
                  className="btn btn-info col-md-3 mr-1"
                >
                  Ultimas Modificaciones
                </Link>
              </div>
            )}
          </div>
        </div>

        <hr className="my-4" />

        <div className="jumbotron">
          <Memo contrato={titular.CONTRATO} />
        </div>

        <hr className="my-4" />

        <div className="jumbotron">
          {Object.entries(allPagos).length === 0 ? (
            <h1 className="text-center">
              <i className="fas fa-hand-holding-usd"> No Registra Pagos</i>{" "}
            </h1>
          ) : (
            <AllPagos pagos={pagos} pagobco={pagobco} allPagos={allPagos} />
          )}

          <hr className="my-4" />

          {Object.entries(allPagos).length === 0 ? null : (
            <div className="mt-4 p-4 border">
              <h1 className="text-center mb-4 font-weight-bold">
                Ver Pagos por separado
              </h1>

              <div
                className="btn-group col-md-12 d-flex justify-content-center"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <Link
                  to={`/pagos/cuotas/${titular.CONTRATO}`}
                  className="btn btn-secondary col-md-5 mr-1"
                >
                  Cuotas
                </Link>
                <Link
                  to={`/pagos/debitos/${titular.CONTRATO}`}
                  className="btn btn-secondary col-md-5"
                >
                  Debitos
                </Link>
              </div>
            </div>
          )}
        </div>

        <hr className="my-4" />

        <div className="row mt-4 jumbotron">
          <AdherentesDelTit id={id} />
        </div>
      </div>
    );
  }
}
//state
const mapStateToProps = state => ({
  titular: state.titulares.titular,
  pagos: state.pagos.pagos,
  pagobco: state.pagobco.pagobco
});

export default connect(
  mapStateToProps,
  { mostrarTitular, mostrarPagobcoTitular, mostrarPagosTitular, bajaTitular }
)(Titular);
