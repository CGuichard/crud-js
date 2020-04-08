/**
 * @file This file contains the CrudAddLine object.
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
import { CrudEditLine } from "./crudEditLine.js";
import { CrudFieldFactory } from "./fields/crudFieldFactory.js";

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
        const columns = this.crudTable.crud.getData().columns;
        this.initData(columns.length);
        this.fields = [];
        const factory = CrudFieldFactory.getInstance();
        for(var i = 0; i < this.values.length; i++) {
            this.fields.push(factory.create(columns[i].type, this.values[i], columns[i], this.crudTable.crud));
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
            this.addColumn(field.element);
        }
        if(this.crudTable.crud.isEditable()) {
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
        const crud = this.crudTable.crud;
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-add-btn btn btn-raised btn-secondary mb-1 rounded" title="${crud.text("line.btn.add")}"><i class="fas fa-plus"></i></button>
            <button type="button" style="width:45px;" class="crudjs-add-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.addCancel")}"><i class="fas fa-times"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-add-btn')[0].onclick = function() {

            const errorMessages = [];
            for (let i = 0; i < self.values.length; i++) {
                if(!self.fields[i].isValid()) {
                    errorMessages.push(`${crud.text("line.messages.invalidColumn")} '${self.fields[i].columnDesc.name}'`);
                }
            }
            if(errorMessages != null && errorMessages.length > 0) {
                for (const errorMsg of errorMessages) {
                    crud.addMessage("warning", crud.text("basic.warning"), errorMsg, 15000);
                }
            } else {
                for (let i = 0; i < self.values.length; i++) {
                    self.values[i] = self.fields[i].validate();
                }

                const values = self.values;
                self.crudTable.crud.getData().values.push(values);
                self.crudTable.addCrudLine(new CrudEditLine(values, self.crudTable));

                self.initData(self.values.length);
                for (let i = 0; i < self.values.length; i++) {
                    self.fields[i].value = self.values[i];
                    self.fields[i].update();
                }
                self.crudTable.updateLineNumbers();
            }
        };
        tdActions.getElementsByClassName('crudjs-add-cancel-btn')[0].onclick = function() {
            for(const field of self.fields) {
                field.value = field.defaultValue;
                field.update();
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
