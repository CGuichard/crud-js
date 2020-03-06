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

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudTable {

    constructor(crudComponent) {
        this.crudComponent = crudComponent;
        this.element = createElement("<div class=\"table-responsive\"></div>");
        this.element.innerHTML = `
        <table class="table table-hover">
          <thead class="thead-light">
          </thead>
          <tbody>
          </tbody>
        </table>
        `;
        this.thead = this.element.getElementsByTagName('thead')[0];
        this.tbody = this.element.getElementsByTagName('tbody')[0];
        this.modalDeleteId = "crudjs-modal-" + (++CrudTable.ID);
        this.modalDelete = this.createModal();
    }

    // Displays

    render() {
        this.resetTable();
        this.renderHead();
        this.renderLines();
        this.updateLineNumbers();
    }

    resetTable() {
        resetElementHTML(this.thead);
        resetElementHTML(this.tbody);
    }

    renderHead() {
        this.thead.innerHTML = `<tr><th scope="col"><strong>#</strong></th></tr>`;
        for(const col of this.crudComponent.getData().columns) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.innerHTML = "<strong>"+col.name+"</strong>";
            this.thead.children[0].appendChild(th);
        }
        if(this.crudComponent.isEditable()) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.className = "text-right pr-3";
            th.innerHTML = "<strong>Action(s)</strong>";
            this.thead.children[0].appendChild(th);
        }
    }

    renderLines() {

    }

    updateLineNumbers() {
        let i = 1;
        for(const elem of this.element.getElementsByClassName('crudjs-line-number')) {
            if(!isHidden(elem.parentNode)) {
                elem.textContent = i++;
            }
        }
    }

    disableButtons() {
        for(const elem of this.element.getElementsByClassName('crudjs-edit-btn')) {
            elem.disabled = true;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-delete-btn')) {
            elem.disabled = true;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-add-btn')) {
            elem.disabled = true;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-add-cancel-btn')) {
            elem.disabled = true;
        }
    }

    enableButtons() {
        for(const elem of this.element.getElementsByClassName('crudjs-edit-btn')) {
            elem.disabled = false;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-delete-btn')) {
            elem.disabled = false;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-add-btn')) {
            elem.disabled = false;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-add-cancel-btn')) {
            elem.disabled = false;
        }
    }

    createModal() {
        const modalDelete = createElement(`
        <div class="modal fade" id="`+this.modalDeleteId+`" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Attention !</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Voulez-vous vraiment supprimer cette ligne ?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary mr-1" data-dismiss="modal">Non</button>
                <button type="button" class="btn btn-raised btn-info crudjs-modal-valid" data-dismiss="modal">Oui</button>
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

    getModalDelete() {
        return this.modalDelete;
    }

    getModalDeleteId() {
        return this.modalDeleteId;
    }

    getCrudComponent() {
        return this.crudComponent;
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
