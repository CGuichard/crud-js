/**
 * @file This file contains some basic function used in the project.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
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
 * Functions
 * ------------------------------------------------------------------------
 */

/**
 * @since 0.0.1
 */
function createElement(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

/**
 * @since 0.0.1
 */
function resetElementHTML(htmlElement) {
    htmlElement.innerHTML = "";
}

/**
 * @since 0.0.1
 */
function isHidden(element) {
    return element.style.display === "none";
}

/**
 * @since 1.0.0
 */
function hide(element) {
    element.style.display = "none";
}

/**
 * @since 1.0.0
 */
function display(element) {
    element.style.display = "";
}

/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */

export { createElement, resetElementHTML, isHidden, hide, display };
