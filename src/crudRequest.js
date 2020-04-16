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
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { CrudRequest };
export default CrudRequest;
