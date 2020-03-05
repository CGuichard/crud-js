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

let exampleTupleS1 = ["S1", 1];
exampleTupleS1.status = 'S';
exampleTupleS1.oldValue = ["oldS1", 0];

let exampleTupleS2 = ["S2", 2];
exampleTupleS2.status = 'S';
exampleTupleS2.oldValue = ["oldS2", 0];

let exampleTupleM1 = ["M1", 3];
exampleTupleM1.status = 'M';
exampleTupleM1.oldValue = ["oldM1", 0];

let exampleTupleM2 = ["M2", 4];
exampleTupleM2.status = 'M';
exampleTupleM2.oldValue = ["oldM2", 0];

let exampleTupleD1 = ["D1", 5];
exampleTupleD1.status = 'D';
exampleTupleD1.oldValue = ["oldD1", 0];

let exampleTupleD2 = ["D2", 6];
exampleTupleD2.status = 'D';
exampleTupleD2.oldValue = ["oldD2", 0];

let exampleTupleN1 = ["N1", 7];
exampleTupleN1.status = 'N';
exampleTupleN1.oldValue = ["oldN1", 0];

let exampleTupleN2 = ["N2", 8];
exampleTupleN2.status = 'N';
exampleTupleN2.oldValue = ["oldN2", 0];

const exampleData = [
    exampleTupleS1,
    exampleTupleD1,
    exampleTupleN1,
    exampleTupleM1,
    exampleTupleN1
];

const cr = new CrudRequest("http://postman-echo.com/post", addmsg);

console.info(exampleData);
cr.send(exampleData);

/**
 * crud request ->
 * entrée
 *
 *
 *
 * url, fonction à appeler à la réception de la réponse dans le constructeur
 *
 * fonction send (old et new en param)
 *
 * old -> meme format que le get
 * new -> tuple.status S M N D
 *
 * si les urls sont les mêmes on fusionne les requêtes
 *
 * fait la requete
 * envoit
 * retourne la réponse
 */