/**
 * @file This file contains the AddCrudLine object.
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

import { CrudLine } from "./crudLine.js";
import { EditCrudLine } from "./editCrudLine.js";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class AddCrudLine extends CrudLine {

    constructor(crudTable) {
        super(crudTable);
        if(this.crudTable.crud.isEditable()) {
            this.element.className = "crudjs-add-line";
        } else {
            throw new Error("Cannot use AddCrudLine if CRUD is not ");
        }
    }

    /* Show methods */

    show() {
        this._prepareShow();
        this._addEmptyColumn();
        for(const field of this.fields) {
            field.showEditView();
            this._addColumn(field.element);
        }
        this.__addActionsColumn();
    }

    __addActionsColumn() {
        const crud = this.crudTable.crud;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-add-btn btn btn-raised btn-secondary mb-1 rounded" title="${crud.text("line.btn.add")}"><i class="fas fa-plus"></i></button>
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-reset-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.addCancel")}"><i class="fas fa-times"></i></button>
        `;
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-add-btn')[0], "addEvent");
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-reset-btn')[0], "resetEvent");
        this.element.appendChild(tdActions);
    }

    /* Events */

    resetEvent() {
        for(const field of this.fields) {
            field.value = field.defaultValue;
            field.update();
        }
    }

    addEvent() {
        const crud = this.crudTable.crud;
        const errorMessages = [];
        for(let i = 0; i < this.values.length; i++) {
            if(!this.fields[i].isValid()) {
                errorMessages.push(`${crud.text("line.messages.invalidColumn")} '${this.fields[i].columnDesc.name}'`);
            }
        }
        if(errorMessages != null && errorMessages.length > 0) {
            for(const errorMsg of errorMessages) {
                crud.addMessage("warning", crud.text("basic.warning"), errorMsg, 15000);
            }
        } else {
            for(let i = 0; i < this.values.length; i++) {
                this.values[i] = this.fields[i].validate();
            }
            const values = this.values;
            crud.getData().values.push(values);
            this.crudTable.addCrudLine(new EditCrudLine(this.crudTable, values));
            this._reset();
            this.crudTable.updateLineNumbers();
        }
    }

}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { AddCrudLine };
export default AddCrudLine;
