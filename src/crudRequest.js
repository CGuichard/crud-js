/**
 * @file la descritpion en anglais
 *
 * @author Kévin Delcourt
 * @version 0.0.1
 *
 */

/* jshint esversion: 6 */

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
        
        let self = this;
        data.forEach(element => {
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

        fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
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
            }) /*{
                "actions": JSON.stringify([
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
                ])
            }*/
        }).then(function (response) {
            return response.json();
        }).then(function (json){
            json.actions.forEach(action => {
                if(!("result" in action))
                    self.addMessageFunc("danger","Error","Bad response");
                else{
                    switch (action.request) {
                        case "NEW":
                            action.result.forEach( (val,i) => {
                                if(val[0] === "ERROR")
                                    self.addMessageFunc("warning","Erreur","Ajout de la ligne '"+action.new_values[i].join(', ')+"' impossible: "+val[1]);
                                else{
                                    let el = data.find(el => el.join('&') === action.new_values[i].join('&'));
                                    el.status = 'S';
                                    el.oldValue = action.new_values[i];
                                }
                            });
                            break;
                        case "MODIFIED":
                            action.result.forEach( (val,i) => {
                                if(val[0] === "ERROR")
                                    self.addMessageFunc("warning","Erreur","Modification de la ligne '"+action.new_values[i].join(', ')+"' impossible: "+val[1]);
                                else{
                                    let el = data.find(el => el.join('&') === action.new_values[i].join('&'));
                                    el.status = 'S';
                                    el.oldValue = action.new_values[i];
                                }
                            });
                            break;
                        case "DELETED":
                            action.result.forEach( (val,i) => {
                                if(val[0] === "ERROR")
                                    self.addMessageFunc("warning","Erreur","Suppression de la ligne '"+action.old_values[i].join(', ')+"' impossible: "+val[1]);
                                else
                                    delete data[data.findIndex(el => el.oldValue.join('&') === action.old_values[i].join('&'))];
                                
                            });
                            break;
                    }
                }
            });
        }).catch(function (error) {
            console.error(error);
        });

    }
}

export { CrudRequest };
export default CrudRequest;

