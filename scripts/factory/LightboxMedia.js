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
            if (newIndex >= 0 ) {
                this.showLightboxMedia(this.allMedia[newIndex], this.currentPhotographer, "toto", this.allMedia)
            }
        })
        lightboxBody.appendChild(previousButton);
    }
    
    appendMediumBox(lightboxBody) {
        const mediumBox = document.createElement('div');
        mediumBox.className = "medium_box";

        lightboxBody.appendChild(mediumBox);
    }

    appendMedium() {

    }

    appendNextButton(lightboxBody) {
        const nextButton = document.createElement('button');
        nextButton.className = 'next_button';
        nextButton.innerHTML = `<i class="fas fa-chevron-right fa-3x"></i>`;
        nextButton.addEventListener('click', () => {
            const currentIndex = this.allMedia.indexOf(this.medium);
            const newIndex = currentIndex + 1;
            if (newIndex <= this.allMedia.length -1) {
                this.showLightboxMedia(this.allMedia[newIndex], this.currentPhotographer, "toto", this.allMedia)
            }
        });

        lightboxBody.appendChild(nextButton);
    }

    showLightboxMedia(medium, currentPhotographer, title, allMedia) {
        this.allMedia = allMedia;
        this.medium = medium;
        this.removeLightboxMedium();
        const lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, title, "lightbox_medium", true);
        document.querySelector('.medium_box').appendChild(lightboxMedium);
        this.lightboxMedia.style.display = "block";
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
