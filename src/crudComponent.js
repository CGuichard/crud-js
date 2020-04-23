/**
 * @file This file contains the CrudJS webcomponent.
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
 * Imports
 * ------------------------------------------------------------------------
 */

import { createElement, resetElementHTML, isHidden, hide, display } from "./utils.js";
import { langExist, text, DEFAULT_LANG } from "./lang.js";
import CrudTable from "./crudTable.js";
import CrudRequest from "./crudRequest.js";

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

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudComponent };
export default CrudComponent;
