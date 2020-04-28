/**
 * @file This file contains some basic function used in the project.
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
 * Functions
 * ------------------------------------------------------------------------
 */

/**
 * @since 0.0.1
 */
function createElement(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

/**
 * @since 0.0.1
 */
function resetElementHTML(htmlElement) {
    htmlElement.innerHTML = "";
}

/**
 * @since 0.0.1
 */
function isHidden(element) {
    return element.style.display === "none";
}

/**
 * @since 1.0.0
 */
function hide(element) {
    element.style.display = "none";
}

/**
 * @since 1.0.0
 */
function display(element) {
    element.style.display = "";
}

/**
 * @file This file contains CrudJS languages.
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
 * Constants
 * ------------------------------------------------------------------------
 */

const LANGUAGES = {
    en: {
        basic: {
            yes: "Yes",
            no: "No",
            ok: "OK",
            cancel: "Cancel",
            error: "Error",
            warning: "Warning"
        },
        component: {
            configurationError: "Incorrect configuration. Please read the README of the project to correct your configuration.",
            urlError: "An error occured while trying to fetch resource. See:"
        },
        request: {
            badResponse: "Bad response",
            okResponse: "Saving done",
            addImpossible: "Could not add the line:",
            modifyImpossible: "Could not modify the line:",
            deleteImpossible: "Could not delete the line:"
        },
        table: {
            column: {
                actionName: "Action(s)"
            },
            modal: {
                delete: {
                    title: "Warning!",
                    message: "Are you sure you want to delete this line?"
                }
            }
        },
        line: {
            btn: {
                edit: "Edit",
                delete: "Delete",
                validate: "Validate",
                cancel: "Cancel",
                add: "Add",
                addCancel: "Reset",
            },
            messages: {
                invalidColumn: "Invalid column:"
            }
        },
        field: {
            selectChips: {
                select: "Select..."
            }
        }
    },
    fr: {
        basic: {
            yes: "Oui",
            no: "Non",
            ok: "OK",
            cancel: "Annuler",
            error: "Erreur",
            warning: "Attention"
        },
        component: {
            configurationError: "Configuration incorrect. Veuillez lire le README du projet pour corriger votre configuration.",
            urlError: "Une erreur est survenue en essayant d'atteindre la resource. Voyez:"
        },
        request: {
            badResponse: "Mauvaise réponse",
            okResponse: "Sauvegarde effectuée",
            addImpossible: "Impossible d'ajouter la ligne :",
            modifyImpossible: "Impossible de modifier la ligne :",
            deleteImpossible: "Impossible de supprimer la ligne :"
        },
        table: {
            column: {
                actionName: "Action(s)"
            },
            modal: {
                delete: {
                    title: "Attention!",
                    message: "Voulez-vous vraiment supprimer cette ligne ?"
                }
            }
        },
        line: {
            btn: {
                edit: "Editer",
                delete: "Supprimer",
                validate: "Valider",
                cancel: "Annuler",
                add: "Ajouter",
                addCancel: "Réinitialiser",
            },
            messages: {
                invalidColumn: "Colonne invalide :"
            }
        },
        field: {
            selectChips: {
                select: "Sélectionner..."
            }
        }
    }
};

const DEFAULT_LANG = "en";

/**
 * ------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------
 */

 function langExist(lang) {
     return lang != null && LANGUAGES[lang] != null;
 }

 function text(lang, strRequest) {
     if(langExist(lang)) {
         const request = strRequest.split(".");
         if(strRequest != null && strRequest.length < 1) {
             throw new Error("Invalid text request.");
         }
         let value = LANGUAGES[lang];
         for(const elem of request) {
             value = value[elem];
             if(value == null) {
                 throw new Error("Invalid text request.");
             }
         }
         return value;
     }
     throw new Error("Language not found");
 }

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
        if(new.target === CrudField) {
            throw new TypeError("Cannot construct CrudField instance directly");
        }
        if(arguments.length > 0) {
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
            * @type {HTMLElement}
            */
            this._element = CrudField.createElement();
        }
        /**
         * The CrudField value member.
         *
         * @protected
         * @type {number}
         */
        this._state = FIELD_STATE.VIEW;
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
     * Accessor of CrudField help text.
     *
     * @readonly
     */
    get helpText() {
        return (this.columnDesc.options != null && this.columnDesc.options.helpText != null && typeof this.columnDesc.options.helpText === "string") ? this.columnDesc.options.helpText : "";
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
                if(this.element.getAttribute("title") != "") {
                    this.element.setAttribute("title", "");
                }
                this._buildDisplayView();
                break;
            case FIELD_STATE.EDIT:
                if(this.helpText.length > 0) {
                    this.element.setAttribute("title", this.helpText);
                }
                this._buildEditView();
                break;
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

    /**
     * Returns true if the new value after edition is valid, else false.
     *
     * @returns {boolean}
     */
    isValid() {
        const newValue = this.newValue;
        if(newValue != null) {
            return this._checkField(newValue) && ((this.columnDesc.options != null && this.columnDesc.options.validators != null) ? this._checkValidators(newValue, this.columnDesc.options.validators) : true);
        }
        return false;
    }

    /* Abstract methods */

    /**
     * Returns true if the validators are valid, else false. Called only when validators exists.
     *
     * @abstract
     * @param   {*}      newValue   - New value after edition.
     * @param   {object} validators - Validators object.
     * @returns {boolean}
     */
    _checkValidators(newValue, validators) {
        throw new Error("Method not implemented");
    }

    /**
     * Returns true if the field is valid, else false.
     *
     * @abstract
     * @param   {*} newValue - New value after edition.
     * @returns {boolean}
     */
    _checkField(newValue) {
        throw new Error("Method not implemented");
    }

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

}

/**
 * @file This file contains the CrudFieldDecorator object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 *
 */

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
     * @param {function}    customCrudField.checkField       - Function of the custom field object
     *                                                         that check if its value is valid.
     * @param {function}    customCrudField.checkValidators  - Function of the custom field object
     *                                                         that check if its validators are valid.
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
         * @property {function}    checkField       - Function of the custom field object
         *                                            that check if its value is valid.
         * @property {function}    checkValidators  - Function of the custom field object
         *                                            that check if its validators are valid.
         */
        this.__customCrudField = customCrudField;
        if(!this.element.className.includes(FIELD_CSS_CLASS)) {
            this.element.className += ` ${FIELD_CSS_CLASS}`;
        }
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
     * Returns true if the validators are valid, else false. Called only when validators exists.
     *
     * @param   {*}      newValue   - New value after edition.
     * @param   {object} validators - Validators object.
     * @returns {boolean}
     */
    _checkValidators(newValue, validators) {
        if(this.__customCrudField.checkValidators != null) {
            return  this.__customCrudField.checkValidators(newValue, validators);
        }
        throw new Error("Custom field need checkValidators function");
    }

    /**
     * Returns true if the field is valid, else false.
     *
     * @param   {*} newValue - New value after edition.
     * @returns {boolean}
     */
    _checkField(newValue) {
        return this.__customCrudField.checkField(newValue);
    }

}

/**
 * @file This file contains the IntCrudField object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 *
 */

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
 * @file This file contains the TextCrudField object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 *
 */

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
     * Returns true if the validators are valid, else false. Called only when validators exists.
     *
     * @param   {string} newValue             - New value after edition.
     * @param   {object} validators           - Validators object.
     * @param   {number} validators.regex     - Regex for the text field.
     * @param   {number} validators.minLength - Minimum length of the text field.
     * @param   {number} validators.maxLength - Maximum length of the text field.
     * @returns {boolean}
     */
    _checkValidators(newValue, validators) {
        return !(
            validators.regex != null && !(new RegExp(validators.regex).test(newValue)) ||
            validators.minLength != null && newValue.length < validators.minLength ||
            validators.maxLength != null && newValue.length > validators.maxLength
        );
    }

    /**
     * Returns true if the field is valid, else false.
     *
     * @param   {string} newValue - New value after edition.
     * @returns {boolean}
     */
    _checkField(newValue) {
        return typeof newValue === "string";
    }

}

/**
 * @file This file contains the SelectCrudField object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 *
 */

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
 * @file This file contains the SelectChipsCrudField object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 *
 */

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
     * @param {(Array.<string>)} value      - The value of the field.
     * @param {object}           columnDesc - The back-end description
     *                                        of the field column.
     * @param {CrudComponent}    crud       - The CrudComponent which contains
     *                                        the field.
     */
    constructor(value, columnDesc, crud) {
        super(value, columnDesc, crud);
    }

    /**
     * Gets the default value when actual value is undefined or null.
     *
     * @returns {(Array.<string>)} Default value.
     */
    get defaultValue() {
        return [];
    }

    /**
     * Gets the new value of the field after editing.
     *
     * @returns {(Array.<string>)} New value.
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
        for(const val of this.value) {
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
        selectChips.setAttribute("style", "width:auto !important;");
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
        for(const value of fieldValue) {
            this.element.appendChild(SelectChipsCrudField.createSelectChips(value));
        }
    }

    /**
     * Returns true if the validators are valid, else false. Called only when validators exists.
     *
     * @param   {(Array.<string>)} newValue             - New value after edition.
     * @param   {object}           validators           - Validators object.
     * @param   {number}           validators.minSelect - Minimum number of selected element
     *                                                    for the select chips field.
     * @param   {number}           validators.maxSelect - Maximum number of selected element
     *                                                    for the select chips field.
     * @returns {boolean}
     */
    _checkValidators(newValue, validators) {
        return !(
            validators.minSelect != null && newValue.length < validators.minSelect ||
            validators.maxSelect != null && newValue.length > validators.maxSelect
        );
    }

    /**
     * Returns true if the field is valid, else false.
     *
     * @param   {(Array.<string>)} newValue - New value after edition.
     * @returns {boolean}
     */
    _checkField(newValue) {
        return Array.isArray(newValue) && newValue.every((val) => this.columnDesc.options.values.includes(val));
    }

}

/**
 * @file This file contains the CrudFieldFactory object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 *
 */

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
            throw new Error(`Unknown type: ${name}`);
        }
    }

}

/**
 * @file This file contains the CrudLine object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 *
 */

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
const LINE_STATE = Object.freeze({ NEW: "N", MODIFIED: "M", DELETED: "D", SAVED: "S" });

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudLine {

    static createEmptyValues(size) {
        const values = new Array(size);
        values.status = LINE_STATE.NEW;
        values.oldValue = [...values];
        return values;
    }

    constructor(crudTable, lineArray) {
        /* Ensure non-instantiation. */
        if(new.target === CrudLine) {
            throw new TypeError("Cannot construct CrudLine instance directly");
        }
        this._crudTable = crudTable;
        this._element = document.createElement("tr");
        this._columns = this._crudTable.crud.getData().columns;
        this._values = (lineArray != null) ? lineArray : CrudLine.createEmptyValues(this._columns.length);
        const factory = CrudFieldFactory.getInstance();
        this._fields = [];
        for(var i = 0; i < this._values.length; i++) {
            const field = factory.create(this._columns[i].type, this._values[i], this._columns[i], this._crudTable.crud);
            this._fields.push(field);
        }
    }

    /* Getters & Setters */

    get crudTable() {
        return this._crudTable;
    }

    get element() {
        return this._element;
    }

    get columns() {
        return this._columns;
    }

    get values() {
        return this._values;
    }

    get fields() {
        return this._fields;
    }

    get status() {
        return this._values.status;
    }

    set values(val) {
        if(val.length == this.values.length) {
            this._values = val;
        }
    }

    set status(val) {
        this._values.status = val;
    }

    /* State methods */

    isNew() {
        return this.status == LINE_STATE.NEW;
    }

    isModified() {
        return this.status == LINE_STATE.MODIFIED;
    }

    isDeleted() {
        return this.status == LINE_STATE.DELETED;
    }

    isSaved() {
        return this.status == LINE_STATE.SAVED;
    }

    goNew() {
        this.status = LINE_STATE.NEW;
    }

    goModified() {
        this.status = LINE_STATE.MODIFIED;
    }

    goDeleted() {
        this.status = LINE_STATE.DELETED;
    }

    goSaved() {
        this.status = LINE_STATE.SAVED;
    }

    /* Show methods */

    hide() {
        hide(this.element);
    }

    remove() {
        this.element.remove();
        const dataValues = this.crudTable.crud.getData().values;
        dataValues.splice(dataValues.indexOf(this.values), 1);
    }

    _reset() {
        this.values = CrudLine.createEmptyValues(this.values.length);
        this._update();
    }

    _update() {
        for(let i = 0; i < this.values.length; i++) {
            this.fields[i].value = this.values[i];
            this.fields[i].update();
        }
    }

    _prepareShow() {
        resetElementHTML(this.element);
    }

    _addColumn(col) {
        this.element.appendChild(col);
    }

    _addEmptyColumn() {
        const thEmpty = document.createElement("th");
        thEmpty.setAttribute("scope", "row");
        this.element.appendChild(thEmpty);
    }

    /* Events */

    _attachOnClickEvent(element, eventFuncName) {
        const self = this;
        element.onclick = function() { self[eventFuncName](); };
    }

    /* Abstract methods */

    show() {
        throw new Error("Method not implemented");
    }

}

/**
 * @file This file contains the EditCrudLine object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 * @since 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class EditCrudLine extends CrudLine {

    constructor(crudTable, lineArray) {
        super(crudTable, lineArray);
        this.element.className = "crudjs-edit-line";
    }

    /* Show methods */

    show() {
        this.showDisplayView();
    }

    showDisplayView() {
        this._prepareShow();
        this.__addNumberColumn();
        for(const field of this.fields) {
            field.showDisplayView();
            this._addColumn(field.element);
        }
        if(this.crudTable.crud.isEditable()) {
            this.__addActionsColumn();
        }
    }

    showEditView() {
        if(this.crudTable.crud.isEditable()) {
            this._prepareShow();
            this.__addNumberColumn();
            for(const field of this.fields) {
                field.showEditView();
                this._addColumn(field.element);
            }
            this.__addEditActionsColumn();
        }
    }

    __addNumberColumn() {
        const thNumber = document.createElement("th");
        thNumber.className = "crudjs-line-number align-middle text-center";
        thNumber.setAttribute("scope", "row");
        this.element.appendChild(thNumber);
    }

    __addActionsColumn() {
        const crud = this.crudTable.crud;
        const tdActions = document.createElement("td");
        tdActions.className = "align-middle text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-edit-btn btn btn-raised btn-info mb-1 rounded" title="${crud.text("line.btn.edit")}"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-delete-btn btn btn-raised btn-danger mb-1 rounded" data-toggle="modal" data-target="#${this.crudTable.getDeleteModalId()}" title="${crud.text("line.btn.delete")}"><i class="fas fa-trash"></i></button>
        `;
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-edit-btn')[0], "editEvent");
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-delete-btn')[0], "deleteEvent");
        this.element.appendChild(tdActions);
    }

    __addEditActionsColumn() {
        const crud = this.crudTable.crud;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-validate-btn btn btn-raised btn-success mb-1 rounded" title="${crud.text("line.btn.validate")}"><i class="fas fa-sm fa-check"></i></button>
            <button type="button" style="width:45px;" class="crudjs-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.cancel")}"><i class="fas fa-times"></i></button>
        `;
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-validate-btn')[0], "validateEditEvent");
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-cancel-btn')[0], "cancelEditEvent");
        this.element.appendChild(tdActions);
    }

    /* Events */

    editEvent() {
        this.showEditView();
        this.crudTable.updateLineNumbers();
        this.crudTable.disableButtons();
    }

    deleteEvent() {
        const self = this;
        const btnValidDelete = this.crudTable.getDeleteModal().getElementsByClassName('crudjs-modal-valid')[0];
        btnValidDelete.onclick = function() {
            if(self.isModified() || self.isSaved()) {
                self.goDeleted();
                self.hide();
            } else if(self.isNew()) {
                self.remove();
            }
            self.crudTable.updateLineNumbers();
            self.crudTable.enableButtons();
        };
    }

    validateEditEvent() {
        const errorMessages = [];
        for(let i = 0; i < this.values.length; i++) {
            if(!this.fields[i].isValid()) {
                const helpText = this.fields[i].helpText;
                errorMessages.push(`${this.crudTable.crud.text("line.messages.invalidColumn")} '${this.fields[i].columnDesc.name}'${(helpText.length>0)?` − ${helpText}`:""}`);
            }
        }
        if(errorMessages  != null && errorMessages.length > 0) {
            for(const errorMsg of errorMessages) {
                this.crudTable.crud.addMessage("warning", this.crudTable.crud.text("basic.warning"), errorMsg, 10000);
            }
        } else {
            for(let i = 0; i < this.values.length; i++) {
                this.values[i] = this.fields[i].validate();
            }
            if(this.isSaved()) {
                this.goModified();
            }
            this.showDisplayView();
            this.crudTable.updateLineNumbers();
            this.crudTable.enableButtons();
        }

    }

    cancelEditEvent() {
        this.showDisplayView();
        this.crudTable.updateLineNumbers();
        this.crudTable.enableButtons();
    }

}

/**
 * @file This file contains the AddCrudLine object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 * @since 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class AddCrudLine extends CrudLine {

    constructor(crudTable) {
        super(crudTable);
        if(this.crudTable.crud.isEditable()) {
            this.element.className = "crudjs-add-line";
        } else {
            throw new Error("Cannot use AddCrudLine if CRUD is not ");
        }
    }

    /* Show methods */

    show() {
        this._prepareShow();
        this._addEmptyColumn();
        for(const field of this.fields) {
            field.showEditView();
            this._addColumn(field.element);
        }
        this.__addActionsColumn();
    }

    __addActionsColumn() {
        const crud = this.crudTable.crud;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-add-btn btn btn-raised btn-secondary mb-1 rounded" title="${crud.text("line.btn.add")}"><i class="fas fa-plus"></i></button>
            <button type="button" style="width:45px;" class="crudjs-action-btn crudjs-reset-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.addCancel")}"><i class="fas fa-times"></i></button>
        `;
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-add-btn')[0], "addEvent");
        this._attachOnClickEvent(tdActions.getElementsByClassName('crudjs-reset-btn')[0], "resetEvent");
        this.element.appendChild(tdActions);
    }

    /* Events */

    resetEvent() {
        for(const field of this.fields) {
            field.value = field.defaultValue;
            field.update();
        }
    }

    addEvent() {
        const errorMessages = [];
        for(let i = 0; i < this.values.length; i++) {
            if(!this.fields[i].isValid()) {
                const helpText = this.fields[i].helpText;
                errorMessages.push(`${this.crudTable.crud.text("line.messages.invalidColumn")} '${this.fields[i].columnDesc.name}'${(helpText.length>0)?` − ${helpText}`:""}`);
            }
        }
        if(errorMessages != null && errorMessages.length > 0) {
            for(const errorMsg of errorMessages) {
                this.crudTable.crud.addMessage("warning", this.crudTable.crud.text("basic.warning"), errorMsg, 10000);
            }
        } else {
            for(let i = 0; i < this.values.length; i++) {
                this.values[i] = this.fields[i].validate();
            }
            this.crudTable.appendNewEditCrudLine(new EditCrudLine(this.crudTable, this.values));
            this._reset();
            this.crudTable.updateLineNumbers();
        }
    }

}

/**
 * @file This file contains the CrudTable object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 * @since 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudTable {

    constructor(crud) {
        this.crud = crud;
        this.horizontalScroll = false;
        this.element = createElement("<div class=\"table-responsive\"></div>");
        this.element.innerHTML = `
        <table class="table">
          <thead class="thead-light">
          </thead>
          <tbody>
          </tbody>
        </table>
        `;
        this.thead = this.element.getElementsByTagName('thead')[0];
        this.tbody = this.element.getElementsByTagName('tbody')[0];
        this.deleteModalMessage = this.crud.text("table.modal.delete.message");
        this.deleteModalId = "crudjs-modal-" + (++CrudTable.ID);
        this.deleteModal = this.createModal();
    }

    // Displays

    render() {
        this.resetTable();
        this.renderHead();
        this.renderLines();
        this.renderModal();
        this.updateLineNumbers();
        this.addEvents();
    }

    resetTable() {
        resetElementHTML(this.thead);
        resetElementHTML(this.tbody);
    }

    renderHead() {
        this.thead.innerHTML = `<tr><th scope="col"><strong>#</strong></th></tr>`;
        for(const col of this.crud.getData().columns) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.innerHTML = "<strong>"+col.name+"</strong>";
            this.thead.children[0].appendChild(th);
        }
        if(this.crud.isEditable()) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.className = "text-right pr-3";
            th.innerHTML = `<strong>${this.crud.text("table.column.actionName")}</strong>`;
            this.thead.children[0].appendChild(th);
        }
    }

    renderLines() {
        if(this.getCrud().isEditable()) {
            this.appendCrudLine(new AddCrudLine(this));
        }
        const values = this.crud.getData().values;
        for(var i = 0; i < values.length; i++) {
            this.appendCrudLine(new EditCrudLine(this, values[i]));
        }
    }

    renderModal() {
        const options = this.crud.getData().options;
        if(options != null && options.deleteMessage != null) {
            this.setDeleteModalMessage(options.deleteMessage);
        }
    }

    updateLineNumbers() {
        let i = 1;
        for(const elem of this.element.getElementsByClassName('crudjs-line-number')) {
            if(!isHidden(elem.parentNode)) {
                elem.textContent = i++;
            }
        }
    }

    addEvents() {
        const self = this;
        this.element.onmousedown = function() {
            self.horizontalScroll = this.clientWidth < this.children[0].clientWidth;
        };
        this.element.onmouseup = function() {
            self.horizontalScroll = false;
        };
        this.element.addEventListener("wheel", function(event) {
            if(event.type == 'wheel' && self.horizontalScroll) {
                this.scrollLeft -= ((((event.deltaY || -event.wheelDelta || event.detail) >> 10) || 1) * -50);
                event.preventDefault();
            }
        });
    }

    appendCrudLine(crudLine) {
        this.tbody.appendChild(crudLine.element);
        crudLine.show();
    }

    appendNewEditCrudLine(editCrudLine) {
        this.crud.getData().values.push(editCrudLine.values);
        const editLines = this.tbody.getElementsByClassName('crudjs-edit-line');
        if(editLines.length > 0) {
            this.tbody.insertBefore(editCrudLine.element, editLines[0]);
        } else {
            this.tbody.appendChild(editCrudLine.element);
        }
        editCrudLine.show();
    }

    disableButtons() {
        for(const elem of this.element.getElementsByClassName('crudjs-action-btn')) {
            elem.disabled = true;
        }
    }

    enableButtons() {
        for(const elem of this.element.getElementsByClassName('crudjs-action-btn')) {
            elem.disabled = false;
        }
    }

    createModal() {
        const modalDelete = createElement(`
        <div class="modal fade" id="`+this.deleteModalId+`" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${this.crud.text("table.modal.delete.title")}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="delete-message">
                    ${this.deleteModalMessage}
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary mr-1" data-dismiss="modal">${this.crud.text("basic.no")}</button>
                <button type="button" class="btn btn-raised btn-info crudjs-modal-valid" data-dismiss="modal">${this.crud.text("basic.yes")}</button>
              </div>
            </div>
          </div>
        </div>
        `);
        document.body.appendChild(modalDelete);
        return modalDelete;
    }

    // Getters and Setters

    getElement() {
        return this.element;
    }

    getDeleteModal() {
        return this.deleteModal;
    }

    getDeleteModalId() {
        return this.deleteModalId;
    }

    getCrud() {
        return this.crud;
    }

    setDeleteModalMessage(val) {
        this.deleteModalMessage = val;
        if(this.deleteModal != null) {
            const tmp = this.deleteModal.getElementsByClassName("delete-message");
            if(tmp.length > 0) {
                tmp[0].textContent = this.deleteModalMessage;
            }
        }
    }

}

/**
 * ------------------------------------------------------------------------
 * Code Run
 * ------------------------------------------------------------------------
 */

CrudTable.ID = 0;

/**
 * @file module to send and retrieve values for crudjs
 *
 * @author Kévin Delcourt
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
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudRequest {

    constructor(crud, url, addMessageFunc) {
        this.crud = crud;
        this.url = url;
        this.addMessageFunc = addMessageFunc;
    }

    get(callback, errorCallback) {
        fetch(this.url, {
            method: "GET"
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.values.forEach(value => {
                value.oldValue = [...value];
                value.status = 'S';
            });
            callback(json);
        }).catch(function(error) {
            errorCallback(error);
        });
    }

    send(values) {
        let newNewValues = [];
        let modifyOldValues = [];
        let modifyNewValues = [];
        let deletedOldValues = [];

        this.noError = true;
        let self = this;
        values.forEach(function(element) {
            switch(element.status) {
                case 'N':
                    newNewValues.push(element);
                    break;
                case 'M':
                    modifyOldValues.push(element.oldValue);
                    modifyNewValues.push(element);
                    break;
                case 'D':
                    deletedOldValues.push(element.oldValue);
                    break;
            }
        });

        let headers = {"Content-Type":"application/json"};
        if(typeof CSRF !== 'undefined' && CSRF !== null) {
            headers['X-CSRFToken'] = CSRF;
        }

        fetch(self.url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "actions": [
                    {
                        "request": "NEW",
                        "new_values": newNewValues
                    },
                    {
                        "request": "MODIFIED",
                        "old_values": modifyOldValues,
                        "new_values": modifyNewValues
                    },
                    {
                        "request": "DELETED",
                        "old_values": deletedOldValues
                    }
                ]
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.actions.forEach(function(action) {
                if(!("result" in action)) {
                    self.noError = false;
                    self.addMessageFunc("danger", self.crud.text("basic.error"), self.crud.text("request.badResponse"), 5000);
                } else {
                    self.handle(action, values);
                }
            });
            if(self.noError) {
                self.addMessageFunc("success", self.crud.text("basic.ok"), self.crud.text("request.okResponse"), 5000);
            }
        }).catch(function(error) {
            console.error(error);
        });
    }

    handle(action, values) {
        const self = this;
        switch(action.request) {
            case "NEW":
                action.result.forEach(function(val,i) {
                    if(val[0] === "ERROR") {
                        self.addMessageFunc("warning", self.crud.text("basic.error"), `${self.crud.text("request.addImpossible")} '${action.new_values[i].join(', ')}' − ${val[1]}`, 15000);
                        self.noError = false;
                    } else {
                        let el = values.find(el => el.join('&') === action.new_values[i].join('&'));
                        el.status = 'S';
                        el.oldValue = action.new_values[i];
                    }
                });
                break;
            case "MODIFIED":
                action.result.forEach( function(val,i) {
                    if(val[0] === "ERROR") {
                        self.addMessageFunc("warning", self.crud.text("basic.error"), `${self.crud.text("request.modifyImpossible")} '${action.old_values[i].join(', ')}' / '${action.new_values[i].join(', ')}' − ${val[1]}`, 15000);
                        self.noError = false;
                    } else {
                        let el = values.find(el => el.join('&') === action.new_values[i].join('&'));
                        el.status = 'S';
                        el.oldValue = action.new_values[i];
                    }
                });
                break;
            case "DELETED":
                let valuesToDelete = [];
                action.result.forEach( function(val,i) {
                    if(val[0] === "ERROR") {
                        self.addMessageFunc("warning", self.crud.text("basic.error"), `${self.crud.text("request.deleteImpossible")} '${action.old_values[i].join(', ')}' − ${val[1]}`, 15000);
                        self.noError = false;
                    } else {
                        const indexInValues = values.findIndex(el => el.oldValue.join('&') === action.old_values[i].join('&'));
                        valuesToDelete.push(indexInValues);
                    }
                });
                for(let i = valuesToDelete.length - 1; i >= 0; --i) {
                    values.splice(valuesToDelete[i], 1);
                }
                break;
        }
    }

}

/**
 * @file This file contains the CrudJS webcomponent.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
 * @since 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudComponent extends HTMLElement {

    static get observedAttributes() { return ['lang', 'url', 'save-button']; }

    constructor() {
        super();
        this.init();
    }

    init() {
        this.attr = {};

        let settingsOk = true;

        const lang = this.getAttribute("lang");
        const url = this.getAttribute("url");
        const saveButtonId = this.getAttribute("save-button");
        const filterId = this.getAttribute("filter");
        const filtersClass = this.getAttribute("filters");

        this.resetDisplay();

        if(lang != null) {
            const attrLang = lang.slice(0, 2);
            if(langExist(attrLang)) {
                this.setAttr("langOrigin", "ATTRIBUTE");
                this.setAttr("lang", attrLang);
            } else {
                settingsOk = false;
            }
        } else {
            if(document.documentElement.lang != null && document.documentElement.lang.length >= 2) {
                const docLang = document.documentElement.lang.slice(0, 2);
                if(langExist(docLang)) {
                    this.setAttr("langOrigin", "PAGE");
                    this.setAttr("lang", docLang);
                } else {
                    settingsOk = false;
                }
            } else if(window.navigator) {
                const navLang = (window.navigator.language!=null&&window.navigator.language.length>=2)?window.navigator.language.slice(0,2):((window.navigator.userLanguage!=null&&window.navigator.userLanguage.length>=2)?window.navigator.userLanguage.slice(0,2):null);
                if(navLang != null && langExist(navLang)) {
                    this.setAttr("langOrigin", "NAVIGATOR");
                    this.setAttr("lang", navLang);
                } else {
                    this.setAttr("langOrigin", "DEFAULT");
                    this.setAttr("lang", DEFAULT_LANG);
                }
            } else {
                this.setAttr("langOrigin", "DEFAULT");
                this.setAttr("lang", DEFAULT_LANG);
            }
        }

        if(url != null && settingsOk) {
            this.setAttr("url", url);
        } else {
            settingsOk = false;
        }

        if(saveButtonId != null && settingsOk) {
            const saveButton = document.getElementById(saveButtonId);
            if(saveButton != null) {
                this.setAttr("saveButton", saveButton);
            } else {
                settingsOk = false;
            }
        }

        if(filterId != null || filtersClass != null) {
            this.setAttr("filters", []);
            if(filterId != null) {
                const filter = document.getElementById(filterId);
                if(filter != null) {
                    this.getAttr("filters").push(filter);
                } else {
                    settingsOk = false;
                }
            }
            if(filtersClass != null) {
                const filters = document.getElementsByClassName(filtersClass);
                if(filters != null && filters.length > 0) {
                    for(const filter of filters) {
                        this.getAttr("filters").push(filter);
                    }
                } else {
                    settingsOk = false;
                }
            }
            const self = this;
            const filterOnInputFunc = function() {
                for(const filter of self.getAttr("filters")) {
                    if(filter != this) {
                        filter.value = this.value;
                    }
                }
                self.filter(this.value);
            };
            const filterOnFocusFunc = function() {
                self.filter(this.value);
            };
            for(const filter of this.getAttr("filters")) {
                filter.value = "";
                filter.oninput = filterOnInputFunc;
                filter.onfocus = filterOnFocusFunc;
            }
        }

        this.setAttr("loadElement", createElement("<h1 class=\"text-info\"><i class=\"fas fa-spinner fa-pulse\"></i></h1>"));
        this.setAttr("errorElement", createElement(`
            <div class="alert alert-warning" role="alert">
                <strong><span class="crudjs-error-t">${this.text("basic.error").toUpperCase()}</span>:</strong>
                <span class="crudjs-error-m">Unknown</span>
            </div>
            `)
        );
        this.setAttr("messagesElement", createElement(`<div style="position:fixed;right:10px;bottom:10px;z-index:100;pointer-events:none"></div>`));


        if(settingsOk) {
            this.setAttr("data", null);
            this.setAttr("request", new CrudRequest(this, this.getUrl(), this.getAddMessageWrapper()));
            this.setAttr("table", new CrudTable(this));
            document.body.appendChild(this.getAttr("messagesElement"));
            if(this.isEditable()) {
                const self = this;
                this.getAttr("saveButton").onclick = function() {
                    self.save();
                };
            }
            this.load();
        } else {
            this.displayError(this.text("basic.error"), this.text("component.configurationError"));
        }

    }

    // Getters and Setters

    setAttr(name, value) {
        this.attr[name] = value;
    }

    getAttr(name) {
        return this.attr[name];
    }

    getData() {
        return this.getAttr("data");
    }

    getValues() {
        return this.getData().values;
    }

    getLang() {
        return this.getAttr("lang");
    }

    getUrl() {
        return this.getAttr("url");
    }

    isEditable() {
        return this.getAttr("saveButton") != null;
    }

    setChild(child) {
        this.resetDisplay();
        this.appendChild(child);
    }

    // Requests

    load() {
        this.displayLoading();
        this.getAttr("request").get(this.getDataLoadedWrapper(), this.getWrongUrlWrapper());
    }

    wrongUrl(error) {
        this.displayError(this.text("basic.error"), `${this.text("component.urlError")} ${error}`);
    }

    dataLoaded(json) {
        this.setAttr("data", json);
        this.displayTable();
    }

    save() {
        if(this.getData()) {
            this.getAttr("request").send(this.getValues());
        }
    }

    // Displays

    text(strRequest) {
        return text(this.getLang(), strRequest);
    }

    filter(filterValue) {
        for(const line of this.getElementsByClassName("crudjs-edit-line")) {
            if(line.textContent.toLowerCase().includes(filterValue.toLowerCase())) {
                if(isHidden(line)) {
                    display(line);
                }
            } else {
                if(!isHidden(line)) {
                    hide(line);
                }
            }
        }
        this.getAttr("table").updateLineNumbers();
    }

    addMessage(typeM, titleM, textM, timeM) {
        if(timeM == undefined) {
            timeM = 20000;
        }
        const toast = createElement(`
            <div style="box-shadow:2px 2px 7px black;display:inline-block;float:right;clear:right;pointer-events:auto;" class="alert alert-`+typeM+` alert-dismissible fade show" role="alert">
              <strong>`+titleM+`:</strong> `+textM+`
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
        `);
        this.getAttr("messagesElement").appendChild(toast);
        setTimeout(function() {
            if(toast.parentNode != null) {
                toast.getElementsByClassName('close')[0].click();
            }
        }, timeM);
    }

    resetDisplay() {
        resetElementHTML(this);
    }

    displayLoading() {
        this.setChild(this.getAttr("loadElement"));
    }

    displayError(errorTitle, errorMessage) {
        const errorElement = this.getAttr("errorElement");
        for(const title of errorElement.getElementsByClassName('crudjs-error-t')) {
            title.textContent = errorTitle;
        }
        for(const msg of errorElement.getElementsByClassName('crudjs-error-m')) {
            msg.textContent = errorMessage;
        }
        this.setChild(errorElement);
    }

    displayTable() {
        const table = this.getAttr("table");
        table.render();
        this.setChild(table.getElement());
    }

    // Events

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    adoptedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(this.getData() != null && newValue != null) {
            this.init();
        }
    }

    // Function wrappers

    getAddMessageWrapper() {
        const self = this;
        const addMessageFuncWrapper = function(typeM, titleM, textM, timeM) {
            self.addMessage(typeM, titleM, textM, timeM);
        };
        return addMessageFuncWrapper;
    }

    getDataLoadedWrapper() {
        const self = this;
        const dataLoadedWrapper = function(json) {
            self.dataLoaded(json);
        };
        return dataLoadedWrapper;
    }

    getWrongUrlWrapper() {
        const self = this;
        const wrongUrlWrapper = function(error) {
            self.wrongUrl(error);
        };
        return wrongUrlWrapper;
    }

}

/**
 * ------------------------------------------------------------------------
 * Code Run
 * ------------------------------------------------------------------------
 */

customElements.define('crud-js', CrudComponent);
