/**
 * @file This file contains the CrudFieldDecorator object.
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
 * Class used to decorate custom fields in order to make them work
 * like any other CrudField.
 */
class CrudFieldDecorator extends CrudField {

    /**
     * Creates a CrudFieldDecorator.
     *
     * The Constructor of CrudFieldDecorator. Need an object instance for a
     * custom field implemented as specified.
     *
     * @constructor
     * @param {object}      customCrudField                  - The custom field object.
     * @param {*}           customCrudField.value            - The value of the field.
     * @param {object}      customCrudField.columnDesc       - The back-end description of the field column.
     * @param {HTMLElement} customCrudField.element          - The html node of the field.
     * @param {function}    customCrudField.getDefaultValue  - Function of the custom field object
     *                                                         that gives its default value.
     * @param {function}    customCrudField.getNewValue      - Function of the custom field object
     *                                                         that gives its default new.
     * @param {function}    customCrudField.buildDisplayView - Function of the custom field object
     *                                                         that build its display view.
     * @param {function}    customCrudField.buildEditView    - Function of the custom field object
     *                                                         that build its edit view.
     * @param {function}    customCrudField.isValid          - Function of the custom field object
     *                                                         that check if its value is validated.
     */
    constructor(customCrudField) {
        super();
        /**
         * The custom field object member.
         *
         * @private
         * @type {object}
         * @property {*}           value            - The value of the field.
         * @property {object}      columnDesc       - The back-end description of the field column.
         * @property {HTMLElement} element          - The html node of the field.
         * @property {function}    getDefaultValue  - Function of the custom field object
         *                                            that gives its default value.
         * @property {function}    getNewValue      - Function of the custom field object
         *                                            that gives its default new.
         * @property {function}    buildDisplayView - Function of the custom field object
         *                                            that build its display view.
         * @property {function}    buildEditView    - Function of the custom field object
         *                                            that build its edit view.
         * @property {function}    isValid          - Function of the custom field object
         *                                            that check if its value is validated.
         */
        this.__customCrudField = customCrudField;

    }

    /* Getters & Setters */

    /**
     * Accessor of the custom field element.
     *
     * @readonly
     */
    get element() {
        return this.__customCrudField.element;
    }

    /**
     * Accessor of the custom field column description.
     *
     * @readonly
     */
    get columnDesc() {
        return this.__customCrudField.columnDesc;
    }

    /** Accessor of the custom field value. */
    get value() {
        return (this.__customCrudField.value == null) ? this.__customCrudField.getDefaultValue() : this.__customCrudField.value;
    }

    set value(val) {
        this.__customCrudField.value = val;
    }

    /* Abstract methods implemented */

    /**
     * Gets the default value when actual value is undefined or null.
     *
     * @returns {*} Default value.
     */
    get defaultValue() {
        return this.__customCrudField.getDefaultValue();
    }

    /**
     * Gets the new value of the field after editing.
     *
     * @returns {*} New value.
     */
    get newValue() {
        if(this.edit) {
            return this.__customCrudField.getNewValue();
        }
        return this.value;
    }

    /**
     * Builds the display view.
     *
     * @protected
     */
    _buildDisplayView() {
        this.__customCrudField.buildDisplayView();
    }

    /**
     * Builds the edit view.
     *
     * @protected
     */
    _buildEditView() {
        this.__customCrudField.buildEditView();
    }

    /**
     * Returns true if the new value after edition is valid, else false.
     *
     * @returns {boolean}
     */
    isValid() {
        return this.__customCrudField.isValid();
    }

}


/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudFieldDecorator };
export default CrudFieldDecorator;
