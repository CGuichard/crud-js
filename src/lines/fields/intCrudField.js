/**
 * @file This file contains the IntCrudField object.
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
 * Class representing an integer field for the CRUD.
 *
 * @extends CrudField
 */
class IntCrudField extends CrudField {

    /**
     * Creates an IntCrudField.
     *
     * @constructor
     * @param {number}        value      - The value of the field.
     * @param {object}        columnDesc - The back-end description of the field column.
     * @param {CrudComponent} crud       - The CrudComponent which contains the field.
     */
    constructor(value, columnDesc, crud) {
        super(value, columnDesc, crud);
    }

    /**
     * Gets the default value when actual value is undefined or null.
     *
     * @returns {int} Default value.
     */
    get defaultValue() {
        return 0;
    }

    /**
     * Gets the new value of the field after editing.
     *
     * @returns {int} New value.
     */
    get newValue() {
        if(this.edit) {
            const value = this.element.getElementsByTagName('input')[0].value;
            return (value.length > 0) ? Number(value) : null;
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
        this.element.innerHTML = `<input type="number" class="form-control m-0" placeholder="${this.columnDesc.name}" value="${this.value}" style="background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0);width:60px;">`;
    }

    /**
     * Returns true if the validators are valid, else false. Called only when validators exists.
     *
     * @param   {int}    newValue       - New value after edition.
     * @param   {object} validators     - Validators object.
     * @param   {number} validators.min - Minimum of the int field.
     * @param   {number} validators.max - Maximum of the int field.
     * @returns {boolean}
     */
    _checkValidators(newValue, validators) {
        return !(
            validators.min != null && newValue < validators.min ||
            validators.max != null && newValue > validators.max
        );
    }

    /**
     * Returns true if the field is valid, else false.
     *
     * @param   {int} newValue - New value after edition.
     * @returns {boolean}
     */
    _checkField(newValue) {
        return Number.isInteger(newValue);
    }

}


/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { IntCrudField };
export default IntCrudField;
