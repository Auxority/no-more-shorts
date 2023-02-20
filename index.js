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

    const destroyShortVideo = (icon) => {
        icon.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    };

    const destroyShortVideos = () => {
        const icons = document.querySelectorAll(`ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]`);
        icons.forEach(destroyShortVideo);
    };

    const isNodeAShortOverlay = (node) => {
        if (!node.getAttribute) {
            return;
        }

        const overlayStyle = node.getAttribute('overlay-style');

        return node.localName === 'ytd-thumbnail-overlay-time-status-renderer'
        && overlayStyle
        && overlayStyle === 'SHORTS';
    }

    const removeNewShort = (node) => {
        if (isNodeAShortOverlay(node)) {
            destroyShortVideo(node);
        }
    }

    const removeNewShorts = (mutation) => {
        mutation.addedNodes.forEach(removeNewShort);
    };

    const isMutationAChildMutation = (mutation) => {
        return mutation.type === 'childList';
    }

    const checkMutations = (mutation) => {
        if (isMutationAChildMutation(mutation)) {
            removeNewShorts(mutation);
        }
    };

    const target = document.querySelector('ytd-page-manager');
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
        mutationList.forEach(checkMutations);
    };

    const observer = new MutationObserver(callback);

    observer.observe(target, config);
})();
