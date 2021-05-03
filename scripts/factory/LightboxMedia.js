import { MediaFactory } from './MediaFactory';

export class LightboxMedia {
    constructor(allMedia = [], currentPhotographer) {
        this.allMedia = allMedia;
        this.currentPhotographer = currentPhotographer;

        this.mediaFactory = new MediaFactory();
    }

    renderLightboxMedia() {
        this.createLightboxMedia();
        this.createLightboxMediaBody();

        this.lightboxMedia = document.querySelector('.lightbox_media');
    }

    createLightboxMedia() {
        const lightboxMedia = document.createElement('div');
        lightboxMedia.className = 'lightbox_media';

        document.querySelector('main').appendChild(lightboxMedia);
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
        closeButton.innerHTML = `<i class="fas fa-times fa-3x"></i>`;
        closeButton.addEventListener('click', () => {
            this.hideLightboxMedia();
        });
        lightboxBody.appendChild(closeButton);
    }

    createNavButton(buttonClass, buttonIcon) {
        const button = document.createElement('button');
        button.className = buttonClass;
        button.innerHTML = `<i class="fas ${buttonIcon} fa-3x"></i>`;
        return button;
    }

    appendNavButtons(lightboxBody) {
        const previousButton = this.createNavButton("previous_button", "fa-chevron-left");
        const nextButton = this.createNavButton("next_button", "fa-chevron-right");

        lightboxBody.appendChild(previousButton);
        lightboxBody.appendChild(nextButton);
    }

    handleNav(lightboxBody) {

        const previousButton = lightboxBody.querySelector('.previous_button');
        const nextButton = lightboxBody.querySelector('.next_button');

        previousButton.addEventListener('click', () => {

            const currentIndex = this.allMedia.indexOf(this.medium);
            const newIndex = currentIndex - 1;

            const nextButton = lightboxBody.querySelector('.next_button');
            nextButton.style.display = "block";
            
            if (newIndex >= 0 ) {
                this.showLightboxMedia(this.allMedia[newIndex], this.currentPhotographer, this.allMedia);
            } 

            if (newIndex == 0) {
                previousButton.style.display = "none"; //disable prev button
            }
        });

        nextButton.addEventListener('click', () => {
            const currentIndex = this.allMedia.indexOf(this.medium);
            const newIndex = currentIndex + 1;

            const previousButton = lightboxBody.querySelector('.previous_button');
            previousButton.style.display = "block";

            if (newIndex <= this.allMedia.length -1) {
                this.showLightboxMedia(this.allMedia[newIndex], this.currentPhotographer, this.allMedia);
            }

            if (newIndex == this.allMedia.length -1) {
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

    showLightboxMedia(medium, currentPhotographer, allMedia) {
        this.allMedia = allMedia;
        this.medium = medium;
        this.removeLightboxMedium();

        const title =this.mediaFactory.extractMediumTitle(medium);
        const mediumTitle = document.querySelector('.lightbox_title')
        mediumTitle.innerHTML = title;

        const lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, title, "lightbox_medium", true);
        document.querySelector('.medium_box').insertBefore(lightboxMedium, mediumTitle);
        this.lightboxMedia.style.display = "block";        
    }

    hideLightboxMedia() {
        this.lightboxMedia.style.display = "none";
    }

    removeLightboxMedium() {
        const mainNode = document.querySelector('.medium_box')
        for (let index = mainNode.childNodes.length - 1; index >= 0; index--) {
            const child = mainNode.childNodes[index];
            if (child.className != "lightbox_title") mainNode.removeChild(child)
        }
    }
}
