/**
 * CrudJS demo file.
 *
 * @file demo.js
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
 *
 */

console.log("CrudJS: This page is for demonstration purposes. It is by no means the only possible way to use CrudJS.");

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function EmailField(value, columnDesc, crud) {
    this.value = value;
    this.columnDesc = columnDesc;
    this.crud = crud;
    this.element = document.createElement("td");
}

EmailField.prototype.getDefaultValue = function() {
    return "";
};

EmailField.prototype.getNewValue = function() {
    var elem = this.element.getElementsByTagName('input')[0];
    if(elem) {
        return elem.value;
    }
    return this.value;
};

EmailField.prototype.buildDisplayView = function() {
    this.element.innerHTML = this.value;
};

EmailField.prototype.buildEditView = function() {
    var value = this.value;
    if(!value) {
        value = this.getDefaultValue();
    }
    this.element.innerHTML = "<input type=\"email\" class=\"form-control m-0\" placeholder=\""+this.columnDesc.name+"\" value=\""+value+"\" style=\"background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0) !important;width:auto !important;\">";
};

EmailField.prototype.checkValidators = function(newValue, validators) {
    return (validators.domain != null && newValue.endsWith(validators.domain));
};

EmailField.prototype.checkField = function(newValue) {
    return typeof newValue === "string" && validateEmail(newValue);
};

// Add email field to custom fields of CrudJS
var CUSTOM_FIELDS = {
    'email': EmailField
};
