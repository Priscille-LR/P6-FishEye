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

        this.handleKeyboardNav();

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
        const lightboxMedia = document.querySelector('.lightbox_media');
        this.mediaList = mediaList;
        this.medium = medium;
        Utils.removeChildOf('.medium_box', 'lightbox_medium');

        const mediumTitle = document.querySelector('.lightbox_title');
        mediumTitle.innerHTML = medium.getTitle();

        const lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, "lightbox_medium", true);
        lightboxMedium.querySelector(".lightbox_medium__miniature").tabIndex = "-1"
        document.querySelector('.medium_box').insertBefore(lightboxMedium, mediumTitle);

        this.lightboxMedia.style.display = "flex";

        main.setAttribute('aria-hidden', 'true');
        lightboxMedia.setAttribute('aria-hidden', 'false');

        this.setFocus();
    }

    setFocus() {
        const previousButton = this.focusableElements[0];
        previousButton.focus();
    }

    handleKeyboardNav() {
        const closeButton = this.focusableElements[0];
        const previousButton = this.focusableElements[1];
        const nextButton = this.focusableElements[2];
        const lightboxMedia = document.querySelector('.lightbox_media');

        //navigate with left & right arrows
        lightboxMedia.addEventListener('keydown', (e) => {
            const ligthboxBody = document.querySelector('.lightbox_media__body');
            if (e.code === 'ArrowLeft') {
                this.showPreviousMedia(ligthboxBody, previousButton);
            } else if (e.code === 'ArrowRight') {
                this.showNextMedia(ligthboxBody, nextButton);
            }

        });
        
        //trap focus in modal
        this.focusableElements.forEach(focusableElement => {
            focusableElement.addEventListener('keydown', (e) => {
                e.preventDefault();

                if (e.code === 'Tab' && e.shiftKey) { //going upwards
                    if (e.target === closeButton) { //if focus on close button => tab + shift => focus on submit button 
                        nextButton.focus();
                    } else {
                        let currentIndex = this.focusableElements.indexOf(focusableElement);
                        let previousIndex = currentIndex - 1;
                        this.focusableElements[previousIndex].focus();
                    }
                } else if(e.code === 'Tab') {
                    if (e.target === nextButton) { //going downwards
                        closeButton.focus(); //if focus on submit button => tab => focus on close button
                    } else {
                        let currentIndex = this.focusableElements.indexOf(focusableElement);
                        let nextIndex = currentIndex + 1;
                        this.focusableElements[nextIndex].focus();
                    }
                }
            });
        });

        
    }

    hideLightboxMedia() {
        const lightboxMedia = document.querySelector('.lightbox_media');
        this.lightboxMedia.style.display = "none";
        main.setAttribute('aria-hidden', 'false');
        lightboxMedia.setAttribute('aria-hidden', 'true');
    }

}
