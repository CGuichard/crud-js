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
        let selectHTML = "<select class=\"custom-select\">";
        for(const choice of this.columnDesc.options.values) {
            selectHTML = selectHTML.concat(`<option value="${choice}" ${((choice===fieldValue)?"selected":"")}>${choice}</option>`);
        }
        selectHTML = selectHTML.concat("</select>");
        this.element.innerHTML = selectHTML;
    }

    /**
     * Returns true if the new value after edition is valid, else false.
     *
     * @returns {boolean}
     */
    isValid() {
        return this.newValue != null;
    }

}


/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { SelectCrudField };
export default SelectCrudField;
