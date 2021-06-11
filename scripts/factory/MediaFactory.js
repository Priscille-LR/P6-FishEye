import { MediumModel } from "../models/MediumModel";
import { mediaEnum } from "../utils/MediaUtils";
import { PhotographerProfileModel } from "../models/PhotographerProfileModel";

export class MediaFactory {

    /**
     * 
     * @param {MediumModel} medium 
     * @param {PhotographerProfileModel} currentPhotographer 
     * @returns 
     */
    renderMedium(medium, currentPhotographer) {

        let mediumThumbnail = this.createMediumDisplay(medium, currentPhotographer, "medium_thumbnail");

        this.appendThumbnailContent(medium, mediumThumbnail);

        return mediumThumbnail;
    }

    /**
     * 
     * @param {MediumModel} medium 
     * @param {PhotographerProfileModel} currentPhotographer 
     * @param {string} className 
     * @param {boolean} controls 
     * @returns 
     */
    createMediumDisplay(medium, currentPhotographer, className, controls = false) {
        let mediumThumbnail = document.createElement('article');
        mediumThumbnail.className = className;
        mediumThumbnail.ariaLabel = medium.getTitle();


        const mediumType = medium.getMediumType();

        let mediumSource = String(medium.getSource());

        let media;
        switch (mediumType) {
            case mediaEnum.PICTURE: {
                media = new Picture(className, medium, currentPhotographer, mediumSource);
                media.render()
                break;
            }
            case mediaEnum.VIDEO: {
                media = new Video(className, medium, currentPhotographer, mediumSource, controls);
                media.render()
                break;
            }
            default: mediumSource = String("");

        }
        mediumThumbnail.appendChild(media.htmlElement);
        return mediumThumbnail;
    }

    appendThumbnailContent(medium, mediumThumbnail) {
        let mediumThumbnailContent = document.createElement('div');
        mediumThumbnailContent.className = "medium_thumbnail__content";
        mediumThumbnailContent.innerHTML = `
            <h2 class="medium_title">${medium.getTitle()}</h2>
            <div class="price_and_likes">
              <span class="medium_price">${medium.getPrice()}€</span>
              
              <span class="medium_number_of_likes">${medium.getLikes()}</span>
                <div class="likes">
                    <input type="checkbox" id="checkbox__input_${medium.getTitle().toLowerCase().replaceAll(" ", "_")}" class="checkbox__input" aria-label="like this medium" aria-checked="false">
                    </input>   
                    <label class="checkbox__like" for="checkbox__input_${medium.getTitle().toLowerCase().replaceAll(" ", "_")}">
                        <i class="far fa-heart like__unchecked"></i>
                        <i class="fas fa-heart like__checked"></i>
                    </label>
                </div>
            </div>
          </div>`;

        mediumThumbnail.appendChild(mediumThumbnailContent);
    }
}

class Media {
    constructor(type, className, medium) {
        this.type = type
        this.className = className
        this.medium = medium
    }
    render() {
        this.htmlElement = document.createElement(this.type);
        this.htmlElement.className = `${this.className}__miniature`;
        this.htmlElement.alt = this.medium.getAlt();
        this.htmlElement.tabIndex = "0";
    }
}

class Picture extends Media {
    constructor(className, medium, currentPhotographer, mediumSource) {
        super("img", className, medium)
        this.currentPhotographer = currentPhotographer
        this.mediumSource = mediumSource
    }
    render() {
        super.render()
        this.htmlElement.src = `/static/${this.currentPhotographer.getName().split(' ')[0]}/${this.mediumSource}`
    }
}

class Video extends Media {
    constructor(className, medium, currentPhotographer, mediumSource, controls) {
        super("video", className, medium)
        this.currentPhotographer = currentPhotographer
        this.mediumSource = mediumSource
        this.controls = controls
    }
    render() {
        super.render()
        let source = document.createElement('source');
        source.src = `/static/${this.currentPhotographer.getName().split(' ')[0]}/${this.mediumSource}`
        source.type = "video/mp4"
        this.htmlElement.controls = this.controls;
        if (this.controls) {
            this.htmlElement.autoplay = true
        }
        this.htmlElement.appendChild(source);
    }
}