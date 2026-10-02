/**
 * @fileoverview
 * JavaScript interactions for the portfolio website.
 *
 * @author
 * Justin O'Donnell
 */

"use strict";


/* =================================
   Navigation
================================= */

const navigation = document.querySelector(".site-nav");


function updateNavigation() {

    if (window.scrollY > 40) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }

}


/* Update navigation when scrolling */
window.addEventListener("scroll", updateNavigation);


/* Set initial navigation state */
updateNavigation();