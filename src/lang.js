/**
 * @file This file contains CrudJS languages.
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
 * Constants
 * ------------------------------------------------------------------------
 */

const LANGUAGES = {
    en: {
        basic: {
            yes: "Yes",
            no: "No",
            ok: "OK",
            cancel: "Cancel",
            error: "Error",
            warning: "Warning",
            info: "Info"
        },
        component: {
            configurationError: "Incorrect configuration. Please read the README of the project to correct your configuration.",
            urlError: "An error occured while trying to fetch resource. See:"
        },
        request: {
            alreadySaved: "Already up to date",
            badResponse: "Bad response",
            okResponse: "Saving done",
            addImpossible: "Could not add the line:",
            modifyImpossible: "Could not modify the line:",
            deleteImpossible: "Could not delete the line:"
        },
        table: {
            column: {
                actionName: "Action(s)"
            },
            modal: {
                delete: {
                    title: "Warning!",
                    message: "Are you sure you want to delete this line?"
                }
            }
        },
        line: {
            btn: {
                edit: "Edit",
                delete: "Delete",
                validate: "Validate",
                cancel: "Cancel",
                add: "Add",
                addCancel: "Reset",
                example: {
                    toggler: "Examples",
                    copy: "Copy",
                    hide: "Hide"
                }
            },
            messages: {
                invalidColumn: "Invalid column:"
            }
        },
        field: {
            selectChips: {
                select: "Select..."
            }
        }
    },
    fr: {
        basic: {
            yes: "Oui",
            no: "Non",
            ok: "OK",
            cancel: "Annuler",
            error: "Erreur",
            warning: "Attention",
            info: "Info"
        },
        component: {
            configurationError: "Configuration incorrect. Veuillez lire le README du projet pour corriger votre configuration.",
            urlError: "Une erreur est survenue en essayant d'atteindre la resource. Voyez :"
        },
        request: {
            alreadySaved: "Déjà à jour",
            badResponse: "Mauvaise réponse",
            okResponse: "Sauvegarde effectuée",
            addImpossible: "Impossible d'ajouter la ligne :",
            modifyImpossible: "Impossible de modifier la ligne :",
            deleteImpossible: "Impossible de supprimer la ligne :"
        },
        table: {
            column: {
                actionName: "Action(s)"
            },
            modal: {
                delete: {
                    title: "Attention!",
                    message: "Voulez-vous vraiment supprimer cette ligne ?"
                }
            }
        },
        line: {
            btn: {
                edit: "Editer",
                delete: "Supprimer",
                validate: "Valider",
                cancel: "Annuler",
                add: "Ajouter",
                addCancel: "Réinitialiser",
                example: {
                    toggler: "Exemples",
                    copy: "Copier",
                    hide: "Cacher"
                }
            },
            messages: {
                invalidColumn: "Colonne invalide :"
            }
        },
        field: {
            selectChips: {
                select: "Sélectionner..."
            }
        }
    }
};

const DEFAULT_LANG = "en";

/**
 * ------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------
 */

 function langExist(lang) {
     return lang != null && LANGUAGES[lang] != null;
 }

 function text(lang, strRequest) {
     if(langExist(lang)) {
         const request = strRequest.split(".");
         if(strRequest != null && strRequest.length < 1) {
             throw new Error("Invalid text request.");
         }
         let value = LANGUAGES[lang];
         for(const elem of request) {
             value = value[elem];
             if(value == null) {
                 throw new Error("Invalid text request.");
             }
         }
         return value;
     }
     throw new Error("Language not found.");
 }

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { langExist, text, DEFAULT_LANG };
export default text;
