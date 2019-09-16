import React from "react";

import OSSelect from "react-select";
import PlanSelect from "react-select";
import SeguroVidaSelect from "react-select";

import { obra_social, planes, segurovida } from "../layouts/Arrays/arrays";

const FormEditarAdherente = props => {
  const {
    adherente,
    error,
    altaRef,
    apellidosRef,
    contratoRef,
    nacimientoRef,
    nombresRef,
    nro_docRef,
    sexoRef,
    vigenciaRef,
    handleChange,
    modfAdh
  } = props;

  return (
    <div className="form-style-8 ">
      <h2 className="mt-4">Editar Adherente</h2>

      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <h2 className="mt-4">Datos de Ficha</h2>

        <div className="form-row mt-2">
          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                ref={contratoRef}
                id="contrato"
                name="CONTRATO"
                value={adherente.CONTRATO}
                placeholder="Contrato"
                readOnly
              />
              <label>CONTRATO</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <label className="badge badge-info">PLAN: {adherente.PLAN}</label>
            <PlanSelect
              options={planes}
              placeholder={"Plan"}
              onChange={value => handleChange(value, "PLAN")}
            />
          </div>

          <div className="form-group col-md-6">
            {!adherente.TSEG ? (
              <label className="badge badge-info">
                No tiene seleccionado ningun seguro{" "}
              </label>
            ) : (
              <label className="badge badge-info">
                SEGURO: {adherente.TSEG}{" "}
              </label>
            )}
            <SeguroVidaSelect
              options={segurovida}
              placeholder={"Seguro de Vida"}
              onChange={value => handleChange(value, "TSEG")}
            />
          </div>
        </div>

        <h2 className="mt-4">Informacion Personal</h2>

        <div className="form-group">
          <p className="has-dynamic-label">
            <input
              type="text"
              className=""
              id="dynamic-label-input"
              ref={apellidosRef}
              name="APELLIDOS"
              placeholder="Apellidos"
              defaultValue={adherente.APELLIDOS}
            />
            <label>Apellidos</label>
          </p>
        </div>

        <div className="form-group">
          <p className="has-dynamic-label">
            <input
              type="text"
              className=""
              id="dynamic-label-input"
              name="NOMBRES"
              ref={nombresRef}
              placeholder="Nombres"
              defaultValue={adherente.NOMBRES}
            />
            <label>Nombres</label>
          </p>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="date"
                id="dynamic-label-input"
                name="NACIMIENTO"
                data-placeholder="Fecha de Nacimiento"
                aria-required="true"
                defaultValue={adherente.NACIMIENTO}
                ref={nacimientoRef}
              />
              <label>Fecha de Nacimiento</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="number"
                className=""
                ref={nro_docRef}
                id="in-range-input"
                name="NRO_DOC"
                minLength="8"
                placeholder="DNI"
                defaultValue={adherente.NRO_DOC}
              />
              <label>DNI</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <select
                id="dynamic-label-input"
                className=""
                name="SEXO"
                ref={sexoRef}
              >
                <option value="">{adherente.SEXO}</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="date"
                className=""
                id="dynamic-label-input"
                data-placeholder="Fecha de Alta"
                name="ALTA"
                aria-required="true"
                defaultValue={adherente.ALTA}
                ref={altaRef}
              />
              <label>Fecha de Alta</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="date"
                className=""
                id="vigencia"
                name="VIGENCIA"
                data-placeholder="Fecha de Vigencia"
                aria-required="true"
                defaultValue={adherente.VIGENCIA}
                ref={vigenciaRef}
              />
              <label>Vigencia</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <label className="badge badge-info">
              OBRA SOCIAL: {adherente.OBRA_SOC}
            </label>
            <OSSelect
              options={obra_social}
              placeholder={"Obra Social"}
              onChange={value => handleChange(value, "OBRA_SOC")}
            />
          </div>
        </div>

        {error ? (
          <div className="font-weight-bold alert alert-danger text-center mt-4">
            Todos los campos son obligatorios
          </div>
        ) : (
          ""
        )}
      </form>
      <button className="btn btn-primary btn-block mt-4" onClick={modfAdh}>
        Guardar
      </button>
    </div>
  );
};

export default FormEditarAdherente;
