/**
 * @file This file contains the CrudEditLine object.
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
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudEditLine {

    constructor(lineArray, crudTable) {
        this.values = lineArray;
        this.crudTable = crudTable;
        this.element = document.createElement("tr");
        this.element.className = "crudjs-edit-line";
        this.fields = [];
        const columns = this.crudTable.crud.getData().columns;
        const factory = CrudFieldFactory.getInstance();
        for(var i = 0; i < this.values.length; i++) {
            this.fields.push(factory.create(columns[i].type, this.values[i], columns[i], this.crudTable.crud));
        }
        this.showDisplayView();
    }

    showDisplayView() {
        resetElementHTML(this.element);
        this.addNumberColumn();
        for(const field of this.fields) {
            field.showDisplayView();
            this.addColumn(field.element);
        }
        if(this.crudTable.crud.isEditable()) {
            this.addActionsColumn();
        }
        this.crudTable.enableButtons();
    }

    showEditView() {
        if(this.crudTable.crud.isEditable()) {
            resetElementHTML(this.element);
            this.addNumberColumn();
            for(const field of this.fields) {
                field.showEditView();
                this.addColumn(field.element);
            }
            this.addEditActionsColumn();
            this.crudTable.disableButtons();
        }
    }

    getStatus() {
        return this.values.status;
    }

    setStatus(status) {
        this.values.status = status;
    }

    getElement() {
        return this.element;
    }

    getValues() {
        return this.values;
    }

    addColumn(col) {
        this.element.appendChild(col);
    }

    addNumberColumn() {
        const thNumber = document.createElement("th");
        thNumber.className = "crudjs-line-number text-center";
        thNumber.setAttribute("scope", "row");
        this.element.appendChild(thNumber);
    }

    addActionsColumn() {
        const crud = this.crudTable.crud;
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-edit-btn btn btn-raised btn-info mb-1 rounded" title="${crud.text("line.btn.edit")}"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" style="width:45px;" class="crudjs-delete-btn btn btn-raised btn-danger mb-1 rounded" data-toggle="modal" data-target="#`+this.crudTable.getDeleteModalId()+`" title="${crud.text("line.btn.delete")}"><i class="fas fa-trash"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-edit-btn')[0].onclick = function() {
            self.showEditView();
            self.crudTable.updateLineNumbers();
        };
        tdActions.getElementsByClassName('crudjs-delete-btn')[0].onclick = function() {
            const btnValidDelete = self.crudTable.getDeleteModal().getElementsByClassName('crudjs-modal-valid')[0];
            btnValidDelete.onclick = function() {
                if(self.getStatus() !== "N") {
                    self.setStatus("D");
                    self.element.style.display = "none";
                } else {
                    self.element.remove();
                    const lineArray = self.crudTable.crud.getData().values;
                    lineArray.splice(lineArray.indexOf(self.values), 1);
                }
                self.crudTable.updateLineNumbers();
            };
        };
        this.element.appendChild(tdActions);
    }

    addEditActionsColumn() {
        const crud = this.crudTable.crud;
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-validate-btn btn btn-raised btn-success mb-1 rounded" title="${crud.text("line.btn.validate")}"><i class="fas fa-sm fa-check"></i></button>
            <button type="button" style="width:45px;" class="crudjs-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.cancel")}"><i class="fas fa-times"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-validate-btn')[0].onclick = function() {

            const errorMessages = [];
            for (let i = 0; i < self.values.length; i++) {
                if(!self.fields[i].isValid()) {
                    errorMessages.push(`${crud.text("line.messages.invalidColumn")} '${self.fields[i].columnDesc.name}'`);
                }
            }
            if(errorMessages  != null && errorMessages.length > 0) {
                for (const errorMsg of errorMessages) {
                    crud.addMessage("warning", crud.text("basic.warning"), errorMsg, 15000);
                }
            } else {
                for (let i = 0; i < self.values.length; i++) {
                    self.values[i] = self.fields[i].validate();
                }

                if(self.getStatus() === "S") {
                    self.setStatus("M");
                }

                self.showDisplayView();
                self.crudTable.updateLineNumbers();
            }
        };
        tdActions.getElementsByClassName('crudjs-cancel-btn')[0].onclick = function() {
            self.showDisplayView();
            self.crudTable.updateLineNumbers();
        };
        this.element.appendChild(tdActions);
    }

}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudEditLine };
export default CrudEditLine;
