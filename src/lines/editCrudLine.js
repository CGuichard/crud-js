/**
 * @file This file contains the EditCrudLine object.
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

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class EditCrudLine extends CrudLine {

    constructor(crudTable, lineArray) {
        super(crudTable, lineArray, "crudjs-edit-line");
    }

    /* Getters & Setters */

    get role() {
        return "EDIT";
    }

    /* Show methods */

    show() {
        this.showDisplayView();
    }

    showDisplayView() {
        this._prepareShow();
        this.__addNumberColumn();
        for(const field of this.fields) {
            field.showDisplayView();
            this._addColumn(field.element);
        }
        if(this.crudTable.crud.isEditable()) {
            this.__addActionsColumn();
        }
    }

    showEditView() {
        if(this.crudTable.crud.isEditable()) {
            this._prepareShow();
            this.__addNumberColumn();
            for(const field of this.fields) {
                field.showEditView();
                this._addColumn(field.element);
            }
            this.__addEditActionsColumn();
        }
    }

    __addNumberColumn() {
        const thNumber = document.createElement("th");
        thNumber.setAttribute("scope", "row");
        thNumber.className = "crudjs-line-number align-middle text-center";
        this.element.appendChild(thNumber);
    }

    __addActionsColumn() {
        const crud = this.crudTable.crud;
        const tdActions = document.createElement("td");
        tdActions.className = "align-middle text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-edit-btn btn btn-raised btn-info mb-1 rounded" title="${crud.text("line.btn.edit")}"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-delete-btn btn btn-raised btn-danger mb-1 rounded" data-toggle="modal" data-target="#${this.crudTable.deleteModalId}" title="${crud.text("line.btn.delete")}"><i class="fas fa-trash"></i></button>
        `;
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-edit-btn')[0], "editEvent");
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-delete-btn')[0], "deleteEvent");
        this.element.appendChild(tdActions);
    }

    __addEditActionsColumn() {
        const crud = this.crudTable.crud;
        const tdActions = document.createElement("td");
        tdActions.className = "align-middle text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-validate-btn btn btn-raised btn-success mb-1 rounded" title="${crud.text("line.btn.validate")}"><i class="fas fa-sm fa-check"></i></button>
            <button type="button" style="width:45px;" class="crudjs-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.cancel")}"><i class="fas fa-times"></i></button>
        `;
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-validate-btn')[0], "validateEditEvent");
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-cancel-btn')[0], "cancelEditEvent");
        this.element.appendChild(tdActions);
    }

    /* Events */

    editEvent() {
        this.showEditView();
        this.crudTable.updateLineNumbers();
        this.crudTable.disableButtons();
    }

    deleteEvent() {
        const self = this;
        const btnValidDelete = this.crudTable.deleteModal.getElementsByClassName('crudjs-modal-valid')[0];
        btnValidDelete.onclick = function() {
            if(self.isModified() || self.isSaved()) {
                self.goDeleted();
                self.hide();
            } else if(self.isNew()) {
                self.delete();
            }
            self.crudTable.updateLineNumbers();
            self.crudTable.enableButtons();
        };
    }

    validateEditEvent() {
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
            if(this.isSaved()) {
                this.goModified();
            }
            this.showDisplayView();
            this.crudTable.updateLineNumbers();
            this.crudTable.enableButtons();
        }

    }

    cancelEditEvent() {
        this.showDisplayView();
        this.crudTable.updateLineNumbers();
        this.crudTable.enableButtons();
    }

}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { EditCrudLine };
export default EditCrudLine;
