/**
 * @file This file contains the CrudField object.
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

import { resetElementHTML } from "../../utils.js";

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

/**
 * CrudField possible states enumeration.
 *
 * @constant
 * @type {object}
 * @property {number} VIEW - CrudField view value.
 * @property {number} EDIT - CrudField edit value.
 */
const FIELD_STATE = Object.freeze({ VIEW: 1, EDIT: 2 });

/**
 * Basic css class needed for CrudField.
 *
 * @constant
 * @type {string}
 */
const FIELD_CSS_CLASS = "align-middle";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

/**
 * Class representing a field in a line of the CRUD.
 */
class CrudField {

    /**
     * Returns HTMLElement root for the CrudField.
     *
     * @static
     * @returns {HTMLElement}
     */
    static createElement() {
        const element = document.createElement("td");
        element.className = FIELD_CSS_CLASS;
        return element;
    }

    /**
     * Creates a CrudField.
     *
     * The Constructor of CrudField. it cannot be invoked directly
     * because CrudField is considered abstract.
     *
     * @constructor
     * @param {*}             value      - The value of the field.
     * @param {object}        columnDesc - The back-end description of the field column.
     * @param {CrudComponent} crud       - The CrudComponent which contains the field.
     */
    constructor(value, columnDesc, crud) {
        /* Ensure non-instantiation. */
        if (new.target === CrudField) {
            throw new TypeError("Cannot construct CrudField instances directly");
        }
        /**
         * The CrudField value member.
         *
         * @protected
         * @type {*}
         */
        this._value = value;
        /**
         * The CrudField value member.
         *
         * @protected
         * @type {object}
         * @property {string}         name             - The column name.
         * @property {string}         type             - The column type.
         * @property {object}         [options]        - The column options.
         * @property {Array.<object>} [options.values] - The column possible values.
         */
        this._columnDesc = columnDesc;
        /**
         * The CrudComponent which contains the field.
         *
         * @protected
         * @type {CrudComponent}
         */
        this._crud = crud;
        /**
         * The CrudField value member.
         *
         * @protected
         * @type {number}
         */
        this._state = FIELD_STATE.VIEW;
        /**
         * The CrudField value member.
         *
         * @protected
         * @type {HTMLElement}
         */
        this._element = CrudField.createElement();
    }

    /* Getters & Setters */

    /**
     * Accessor of CrudField element.
     *
     * @readonly
     */
    get element() {
        return this._element;
    }

    /**
     * Accessor of CrudField column description.
     *
     * @readonly
     */
    get columnDesc() {
        return this._columnDesc;
    }

    /**
     * Accessor of CrudField crud.
     *
     * @readonly
     */
    get crud() {
        return this._crud;
    }

    /** Accessor of CrudField state */
    get state() {
        return this._state;
    }

    /** Accessor of CrudField value. */
    get value() {
        return (this._value == null) ? this.defaultValue : this._value;
    }

    /**
     * True if field is under edition, else False.
     *
     * @returns {boolean}
     */
    get edit() {
        return this.state === FIELD_STATE.EDIT;
    }

    set state(val) {
        this._state = val;
    }

    set value(val) {
        this._value = val;
    }

    /* Show methods */

    /**
     * Updates the element.
     *
     * The method that updates the element. Resets the HTML
     * element and creates the view corresponding to the
     * current state of the instance.
     */
    update() {
        resetElementHTML(this.element);
        switch(this.state) {
            case FIELD_STATE.VIEW:
                this._buildDisplayView();
                break;
            case FIELD_STATE.EDIT:
                this._buildEditView();
                break;
            default:
        }
    }

    /** Shows the display view of the element. */
    showDisplayView() {
        this.state = FIELD_STATE.VIEW;
        this.update();
    }

    /** Shows the editable view of the element. */
    showEditView() {
        this.state = FIELD_STATE.EDIT;
        this.update();
    }

    /* Validation */

    /**
     * Validates edition by saving newValue in value. Returns value.
     * @returns {*}
     */
    validate() {
        this.value = this.newValue;
        return this.value;
    }

    /* Abstract methods */

    /**
     * Returns the default value when actual value is undefined or null.
     *
     * @abstract
     * @returns {*} Default value.
     */
    get defaultValue() {
        throw new Error("Method not implemented");
    }

    /**
     * Returns the new value of the field after editing.
     *
     * @abstract
     * @returns {*} New value.
     */
    get newValue() {
        throw new Error("Method not implemented");
    }

    /**
     * Builds the display view.
     *
     * @protected
     * @abstract
     */
    _buildDisplayView() {
        throw new Error("Method not implemented");
    }

    /**
     * Builds the edit view.
     *
     * @protected
     * @abstract
     */
    _buildEditView() {
        throw new Error("Method not implemented");
    }

    /**
     * Returns true if the new value after edition is valid, else false.
     *
     * @abstract
     * @returns {boolean}
     */
    isValid() {
        throw new Error("Method not implemented");
    }

}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudField, FIELD_STATE, FIELD_CSS_CLASS };
export default CrudField;
