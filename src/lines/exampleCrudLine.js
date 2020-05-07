/**
 * @file This file contains the ExampleCrudLine object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
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

import { hide } from "../utils.js";
import { CrudLine } from "./crudLine.js";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class ExampleCrudLine extends CrudLine {

    constructor(crudTable, lineArray) {
        super(crudTable, lineArray, "crudjs-example-line");
        this.element.style.backgroundColor = "rgba(253, 108, 158, 0.25)";
        if(!this.crudTable.crud.isEditable()) {
            throw new Error("Cannot use ExampleCrudLine if CRUD is not editable.");
        }
    }

    /* Getters & Setters */

    get role() {
        return "EXAMPLE";
    }

    /* Show methods */

    show() {
        hide(this.element);
        this._prepareShow();
        this.__addExampleTagColumn();
        for(const field of this.fields) {
            field.showDisplayView();
            this._addColumn(field.element);
        }
        this.__addActionsColumn();
    }

    __addExampleTagColumn() {
        const thExampleTag = document.createElement("th");
        thExampleTag.setAttribute("scope", "row");
        thExampleTag.className = "align-middle text-center";
        thExampleTag.innerHTML = `<i class="fas fa-tags text-secondary"></i>`;
        this.element.appendChild(thExampleTag);
    }

    __addActionsColumn() {
        const crud = this.crudTable.crud;
        const tdActions = document.createElement("td");
        tdActions.className = "align-middle text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-example-copy-btn btn btn-raised btn-info mb-1 rounded" title="${crud.text("line.btn.example.copy")}"><i class="fas fa-copy"></i></button>
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-example-hide-btn btn btn-raised btn-danger mb-1 rounded pl-0 pr-0" title="${crud.text("line.btn.example.hide")}"><i class="fas fa-eye-slash"></i></button>
        `;
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-example-copy-btn')[0], "copyEvent");
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-example-hide-btn')[0], "hideEvent");
        this.element.appendChild(tdActions);
    }

    /* Events */

    copyEvent() {
        this.crudTable.copyIntoAdd(this.values);
    }

    hideEvent() {
        if(--this.crudTable.examples.numberShown <= 0) {
            this.crudTable.examples.show = false;
        }
        hide(this.element);
    }

}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { ExampleCrudLine };
export default ExampleCrudLine;
