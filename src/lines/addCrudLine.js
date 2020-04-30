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
        super(crudTable, null, "crudjs-add-line");
        if(!this.crudTable.crud.isEditable()) {
            throw new Error("Cannot use AddCrudLine if CRUD is not editable.");
        }
    }

    /* Show methods */

    show() {
        this._prepareShow();
        if(this.crudTable.crud.getOptions().examples != null) {
            this.__addExamplesToggleColumn();
        } else {
            this._addEmptyColumn();
        }
        for(const field of this.fields) {
            field.showEditView();
            this._addColumn(field.element);
        }
        this.__addActionsColumn();
    }

    __addExamplesToggleColumn() {
        const thToggle = document.createElement("th");
        thToggle.setAttribute("scope", "row");
        thToggle.className = "align-middle text-center";
        thToggle.innerHTML = `<i title="${this.crudTable.crud.text("line.btn.example.toggler")}" class="help-toggler fas fa-exclamation-circle fa-lg text-info" style="cursor: pointer;"></i>`;
        this._attachOnClickEvent(thToggle.getElementsByClassName('help-toggler')[0], "helpToggleEvent");
        this.element.appendChild(thToggle);
    }

    __addActionsColumn() {
        const crud = this.crudTable.crud;
        const tdActions = document.createElement("td");
        tdActions.className = "align-middle text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-add-btn btn btn-raised btn-secondary mb-1 rounded" title="${crud.text("line.btn.add")}"><i class="fas fa-plus"></i></button>
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-reset-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.addCancel")}"><i class="fas fa-undo"></i></button>
        `;
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-add-btn')[0], "addEvent");
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-reset-btn')[0], "resetEvent");
        this.element.appendChild(tdActions);
    }

    /* Events */

    helpToggleEvent() {
        this.crudTable.helpToggleEvent();
    }

    resetEvent() {
        for(const field of this.fields) {
            field.value = field.defaultValue;
            field.update();
        }
    }

    addEvent() {
        const errorMessages = [];
        for(let i = 0; i < this.values.length; i++) {
            if(!this.fields[i].isValid()) {
                const helpText = this.fields[i].helpText;
                errorMessages.push(`${this.crudTable.crud.text("line.messages.invalidColumn")} '${this.fields[i].columnDesc.name}'${(helpText.length>0)?` − ${helpText}`:""}`);
            }
        }
        if(errorMessages != null && errorMessages.length > 0) {
            for(const errorMsg of errorMessages) {
                this.crudTable.crud.addMessage("warning", this.crudTable.crud.text("basic.warning"), errorMsg, 10000);
            }
        } else {
            for(let i = 0; i < this.values.length; i++) {
                this.values[i] = this.fields[i].validate();
            }
            this.crudTable.appendNewEditCrudLine(new EditCrudLine(this.crudTable, this.values));
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
