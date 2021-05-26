import { MediaFactory } from './MediaFactory';
import { MediumModel } from '../models/MediumModel';
import { PhotographerProfileModel } from '../models/PhotographerProfileModel';
import { Utils } from '../utils/Utils';

const body = document.getElementById("photographer-page");
const main = document.getElementById('app');


export class LightboxMedia {
    
    /**
     * @param {Array<MediumModel>} mediaList 
     * @param {PhotographerProfileModel} currentPhotographer 
     */
    constructor(mediaList = [], currentPhotographer) {
        this.mediaList = mediaList;
        this.currentPhotographer = currentPhotographer;
        this.focusableElements = [];
        this.mediaFactory = new MediaFactory();
    }

    renderLightboxMedia() {
        this.createLightboxMedia();
        this.createLightboxMediaBody();
        this.eventOnClose();

        this.lightboxMedia = document.querySelector('.lightbox_media');
    }

    createLightboxMedia() {
        const lightboxMedia = document.createElement('dialog');
        lightboxMedia.className = 'lightbox_media';
        lightboxMedia.setAttribute('role', 'dialog');
        lightboxMedia.ariaLabel = "image close-up view";
        lightboxMedia.ariaModal = 'true';
        lightboxMedia.ariaHidden = 'true';
        lightboxMedia.tabIndex = "-1";

        body.appendChild(lightboxMedia);
    }

    createLightboxMediaBody() {
        const lightboxBody = document.createElement('div');
        lightboxBody.className = 'lightbox_media__body';

        this.appendCloseButton(lightboxBody);
        this.appendNavButtons(lightboxBody);
        this.handleNav(lightboxBody);
        this.appendMediumBox(lightboxBody);
        this.appendMediumTitle(lightboxBody);

        document.querySelector('.lightbox_media').appendChild(lightboxBody);
    }

    appendCloseButton(lightboxBody) {
        const closeButton = document.createElement('button');
        closeButton.className = 'close_button_lightbox';
        closeButton.setAttribute('role', 'button');
        closeButton.setAttribute('title', 'fermer la fenêtre');
        closeButton.ariaLabel = "close dialog";
        closeButton.tabIndex = "-1";
        closeButton.innerHTML = `<i class="fas fa-times fa-3x"></i>`;

        lightboxBody.appendChild(closeButton);

        this.focusableElements.push(closeButton);

    }

    createNavButton(buttonClass, buttonIcon, accessibleName) {
        const button = document.createElement('button');
        button.className = buttonClass;
        button.innerHTML = `<i class="fas ${buttonIcon} fa-3x"></i>`;
        button.ariaLabel = accessibleName;
        button.tabIndex = '-1';
        return button;
    }

    appendNavButtons(lightboxBody) {
        const previousButton = this.createNavButton("previous_button", "fa-chevron-left", "previous image");
        const nextButton = this.createNavButton("next_button", "fa-chevron-right", "next image");

        lightboxBody.appendChild(previousButton);
        lightboxBody.appendChild(nextButton);

        //add buttons to focusable elements array
        this.focusableElements.push(previousButton);
        this.focusableElements.push(nextButton);
    }

    handleNav(lightboxBody) {

        const previousButton = lightboxBody.querySelector('.previous_button');
        const nextButton = lightboxBody.querySelector('.next_button');

        previousButton.addEventListener('click', () => {
            this.showPreviousMedia(lightboxBody, previousButton);
        });

        nextButton.addEventListener('click', () => {
            this.showNextMedia(lightboxBody, nextButton);
        });

        this.handleKeyboardNav(lightboxBody);

    }

    showPreviousMedia(lightboxBody, previousButton) {
        const currentIndex = this.mediaList.indexOf(this.medium);
        const newIndex = currentIndex - 1;

        const nextButton = lightboxBody.querySelector('.next_button');
        nextButton.style.display = "block";

        if (newIndex >= 0) {
            this.showLightboxMedia(this.mediaList[newIndex], this.currentPhotographer, this.mediaList);
        }

        if (newIndex == 0) {
            previousButton.style.display = "none";
        }
    }

    showNextMedia(lightboxBody, nextButton) {
        const currentIndex = this.mediaList.indexOf(this.medium);
        const newIndex = currentIndex + 1;

        const previousButton = lightboxBody.querySelector('.previous_button');
        previousButton.style.display = "block";

        if (newIndex <= this.mediaList.length - 1) {
            this.showLightboxMedia(this.mediaList[newIndex], this.currentPhotographer, this.mediaList);
        }

        if (newIndex == this.mediaList.length - 1) {
            nextButton.style.display = "none";
        }
    }

    handleKeyboardNav(lightboxBody) {
        const firstFocusableElement = this.focusableElements[0]; //close button
        const secondFocusableElement = this.focusableElements[1]; //previous button
        const lastFocusableElement = this.focusableElements[2]; //next button

        const lightboxMedia = document.querySelector('.lightbox_media');

        //navigate with left & right arrows
        lightboxMedia.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') {
                this.showPreviousMedia(lightboxBody, secondFocusableElement);
            } else if (e.code === 'ArrowRight') {
                this.showNextMedia(lightboxBody, lastFocusableElement);
            }
        });

        //navigate with tab + enter
        secondFocusableElement.addEventListener('keydown', (e) => {
            if(e.code === 'Enter') {
                this.showPreviousMedia(lightboxBody, secondFocusableElement);
            }
        })

        lastFocusableElement.addEventListener('keydown', (e) => {
            if(e.code === 'Enter') {
                this.showNextMedia(lightboxBody, lastFocusableElement);
            }
        })
        
        //trap focus in modal
        Utils.trapFocusInModal(this.focusableElements, firstFocusableElement, lastFocusableElement);
    }

    appendMediumBox(lightboxBody) {
        const nextButton = lightboxBody.querySelector('.next_button');
        const mediumBox = document.createElement('div');
        mediumBox.className = "medium_box";
        lightboxBody.insertBefore(mediumBox, nextButton);
    }

    appendMediumTitle(lightboxBody) {
        const mediumTitle = document.createElement('h2');
        mediumTitle.className = 'lightbox_title';
        lightboxBody.querySelector('.medium_box').appendChild(mediumTitle);
    }

    showLightboxMedia(medium, currentPhotographer, mediaList) {
        this.mediaList = mediaList;
        this.medium = medium;
        
        Utils.removeChildOf('.medium_box', 'lightbox_medium');
        
        //display lightbox
        const lightboxMedia = document.querySelector('.lightbox_media');
        this.lightboxMedia.style.display = "flex";

        main.setAttribute('aria-hidden', 'true');
        lightboxMedia.setAttribute('aria-hidden', 'false');

        //add title dynamically
        const mediumTitle = document.querySelector('.lightbox_title');
        mediumTitle.innerHTML = medium.getTitle();

        //display medium 
        const lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, "lightbox_medium", true);
        lightboxMedium.querySelector(".lightbox_medium__miniature").tabIndex = "-1"
        document.querySelector('.medium_box').insertBefore(lightboxMedium, mediumTitle);

        //focus on close button
        const closeButton = this.focusableElements[0];
        closeButton.focus();
    }

    eventOnClose() {
        const closeButton = document.querySelector('.close_button_lightbox');

        closeButton.addEventListener('click', () => this.hideLightboxMedia());

        closeButton.addEventListener('keydown',(e) => {
            if(e.code === 'Enter') {
                this.hideLightboxMedia();
            }
        })

        document.addEventListener('keydown', (e) => { //TODO
            if (e.code === 'Escape') {
                this.hideLightboxMedia();
            }
        });
    }

    hideLightboxMedia() {
        const lightboxMedia = document.querySelector('.lightbox_media');
        this.lightboxMedia.style.display = "none";
        
        main.setAttribute('aria-hidden', 'false');
        lightboxMedia.setAttribute('aria-hidden', 'true');
    }

}
