/**
 * @file This file contains the CrudEditLine object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
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

 import { resetElementHTML } from "./utils.js";
 import { CrudField } from "./crudField.js";

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
        for(var i = 0; i < this.values.length; i++) {
            this.fields.push(new CrudField(i, this, this.crudTable.getCrudComponent().getData().columns[i]));
        }
        this.showDisplayView();
    }

    showDisplayView() {
        resetElementHTML(this.element);
        this.addNumberColumn();
        for(const field of this.fields) {
            field.showDisplayView();
        }
        if(this.crudTable.getCrudComponent().isEditable()) {
            this.addActionsColumn();
        }
        this.crudTable.enableButtons();
    }

    showEditView() {
        if(this.crudTable.getCrudComponent().isEditable()) {
            resetElementHTML(this.element);
            this.addNumberColumn();
            for(const field of this.fields) {
                field.showEditView();
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
        thNumber.className = "crudjs-line-number align-middle";
        thNumber.setAttribute("scope", "row");
        this.element.appendChild(thNumber);
    }

    addActionsColumn() {
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-edit-btn btn btn-raised btn-info mb-1 rounded" title="Editer"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" style="width:45px;" class="crudjs-delete-btn btn btn-raised btn-danger mb-1 rounded" data-toggle="modal" data-target="#`+this.crudTable.modalDeleteId+`" title="Supprimer"><i class="fas fa-trash"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-edit-btn')[0].onclick = function() {
            self.showEditView();
            self.crudTable.updateLineNumbers();
        };
        tdActions.getElementsByClassName('crudjs-delete-btn')[0].onclick = function() {
            const btnValidDelete = self.crudTable.getModalDelete().getElementsByClassName('crudjs-modal-valid')[0];
            btnValidDelete.onclick = function() {
                if(self.getStatus() !== "N") {
                    self.setStatus("D");
                    self.element.style.display = "none";
                } else {
                    self.element.remove();
                    const lineArray = self.crudTable.getCrudComponent().getData().values;
                    lineArray.splice(lineArray.indexOf(self.values), 1);
                }
                self.crudTable.updateLineNumbers();
            };
        };
        this.element.appendChild(tdActions);
    }

    addEditActionsColumn() {
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-valid-btn btn btn-raised btn-success mb-1 rounded" title="Valider"><i class="fas fa-sm fa-check"></i></button>
            <button type="button" style="width:45px;" class="crudjs-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="Annuler"><i class="fas fa-times"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-valid-btn')[0].onclick = function() {

            for(const field of self.fields) {
                field.validateEdit();
            }

            if(self.getStatus() === "S") {
                self.setStatus("M");
            }

            self.showDisplayView();
            self.crudTable.updateLineNumbers();
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
