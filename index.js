// ==UserScript==
// @name         NoMoreShorts
// @namespace    http://tampermonkey.net/
// @version      0.2
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
    };

    const destroyShortVideos = () => {
        const icons = document.querySelectorAll(`ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]`);
        icons.forEach(destroyShortVideo);
    };

    const target = document.querySelector('ytd-browse');
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
                console.log(mutation);
            }
        }
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
})();
