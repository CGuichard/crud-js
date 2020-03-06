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

import { createElement, resetElementHTML } from "./utils.js";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class CrudComponent extends HTMLElement {

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
            this.setAttr("table", document.createElement("div"));
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

    static get observedAttributes() { return ['url', 'save-button', 'editable']; }

    // Requests

    load() {
        this.displayLoading();
        fetch(this.getUrl())
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.parseData(json);
            this.displayTable();
        })
        .catch(err => {
            this.displayError("Error", "An error occured while trying to fetch resource. See : "+err);
        });
    }

    parseData(data) {
        for(const line of data.values) {
            line.status = "S";
        }
        this.setAttr("data", data);
    }

    save() {
        if(this.getData()) {
            console.log("SAVE", this.getData());
        }
    }

    // Displays

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
        this.setChild(table);
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
