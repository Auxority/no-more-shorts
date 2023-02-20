// ==UserScript==
// @name         NoMoreShorts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically removes YT shorts from view.
// @author       Auxority
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const INTERVAL_DELAY_MS = 1000;

    const destroyShortVideo = (icon) => {
        icon.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    }

    setInterval(() => {
        const icons = document.querySelectorAll(`ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]`);
        icons.forEach(destroyShortVideo);
    }, INTERVAL_DELAY_MS);
})();
