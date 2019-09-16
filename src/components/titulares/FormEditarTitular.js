import React from "react";

import OSSelect from "react-select";
import ZonaSelect from "react-select";
import GrupoSelect from "react-select";
import PlanSelect from "react-select";
import SubPlanSelect from "react-select";
import SucursalSelect from "react-select";
import ProductorSelect from "react-select";
import LocalidadesSelect from "react-select";
import SeguroVidaSelect from "react-select";

import {
  localidades,
  grupos,
  productores,
  zonas,
  obra_social,
  planes,
  subplanes,
  sucursal,
  segurovida
} from "../layouts/Arrays/arrays";

const FormNuevoTitular = props => {
  const {
    titular,
    error,
    altaRef,
    apellidosRef,
    movilRef,
    contratoRef,
    nacimientoRef,
    nombresRef,
    nro_docRef,
    sexoRef,
    telefonoRef,
    vigenciaRef,
    calleRef,
    nro_calleRef,
    domi_cobrRef,
    dom_labRef,
    barrioRef,
    modificarTit,
    handleChange
  } = props;

  return (
    <div className="form-style-8 ">
      <h2 className="mt-4">Editar Socio</h2>

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
                value={titular.CONTRATO}
                placeholder="Contrato"
                readOnly
              />
              <label>CONTRATO</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <label className="badge badge-info"> GRUPO: {titular.GRUPO}</label>
            <GrupoSelect
              options={grupos}
              placeholder={"Grupo"}
              onChange={value => handleChange(value, "GRUPO")}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="badge badge-info"> ZONA: {titular.ZONA}</label>
            <ZonaSelect
              options={zonas}
              placeholder={"Zona"}
              onChange={value => handleChange(value, "ZONA")}
            />
          </div>

          <div className="form-group col-md-6">
            <label className="badge badge-info">
              {" "}
              SUCURSAL: {titular.SUCURSAL}
            </label>
            <SucursalSelect
              options={sucursal}
              placeholder={"Sucursal"}
              onChange={value => handleChange(value, "SUCURSAL")}
            />
          </div>

          <div className="form-group col-md-6">
            <label className="badge badge-info">PLAN: {titular.PLAN}</label>
            <PlanSelect
              options={planes}
              placeholder={"Plan"}
              onChange={value => handleChange(value, "PLAN")}
            />
          </div>

          <div className="form-group col-md-6">
            <label className="badge badge-info">
              {" "}
              SUB_PLAN: {titular.SUB_PLAN}
            </label>
            <SubPlanSelect
              options={subplanes}
              placeholder={"Sub Plan"}
              onChange={value => handleChange(value, "SUBPLAN")}
            />
          </div>

          <div className="form-group col-md-6">
            {!titular.TSEG ? (
              <label className="badge badge-info">
                No tiene seleccionado ningun seguro{" "}
              </label>
            ) : (
              <label className="badge badge-info">
                SEGURO: {titular.TSEG}{" "}
              </label>
            )}
            <SeguroVidaSelect
              options={segurovida}
              placeholder={"Seguro de Vida"}
              onChange={value => handleChange(value, "TSEG")}
            />
          </div>

          <div className="form-group col-md-6">
            {" "}
            <label className="badge badge-info">
              {" "}
              PRODUCTOR: {titular.PRODUCTOR}
            </label>
            <ProductorSelect
              options={productores}
              placeholder={"Productor"}
              onChange={value => handleChange(value, "PRODUCTOR")}
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
              defaultValue={titular.APELLIDOS}
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
              defaultValue={titular.NOMBRES}
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
                defaultValue={titular.NACIMIENTO}
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
                defaultValue={titular.NRO_DOC}
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
                <option value="">{titular.SEXO}</option>
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
                defaultValue={titular.ALTA}
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
                defaultValue={titular.VIGENCIA}
                ref={vigenciaRef}
              />
              <label>Vigencia</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <label className="badge badge-info">
              OBRA SOCIAL: {titular.OBRA_SOC}
            </label>
            <OSSelect
              options={obra_social}
              placeholder={"Obra Social"}
              onChange={value => handleChange(value, "OBRA_SOC")}
            />
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="Number"
                className=""
                id="telefono"
                name="TELEFONO"
                placeholder="Telefono"
                ref={telefonoRef}
                defaultValue={titular.TELEFONO}
              />
              <label>Telefono</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="Number"
                className=""
                id="celular"
                name="MOVIL"
                placeholder="Celular"
                ref={movilRef}
                defaultValue={titular.MOVIL}
              />
              <label>Celular</label>
            </p>
          </div>
        </div>

        <h2 className="mt-4">Domicilio</h2>

        <div className="form-row mt-2">
          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                name="CALLE"
                defaultValue={titular.CALLE}
                ref={calleRef}
                placeholder="Domicilio"
              />
              <label>Domicilio</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                name="NRO_CALLE"
                defaultValue={titular.NRO_CALLE}
                ref={nro_calleRef}
                placeholder="Numero"
              />
              <label>Numero</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                defaultValue={titular.BARRIO}
                ref={barrioRef}
                id="dynamic-label-input"
                name="BARRIO"
                placeholder="Barrio"
              />
              <label>Barrio</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <label className="badge badge-info">BARRIO: {titular.BARRIO}</label>
            <LocalidadesSelect
              options={localidades}
              placeholder={"Localidad"}
              onChange={value => handleChange(value, "LOCALIDAD")}
            />
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                name="DOMI_COBR"
                defaultValue={titular.DOMI_COBR}
                ref={domi_cobrRef}
                placeholder="Domicilio Cobrador"
              />
              <label>Domicilio de Cobranza</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                name="DOM_LAB"
                defaultValue={titular.DOM_LAB}
                ref={dom_labRef}
                placeholder="Domicilio Laboral"
              />
              <label>Domicilio Laboral</label>
            </p>
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
      <button className="btn btn-primary btn-block mt-4" onClick={modificarTit}>
        Guardar
      </button>
    </div>
  );
};

export default FormNuevoTitular;
