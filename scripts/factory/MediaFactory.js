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

    appendThumbnailContent(medium, mediumThumbnail) {
        let mediumThumbnailContent = document.createElement('div');
        mediumThumbnailContent.className = "medium_thumbnail__content";
        mediumThumbnailContent.innerHTML = `
            <h2 class="medium_title">${medium.getTitle()}</h2>
            <div class="price_and_likes">
              <span class="medium_price">${medium.getPrice()}€</span>
              <span class="medium_number_of_likes">${medium.getLikes()}</span>
              <label class="checkbox__like aria-label="likes"> 
                <input type="checkbox" class="checkbox__input" name="like" aria-labelledby="likes">
                    <i class="far fa-heart like__unchecked"></i>
                    <i class="fas fa-heart like__checked"></i>
                </input>   
                </label>
            </div>
          </div>`;

        mediumThumbnail.appendChild(mediumThumbnailContent);
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
        let mediumThumbnail = document.createElement('div');
        mediumThumbnail.className = className;
        mediumThumbnail.ariaLabel = medium.getTitle();
        
        const mediumType = medium.getMediumType();

        let mediumSource = String(medium.getSource());

        var media;
        switch (mediumType) {
            case mediaEnum.PICTURE: {
                media = document.createElement('img');
                media.src = `/static/${currentPhotographer.getName().split(' ')[0]}/${mediumSource}`
                break;
            }
            case mediaEnum.VIDEO: {
                media = document.createElement('video');
                let source = document.createElement('source');
                source.src = `/static/${currentPhotographer.getName().split(' ')[0]}/${mediumSource}`
                source.type = "video/mp4"
                media.controls = controls;
                if(controls){
                    media.autoplay = true
                }
                media.appendChild(source);
                break;
            }
            default: mediumSource = String("");

        }
        media.className = `${className}__miniature`;
        media.alt = medium.getTitle();
        mediumThumbnail.appendChild(media);
        return mediumThumbnail;
    }

}


