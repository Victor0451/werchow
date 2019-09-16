import React, { Component } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

import { connect } from "react-redux";
import { mostrarHistoria } from "../../actions/historiaActions";

let prev = 0;
//let next = 0;
let last = 0;
//let first = 0;

class Historia extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.mostrarHistoria(id);
    }

    componentWillReceiveProps(nextProps) {
        const { historia } = nextProps;

        this.setState({
            historia: historia
        })
    }


    constructor() {
        super();
        this.state = {
            historia: [],
            currentPage: 1,
            todosPerPage: 15,

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

    render() {
        let { currentPage, todosPerPage, historia } = this.state;


        // Logic for displaying current todos
        let indexOfLastTodo = currentPage * todosPerPage;
        let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        let currentTodos = historia.slice(indexOfFirstTodo, indexOfLastTodo);
        prev = currentPage > 0 ? (currentPage - 1) : 0;
        last = Math.ceil(historia.length / todosPerPage);
        //   let next = (last === currentPage) ? currentPage : currentPage + 1;

        // Logic for displaying page numbers
        let pageNumbers = [];
        for (let i = 1; i <= last; i++) {
            pageNumbers.push(i);
        }

        if (Object.entries(historia).length === 0) return <h1 className="text-center mt-4"><i className="fas fa-history"> No Existen Modificaciones Registradas</i> </h1>

        return (
            <div className="container">

                <h1 className="text-center mt-4"><i className="fas fa-history"> Modificaciones</i> </h1>

                <table className="table table-hover mt-4">
                    <thead className="alert alert-dark">
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Campo</th>
                            <th scope="col">Anterior</th>
                            <th scope="col">Nuevo</th>
                            <th scope="col">Operador</th>

                        </tr>
                    </thead>
                    <tbody className="">
                        {currentTodos.map((historia, index) => (

                            <tr key={index}>
                                <td >
                                    {historia.FECHA}
                                </td>
                                <td >
                                    {historia.CAMPO}
                                </td>
                                <td>
                                    {historia.ANTERIOR}
                                </td>
                                <td>
                                    {historia.NUEVO}
                                </td>
                                <td>
                                    {historia.OPERADOR}
                                </td>
                            </tr>


                        ))}
                    </tbody>

                </table>

                <nav className="d-flex justify-content-center">
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
        )
    }
}

//state
const mapStateToProps = state => ({
    historia: state.historia.historia

});

export default connect(
    mapStateToProps,
    { mostrarHistoria }
)(Historia);