// ==UserScript==
// @name         HubSpot-SendProtector
// @namespace    http://tampermonkey.net/
// @version      1.0
// @updateURL    https://raw.githubusercontent.com/svendvd/HubSpotSendProtector/main/HubSpotSendProtector.user.js
// @downloadURL  https://raw.githubusercontent.com/svendvd/HubSpotSendProtector/main/HubSpotSendProtector.user.js
// @description  Prevent you from accidentally sending messages directly to a customer in HubSpot.
// @author       Sven Nähler
// @match        https://app.hubspot.com/help-desk/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let firstChange = true;
    let allowEmailOrChat = false;

    function modifyUrlHash() {
        const currentHash = window.location.hash;
        if (currentHash === '#live-chat' || currentHash === '#email') {
            if (!firstChange && !allowEmailOrChat) {
                const userConfirmed = confirm("Be careful, you are about to respond directly to the customer.\nAre you sure you want to allow direct emails and live chats?");
                if (userConfirmed) {
                    allowEmailOrChat = true;
                }
            }
            firstChange = false
            if (!allowEmailOrChat) {
                window.location.hash = '#comment';
            }
        }
    }

    modifyUrlHash();
    setInterval(modifyUrlHash, 250);
})();
