import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Spinner from '../layouts/Spinner';

import {
  Pagination,
  PaginationItem,
  PaginationLink,

} from "reactstrap";




//redux
import { connect } from "react-redux";
import { mostrarTitulares } from "../../actions/titularActions";



let prev = 0;
//let next = 0;
let last = 0;
//let first = 0;

class Titulares extends Component {

  constructor() {
    super();
    this.state = {
      titulares: [],
      currentPage: 1,
      todosPerPage: 50,

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



  componentDidMount() {
    this.props.mostrarTitulares();

  }

  componentWillReceiveProps(nextProps) {
    const { titulares } = nextProps;

    this.setState({
      titulares: titulares
    })
  }

  render() {

    let { titulares, currentPage, todosPerPage } = this.state;

    // Logic for displaying current todos
    let indexOfLastTodo = currentPage * todosPerPage;
    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = titulares.slice(indexOfFirstTodo, indexOfLastTodo);
    prev = currentPage > 0 ? (currentPage - 1) : 0;
    last = Math.ceil(titulares.length / todosPerPage);
    //   let next = (last === currentPage) ? currentPage : currentPage + 1;

    // Logic for displaying page numbers
    let pageNumbers = [];
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }

    if (Object.entries(titulares).length === 0) return <Spinner />

    return (
      <React.Fragment>
        <h2 className="text-center my-5">Listado de Titulares</h2>
        <div className="row justify-content-center">
          <div className="col-md-8" >
            <ul>
              <table className="table table-hover">
                <thead className="alert alert-dark">
                  <tr>
                    <th scope="col">Contrato</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTodos.map((titular, index) => (
                    <tr key={index}>
                      <td >
                        {titular.CONTRATO}
                      </td>
                      <td>
                        {titular.APELLIDOS}
                      </td>
                      <td>
                        {titular.NOMBRES}
                      </td>
                      <td>
                        {titular.NRO_DOC}
                      </td>

                      <td>
                        <Link to={`/titulares/${titular.CONTRATO}`} className="btn btn-primary">Mas Informacion</Link>
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
                  {prev === 0 ? <PaginationLink disabled>Inicio</PaginationLink> :
                    <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>Inicio</PaginationLink>
                  }
                </PaginationItem>
                <PaginationItem>
                  {prev === 0 ? <PaginationLink disabled>Anterior</PaginationLink> :
                    <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Anterior</PaginationLink>
                  }
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
                  {
                    currentPage === last ? <PaginationLink disabled>Siguiente</PaginationLink> :
                      <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Siguiente</PaginationLink>
                  }
                </PaginationItem>

                <PaginationItem>
                  {
                    currentPage === last ? <PaginationLink disabled>Final</PaginationLink> :
                      <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Final</PaginationLink>
                  }
                </PaginationItem>
              </Pagination>
            </nav>

          </div>
        </div>
      </React.Fragment>
    )
  }
}
//state
const mapStateToProps = state => ({
  titulares: state.titulares.titulares
});

export default connect(
  mapStateToProps,
  { mostrarTitulares }
)(Titulares);