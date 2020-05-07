/**
 * @file This file contains the SelectCrudField object.
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

import { CrudField } from './crudField.js';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

 /**
  * Class representing a select field for the CRUD.
  *
  * @extends CrudField
  */
class SelectCrudField extends CrudField {

    /**
     * Creates a SelectCrudField.
     *
     * @constructor
     * @param {*}             value      - The value of the field.
     * @param {object}        columnDesc - The back-end description
     *                                     of the field column.
     * @param {CrudComponent} crud       - The CrudComponent which contains
     *                                     the field.
     */
    constructor(value, columnDesc, crud) {
        super(value, columnDesc, crud);
    }

    /**
     * Gets the default value when actual value is undefined or null.
     *
     * @returns {string} Default value.
     */
    get defaultValue() {
        return "";
    }

    /**
     * Gets the new value of the field after editing.
     *
     * @returns {string} New value.
     */
    get newValue() {
        if(this.edit) {
            return this.element.getElementsByTagName('select')[0].value;
        }
        return this.value;
    }

    /**
     * Builds the display view.
     *
     * @protected
     */
    _buildDisplayView() {
        this.element.innerHTML = this.value;
    }

    /**
     * Builds the edit view.
     *
     * @protected
     */
    _buildEditView() {
        const fieldValue = this.value;
        let selectHTML = `<select class="custom-select">`;
        for(const choice of this.columnDesc.options.values) {
            selectHTML = selectHTML.concat(`<option value="${choice}" ${((choice===fieldValue)?"selected":"")}>${choice}</option>`);
        }
        selectHTML = selectHTML.concat("</select>");
        this.element.innerHTML = selectHTML;
    }

    /**
     * Returns true if the validators are valid, else false. Called only when validators exists.
     *
     * @param   {string} newValue   - New value after edition.
     * @param   {object} validators - Validators object.
     * @returns {boolean}
     */
    _checkValidators(newValue, validators) {
        return true;
    }

    /**
     * Returns true if the field is valid, else false.
     *
     * @param   {string} newValue - New value after edition.
     * @returns {boolean}
     */
    _checkField(newValue) {
        return this.columnDesc.options.values.includes(newValue);
    }

}


/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { SelectCrudField };
export default SelectCrudField;
