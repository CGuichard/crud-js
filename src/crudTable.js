/**
 * @file This file contains the CrudTable object.
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

import { createElement, isHidden, resetElementHTML } from "./utils.js";
import { AddCrudLine } from "./lines/addCrudLine.js";
import { EditCrudLine } from "./lines/editCrudLine.js";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudTable {

    constructor(crud) {
        this.crud = crud;
        this.element = createElement("<div class=\"table-responsive\"></div>");
        this.element.innerHTML = `
        <table class="table">
          <thead class="thead-light">
          </thead>
          <tbody>
          </tbody>
        </table>
        `;
        this.thead = this.element.getElementsByTagName('thead')[0];
        this.tbody = this.element.getElementsByTagName('tbody')[0];
        this.deleteModalMessage = this.crud.text("table.modal.delete.message");
        this.deleteModalId = "crudjs-modal-" + (++CrudTable.ID);
        this.deleteModal = this.createModal();
    }

    // Displays

    render() {
        this.resetTable();
        this.renderHead();
        this.renderLines();
        this.renderModal();
        this.updateLineNumbers();
    }

    resetTable() {
        resetElementHTML(this.thead);
        resetElementHTML(this.tbody);
    }

    renderHead() {
        this.thead.innerHTML = `<tr><th scope="col"><strong>#</strong></th></tr>`;
        for(const col of this.crud.getData().columns) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.innerHTML = "<strong>"+col.name+"</strong>";
            this.thead.children[0].appendChild(th);
        }
        if(this.crud.isEditable()) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.className = "text-right pr-3";
            th.innerHTML = `<strong>${this.crud.text("table.column.actionName")}</strong>`;
            this.thead.children[0].appendChild(th);
        }
    }

    renderLines() {
        if(this.getCrud().isEditable()) {
            this.addCrudLine(new AddCrudLine(this));
        }
        const values = this.crud.getData().values;
        for(var i = 0; i < values.length; i++) {
            this.addCrudLine(new EditCrudLine(this, values[i]));
        }
    }

    renderModal() {
        const options = this.crud.getData().options;
        if(options != null && options.deleteMessage != null) {
            this.setDeleteModalMessage(options.deleteMessage);
        }
    }

    updateLineNumbers() {
        let i = 1;
        for(const elem of this.element.getElementsByClassName('crudjs-line-number')) {
            if(!isHidden(elem.parentNode)) {
                elem.textContent = i++;
            }
        }
    }

    addCrudLine(crudLine) {
        crudLine.show();
        this.tbody.appendChild(crudLine.element);
    }

    disableButtons() {
        for(const elem of this.element.getElementsByClassName('crudjs-action-btn')) {
            elem.disabled = true;
        }
    }

    enableButtons() {
        for(const elem of this.element.getElementsByClassName('crudjs-action-btn')) {
            elem.disabled = false;
        }
    }

    createModal() {
        const modalDelete = createElement(`
        <div class="modal fade" id="`+this.deleteModalId+`" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${this.crud.text("table.modal.delete.title")}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="delete-message">
                    ${this.deleteModalMessage}
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary mr-1" data-dismiss="modal">${this.crud.text("basic.no")}</button>
                <button type="button" class="btn btn-raised btn-info crudjs-modal-valid" data-dismiss="modal">${this.crud.text("basic.yes")}</button>
              </div>
            </div>
          </div>
        </div>
        `);
        document.body.appendChild(modalDelete);
        return modalDelete;
    }

    // Getters and Setters

    getElement() {
        return this.element;
    }

    getDeleteModal() {
        return this.deleteModal;
    }

    getDeleteModalId() {
        return this.deleteModalId;
    }

    getCrud() {
        return this.crud;
    }

    setDeleteModalMessage(val) {
        this.deleteModalMessage = val;
        if(this.deleteModal != null) {
            const tmp = this.deleteModal.getElementsByClassName("delete-message");
            if(tmp.length > 0) {
                tmp[0].textContent = this.deleteModalMessage;
            }
        }
    }

}

/**
 * ------------------------------------------------------------------------
 * Code Run
 * ------------------------------------------------------------------------
 */

CrudTable.ID = 0;

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudTable };
export default CrudTable;
