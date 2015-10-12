/*
    File name: script.js
    Author: Alex Andriishyn
    Website: http://alexandriishyn.azurewebsites.net/
    File description: external javascript file
*/

$(document).ready(
    
    /* Get the current date */
    function() {
        var now = new Date();
        $("#cpright").append(now.getFullYear());
    }
);