/**
 * @file This file contains the CrudTable object.
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

import { createElement, resetElementHTML, isHidden, hide, show } from "./utils.js";
import { AddCrudLine } from "./lines/addCrudLine.js";
import { EditCrudLine } from "./lines/editCrudLine.js";
import { ExampleCrudLine } from "./lines/exampleCrudLine.js";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudTable {

    constructor(crud) {
        this._crud = crud;
        this._horizontalScroll = false;
        this._examples = { show: false, number: 0, numberShown: 0 };
        this._lines = [];
        this._element = createElement("<div class=\"table-responsive\"></div>");
        this._element.innerHTML = `
        <table class="table">
          <thead class="thead-light">
          </thead>
          <tbody>
          </tbody>
        </table>
        `;
        this._thead = this._element.getElementsByTagName('thead')[0];
        this._tbody = this._element.getElementsByTagName('tbody')[0];
        this._deleteModalMessage = this._crud.text("table.modal.delete.message");
        this._deleteModalId = `crudjs-modal-${++CrudTable.ID}`;
        this._deleteModal = this.createModal();
    }

    // Displays

    render() {
        this._resetTable();
        this._renderHead();
        this._renderLines();
        this._renderModal();
        this.updateLineNumbers();
        this._addEvents();
    }

    _resetTable() {
        resetElementHTML(this._thead);
        resetElementHTML(this._tbody);
    }

    _renderHead() {
        this._thead.innerHTML = `<tr><th scope="col"><strong>#</strong></th></tr>`;
        for(const col of this._crud.getColumns()) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.innerHTML = `<strong>${col.name}</strong>`;
            this._thead.children[0].appendChild(th);
        }
        if(this._crud.isEditable()) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.className = "text-right pr-3";
            th.innerHTML = `<strong>${this._crud.text("table.column.actionName")}</strong>`;
            this._thead.children[0].appendChild(th);
        }
    }

    _renderLines() {
        if(this._crud.isEditable()) {
            const options = this._crud.getOptions();
            if(options.examples != null) {
                for(let i = 0; i < options.examples.length; i++) {
                    this._examples.number++;
                    this._appendCrudLine(new ExampleCrudLine(this, options.examples[i]));
                }
            }
            this._appendCrudLine(new AddCrudLine(this));
        }
        const values = this._crud.getValues();
        for(let i = 0; i < values.length; i++) {
            this._appendCrudLine(new EditCrudLine(this, values[i]));
        }
    }

    _renderModal() {
        const options = this._crud.getOptions();
        if(options.deleteMessage != null) {
            this.deleteModalMessage = options.deleteMessage;
        }
    }

    _addEvents() {
        const self = this;
        this._element.onmousedown = function() {
            self._horizontalScroll = this.clientWidth < this.children[0].clientWidth;
        };
        this._element.onmouseup = function() {
            self._horizontalScroll = false;
        };
        this._element.addEventListener("wheel", function(event) {
            if(event.type == 'wheel' && self._horizontalScroll) {
                this.scrollLeft -= ((((event.deltaY || -event.wheelDelta || event.detail) >> 10) || 1) * -50);
                event.preventDefault();
            }
        });
    }

    updateLineNumbers() {
        let i = 1;
        for(const elem of this._element.getElementsByClassName('crudjs-line-number')) {
            if(!isHidden(elem.parentNode)) {
                elem.textContent = i++;
            }
        }
    }

    // Events

    helpToggleEvent() {
        this._examples.show = !this._examples.show;
        if(this._examples.show) {
            for(const elem of this._element.getElementsByClassName('crudjs-example-line')) {
                show(elem);
            }
            this._examples.numberShown = this._examples.number;
        } else {
            for(const elem of this._element.getElementsByClassName('crudjs-example-line')) {
                hide(elem);
            }
            this._examples.numberShown = 0;
        }
    }

    // Other methods

    copyIntoAdd(values) {
        for(let i = 0; i < this._lines.length; i++) {
            if(this._lines[i].role === "ADD") {
                this._lines[i].values = values;
                this._lines[i].update();
            }
        }
    }

    _appendCrudLine(crudLine) {
        this._lines.push(crudLine);
        this._tbody.appendChild(crudLine.element);
        crudLine.show();
    }

    hideCrudLine(crudLine) {
        crudLine.element.remove();
        const indexL = this._lines.indexOf(crudLine);
        if(indexL != -1) {
            this._lines.splice(indexL, 1);
        }
    }

    deleteCrudLine(crudLine) {
        crudLine.element.remove();
        const dataValues = this._crud.getValues();
        const indexV = dataValues.indexOf(crudLine.values);
        const indexL = this._lines.indexOf(crudLine);
        if(indexV != -1) {
            dataValues.splice(indexV, 1);
        }
        if(indexL != -1) {
            this._lines.splice(indexL, 1);
        }
    }

    appendNewEditCrudLine(editCrudLine) {
        this._crud.getValues().push(editCrudLine.values);
        const editLines = this._tbody.getElementsByClassName('crudjs-edit-line');
        if(editLines.length > 0) {
            for(let i = 0; i < this._lines.length; i++) {
                if(this._lines[i].constructor.name == "EditCrudLine") {
                    this._lines.splice(i, 0, editCrudLine);
                    break;
                }
            }
            this._tbody.insertBefore(editCrudLine.element, editLines[0]);
        } else {
            this._lines.push(editCrudLine);
            this._tbody.appendChild(editCrudLine.element);
        }
        editCrudLine.show();
    }

    disableButtons() {
        const saveButton = this._crud.getAttr("saveButton");
        if(saveButton != null) {
            saveButton.disabled = true;
        }
        for(const elem of this._element.getElementsByClassName('crudjs-action-btn')) {
            elem.disabled = true;
        }
    }

    enableButtons() {
        const saveButton = this._crud.getAttr("saveButton");
        if(saveButton != null) {
            saveButton.disabled = false;
        }
        for(const elem of this._element.getElementsByClassName('crudjs-action-btn')) {
            elem.disabled = false;
        }
    }

    createModal() {
        const modalDelete = createElement(`
        <div class="modal fade" id="${this._deleteModalId}" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${this._crud.text("table.modal.delete.title")}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="delete-message">
                    ${this._deleteModalMessage}
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary mr-1" data-dismiss="modal">${this._crud.text("basic.no")}</button>
                <button type="button" class="btn btn-raised btn-info crudjs-modal-valid" data-dismiss="modal">${this._crud.text("basic.yes")}</button>
              </div>
            </div>
          </div>
        </div>
        `);
        document.body.appendChild(modalDelete);
        return modalDelete;
    }

    // Getters and Setters

    get element() {
        return this._element;
    }

    get crud() {
        return this._crud;
    }

    get lines() {
        return this._lines;
    }

    get deleteModal() {
        return this._deleteModal;
    }

    get deleteModalId() {
        return this._deleteModalId;
    }

    get deleteModalMessage() {
        return this._deleteModalMessage;
    }

    get horizontalScroll() {
        return this._horizontalScroll;
    }

    get examples() {
        return this._examples;
    }

    set lines(val) {
        this._lines = val;
    }

    set deleteModalMessage(val) {
        this._deleteModalMessage = val;
        if(this._deleteModal != null) {
            const tmp = this._deleteModal.getElementsByClassName("delete-message");
            if(tmp.length > 0) {
                tmp[0].textContent = this._deleteModalMessage;
            }
        }
    }

    set horizontalScroll(val) {
        this._horizontalScroll = val;
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
