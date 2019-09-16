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
    handleChange,
    error,
    newContrato,
    leerDatos,
    nuevoTitular,
    ContratoRef,
    AltaRef,
    VigenciaRef,
    nro_docRef,
    dni
  } = props;

  let tmp = new Date(Date.now());
  let alta = tmp.toISOString().split("T")[0];

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let vigencia = new Date(year, month + 3, day).toISOString().split("T")[0];

  return (
    <div className="form-style-8 ">
      <h2 className="mt-4">Nuevo Socio</h2>

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
                ref={ContratoRef}
                id="contrato"
                name="CONTRATO"
                value={newContrato}
                placeholder="Contrato"
                readOnly
              />
              <label>CONTRATO</label>
            </p>
          </div>

          <div className="form-group col-md-6">
            <GrupoSelect
              options={grupos}
              placeholder={"Grupo"}
              onChange={value => handleChange(value, "GRUPO")}
            />
          </div>

          <div className="form-group col-md-6">
            <ZonaSelect
              options={zonas}
              placeholder={"Zona"}
              onChange={value => handleChange(value, "ZONA")}
            />
          </div>

          <div className="form-group col-md-6">
            <SucursalSelect
              options={sucursal}
              placeholder={"Sucursal"}
              onChange={value => handleChange(value, "SUCURSAL")}
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
              onChange={value => handleChange(value, "SUBPLAN")}
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
            <ProductorSelect
              options={productores}
              placeholder={"Productor"}
              onChange={value => handleChange(value, "PRODUCTOR")}
            />
          </div>

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                onChange={leerDatos}
                name="CUOTA"
                placeholder="Cuota"
              />
              <label>Cuota</label>
            </p>
          </div>
          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                onChange={leerDatos}
                name="RECIBO"
                placeholder="Nº Recibo"
              />
              <label>Nº de Recibo</label>
            </p>
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
                ref={nro_docRef}
                id="in-range-input"
                name="NRO_DOC"
                minLength="8"
                placeholder="DNI"
                defaultValue={dni}
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

          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="Number"
                className=""
                id="telefono"
                onChange={leerDatos}
                name="TELEFONO"
                placeholder="Telefono"
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
                onChange={leerDatos}
                name="MOVIL"
                placeholder="Celular"
              />
              <label>Celular</label>
            </p>
          </div>
        </div>

        {/* DATOS DEL DOMICILIO */}

        <h2 className="mt-4">Domicilio</h2>

        <div className="form-row mt-2">
          <div className="form-group col-md-6">
            <p className="has-dynamic-label">
              <input
                type="text"
                className=""
                name="CALLE"
                onChange={leerDatos}
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
                onChange={leerDatos}
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
                onChange={leerDatos}
                id="dynamic-label-input"
                name="BARRIO"
                placeholder="Barrio"
              />
              <label>Barrio</label>
            </p>
          </div>

          <div className="form-group col-md-6">
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
                onChange={leerDatos}
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
                onChange={leerDatos}
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
      <button className="btn btn-primary btn-block mt-4" onClick={nuevoTitular}>
        Guardar
      </button>
    </div>
  );
};

export default FormNuevoTitular;
