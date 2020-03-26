/**
 * @file This file contains the CrudAddLine object.
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
import { CrudEditLine } from "./crudEditLine.js";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudAddLine {

    constructor(crudTable) {
        this.crudTable = crudTable;
        this.element = document.createElement("tr");
        this.element.className = "crudjs-add-line";
        const columns = this.crudTable.getCrudComponent().getData().columns;
        this.initData(columns.length);
        this.fields = [];
        for(var i = 0; i < this.values.length; i++) {
            this.fields.push(new CrudField(i, this, columns[i]));
        }
        this.show();
    }

    initData(size) {
        this.values = new Array(size);
        this.values.status = "N";
        this.values.oldValue = [...this.values];
    }

    show() {
        resetElementHTML(this.element);
        this.addEmptyColumn();
        for(const field of this.fields) {
            field.showEditView();
        }
        if(this.crudTable.getCrudComponent().isEditable()) {
            this.addActionsColumn();
        }
        this.crudTable.enableButtons();
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

    addEmptyColumn() {
        const thEmpty = document.createElement("th");
        thEmpty.setAttribute("scope", "row");
        this.element.appendChild(thEmpty);
    }

    addActionsColumn() {
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-add-btn btn btn-raised btn-secondary mb-1 rounded" title="Ajouter"><i class="fas fa-plus"></i></button>
            <button type="button" style="width:45px;" class="crudjs-add-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="Réinitialiser"><i class="fas fa-times"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-add-btn')[0].onclick = function() {
            for(const field of self.fields) {
                field.validateEdit();
            }
            const values = self.values;
            self.crudTable.getCrudComponent().getData().values.push(values);
            self.crudTable.addCrudLine(new CrudEditLine(values, self.crudTable));

            self.initData(self.values.length);
            for(const field of self.fields) {
                field.prepareEditView();
            }
            self.crudTable.updateLineNumbers();
        };
        tdActions.getElementsByClassName('crudjs-add-cancel-btn')[0].onclick = function() {
            for(const field of self.fields) {
                field.prepareEditView();
            }
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

export { CrudAddLine };
export default CrudAddLine;
