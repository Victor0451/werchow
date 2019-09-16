import React from "react";
import OSSelect from "react-select";
import PlanSelect from "react-select";
import SubPlanSelect from "react-select";
import SucursalSelect from "react-select";
import ProductorSelect from "react-select";
import ParentescoSelect from "react-select";
import SeguroVidaSelect from "react-select";

import {
  productores,
  obra_social,
  planes,
  subplanes,
  parentesco,
  sucursal,
  segurovida
} from "../layouts/Arrays/arrays";

const FormNuevoAdherente = props => {
  const {
    error,
    leerDatos,
    nuevoAdh,
    Nro_DocRef,
    AltaRef,
    VigenciaRef,
    id,
    handleChange
  } = props;

  let tmp = new Date(Date.now());
  let alta = tmp.toISOString().split("T")[0];

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let vigencia = new Date(year, month + 3, day).toISOString().split("T")[0];

  return (
    <div className="form-style-8">
      <h2 className="mt-4">Nuevo Adherente</h2>
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
                id="contrato"
                name="CONTRATO"
                placeholder="Contrato"
                onChange={leerDatos}
              />
              <label>CONTRATO</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <SucursalSelect
              options={sucursal}
              placeholder={"Sucursal"}
              onChange={value => handleChange(value, "SUCURSAL")}
            />
          </div>

          <div className="form-group col-md-6">
            <SeguroVidaSelect
              options={segurovida}
              placeholder={"Seguro de Vida"}
              onChange={value => handleChange(value, "TSEG")}
            />
          </div>

          <div className="form-group col-md-6">
            <PlanSelect
              options={planes}
              placeholder={"Plan"}
              onChange={value => handleChange(value, "PLAN")}
            />
          </div>

          <div className="form-group col-md-6">
            <SubPlanSelect
              options={subplanes}
              placeholder={"Sub Plan"}
              onChange={value => handleChange(value, "SUB_PLAN")}
            />
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                onChange={leerDatos}
                id="dynamic-label-input"
                name="SEGURO_VIDA"
                placeholder="Seguro de Vida"
              />
              <label>Seguro de Vida</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <ProductorSelect
              options={productores}
              placeholder={"Productor"}
              onChange={value => handleChange(value, "PRODUCTOR")}
            />
          </div>
        </div>

        {/* DATOS DEL TITULAR */}

        <h2 className="mt-4">Informacion Personal</h2>

        <div className="form-group">
          <p className="has-dynamic-label">
            <input
              type="text"
              className=""
              onChange={leerDatos}
              id="dynamic-label-input"
              name="APELLIDOS"
              placeholder="Apellidos"
            />
            <label>Apellidos</label>
          </p>
        </div>

        <div className="form-group">
          <p className="has-dynamic-label">
            <input
              type="text"
              className=""
              onChange={leerDatos}
              id="dynamic-label-input"
              name="NOMBRES"
              placeholder="Nombres"
            />
            <label>Nombres</label>
          </p>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <ParentescoSelect
              options={parentesco}
              placeholder={"Parentesco"}
              onChange={value => handleChange(value, "PARENT")}
            />
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="date"
                id="dynamic-label-input"
                onChange={leerDatos}
                name="NACIMIENTO"
                data-placeholder="Fecha de Nacimiento"
                aria-required="true"
              />
              <label>Fecha de Nacimiento</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="number"
                className=""
                ref={Nro_DocRef}
                id="in-range-input"
                name="NRO_DOC"
                minLength="8"
                placeholder="DNI"
                value={id}
                readOnly
              />
              <label>DNI</label>
            </p>
          </div>

          <div className="form-group col-md-6" defaultValue={"Default"}>
            <p className="has-dynamic-label" defaultValue={"Default"}>
              <select
                id="dynamic-label-input"
                onChange={leerDatos}
                defaultValue={"Default"}
                className=""
                name="SEXO"
              >
                <option value="Default">Sexo</option>
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
                onChange={leerDatos}
                id="dynamic-label-input"
                data-placeholder="Fecha de Alta"
                name="ALTA"
                aria-required="true"
                defaultValue={alta}
                ref={AltaRef}
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
                onChange={leerDatos}
                name="VIGENCIA"
                data-placeholder="Fecha de Vigencia"
                aria-required="true"
                defaultValue={vigencia}
                ref={VigenciaRef}
              />
              <label>Vigencia</label>
            </p>
          </div>
          <div className="form-group col-md-6">
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

      <button className="btn btn-primary btn-block mt-4" onClick={nuevoAdh}>
        Guardar
      </button>
    </div>
  );
};

export default FormNuevoAdherente;
