/**
 * @file This file contains the CrudField object.
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

import { resetElementHTML, createElement } from "./utils.js";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudField {

    constructor(index, crudLine, columnDesc) {
        this.edit = false;
        this.index = index;
        this.crudLine = crudLine;
        this.columnDesc = columnDesc;
        this.element = document.createElement("th");
        this.element.className = "align-middle";
        this.element.setAttribute("scope", "row");
    }

    setValue(val) {
        this.crudLine.getValues()[this.index] = val;
    }

    getValue() {
        return this.crudLine.getValues()[this.index];
    }

    prepareDisplayView() {
        this.edit = false;
        resetElementHTML(this.element);
        const fieldValue = this.getValue();
        switch (this.columnDesc.type) {
            case "text":
                this.element.innerHTML = fieldValue;
                break;
            case "int":
                this.element.innerHTML = fieldValue;
                break;
            case "select":
                this.element.innerHTML = fieldValue;
                break;
            case "select-chips":
                for (const val of fieldValue) {
                    this.element.innerHTML = this.element.innerHTML.concat("<span style=\"font-size:0.9rem;\" class=\"badge badge-pill badge-secondary mt-1 mr-1 pb-2 pt-2\">"+val+"</span>");
                }
                break;
            default:
        }
    }

    showDisplayView() {
        this.prepareDisplayView();
        this.crudLine.addColumn(this.element);
    }

    prepareEditView() {
        this.edit = true;
        resetElementHTML(this.element);
        const self = this;
        let fieldValue = this.getValue();
        switch(this.columnDesc.type) {
            case "text":
                if(!fieldValue) {
                    fieldValue = "";
                }
                this.element.innerHTML = "<input type=\"text\" class=\"form-control m-0\" placeholder=\""+this.columnDesc.name+"\" value=\""+fieldValue+"\" style=\"background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0);width:auto !important;\">";
                break;
            case "int":
                if(!fieldValue) {
                    fieldValue = "";
                }
                this.element.innerHTML = "<input type=\"number\" class=\"form-control m-0\" placeholder=\""+this.columnDesc.name+"\" value=\""+fieldValue+"\" style=\"background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0);width:auto !importan;\">";
                break;
            case "select":
                if(!fieldValue) {
                    fieldValue = "";
                }
                let selectHTML = "<select class=\"custom-select\">";
                for(const choice of this.columnDesc.options.values) {
                    selectHTML = selectHTML.concat("<option value=\""+choice+"\" "+((choice===fieldValue)?"selected":"")+">"+choice+"</option>");
                }
                selectHTML = selectHTML.concat("</select>");
                this.element.innerHTML = selectHTML;
                break;
            case "select-chips":
                // Create select
                if(!fieldValue) {
                    fieldValue = [];
                }
                const options = this.columnDesc.options.values.filter(x => !(fieldValue.includes(x)));
                const selectChips = document.createElement("select");
                selectChips.setAttribute("style", "width:auto !important");
                selectChips.setAttribute("class", "custom-select mr-2");
                selectChips.appendChild(createElement("<option>Sélectionner...</option>"));
                for(const choice of options) {
                    selectChips.appendChild(createElement("<option value=\""+choice+"\">"+choice+"</option>"));
                }
                selectChips.onchange = function() {
                    const chips = self.createSelectChips(this.value);
                    this.parentNode.appendChild(chips);
                    this.options[this.selectedIndex].remove();
                    this.selectedIndex = 0;
                };
                this.element.appendChild(selectChips);
                // Create chips
                for (const value of fieldValue) {
                    this.element.appendChild(this.createSelectChips(value));
                }
                break;
            default:
        }
    }

    showEditView() {
        this.prepareEditView();
        this.crudLine.addColumn(this.element);
    }

    validateEdit() {
        if(this.edit) {
            switch (this.columnDesc.type) {
                case "text":
                    this.setValue(this.element.getElementsByTagName('input')[0].value);
                    break;
                case "int":
                    const value = parseInt(this.element.getElementsByTagName('input')[0].value);
                    if(!isNaN(value)) {
                        this.setValue(value);
                    }
                    break;
                case "select":
                    this.setValue(this.element.getElementsByTagName('select')[0].value);
                    break;
                case "select-chips":
                    const valuesArray = [];
                    for(const value of this.element.getElementsByClassName("crudjs-chips")) {
                        valuesArray.push(value.textContent);
                    }
                    this.setValue(valuesArray);
                    break;
                default:
            }
        }
    }

    createSelectChips(value) {
        const chips = createElement("<span style=\"font-size:0.9rem;\" class=\"crudjs-chips badge badge-pill badge-secondary mt-1 mr-1 pb-2 pt-2\">"+value+"<span class=\"crudjs-remove-chips-btn bg-light rounded-circle pl-1 pr-1 text-secondary ml-1\" aria-hidden=\"true\"><i class=\"fas fa-times\" aria-hidden=\"true\"></i></span></span>");
        const removeChipsFunction = function() {
            const chips = this.parentNode;
            const newOption = document.createElement("option");
            newOption.value = chips.textContent;
            newOption.textContent = newOption.value;
            chips.parentNode.getElementsByTagName('select')[0].appendChild(newOption);
            chips.remove();
        };
        chips.getElementsByClassName('crudjs-remove-chips-btn')[0].onclick = removeChipsFunction;
        return chips;
    }

}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudField };
export default CrudField;
