/**
 * @file Main entry point for CrudJS module. Import your modules here.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 1.0.0
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

// Example: import { something } from ''
import CrudRequest from './crudRequest.js';

function addmsg(bsclass, title, message) {
    console.log(bsclass, title, message);
}

const cr = new CrudRequest("http://localhost:1234/test  ", addmsg);

cr.get((data) => { 
    console.log(data);
    data.values[0].status = 'M';
    data.values[0][0] = "BBTM";

    data.values[1].status = 'D';

    let nv = [ "Nouvelle salle"];
    nv.status = 'N';
    data.values.push(nv);
    console.log(data);
    cr.send(data.values);
});

