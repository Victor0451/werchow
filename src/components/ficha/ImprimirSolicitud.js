import React, { Component } from "react";
import werchowlogo from "../../img/logo.png";
import carencias from "../../img/carencias.png";
import toastr from "../../utils/toastr";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { mostrarTitular } from "../../actions/titularActions";
import { mostrarAdherentesDelTitular } from "../../actions/adherenteActions";

class ImprimirSolicitud extends Component {
  state = {
    contrato: "",
    titular: [],
    adherentes: [],
    debito: false,
    tarjeta: false,
    convenio: false,
    cobrador: false,
    oficina: false
  };

  componentDidMount() {
    const contrato = this.props.match.params.id;

    if (contrato) {
      this.buscarTitularDirecto(contrato);
      document.getElementById("busqueda").hidden = true;
      document.getElementById("solicitud").hidden = false;
    }
  }

  leerDatos = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buscarTitular = e => {
    e.preventDefault();

    const { contrato } = this.state;

    if (contrato === "") {
      toastr.warning("Debes ingresar un numero de socio", "ATENCION");
    } else {
      if (contrato) {
        this.props.mostrarTitular(contrato);

        this.props.mostrarAdherentesDelTitular(contrato);

        setTimeout(() => {
          const { titular, adherentes } = this.props;

          if (titular) {
            this.setState({
              titular: titular,
              adherentes: adherentes
            });

            if (titular.GRUPO < 2010) {
              if (
                titular.GRUPO !== 500 &&
                titular.GRUPO !== 1000 &&
                titular.GRUPO !== 1001 &&
                titular.GRUPO !== 1500
              ) {
                this.setState({
                  convenio: true
                });
              }
            }
            if (titular.GRUPO === 1000) {
              if (titular.ZONA === (1, 3, 5, 60)) {
                this.setState({
                  oficina: true
                });
              } else {
                this.setState({
                  cobrador: true
                });
              }
            }

            if (
              titular.GRUPO === 3400 ||
              titular.GRUPO === 3600 ||
              titular.GRUPO === 3700 ||
              titular.GRUPO === 3800 ||
              titular.GRUPO === 3900 ||
              titular.GRUPO === 4000
            ) {
              this.setState({
                tarjeta: true
              });
            }

            if (titular.GRUPO > 5000) {
              if (titular.GRUPO !== 7777 && titular.GRUPO !== 8500) {
                this.setState({
                  debito: true
                });
              }
            }

            document.getElementById("busqueda").hidden = true;
            document.getElementById("solicitud").hidden = false;
            document.getElementById("opciones").hidden = false;
          } else {
            toastr.warning(
              "El numero ingresado no corresponde a ningun afiliado"
            );
          }
        }, 150);
      }
    }
  };

  imprimir = () => {
    let contenido = document.getElementById("solicitud").innerHTML;
    let contenidoOrg = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOrg;

    window.location.reload(true);
  };

  reload = () => {
    document.location.reload();
  };

  render() {
    const { titular, adherentes } = this.state;

    return (
      <div className="container">
        <div className="form-style-8 " id="busqueda">
          <h2>Imprimir Solicitud</h2>

          <form onSubmit={this.buscarTitular}>
            <div className="row">
              <div className="col-md-6">
                <p className="has-dynamic-label">
                  <input
                    type="text"
                    className=""
                    id="dynamic-label-input"
                    name="contrato"
                    onChange={this.leerDatos}
                    placeholder="Ingresar N° de Socio"
                  />
                  <label>N° de Socio</label>
                </p>
              </div>

              <div className="col-md-6">
                <button className="btn btn-primary  btn-block mt-4">
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="jumbotron mt-4" id="solicitud" hidden>
          <div className="row ">
            <div className="col-md-4 justify-content-start">
              <img
                className="werchowlogo"
                src={werchowlogo}
                alt="werchowlogo"
              />
            </div>
            <div className="col-md-8 justify-content-center">
              <h1>
                <strong>
                  <u> Solicitud de Ingreso </u>
                </strong>
              </h1>
            </div>
          </div>

          <br />
          <div className="mt-4 text-center">
            <div className="row mt-4 border">
              <div className="col-md-3">
                <strong>AFILIADO N°: </strong>
                {titular.CONTRATO}
              </div>
              <div className="col-md-3">
                <strong>FECHA: </strong>
                {titular.ALTA}
              </div>
              <div className="col-md-3">
                <strong>COD: </strong>
                {titular.PRODUCTOR}
              </div>
              <div className="col-md-3">
                <strong>PLAN: </strong>
                {titular.PLAN}
              </div>
            </div>
          </div>

          <div className="row mt-4 p-4 ">
            <table className="tabla">
              <thead className="tabla-thead">
                <tr>
                  <th className="tabla-th-td" scope="col">
                    Apellido
                  </th>
                  <th className="tabla-th-td" scope="col">
                    Nombre
                  </th>
                  <th className="tabla-th-td" scope="col">
                    Nacimiento
                  </th>
                  <th className="tabla-th-td" scope="col">
                    DNI
                  </th>
                  <th className="tabla-th-td" scope="col">
                    Parentesco
                  </th>
                  <th className="tabla-th-td" scope="col">
                    O. Social
                  </th>
                  <th className="tabla-th-td" scope="col">
                    Subsidio
                  </th>
                  <th className="tabla-th-td" scope="col">
                    Traslado
                  </th>
                  <th className="tabla-th-td" scope="col">
                    Vigencia
                  </th>
                </tr>
              </thead>
              <tbody>
                <td className="tabla-th-td">{titular.APELLIDOS}</td>
                <td className="tabla-th-td">{titular.NOMBRES}</td>
                <td className="tabla-th-td">{titular.NACIMIENTO}</td>
                <td className="tabla-th-td">{titular.NRO_DOC}</td>
                <td className="tabla-th-td">Titular</td>
                <td className="tabla-th-td">{titular.OBRA_SOC}</td>
                <td className="tabla-th-td"></td>
                <td className="tabla-th-td"></td>
                <td className="tabla-th-td">{titular.VIGENCIA}</td>
                {adherentes.map((adherente, index) =>
                  adherente.ESTADO === 1 ? (
                    <tr key={index}>
                      <td className="tabla-th-td">{adherente.APELLIDOS}</td>
                      <td className="tabla-th-td">{adherente.NOMBRES}</td>
                      <td className="tabla-th-td">{adherente.NACIMIENTO}</td>
                      <td className="tabla-th-td">{adherente.NRO_DOC}</td>
                      <td className="tabla-th-td">
                        {adherente.PARENT === 1
                          ? "Conyugue"
                          : adherente.PARENT === 2
                          ? "Hijo"
                          : adherente.PARENT === 3
                          ? "Padre"
                          : adherente.PARENT === 4
                          ? "Otro"
                          : ""}
                      </td>
                      <td className="tabla-th-td">{adherente.OBRA_SOC}</td>
                      <td className="tabla-th-td"></td>
                      <td className="tabla-th-td"></td>
                      <td className="tabla-th-td">{adherente.VIGENCIA}</td>
                    </tr>
                  ) : (
                    <tr></tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <h3 className="mt-4">
            <u> Domicilio</u>
          </h3>
          <div className="row mt-4 border">
            <div className="col-md-4">
              <strong>Calle: </strong>
              {titular.CALLE}
            </div>
            <div className="col-md-4">
              <strong>N°: </strong>
              {titular.NRO_CALLE}
            </div>
            <div className="col-md-4">
              <strong>Barrio: </strong>
              {titular.BARRIO}
            </div>
          </div>

          <hr />

          <h3>
            <u>Telefono</u>
          </h3>
          <div className="row mt-4 border">
            <div className="col-md-4">
              <strong>Telefono: </strong>
              {titular.TELEFONO}
            </div>
            <div className="col-md-4">
              <strong>Celular: </strong>
              {titular.MOVIL}
            </div>
          </div>

          <hr />

          <h3>
            <u>Metodo de Pago</u>
          </h3>

          <div className="row mt-4 border">
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="debito"
                  checked={this.state.debito}
                />
                <label className="form-check-label">Debito Bancario</label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="tarjeta"
                  checked={this.state.tarjeta}
                />
                <label className="form-check-label">Tarjeta</label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={this.state.convenio}
                  id="convenio"
                />
                <label className="form-check-label">Convenio</label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={this.state.cobrador}
                  id="cobrador"
                />
                <label className="form-check-label">Cob. a Domicilio</label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={this.state.oficina}
                  id="oficina"
                />
                <label className="form-check-label">Cob. Oficina</label>
              </div>
            </div>
          </div>

          <hr />

          <h3>
            <u>Domicilio de Cobranza</u>
          </h3>
          <div className="row mt-4 border">
            <div className="col-md-4">
              <strong>Calle: </strong>
              {titular.DOMI_COB}
            </div>
            <div className="col-md-4">
              <strong>Dias de cobranza (Vencimento: 15 c/mes)</strong>
            </div>
            <div className="col-md-4">
              <strong>Hr: </strong>
            </div>
          </div>

          <hr />

          <div className="row mt-4 border">
            <div className="col-md-12">
              {" "}
              <strong>
                <p className="text">
                  Werchow Servicios Sociales S.R.L. no es Compañia de Seguros,
                  Obra Social, o Medicina Prepaga. Todos los afiliados que
                  figuran en la presente declaran conocer y aceptar los planes
                  de Werchow Servicio Sociales S.R.L.. Para la utilización de
                  los servicios, los afiliados deberán exhibir el carnet de la
                  empresa y la constancia de pago del mes en curso
                </p>
              </strong>{" "}
            </div>
          </div>

          <hr />

          <h3>
            <u>Observaciones</u>
          </h3>
          <div className="row mt-4">
            <div className="col-md-12">
              ______________________________________________________________________________________________________________________________________________________
            </div>
            <div className="col-md-12 mt-4">
              ______________________________________________________________________________________________________________________________________________________
            </div>
          </div>

          <hr />

          <div className="row mt-4 border p-1">
            <div className="col-md-12">
              {" "}
              <strong>
                <p className="text">
                  Programa de fidelización: El presente programa tiene como
                  destinatarios a todos los AFILIADOS de WERCHOW SERVICIOS
                  SOCIALES S.R.L., que cumplan con cada uno de los siguientes
                  requisitos, sin excepción alguna: Poseer un PLAN de SERVICIOS
                  SOCIALES, con la cuota abonada al dia, NO mantener deuda
                  alguna con la EMPRESA y cumplir con la cantidad de cuotas
                  abonadas (del plan de servicios sociales elegido) al día y sin
                  retraso o mora. El Programa de Fidelización, es un programa
                  estímulo de Beneficios que se otorgan SIN CARGO para los
                  AFILIADOS que cumplan con los requisitos que se mencionan en
                  el cuadro "A". SI EL AFILIADO RENUNCIARA O POR CUALQUIER OTRO
                  MOTIVO (FALTA DE PAGO, FALSEDAD DE DATOS, OTROS
                  INCUMPLIMIENTOS, ETC) DEJARA DE TENER LA CALIDAD DE AFILIADO,
                  NO PODRÁ EXIGIR, DE DARSE EL SUPUESTO, LA PRESENTACIÓN DEL
                  PREMIO CONSISTENTE EN SERVICIO DE SEPELIO, CREMACION, ETC, ES
                  DECIR, PERDERA TODO DERECHO AL MISMO, SIN PODER EXIGIR
                  RESTITUCIÓN DINERARIA ALGUNA A LA EMPRESA, PORQUE LA
                  PRESENTACION DEL SERVICIO DE SEPELIO EN QUE CONSISTE EL PREMIO
                  RESPECTIVO ESTÁ CONDICIONADA A LA PUNTUALIDAD EN EL PAGO DE
                  LAS CUOTAS Y A LA PERMANENCIA DE LA CALIDAD DE AFILIADO
                </p>
              </strong>{" "}
              <img className="carencias" src={carencias} alt="carencias" />
            </div>
          </div>

          <br />

          <div className="row border mt-4">
            <br />
            <div className=" mt-4 mr-4 d-flex justify-content-start">
              <div className="col-md-4">
                _____________________
                <label className="">Firma</label>
              </div>
            </div>

            <div className=" mt-4 mr-4 d-flex justify-content-center">
              <div className="col-md-4">
                _____________________
                <label>Aclaracion</label>
              </div>
            </div>

            <div className=" mt-4 mr-4 d-flex justify-content-end">
              <div className="col-md-4">
                _____________________
                <label>DNI</label>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="jumbotron" id="opciones" hidden>
          <div className="mt-4 p-4 border">
            <h3 className="text-center mb-4 font-weight-bold">Opciones</h3>
            <div className="d-flex justify-content-center">
              <Link
                to="#"
                className="btn btn-info col-md-3 mr-1"
                onClick={this.imprimir}
              >
                Imprimir Solicitud
              </Link>
              <Link
                to="#"
                className="btn btn-secondary col-md-3 mr-1"
                onClick={this.reload}
              >
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//state
const mapStateToProps = state => ({
  titular: state.titulares.titular,
  adherentes: state.adherentes.adherentes,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    mostrarTitular,
    mostrarAdherentesDelTitular
  }
)(ImprimirSolicitud);
