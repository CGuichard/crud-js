/**
 * @file This file contains some basic function used in the project.
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
 * Functions
 * ------------------------------------------------------------------------
 */

function createElement(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function resetElementHTML(htmlElement) {
    htmlElement.innerHTML = "";
}

function isHidden(element) {
    return element.style.display === "none";
}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { createElement, resetElementHTML, isHidden };
