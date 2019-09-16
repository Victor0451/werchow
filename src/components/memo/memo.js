import React, { Component } from 'react'

//redux
import { connect } from "react-redux";
import { ultimoMemo } from "../../actions/memosActions";


class Memo extends Component {

    state = {
        memo: {}
    }

    componentDidMount() {
        setTimeout(() => {
            const { contrato } = this.props;

            this.props.ultimoMemo(contrato)
        }, 300);
    }

    componentWillReceiveProps(nextProps) {

        setTimeout(() => {
            const { memo } = nextProps;
            this.setState({
                memo: memo
            })
        }, 300);

    }


    render() {

        const { memo } = this.state

        if (!memo) return <div className="alert alert-secondary mt-4 text-center border ">No Hay Memos</div>

        return (
            <div className="form-style-8 container">
                <h2>Memo</h2>
                <div className="d-flex justify-content-center alert alert-info" >
                    <div className="col-md-8">
                        <span className="mt-4"><strong> Memo: </strong></span>
                        <p className="">
                            {memo.MEMO}
                        </p>
                    </div>
                    <div className="col-md-4">
                        <span className="mt-4"><strong>Fecha: </strong></span>
                        <p className="">
                            {memo.createdAt}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

//state
const mapStateToProps = state => ({
    memo: state.memos.memo,
});

export default connect(
    mapStateToProps,
    { ultimoMemo }
)(Memo)