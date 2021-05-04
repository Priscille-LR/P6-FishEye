import { MediaFactory } from './MediaFactory';
import { MediumModel } from '../models/MediumModel';
import { PhotographerProfileModel } from '../models/PhotographerProfileModel';
import { Utils } from '../utils/Utils';

export class LightboxMedia {
    /**
     * @param {Array<MediumModel>} mediaList 
     * @param {PhotographerProfileModel} currentPhotographer 
     */
    constructor(mediaList = [], currentPhotographer) {
        this.mediaList = mediaList;
        this.currentPhotographer = currentPhotographer;

        this.mediaFactory = new MediaFactory();
    }

    renderLightboxMedia() {
        this.createLightboxMedia();
        this.createLightboxMediaBody();

        this.lightboxMedia = document.querySelector('.lightbox_media');
    }

    createLightboxMedia() {
        const lightboxMedia = document.createElement('dialog');
        lightboxMedia.className = 'lightbox_media';
        lightboxMedia.ariaLabel = "image close-up view"
        document.getElementById("app").appendChild(lightboxMedia);
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
        closeButton.role = "button";
        closeButton.ariaLabel = "close dialog";
        closeButton.innerHTML = `<i class="fas fa-times fa-3x"></i>`;
        closeButton.addEventListener('click', () => {
            this.hideLightboxMedia();
        });
        lightboxBody.appendChild(closeButton);
    }

    createNavButton(buttonClass, buttonIcon, accessibleName) {
        const button = document.createElement('button');
        button.className = buttonClass;
        button.innerHTML = `<i class="fas ${buttonIcon} fa-3x"></i>`;
        button.ariaLabel = accessibleName
        return button;
    }

    appendNavButtons(lightboxBody) {
        const previousButton = this.createNavButton("previous_button", "fa-chevron-left", "previous image");
        const nextButton = this.createNavButton("next_button", "fa-chevron-right", "next image");

        lightboxBody.appendChild(previousButton);
        lightboxBody.appendChild(nextButton);
    }

    handleNav(lightboxBody) {

        const previousButton = lightboxBody.querySelector('.previous_button');
        const nextButton = lightboxBody.querySelector('.next_button');

        previousButton.addEventListener('click', () => {

            const currentIndex = this.mediaList.indexOf(this.medium);
            const newIndex = currentIndex - 1;

            const nextButton = lightboxBody.querySelector('.next_button');
            nextButton.style.display = "block";
            console.log(newIndex)
            if (newIndex >= 0 ) {
                this.showLightboxMedia(this.mediaList[newIndex], this.currentPhotographer, this.mediaList);
            } 

            if (newIndex == 0) {
                previousButton.style.display = "none"; //disable prev button
            }
        });

        nextButton.addEventListener('click', () => {
            const currentIndex = this.mediaList.indexOf(this.medium);
            const newIndex = currentIndex + 1;

            const previousButton = lightboxBody.querySelector('.previous_button');
            previousButton.style.display = "block";

            if (newIndex <= this.mediaList.length -1) {
                this.showLightboxMedia(this.mediaList[newIndex], this.currentPhotographer, this.mediaList);
            }

            if (newIndex == this.mediaList.length -1) {
                nextButton.style.display = "none";
            }
        });
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

        
        const mediumTitle = document.querySelector('.lightbox_title')
        mediumTitle.innerHTML = medium.getTitle();

        const lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, "lightbox_medium", true);
        document.querySelector('.medium_box').insertBefore(lightboxMedium, mediumTitle);
        this.lightboxMedia.style.display = "block";        
    }

    hideLightboxMedia() {
        this.lightboxMedia.style.display = "none";
    }

}
