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
         * Dictionary for default classes.
         *
         * @private
         * @type {object}
         */
        this.__cls = {
            "int": IntCrudField,
            "text": TextCrudField,
            "select": SelectCrudField,
            "select-chips": SelectChipsCrudField,
        };
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
     * Creates a CrudField.
     *
     * @param   {string}        name       - The field name.
     * @param   {*}             value      - The value of the field.
     * @param   {object}        columnDesc - The back-end description of the field column.
     * @param   {CrudComponent} crud       - The crud component.
     * @returns {object}
     */
    create(name, value, columnDesc, crud) {
        if(this.__customCls[name] != null) {
            const _customField = this.__customCls[name];
            return new CrudFieldDecorator(new _customField(value, columnDesc, crud));
        } else if(this.__cls[name] != null) {
            const _field = this.__cls[name];
            return new _field(value, columnDesc, crud);
        } else {
            throw new Error(`Unknown type: ${name}.`);
        }
    }

}


/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudFieldFactory };
export default CrudFieldFactory;
