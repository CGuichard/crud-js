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
        const self = this;
        const data = this.collectData(values);
        if(data.needSave) {
            let noError = true;
            const headers = { "Content-Type": "application/json" };
            if(typeof CSRF !== 'undefined' && CSRF !== null) {
                headers['X-CSRFToken'] = CSRF;
            }
            fetch(self.url, {
                method: "POST",
                headers: headers,
                body: self.makeUpdateJSON(data)
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                json.actions.forEach(function(action) {
                    if(!("result" in action)) {
                        noError = false;
                        self.addMessageFunc("danger", self.crud.text("basic.error"), self.crud.text("request.badResponse"), 5000);
                    } else {
                        noError = self.handle(action, values) && noError;
                    }
                });
                if(noError) {
                    self.addMessageFunc("success", self.crud.text("basic.ok"), self.crud.text("request.okResponse"), 5000);
                }
            }).catch(function(error) {
                console.error(error);
            });
        } else {
            self.addMessageFunc("info", self.crud.text("basic.info"), self.crud.text("request.alreadySaved"), 2000);
        }
    }

    handle(action, values) {
        const self = this;
        let noError = true;
        switch(action.request) {
            case "NEW":
                action.result.forEach(function(val,i) {
                    if(val[0] === "ERROR") {
                        self.addMessageFunc("warning", self.crud.text("basic.error"), `${self.crud.text("request.addImpossible")} '${action.new_values[i].join(', ')}' − ${val[1]}`, 15000);
                        noError = false;
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
                        noError = false;
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
                        noError = false;
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
        return noError;
    }

    collectData(values) {
        const data = {
            newNewValues: [],
            modifyOldValues: [],
            modifyNewValues: [],
            deletedOldValues: [],
            needSave: undefined
        };
        values.forEach(function(element) {
            switch(element.status) {
                case 'N':
                    data.newNewValues.push(element);
                    break;
                case 'M':
                    data.modifyOldValues.push(element.oldValue);
                    data.modifyNewValues.push(element);
                    break;
                case 'D':
                    data.deletedOldValues.push(element.oldValue);
                    break;
            }
        });
        data.needSave = data.newNewValues.length > 0 || data.modifyOldValues.length > 0 || data.deletedOldValues.length > 0;
        return data;
    }

    makeUpdateJSON(data) {
        return JSON.stringify({
            "actions": [
                {
                    "request": "NEW",
                    "new_values": data.newNewValues
                },
                {
                    "request": "MODIFIED",
                    "old_values": data.modifyOldValues,
                    "new_values": data.modifyNewValues
                },
                {
                    "request": "DELETED",
                    "old_values": data.deletedOldValues
                }
            ]
        });
    }

}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudRequest };
export default CrudRequest;
