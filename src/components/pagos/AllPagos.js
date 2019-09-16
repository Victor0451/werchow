import React, { Component } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";


let prev = 0;
//let next = 0;
let last = 0;
//let first = 0;


export default class AllPagos extends Component {
    componentDidMount() {
        const { allPagos } = this.props;

        this.setState({
            allPagos: allPagos
        })

    }

    constructor() {
        super();
        this.state = {
            pagobco: [],
            pagos: [],
            currentPage: 1,
            todosPerPage: 5,

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

        let { currentPage, todosPerPage } = this.state;

        let { allPagos } = this.props

        // Logic for displaying current todos
        let indexOfLastTodo = currentPage * todosPerPage;
        let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        let currentTodos = allPagos.slice(indexOfFirstTodo, indexOfLastTodo);
        prev = currentPage > 0 ? (currentPage - 1) : 0;
        last = Math.ceil(allPagos.length / todosPerPage);
        //   let next = (last === currentPage) ? currentPage : currentPage + 1;

        // Logic for displaying page numbers
        let pageNumbers = [];
        for (let i = 1; i <= last; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="container">
                <h1><i className="fas fa-hand-holding-usd"> </i><strong><u> Pagos</u></strong></h1>


                <table className="table table-hover mt-4">
                    <thead className="alert alert-dark">
                        <tr>
                            <th scope="col">Tipo de Pago</th>
                            <th scope="col">Contrato</th>
                            <th scope="col">Mes</th>
                            <th scope="col">Año</th>
                            {!allPagos.NRO_CTA ? (<th scope="col">N° Serie</th>) : (<th scope="col">Cod.Sucursar</th>)}
                            {!allPagos.NRO_CTA ? (<th scope="col">N° Recibo</th>) : (<th scope="col">N° Cuenta</th>)}
                            <th scope="col">Importe</th>
                            <th scope="col">Dia de Pago</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {currentTodos.map((allPagos, index) => (

                            <tr key={index}>
                                <td >
                                    {!allPagos.NRO_CTA ? ('CUOTA') : ('DEBITO')}
                                </td>
                                <td >
                                    {allPagos.CONTRATO}
                                </td>
                                <td>
                                    {allPagos.MES}
                                </td>
                                <td>
                                    {allPagos.ANO}
                                </td>

                                {!allPagos.NRO_CTA ? (<td>{allPagos.SERIE}</td>) : (<td>{allPagos.COD_SUC}</td>)}

                                {!allPagos.NRO_CTA ? (<td>{allPagos.NRO_RECIBO}</td>) : (<td>{allPagos.NRO_CTA}</td>)}

                                <td>
                                    $ {allPagos.IMPORTE}
                                </td>

                                {!allPagos.NRO_CTA ? (<td>{allPagos.DIA_PAG}</td>) : (<td>{allPagos.DIA_PAGO}</td>)}

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



