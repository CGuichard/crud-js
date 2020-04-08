/**
 * @file This file contains the CrudFieldFactory object.
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

import { CrudFieldDecorator } from './crudFieldDecorator.js';
import { IntCrudField } from './intCrudField.js';
import { TextCrudField } from './textCrudField.js';
import { SelectCrudField } from './selectCrudField.js';
import { SelectChipsCrudField } from './selectChipsCrudField.js';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

/** Factory class used to create CrudField objects. Also implements singleton. */
class CrudFieldFactory {

    /**
     * Returns unique CrudFieldFactor instance.
     *
     * @static
     * @returns {CrudFieldFactory}
     */
    static getInstance() {
        if(!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    /**
     * Creates a CrudFieldFactory.
     *
     * @constructor
     */
    constructor() {
        /**
         * Dictionary for class cache.
         *
         * @private
         * @type {object}
         */
        this.__cls = {};
        /**
         * Dictionary for custom classes.
         *
         * @private
         * @type {object}
         */
        this.__customCls = {};
        if(typeof CUSTOM_FIELDS !== 'undefined' && CUSTOM_FIELDS !== null) {
            for(const field in CUSTOM_FIELDS) {
                if(CUSTOM_FIELDS.hasOwnProperty(field)) {
                    this.__customCls[field] = CUSTOM_FIELDS[field];
                }
            }
        }
    }

    /**
     * Gets the name of the CrudField class from its back-end name.
     *
     * This function gets a CrudField implentation from its back-end name.
     * Examples : - int = IntCrudField
     *            - select-chips = SelectChipsCrudField
     *
     * @private
     * @param   {string} name - The name of the field.
     * @returns {string} The name of the class.
     */
    __getClassName(name) {
        const parts = name.split("-");
        for(let i = 0; i < parts.length; i++) {
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
        }
        return parts.join('') + "CrudField";
    }

    /**
     * Gets an implemented CrudField class from its class name.
     *
     * @private
     * @param   {string}   name - The name of the class.
     * @returns {function} The class.
     */
    __getClass(name) {
        const className = this.__getClassName(name);
        if(!this.__cls[name]) {
            if(className.match(/^[a-zA-Z0-9_]+$/)) {
                try {
                    /* jshint ignore:start */
                    this.__cls[name] = eval(className);
                    /* jshint ignore:end */
                } catch (e) {
                    if(e.name === "ReferenceError") {
                        return undefined;
                    }
                    console.log(e);
                }
            } else {
                throw new Error(`Unexpected name: ${className}`);
            }
        }
        return this.__cls[name];
    }

    /**
     * Creates a CrudField.
     *
     * @param   {string}        name       - The field name.
     * @param   {*}             value      - The value of the field.
     * @param   {object}        columnDesc - The back-end description of the field column.
     * @param   {CrudComponent} crud       - The crud component.
     * @returns {object}
     */
    create(name, value, columnDesc, crud) {
        if(this.__customCls[name]) {
            const _customField = this.__customCls[name];
            return new CrudFieldDecorator(new _customField(value, columnDesc, crud));
        }
        const _field = this.__getClass(name);
        return (_field == null) ? _field : new _field(value, columnDesc, crud);
    }

}


/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudFieldFactory };
export default CrudFieldFactory;
