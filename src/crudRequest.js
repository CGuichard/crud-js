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
            body: {
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
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.error(error);
        });

    }
}

export { CrudRequest };
export default CrudRequest;

