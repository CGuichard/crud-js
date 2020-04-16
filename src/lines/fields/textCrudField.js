/**
 * @file This file contains the TextCrudField object.
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
 * Class representing a text field for the CRUD.
 *
 * @extends CrudField
 */
class TextCrudField extends CrudField {

    /**
     * Creates a TextCrudField.
     *
     * @constructor
     * @param {string}        value      - The value of the field.
     * @param {object}        columnDesc - The back-end description of the field column.
     * @param {CrudComponent} crud       - The CrudComponent which contains the field.
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
            return this.element.getElementsByTagName('input')[0].value;
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
        this.element.innerHTML = `<input type="text" class="form-control m-0" placeholder="${this.columnDesc.name}" value="${this.value}" style="background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0) !important;width:auto !important;">`;
    }

    /**
     * Returns true if the new value after edition is valid, else false.
     *
     * @returns {boolean}
     */
    isValid() {
        const newValue = this.newValue;
        return newValue != null && typeof newValue === "string";
    }

}


/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { TextCrudField };
export default TextCrudField;