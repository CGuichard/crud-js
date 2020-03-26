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
 * @file This file contains the CrudField object.
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

class CrudField {

    constructor(index, crudLine, columnDesc) {
        this.edit = false;
        this.index = index;
        this.crudLine = crudLine;
        this.columnDesc = columnDesc;
        this.element = document.createElement("th");
        this.element.className = "align-middle";
        this.element.setAttribute("scope", "row");
    }

    setValue(val) {
        this.crudLine.getValues()[this.index] = val;
    }

    getValue() {
        return this.crudLine.getValues()[this.index];
    }

    prepareDisplayView() {
        this.edit = false;
        resetElementHTML(this.element);
        const fieldValue = this.getValue();
        switch (this.columnDesc.type) {
            case "text":
                this.element.innerHTML = fieldValue;
                break;
            case "int":
                this.element.innerHTML = fieldValue;
                break;
            case "select":
                this.element.innerHTML = fieldValue;
                break;
            case "select-chips":
                for (const val of fieldValue) {
                    this.element.innerHTML = this.element.innerHTML.concat("<span style=\"font-size:0.9rem;\" class=\"badge badge-pill badge-secondary mt-1 mr-1 pb-2 pt-2\">"+val+"</span>");
                }
                break;
        }
    }

    showDisplayView() {
        this.prepareDisplayView();
        this.crudLine.addColumn(this.element);
    }

    prepareEditView() {
        this.edit = true;
        resetElementHTML(this.element);
        const self = this;
        let fieldValue = this.getValue();
        switch(this.columnDesc.type) {
            case "text":
                if(!fieldValue) {
                    fieldValue = "";
                }
                this.element.innerHTML = "<input type=\"text\" class=\"form-control m-0\" placeholder=\""+this.columnDesc.name+"\" value=\""+fieldValue+"\" style=\"background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0);width:auto !important;\">";
                break;
            case "int":
                if(!fieldValue) {
                    fieldValue = "";
                }
                this.element.innerHTML = "<input type=\"number\" class=\"form-control m-0\" placeholder=\""+this.columnDesc.name+"\" value=\""+fieldValue+"\" style=\"background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0);width:auto !importan;\">";
                break;
            case "select":
                if(!fieldValue) {
                    fieldValue = "";
                }
                let selectHTML = "<select class=\"custom-select\">";
                for(const choice of this.columnDesc.options.values) {
                    selectHTML = selectHTML.concat("<option value=\""+choice+"\" "+((choice===fieldValue)?"selected":"")+">"+choice+"</option>");
                }
                selectHTML = selectHTML.concat("</select>");
                this.element.innerHTML = selectHTML;
                break;
            case "select-chips":
                // Create select
                if(!fieldValue) {
                    fieldValue = [];
                }
                const options = this.columnDesc.options.values.filter(x => !(fieldValue.includes(x)));
                const selectChips = document.createElement("select");
                selectChips.setAttribute("style", "width:auto !important");
                selectChips.setAttribute("class", "custom-select mr-2");
                selectChips.appendChild(createElement("<option>Sélectionner...</option>"));
                for(const choice of options) {
                    selectChips.appendChild(createElement("<option value=\""+choice+"\">"+choice+"</option>"));
                }
                selectChips.onchange = function() {
                    const chips = self.createSelectChips(this.value);
                    this.parentNode.appendChild(chips);
                    this.options[this.selectedIndex].remove();
                    this.selectedIndex = 0;
                };
                this.element.appendChild(selectChips);
                // Create chips
                for (const value of fieldValue) {
                    this.element.appendChild(this.createSelectChips(value));
                }
                break;
        }
    }

    showEditView() {
        this.prepareEditView();
        this.crudLine.addColumn(this.element);
    }

    validateEdit() {
        if(this.edit) {
            switch (this.columnDesc.type) {
                case "text":
                    this.setValue(this.element.getElementsByTagName('input')[0].value);
                    break;
                case "int":
                    const value = parseInt(this.element.getElementsByTagName('input')[0].value);
                    if(!isNaN(value)) {
                        this.setValue(value);
                    }
                    break;
                case "select":
                    this.setValue(this.element.getElementsByTagName('select')[0].value);
                    break;
                case "select-chips":
                    const valuesArray = [];
                    for(const value of this.element.getElementsByClassName("crudjs-chips")) {
                        valuesArray.push(value.textContent);
                    }
                    this.setValue(valuesArray);
                    break;
            }
        }
    }

    createSelectChips(value) {
        const chips = createElement("<span style=\"font-size:0.9rem;\" class=\"crudjs-chips badge badge-pill badge-secondary mt-1 mr-1 pb-2 pt-2\">"+value+"<span class=\"crudjs-remove-chips-btn bg-light rounded-circle pl-1 pr-1 text-secondary ml-1\" aria-hidden=\"true\"><i class=\"fas fa-times\" aria-hidden=\"true\"></i></span></span>");
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

}

/**
 * @file This file contains the CrudEditLine object.
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

class CrudEditLine {

    constructor(lineArray, crudTable) {
        this.values = lineArray;
        this.crudTable = crudTable;
        this.element = document.createElement("tr");
        this.element.className = "crudjs-edit-line";
        this.fields = [];
        for(var i = 0; i < this.values.length; i++) {
            this.fields.push(new CrudField(i, this, this.crudTable.getCrudComponent().getData().columns[i]));
        }
        this.showDisplayView();
    }

    showDisplayView() {
        resetElementHTML(this.element);
        this.addNumberColumn();
        for(const field of this.fields) {
            field.showDisplayView();
        }
        if(this.crudTable.getCrudComponent().isEditable()) {
            this.addActionsColumn();
        }
        this.crudTable.enableButtons();
    }

    showEditView() {
        if(this.crudTable.getCrudComponent().isEditable()) {
            resetElementHTML(this.element);
            this.addNumberColumn();
            for(const field of this.fields) {
                field.showEditView();
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
        thNumber.className = "crudjs-line-number align-middle";
        thNumber.setAttribute("scope", "row");
        this.element.appendChild(thNumber);
    }

    addActionsColumn() {
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-edit-btn btn btn-raised btn-info mb-1 rounded" title="Editer"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" style="width:45px;" class="crudjs-delete-btn btn btn-raised btn-danger mb-1 rounded" data-toggle="modal" data-target="#`+this.crudTable.modalDeleteId+`" title="Supprimer"><i class="fas fa-trash"></i></button>
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
                    const lineArray = self.crudTable.getCrudComponent().getData().values;
                    lineArray.splice(lineArray.indexOf(self.values), 1);
                }
                self.crudTable.updateLineNumbers();
            };
        };
        this.element.appendChild(tdActions);
    }

    addEditActionsColumn() {
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-valid-btn btn btn-raised btn-success mb-1 rounded" title="Valider"><i class="fas fa-sm fa-check"></i></button>
            <button type="button" style="width:45px;" class="crudjs-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="Annuler"><i class="fas fa-times"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-valid-btn')[0].onclick = function() {

            for(const field of self.fields) {
                field.validateEdit();
            }

            if(self.getStatus() === "S") {
                self.setStatus("M");
            }

            self.showDisplayView();
            self.crudTable.updateLineNumbers();
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
 * @version 0.0.1
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
        const columns = this.crudTable.getCrudComponent().getData().columns;
        this.initData(columns.length);
        this.fields = [];
        for(var i = 0; i < this.values.length; i++) {
            this.fields.push(new CrudField(i, this, columns[i]));
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
        }
        if(this.crudTable.getCrudComponent().isEditable()) {
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
        const self = this;
        const tdActions = document.createElement("td");
        tdActions.className = "text-right";
        tdActions.innerHTML = `
            <button type="button" style="width:45px;" class="crudjs-add-btn btn btn-raised btn-secondary mb-1 rounded" title="Ajouter"><i class="fas fa-plus"></i></button>
            <button type="button" style="width:45px;" class="crudjs-add-cancel-btn btn btn-raised btn-danger mb-1 rounded" title="Réinitialiser"><i class="fas fa-times"></i></button>
        `;
        tdActions.getElementsByClassName('crudjs-add-btn')[0].onclick = function() {
            for(const field of self.fields) {
                field.validateEdit();
            }
            const values = self.values;
            self.crudTable.getCrudComponent().getData().values.push(values);
            self.crudTable.addCrudLine(new CrudEditLine(values, self.crudTable));

            self.initData(self.values.length);
            for(const field of self.fields) {
                field.prepareEditView();
            }
            self.crudTable.updateLineNumbers();
        };
        tdActions.getElementsByClassName('crudjs-add-cancel-btn')[0].onclick = function() {
            for(const field of self.fields) {
                field.prepareEditView();
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

    constructor(crudComponent) {
        this.crudComponent = crudComponent;
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
        for(const col of this.crudComponent.getData().columns) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.innerHTML = "<strong>"+col.name+"</strong>";
            this.thead.children[0].appendChild(th);
        }
        if(this.crudComponent.isEditable()) {
            const th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.className = "text-right pr-3";
            th.innerHTML = "<strong>Action(s)</strong>";
            this.thead.children[0].appendChild(th);
        }
    }

    renderLines() {
        if(this.getCrudComponent().isEditable()) {
            this.addCrudLine(new CrudAddLine(this));
        }
        const values = this.crudComponent.getData().values;
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
                <h5 class="modal-title">Attention !</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Voulez-vous vraiment supprimer cette ligne ?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary mr-1" data-dismiss="modal">Non</button>
                <button type="button" class="btn btn-raised btn-info crudjs-modal-valid" data-dismiss="modal">Oui</button>
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

    getCrudComponent() {
        return this.crudComponent;
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

    constructor(url, addMessageFunc) {
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
                    self.addMessageFunc("danger","Error","Bad response");
                } else {
                    self.handle(action, values);
                }
            });
            if(self.noError) {
                self.addMessageFunc("success","OK","Sauvegarde effectuée");
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
                        self.addMessageFunc("warning","Erreur","Ajout de la ligne '"+action.new_values[i].join(', ')+"' impossible: "+val[1]);
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
                        self.addMessageFunc("warning","Erreur","Modification de la ligne '"+action.new_values[i].join(', ')+"' impossible: "+val[1]);
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
                        self.addMessageFunc("warning","Erreur","Suppression de la ligne '"+action.old_values[i].join(', ')+"' impossible: "+val[1]);
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

    static get observedAttributes() { return ['url', 'save-button', 'editable']; }

    constructor() {
        super();
        this.init();
    }

    init() {
        this.attr = {};

        let settingsOk = true;

        const url = this.getAttribute("url");
        const editable = this.getAttribute("editable");
        const saveButtonId = this.getAttribute("save-button");

        this.resetDisplay();

        this.setAttr("loadElement", createElement("<h1 class=\"text-info\"><i class=\"fas fa-spinner fa-pulse\"></i></h1>"));
        this.setAttr("errorElement", createElement(`
            <div class="alert alert-warning" role="alert">
                <strong><span class="crudjs-error-t">ERROR</span>:</strong>
                <span class="crudjs-error-m">Unknown</span>
            </div>
            `)
        );
        this.setAttr("messagesElement", createElement(`<div style="position:fixed;right:10px;bottom:10px;z-index:100;"></div>`));

        if(url === null && settingsOk) {
            settingsOk = false;
        } else {
            this.setAttr("url", url);
        }

        if(editable !== null && settingsOk) {
            if(saveButtonId !== null) {
                const saveButton = document.getElementById(saveButtonId);
                if(saveButton !== null) {
                    this.setAttr("editable", true);
                    this.setAttr("saveButton", saveButton);
                } else {
                    settingsOk = false;
                }
            } else {
                settingsOk = false;
            }
        } else {
            this.setAttr("editable", false);
        }

        if(settingsOk) {
            this.setAttr("data", null);
            this.setAttr("request", new CrudRequest(this.getUrl(), this.getAddMessageWrapper()));
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
            this.displayError("Error", "Incorrect configuration. If you want to have an editable crud don't forget to give it a save-button.");
        }

    }

    // Requests

    load() {
        this.displayLoading();
        this.getAttr("request").get(this.getDataLoadedWrapper(), this.getWrongUrlWrapper());
    }

    wrongUrl(error) {
        this.displayError("Error", "An error occured while trying to fetch resource. See : " + error);
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

    addMessage(typeM, titleM, textM, timeM) {
        if(timeM == undefined) {
            timeM = 60000;
        }
        const toast = createElement(`
            <div style="box-shadow:2px 2px 7px black;display:inline-block;float:right;clear:right;" class="alert alert-`+typeM+` alert-dismissible fade show" role="alert">
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

    getUrl() {
        return this.getAttr("url");
    }

    isEditable() {
        return this.getAttr("editable");
    }

    setChild(child) {
        this.resetDisplay();
        this.appendChild(child);
    }

    // Function wrappers

    getAddMessageWrapper() {
        const self = this;
        const addMessageFuncWrapper = function(typeM, titleM, textM) {
            self.addMessage(typeM, titleM, textM);
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
