/**
 * @file module to send and retrieve data for crudjs
 *
 * @author Kévin Delcourt
 * @version 0.0.1
 *
 */

/* jshint esversion: 6 */

function responseTreatment(self,action,data){
    switch (action.request) {
        case "NEW":
            action.result.forEach(function(val,i){
                if(val[0] === "ERROR"){
                    self.addMessageFunc("warning","Erreur","Ajout de la ligne '"+action.new_values[i].join(', ')+"' impossible: "+val[1]);
                    self.noError = false;
                }else{
                    let el = data.find(el => el.join('&') === action.new_values[i].join('&'));
                    el.status = 'S';
                    el.oldValue = action.new_values[i];
                }
            });
            break;
        case "MODIFIED":
            action.result.forEach( function(val,i){
                if(val[0] === "ERROR"){
                    self.addMessageFunc("warning","Erreur","Modification de la ligne '"+action.new_values[i].join(', ')+"' impossible: "+val[1]);
                    self.noError = false;
                }else{
                    let el = data.find(el => el.join('&') === action.new_values[i].join('&'));
                    el.status = 'S';
                    el.oldValue = action.new_values[i];
                }
            });
            break;
        case "DELETED":
            action.result.forEach( function(val,i){
                if(val[0] === "ERROR"){
                    self.addMessageFunc("warning","Erreur","Suppression de la ligne '"+action.old_values[i].join(', ')+"' impossible: "+val[1]);
                    self.noError = false;
                }else
                    delete data[data.findIndex(el => el.oldValue.join('&') === action.old_values[i].join('&'))];
                
            });
            break;
    }
}

class CrudRequest {

    constructor(url, addMessageFunc) {
        this.url = url;
        this.addMessageFunc = addMessageFunc;
    }

    send(data) {
        let newNewValues = [];
        let modifyOldValues = [];
        let modifyNewValues = [];
        let deletedOldValues = [];

        this.noError = true;
        let self = this;
        data.forEach(function(element){
            switch (element.status) {
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
        if(typeof CSRF !== 'undefined' && CSRF !== null)
            headers['X-CSRFToken'] = CSRF;
        
        fetch(self.url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "actions": [
                    {
                        "request": "NEW",
                        "new_values": newNewValues
                    }, {
                        "request": "MODIFIED",
                        "old_values": modifyOldValues,
                        "new_values": modifyNewValues
                    }, {
                        "request": "DELETED",
                        "old_values": deletedOldValues
                    }
                ]
            }) 
        }).then(function (response) {
            return response.json();
        }).then(function (json){
            json.actions.forEach(function(action){
                if(!("result" in action)){
                    self.noError = false;
                    self.addMessageFunc("danger","Error","Bad response");
                }else
                    responseTreatment(self, action, data);
            });
            if(self.noError)
                self.addMessageFunc("success","OK","Sauvegarde effectuée");
        }).catch(function (error) {
            console.error(error);
        });
    }

    get(callback){
        fetch(this.url, {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (json){
            json.values.forEach(value => {
                value.status = 'S';
                value.oldValue = [...value];
            });
            callback(json);
        }).catch(function (error) {
            console.error(error);
        });
    }
}

export { CrudRequest };
export default CrudRequest;

