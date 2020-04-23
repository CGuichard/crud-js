/**
 * @file This file contains the CrudLine object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 * @since 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Options JSHint
 * ------------------------------------------------------------------------
 */

/* jshint esversion: 6 */

/**
 * ------------------------------------------------------------------------
 * Imports
 * ------------------------------------------------------------------------
 */

import { resetElementHTML } from "../utils.js";
import { CrudFieldFactory } from "./fields/crudFieldFactory.js";

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

/**
 * CrudField possible states enumeration.
 *
 * @constant
 * @type {object}
 * @property {number} VIEW - CrudField view value.
 * @property {number} EDIT - CrudField edit value.
 */
const LINE_STATE = Object.freeze({ NEW: "N", MODIFIED: "M", DELETED: "D", SAVED: "S" });

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudLine {

    static createEmptyValues(size) {
        const values = new Array(size);
        values.status = LINE_STATE.NEW;
        values.oldValue = [...values];
        return values;
    }

    constructor(crudTable, lineArray) {
        this._crudTable = crudTable;
        this._element = document.createElement("tr");
        this._columns = this._crudTable.crud.getData().columns;
        this._values = (lineArray != null) ? lineArray : CrudLine.createEmptyValues(this._columns.length);
        const factory = CrudFieldFactory.getInstance();
        this._fields = [];
        for(var i = 0; i < this._values.length; i++) {
            const field = factory.create(this._columns[i].type, this._values[i], this._columns[i], this._crudTable.crud);
            this._fields.push(field);
        }
    }

    /* Getters & Setters */

    get crudTable() {
        return this._crudTable;
    }

    get element() {
        return this._element;
    }

    get columns() {
        return this._columns;
    }

    get values() {
        return this._values;
    }

    get fields() {
        return this._fields;
    }

    get status() {
        return this._values.status;
    }

    set values(val) {
        if(val.length == this.values.length)
            this._values = val;
    }

    set status(val) {
        this._values.status = val;
    }

    /* State methods */

    isNew() {
        return this.status == LINE_STATE.NEW;
    }

    isModified() {
        return this.status == LINE_STATE.MODIFIED;
    }

    isDeleted() {
        return this.status == LINE_STATE.DELETED;
    }

    isSaved() {
        return this.status == LINE_STATE.SAVED;
    }

    goNew() {
        this.status = LINE_STATE.NEW;
    }

    goModified() {
        this.status = LINE_STATE.MODIFIED;
    }

    goDeleted() {
        this.status = LINE_STATE.DELETED;
    }

    goSaved() {
        this.status = LINE_STATE.SAVED;
    }

    /* Show methods */

    hide() {
        this.element.style.display = "none";
    }

    remove() {
        this.element.remove();
        const dataValues = this.crudTable.crud.getData().values;
        dataValues.splice(dataValues.indexOf(this.values), 1);
    }

    _reset() {
        this.values = CrudLine.createEmptyValues(this.values.length);
        this._update();
    }

    _update() {
        for(let i = 0; i < this.values.length; i++) {
            this.fields[i].value = this.values[i];
            this.fields[i].update();
        }
    }

    _prepareShow() {
        resetElementHTML(this.element);
    }

    _addColumn(col) {
        this.element.appendChild(col);
    }

    _addEmptyColumn() {
        const thEmpty = document.createElement("th");
        thEmpty.setAttribute("scope", "row");
        this.element.appendChild(thEmpty);
    }

    /* Events */

    _attachOnClickEvent(element, eventFuncName) {
        const self = this;
        element.onclick = function() { self[eventFuncName](); };
    }

    /* Abstract methods */

    show() {
        throw new Error("Method not implemented");
    }

}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudLine, LINE_STATE };
export default CrudLine;
