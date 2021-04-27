export class MediaFactory {
    constructor() {
    }

    mediaEnum = {
        PICTURE: "picture",
        VIDEO: "video",
    }

    getMediumType(tmpMedium) {
        let extension = tmpMedium.split('.').pop();
        if (/(jpg)$/ig.test(extension)) {
            return this.mediaEnum.PICTURE;
        }
        if (/(mp4)$/ig.test(extension)) {
            return this.mediaEnum.VIDEO;
        }
    }

    extractMediumTitle(medium) {

        let tmpMedium = this.getMediumFile(medium)

        let mediumTitle = String(tmpMedium.toLowerCase());
        mediumTitle = mediumTitle.substring(0, tmpMedium.length - 4); //remove extension
        let mediumTitleArray = mediumTitle.split("_");
        mediumTitleArray.shift(); //remove 1st element in array 
        mediumTitle = mediumTitleArray.join(" "); //add elements of array into a string
        mediumTitle = mediumTitle.charAt(0).toUpperCase() + mediumTitle.slice(1);
        return mediumTitle;
    }


    renderMedium(medium, currentPhotographer) {

        let mediumTitle = this.extractMediumTitle(medium);

        let mediumThumbnail = this.createMediumDisplay(medium, currentPhotographer, mediumTitle, "medium_thumbnail");
              
        this.appendThumbnailContent(mediumTitle, medium, mediumThumbnail);

        return mediumThumbnail;
    }

    appendThumbnailContent(mediumTitle, medium, mediumThumbnail) {
        let mediumThumbnailContent = document.createElement('div');
        mediumThumbnailContent.className = "medium_thumbnail__content";
        mediumThumbnailContent.innerHTML = `
            <h2 class="medium_title">${mediumTitle}</h2>
            <div class="price_and_likes">
              <span class="medium_price">${medium.price}€</span>
              <span class="medium_number_of_likes">${medium.likes}</span>
              <label class="checkbox__like"> 
                <input type="checkbox" class="checkbox__input" name="like">
                    <i class="far fa-heart like__unchecked"></i>
                    <i class="fas fa-heart like__checked"></i>
                </input>   
                </label>
            </div>
          </div>`;

        mediumThumbnail.appendChild(mediumThumbnailContent);
    }

    createMediumDisplay(medium, currentPhotographer, mediumTitle, className) {
        let mediumThumbnail = document.createElement('div');
        mediumThumbnail.className = className;
        
        const mediumType = this.getMediumType(this.getMediumFile(medium));

        switch (mediumType) {
            case this.mediaEnum.PICTURE: {
                let tmpMedium = String(medium.image);
                mediumThumbnail.innerHTML = `<img class="${className}__miniature" 
                src="/static/${currentPhotographer.name.split(' ')[0]}/${tmpMedium}"
                alt="${mediumTitle}"/>`;
                break;
            }
            case this.mediaEnum.VIDEO: {
                let tmpMedium = String(medium.video);
                mediumThumbnail.innerHTML = `
                <video id="${className}__miniature" title="${mediumTitle}" controls>
                <source src="/static/${currentPhotographer.name.split(' ')[0]}/${tmpMedium}">
                type="video/mp4">
                </video>`;
                break;
            }
            default: tmpMedium = String("");

        }
        return mediumThumbnail;
    }

    getMediumFile(medium) {
        let tmpMedium = medium.image;
        if (tmpMedium == null) {
            tmpMedium = medium.video;
        }
        return tmpMedium;
    }
}


