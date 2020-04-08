/**
 * @file This file contains the SelectChipsCrudField object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
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

import { createElement } from "../../utils.js";
import { CrudField } from './crudField.js';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

 /**
  * Class representing a select field with chips for the CRUD.
  *
  * @extends CrudField
  */
class SelectChipsCrudField extends CrudField {

    /**
     * Returns chips HTMLElement.
     *
     * @static
     * @param   {(number|string)} value - The chips value.
     * @returns {HTMLElement}
     */
    static createSelectChips(value) {
        const chips = createElement(`<span style="font-size:0.9rem;" class="crudjs-chips badge badge-pill badge-secondary mt-1 mr-1 pb-2 pt-2">${value}<span class="crudjs-remove-chips-btn bg-light rounded-circle pl-1 pr-1 text-secondary ml-1" aria-hidden="true"><i class="fas fa-times" aria-hidden="true"></i></span></span>`);
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

    /**
     * Creates a SelectChipsCrudField.
     *
     * @constructor
     * @param {(Array.<number>|Array.<string>)} value      - The value of the field.
     * @param {object}                          columnDesc - The back-end description
     *                                                       of the field column.
     * @param {CrudComponent}                   crud       - The CrudComponent which contains
     *                                                       the field.
     */
    constructor(value, columnDesc, crud) {
        super(value, columnDesc, crud);
    }

    /**
     * Gets the default value when actual value is undefined or null.
     *
     * @returns {(Array.<number>|Array.<string>)} Default value.
     */
    get defaultValue() {
        return [];
    }

    /**
     * Gets the new value of the field after editing.
     *
     * @returns {(Array.<number>|Array.<string>)} New value.
     */
    get newValue() {
        if(this.edit) {
            const valuesArray = [];
            for(const value of this.element.getElementsByClassName("crudjs-chips")) {
                valuesArray.push(value.textContent);
            }
            return valuesArray;
        }
        return this.value;
    }

    /**
     * Builds the display view.
     *
     * @protected
     */
    _buildDisplayView() {
        for (const val of this.value) {
            this.element.innerHTML = this.element.innerHTML.concat(`<span style="font-size:0.9rem;" class="badge badge-pill badge-secondary mt-1 mr-1 pb-2 pt-2">${val}</span>`);
        }
    }

    /**
     * Builds the edit view.
     *
     * @protected
     */
    _buildEditView() {
        const fieldValue = this.value;
        const options = this.columnDesc.options.values.filter(x => !(fieldValue.includes(x)));
        // Create select
        const selectChips = document.createElement("select");
        selectChips.setAttribute("style", "width:auto !important");
        selectChips.setAttribute("class", "custom-select mr-2");
        selectChips.appendChild(createElement(`<option>${this.crud.text("field.selectChips.select")}</option>`));
        for(const choice of options) {
            selectChips.appendChild(createElement(`<option value="${choice}">${choice}</option>`));
        }
        selectChips.onchange = function() {
            const chips = SelectChipsCrudField.createSelectChips(this.value);
            this.parentNode.appendChild(chips);
            this.options[this.selectedIndex].remove();
            this.selectedIndex = 0;
        };
        this.element.appendChild(selectChips);
        // Create chips
        for (const value of fieldValue) {
            this.element.appendChild(SelectChipsCrudField.createSelectChips(value));
        }
    }

    /**
     * Returns true if the new value after edition is valid, else false.
     *
     * @returns {boolean}
     */
    isValid() {
        const newValue = this.newValue;
        return newValue != null && Array.isArray(newValue);
    }

}


/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { SelectChipsCrudField };
export default SelectChipsCrudField;
