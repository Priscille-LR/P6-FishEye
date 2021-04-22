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

    extractMediumTitle(tmpMedium) {
        let mediumTitle = String(tmpMedium.toLowerCase());
        mediumTitle = mediumTitle.substring(0, tmpMedium.length - 4); //remove extension
        let mediumTitleArray = mediumTitle.split("_");
        mediumTitleArray.shift(); //remove 1st element in array 
        mediumTitle = mediumTitleArray.join(" "); //add elements of array into a string
        mediumTitle = mediumTitle.charAt(0).toUpperCase() + mediumTitle.slice(1);
        return mediumTitle;
    }


    renderMedium(medium, currentPhotographer) {

        let tmpMedium = medium.image;
        if (tmpMedium == null) {
            tmpMedium = String(medium.video);
        } else {
            tmpMedium = String(medium.image);
        }

        let mediumTitle = this.extractMediumTitle(tmpMedium);

        //create medium thumbnail
        let mediumThumbnail = document.createElement('div');
        mediumThumbnail.className = "medium_thumbnail";

        const mediumType = this.getMediumType(tmpMedium)

        switch (mediumType) {
            case this.mediaEnum.PICTURE:
                tmpMedium = String(medium.image);
                mediumThumbnail.innerHTML = `<img class="medium_thumbnail__miniature" 
                src="/static/${currentPhotographer.name.split(' ')[0]}/${tmpMedium}"
                alt="${mediumTitle}"/>`;
                break;

            case this.mediaEnum.VIDEO:
                tmpMedium = String(medium.video);
                mediumThumbnail.innerHTML = `
                <video id="medium_thumbnail__miniature" title="${mediumTitle}" controls>
                <source src="/static/${currentPhotographer.name.split(' ')[0]}/${tmpMedium}">
                type="video/mp4">
                </video>`;
                break;
            default: tmpMedium = String("");

        }


        let mediumThumbnailContent = document.createElement('div');
        mediumThumbnailContent.className = "medium_thumbnail__content";
        mediumThumbnailContent.innerHTML = `
            <h2 class="medium_title">${mediumTitle}</h2>
            <div class="price_and_likes">
              <span class="medium_price">${medium.price}€</span>
              <span class="medium_number_of_likes">${medium.likes}</span>
              <button class="like">
              <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
            `;

        mediumThumbnail.appendChild(mediumThumbnailContent);
        return mediumThumbnail;
    }
}


