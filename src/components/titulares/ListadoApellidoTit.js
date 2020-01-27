import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

let prev = 0;
//let next = 0;
let last = 0;
//let first = 0;

export default class ListadoApellidoTit extends Component {
  constructor() {
    super();
    this.state = {
      titulares: [],
      currentPage: 1,
      todosPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleLastClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: last
    });
  }
  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1
    });
  }

  to = index => {
    // const { titulares } = this.props;
    // if (index)
    //   return <Redirect to={`/titulares/${titulares[index].CONTRATO}`} />;
  };

  render() {
    let { currentPage, todosPerPage } = this.state;
    let { titulares } = this.props;

    // Logic for displaying current todos
    let indexOfLastTodo = currentPage * todosPerPage;
    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = titulares.slice(indexOfFirstTodo, indexOfLastTodo);
    prev = currentPage > 0 ? currentPage - 1 : 0;
    last = Math.ceil(titulares.length / todosPerPage);
    //   let next = (last === currentPage) ? currentPage : currentPage + 1;

    // Logic for displaying page numbers
    let pageNumbers = [];
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }

    return (
      <React.Fragment>
        <hr />
        <div className="row container mt-4 ">
          <div className="col-md-12 p-2">
            <ul>
              <table className="table table-hover">
                <thead className="alert alert-dark">
                  <tr>
                    <th scope="col">Contrato</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">DNI</th>
                    <th scope="col">ESTADO</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTodos.map((titular, index) => (
                    <tr key={index}>
                      <td>{titular.CONTRATO}</td>
                      <td>{titular.APELLIDOS}</td>
                      <td>{titular.NOMBRES}</td>
                      <td>{titular.NRO_DOC}</td>
                      <td>
                        {titular.ESTADO === 1
                          ? "ACTIVO"
                          : titular.ESTADO === 0
                          ? "BAJA"
                          : ""}
                      </td>

                      <td>
                        <Link
                          to={`/titulares/${titulares[index].CONTRATO}`}
                          className="btn btn-primary"
                        >
                          Ver Ficha
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ul>
          </div>

          <div className=" table-responsive">
            <nav className="pagination justify-content-center ">
              <Pagination>
                <PaginationItem>
                  {prev === 0 ? (
                    <PaginationLink disabled>Inicio</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleFirstClick}
                      id={prev}
                      href={prev}
                    >
                      Inicio
                    </PaginationLink>
                  )}
                </PaginationItem>
                <PaginationItem>
                  {prev === 0 ? (
                    <PaginationLink disabled>Anterior</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleClick}
                      id={prev}
                      href={prev}
                    >
                      Anterior
                    </PaginationLink>
                  )}
                </PaginationItem>
                {/* {
                            pageNumbers.map((number, i) =>
                                <Pagination key={i}>
                                    <PaginationItem  active={pageNumbers[currentPage - 1] === (number) ? true : false} >
                                        <PaginationLink  onClick={this.handleClick} href={number} key={number} id={number}>
                                            {number}
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            )} */}

                <PaginationItem>
                  {currentPage === last ? (
                    <PaginationLink disabled>Siguiente</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleClick}
                      id={pageNumbers[currentPage]}
                      href={pageNumbers[currentPage]}
                    >
                      Siguiente
                    </PaginationLink>
                  )}
                </PaginationItem>

                <PaginationItem>
                  {currentPage === last ? (
                    <PaginationLink disabled>Final</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleLastClick}
                      id={pageNumbers[currentPage]}
                      href={pageNumbers[currentPage]}
                    >
                      Final
                    </PaginationLink>
                  )}
                </PaginationItem>
              </Pagination>
            </nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
