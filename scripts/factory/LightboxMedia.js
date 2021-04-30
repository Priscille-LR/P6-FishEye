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
        this.appendPreviousButton(lightboxBody);
        this.appendMediumBox(lightboxBody);
        this.appendMediumTitle(lightboxBody);
        this.appendNextButton(lightboxBody);

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

    appendPreviousButton(lightboxBody) {
        const previousButton = document.createElement('button');
        previousButton.className = 'previous_button';
        previousButton.innerHTML = `<i class="fas fa-chevron-left fa-3x"></i>`;
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

        lightboxBody.appendChild(previousButton);
    }
    
    appendMediumBox(lightboxBody) {
        const mediumBox = document.createElement('div');
        mediumBox.className = "medium_box";
        lightboxBody.appendChild(mediumBox);
    }

    appendMediumTitle(lightboxBody) {
        const mediumTitle = document.createElement('h2');
        mediumTitle.className = 'lightbox_title';
        lightboxBody.appendChild(mediumTitle);
    }

    appendNextButton(lightboxBody) {
        const nextButton = document.createElement('button');
        nextButton.className = 'next_button';
        nextButton.innerHTML = `<i class="fas fa-chevron-right fa-3x"></i>`;
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

        lightboxBody.appendChild(nextButton);
    }

    showLightboxMedia(medium, currentPhotographer, allMedia) {
        this.allMedia = allMedia;
        this.medium = medium;
        this.removeLightboxMedium();

        const title =this.mediaFactory.extractMediumTitle(medium);

        const lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, title, "lightbox_medium", true);
        document.querySelector('.medium_box').appendChild(lightboxMedium);
        this.lightboxMedia.style.display = "block";

        const mediumTitle = document.querySelector('.lightbox_title');
        mediumTitle.innerHTML = title;
    }

    hideLightboxMedia() {
        this.lightboxMedia.style.display = "none";
    }

    removeLightboxMedium() {
        const mainNode = document.querySelector('.medium_box')
        for (let index = mainNode.childNodes.length - 1; index >= 0; index--) {
            const child = mainNode.childNodes[index];
            mainNode.removeChild(child)
        }
    }
}
