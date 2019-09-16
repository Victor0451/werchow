import React, { Component } from 'react'

import { connect } from "react-redux";
import { agregarMemo } from "../../actions/memosActions";

class NuevoMemo extends Component {

    ContratoRef = React.createRef();
    MemoRef = React.createRef();

    crearMemo = (e) => {

        e.preventDefault();

        const nuevoMemo = {
            CONTRATO: this.ContratoRef.current.value,
            MEMO: this.MemoRef.current.value
        }

        this.props.agregarMemo(nuevoMemo);

        this.props.history.push(`/titulares/${nuevoMemo.CONTRATO}`);

    }


    render() {
        const { id } = this.props.match.params;

        return (
            <div className="container form-style-8">
                <h2>Crear Memo</h2>

                <form onSubmit={this.crearMemo}>
                    <div className="form-group col-md-6">
                        <p className="has-dynamic-label">
                            <input type="text" className="" ref={this.ContratoRef} id="contrato" name="CONTRATO" placeholder="Contrato" value={id} readOnly />
                            <label >CONTRATO</label>
                        </p>
                    </div>

                    <div className="form-group col-md-6">
                        <p className="has-dynamic-label">
                            <input type="text" className="" ref={this.MemoRef} id="memo" name="MEMO" placeholder="Memo" />
                            <label >Memo</label>
                        </p>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Crear Memo</button>

                </form>
            </div>
        )
    }
}

export default connect(
    null,
    { agregarMemo }
)(NuevoMemo);