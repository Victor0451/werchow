import React from 'react'

const InfoTitular = (props) => {
    const { titular } = props
    return (
        <div>
            <div className="row mt-4 alert alert-secondary">
                <div className="col-md-4">
                    <h3>Contrato: {titular.CONTRATO}</h3>
                </div>

                <div className="col-md-4">
                    <h3> GRUPO:{''} {titular.GRUPO}</h3>
                </div>

                <div className="col-md-4">
                    <h3>Sucursal: {titular.SUCURSAL}</h3>
                </div>
            </div>

            <hr className="my-4" />
            <h3>DATOS DE FICHA</h3>
            <div className="row mt-4">

                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            ZONA:
                </span> {''}
                        {titular.ZONA}
                    </p>
                </div>

                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            ALTA:
                </span> {''}
                        {titular.ALTA}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            VIGENCIA:
                             </span> {''}
                        {titular.VIGENCIA}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            DOM. LABORAL:
                                 </span> {''}
                        {titular.DOM_LAB}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            DOM. COBRANZA:
                                 </span> {''}
                        {titular.DOMI_COBR}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            PLAN:
                                 </span> {''}
                        {titular.PLAN}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            SUB PLAN:
                                 </span> {''}
                        {titular.SUB_PLAN}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            FECHA DEL PLAN:
                                 </span> {''}
                        {titular.FEC_PLAN}
                    </p>
                </div>
            </div>


            <hr className="my-4" />

            <h3>DATOS PERSONALES</h3>

            <div className="row mt-4">

                <div className="col-md-2">
                    <span className="font-weight-bold">
                        DNI:
                    </span> {''}
                    {titular.NRO_DOC}
                </div>

                <div className="col-md-2 ">
                    <p>
                        <span className="font-weight-bold">
                            OBRA SOC.:
                </span> {''}
                        {titular.OBRA_SOC}
                    </p>
                </div>
                <div className="col-md-2 ">
                    <p>
                        <span className="font-weight-bold">
                            NACIMIENTO:
                </span> {''}
                        {titular.NACIMIENTO}
                    </p>
                </div>
                <div className="col-md-2 ">
                    <p>
                        <span className="font-weight-bold">
                            SEXO:
                </span> {''}
                        {titular.SEXO}
                    </p>
                </div>

                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            CALLE:
                </span> {''}
                        {titular.CALLE}
                    </p>
                </div>

                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            N° DE CALLE:
                </span> {''}
                        {titular.NRO_CALLE}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            BARRIO:
                </span> {''}
                        {titular.BARRIO}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            TELEFONO:
                </span> {''}
                        {titular.TELEFONO}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            MOVIL:
                </span> {''}
                        {titular.MOVIL}
                    </p>
                </div>
                <div className="col-md-2">
                    <p>
                        <span className="font-weight-bold">
                            MAIL:
                </span> {''}
                        {titular.MAIL}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default InfoTitular

