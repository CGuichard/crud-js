/**
 * @file This file contains some basic function used in the project.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
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

function createElement(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function resetElementHTML(htmlElement) {
    htmlElement.innerHTML = "";
}

function isHidden(element) {
    return element.style.display === "none";
}

/**
 * @file This file contains CrudJS languages.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
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
 * @file This file contains the CrudEditLine object.
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

class CrudEditLine {

    constructor(lineArray, crudTable) {
        this.values = lineArray;
        this.crudTable = crudTable;
        this.element = document.createElement("tr");
        this.element.className = "crudjs-edit-line";
        this.fields = [];
        const columns = this.crudTable.crud.getData().columns;
        const factory = CrudFieldFactory.getInstance();
        for(var i = 0; i < this.values.length; i++) {
            this.fields.push(factory.create(columns[i].type, this.values[i], columns[i], this.crudTable.crud));
        }
        this.showDisplayView();
    }

    showDisplayView() {
        resetElementHTML(this.element);
        this.addNumberColumn();
        for(const field of this.fields) {
            field.showDisplayView();
            this.addColumn(field.element);
        }
        if(this.crudTable.crud.isEditable()) {
            this.addActionsColumn();
        }
        this.crudTable.enableButtons();
    }

    showEditView() {
        if(this.crudTable.crud.isEditable()) {
            resetElementHTML(this.element);
            this.addNumberColumn();
            for(const field of this.fields) {
                field.showEditView();
                this.addColumn(field.element);
            }
            this.addEditActionsColumn();
            this.crudTable.disableButtons();
        }
    }

    getStatus() {
        return this.values.status;
    }

    setStatus(status) {
        this.values.status = status;
    }

    getElement() {
        return this.element;
    }

    getValues() {
        return this.values;
    }

    addColumn(col) {
        this.element.appendChild(col);
    }

    addNumberColumn() {
        const thNumber = document.createElement("th");
        thNumber.className = "crudjs-line-number text-center";
        thNumber.setAttribute("scope", "row");
        this.element.appendChild(thNumber);
    }

    addActionsColumn() {
        const crud = this.crudTable.crud;
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-edit-btn btn btn-raised btn-info mb-1 rounded" title="${crud.text("line.btn.edit")}"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" style="width:45px;" class="crudjs-delete-btn btn btn-raised btn-danger mb-1 rounded" data-toggle="modal" data-target="#`+this.crudTable.modalDeleteId+`" title="${crud.text("line.btn.delete")}"><i class="fas fa-trash"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-edit-btn')[0].onclick = function() {
            self.showEditView();
            self.crudTable.updateLineNumbers();
        };
        tdActions.getElementsByClassName('crudjs-delete-btn')[0].onclick = function() {
            const btnValidDelete = self.crudTable.getModalDelete().getElementsByClassName('crudjs-modal-valid')[0];
            btnValidDelete.onclick = function() {
                if(self.getStatus() !== "N") {
                    self.setStatus("D");
                    self.element.style.display = "none";
                } else {
                    self.element.remove();
                    const lineArray = self.crudTable.crud.getData().values;
                    lineArray.splice(lineArray.indexOf(self.values), 1);
                }
                self.crudTable.updateLineNumbers();
            };
        };
        this.element.appendChild(tdActions);
    }

    addEditActionsColumn() {
        const crud = this.crudTable.crud;
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-validate-btn btn btn-raised btn-success mb-1 rounded" title="${crud.text("line.btn.validate")}"><i class="fas fa-sm fa-check"></i></button>
            <button type="button" style="width:45px;" class="crudjs-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.cancel")}"><i class="fas fa-times"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-validate-btn')[0].onclick = function() {

            const errorMessages = [];
            for (let i = 0; i < self.values.length; i++) {
                if(!self.fields[i].isValid()) {
                    errorMessages.push(`${crud.text("line.messages.invalidColumn")} '${self.fields[i].columnDesc.name}'`);
                }
            }
            if(errorMessages  != null && errorMessages.length > 0) {
                for (const errorMsg of errorMessages) {
                    crud.addMessage("warning", crud.text("basic.warning"), errorMsg, 15000);
                }
            } else {
                for (let i = 0; i < self.values.length; i++) {
                    self.values[i] = self.fields[i].validate();
                }

                if(self.getStatus() === "S") {
                    self.setStatus("M");
                }

                self.showDisplayView();
                self.crudTable.updateLineNumbers();
            }
        };
        tdActions.getElementsByClassName('crudjs-cancel-btn')[0].onclick = function() {
            self.showDisplayView();
            self.crudTable.updateLineNumbers();
        };
        this.element.appendChild(tdActions);
    }

}

/**
 * @file This file contains the CrudAddLine object.
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

class CrudAddLine {

    constructor(crudTable) {
        this.crudTable = crudTable;
        this.element = document.createElement("tr");
        this.element.className = "crudjs-add-line";
        const columns = this.crudTable.crud.getData().columns;
        this.initData(columns.length);
        this.fields = [];
        const factory = CrudFieldFactory.getInstance();
        for(var i = 0; i < this.values.length; i++) {
            this.fields.push(factory.create(columns[i].type, this.values[i], columns[i], this.crudTable.crud));
        }
        this.show();
    }

    initData(size) {
        this.values = new Array(size);
        this.values.status = "N";
        this.values.oldValue = [...this.values];
    }

    show() {
        resetElementHTML(this.element);
        this.addEmptyColumn();
        for(const field of this.fields) {
            field.showEditView();
            this.addColumn(field.element);
        }
        if(this.crudTable.crud.isEditable()) {
            this.addActionsColumn();
        }
        this.crudTable.enableButtons();
    }

    getElement() {
        return this.element;
    }

    getValues() {
        return this.values;
    }

    addColumn(col) {
        this.element.appendChild(col);
    }

    addEmptyColumn() {
        const thEmpty = document.createElement("th");
        thEmpty.setAttribute("scope", "row");
        this.element.appendChild(thEmpty);
    }

    addActionsColumn() {
        const crud = this.crudTable.crud;
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-add-btn btn btn-raised btn-secondary mb-1 rounded" title="${crud.text("line.btn.add")}"><i class="fas fa-plus"></i></button>
            <button type="button" style="width:45px;" class="crudjs-add-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="${crud.text("line.btn.addCancel")}"><i class="fas fa-times"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-add-btn')[0].onclick = function() {

            const errorMessages = [];
            for (let i = 0; i < self.values.length; i++) {
                if(!self.fields[i].isValid()) {
                    errorMessages.push(`${crud.text("line.messages.invalidColumn")} '${self.fields[i].columnDesc.name}'`);
                }
            }
            if(errorMessages != null && errorMessages.length > 0) {
                for (const errorMsg of errorMessages) {
                    crud.addMessage("warning", crud.text("basic.warning"), errorMsg, 15000);
                }
            } else {
                for (let i = 0; i < self.values.length; i++) {
                    self.values[i] = self.fields[i].validate();
                }

                const values = self.values;
                self.crudTable.crud.getData().values.push(values);
                self.crudTable.addCrudLine(new CrudEditLine(values, self.crudTable));

                self.initData(self.values.length);
                for (let i = 0; i < self.values.length; i++) {
                    self.fields[i].value = self.values[i];
                    self.fields[i].update();
                }
                self.crudTable.updateLineNumbers();
            }
        };
        tdActions.getElementsByClassName('crudjs-add-cancel-btn')[0].onclick = function() {
            for(const field of self.fields) {
                field.value = field.defaultValue;
                field.update();
            }
            self.crudTable.updateLineNumbers();
        };
        this.element.appendChild(tdActions);
    }

}

/**
 * @file This file contains the CrudTable object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
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
        this.modalDeleteId = "crudjs-modal-" + (++CrudTable.ID);
        this.modalDelete = this.createModal();
    }

    // Displays

    render() {
        this.resetTable();
        this.renderHead();
        this.renderLines();
        this.updateLineNumbers();
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
            this.addCrudLine(new CrudAddLine(this));
        }
        const values = this.crud.getData().values;
        for(var i = 0; i < values.length; i++) {
            this.addCrudLine(new CrudEditLine(values[i], this));
        }
    }

    addCrudLine(line) {
        this.tbody.appendChild(line.getElement());
    }

    updateLineNumbers() {
        let i = 1;
        for(const elem of this.element.getElementsByClassName('crudjs-line-number')) {
            if(!isHidden(elem.parentNode)) {
                elem.textContent = i++;
            }
        }
    }

    disableButtons() {
        for(const elem of this.element.getElementsByClassName('crudjs-edit-btn')) {
            elem.disabled = true;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-delete-btn')) {
            elem.disabled = true;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-add-btn')) {
            elem.disabled = true;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-add-cancel-btn')) {
            elem.disabled = true;
        }
    }

    enableButtons() {
        for(const elem of this.element.getElementsByClassName('crudjs-edit-btn')) {
            elem.disabled = false;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-delete-btn')) {
            elem.disabled = false;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-add-btn')) {
            elem.disabled = false;
        }
        for(const elem of this.element.getElementsByClassName('crudjs-add-cancel-btn')) {
            elem.disabled = false;
        }
    }

    createModal() {
        const modalDelete = createElement(`
        <div class="modal fade" id="`+this.modalDeleteId+`" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${this.crud.text("table.modal.delete.title")}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ${this.crud.text("table.modal.delete.message")}
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

    getModalDelete() {
        return this.modalDelete;
    }

    getModalDeleteId() {
        return this.modalDeleteId;
    }

    getCrud() {
        return this.crud;
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
 * @version 0.0.2
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

    get(callback, errorCallback){
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
        values.forEach(function(element){
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
        }).then(function(json){
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
                        self.addMessageFunc("warning", self.crud.text("basic.error"), `${self.crud.text("request.addImpossible")} '${action.new_values[i].join(', ')}' − ${val[1]}`, 20000);
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
                        self.addMessageFunc("warning", self.crud.text("basic.error"), `${self.crud.text("request.modifyImpossible")} '${action.new_values[i].join(', ')}' − ${val[1]}`, 20000);
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
                action.result.forEach( function(val,i){
                    if(val[0] === "ERROR") {
                        self.addMessageFunc("warning", self.crud.text("basic.error"), `${self.crud.text("request.deleteImpossible")} '${action.new_values[i].join(', ')}' − ${val[1]}`, 20000);
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
 * @version 0.0.1
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

    addMessage(typeM, titleM, textM, timeM) {
        if(timeM == undefined) {
            timeM = 60000;
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
        if(this.getData() && newValue) {
            this.init();
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
