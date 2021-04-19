export class PhotographerPageBuilder {

    constructor(props) {
        this.jsonPromise = props.json 
        this.isDropdownVisible = false //dropdown menu hidden by default
        this.allMedia = [];
    }

    render(id) {
        this.idPhotographer = id
        this.jsonPromise.then((jsonData) => {
            this.determineCurrentPhotographer(jsonData.photographers);
            this.determineCurrentPhotographerMedia(jsonData.media);
            this.renderBanner()
            this.renderMain()
        })
    }

    //for each photographer, 
    //  if their id == photographer wanted 
    //  then save photographer in currentPhotographer 
    determineCurrentPhotographer(photographers) {
        photographers.forEach(photographer => {
            if (photographer.id == this.idPhotographer) {
                this.currentPhotographer = photographer;
            }
        });
    }

    //for each medium, 
    //  if photographer id in media object = id in photographers object,
    //  then add medium to array
    determineCurrentPhotographerMedia(media) {
        media.forEach(medium => {
            if (medium.photographerId == this.idPhotographer) {
                this.allMedia.push(medium);
            }
        });
    }

    renderBanner() {

        //banner text content for photographer's profile page
        this.createBannerContent();

        //contact button 
        this.createBannerButton();

        //photographer's picture
        this.createBannerPicture();

    }

    createBannerPicture() {
        const bannerPicture = document.createElement('div');
        bannerPicture.className = 'photographer__picture';
        bannerPicture.innerHTML = `
            <img
                class="photographer_thumbnail__picture"
                src="/static/Photographers ID Photos/` + this.currentPhotographer.portrait + `"
                alt="photographer's thumbnail picture"
              />
            `;

        document.querySelector('.banner').appendChild(bannerPicture);
    }

    createBannerButton() {
        const contactButton = document.createElement('button');
        contactButton.className = 'button_contact';
        contactButton.innerHTML = `Contactez-moi`;
        document.querySelector('.banner').appendChild(contactButton);
    }

    createBannerContent() {
        const bannerContent = document.createElement('div');
        bannerContent.className = 'banner__text_content';
        bannerContent.innerHTML = `

            <h2 class="photographer_name">` + this.currentPhotographer.name + `</h2>
            <h3 class="photographer_location">` + this.currentPhotographer.city + ", " + this.currentPhotographer.country + `</h3>
            <p class="photographer_desc">` + this.currentPhotographer.tagline + `</p>
            
            <div class="tags">
            </div>

        `;

        this.appendBannerContentTags(bannerContent);

        document.querySelector('.banner').appendChild(bannerContent);
    }

    appendBannerContentTags(bannerContent) {
        this.currentPhotographer.tags.forEach(photographerTag => {
            const tag = document.createElement('a');
            tag.className = 'tags__item';
            tag.innerHTML = `
         <span>` + "#" + photographerTag + `</span>
        `;
            bannerContent.querySelector('.tags').appendChild(tag);
        });
    }

    renderMain() {
        this.generateSummary()
        this.renderDropdown()
        this.sortBy("Popularité")
    }

    addMedium(medium) {
        const mediumThumbnail = document.createElement('div');
        mediumThumbnail.className = "medium_thumbnail";

        let tmpMedium = medium.image;
        if (tmpMedium == null) {
            tmpMedium = medium.video;
        }
        mediumThumbnail.innerHTML = `
            <img
            class="medium_thumbnail__picture"
            src="/static/` + this.currentPhotographer.name.split(' ')[0] + "/" + tmpMedium + `"
            alt="bird picture"
          />
          <div class="medium_thumbnail__content">
            <h2 class="medium_title">Temporary title</h2>
            <div class="price_and_likes">
              <span class="medium_price">` + medium.price + `€</span>
              <span class="medium_number_of_likes">` + medium.likes + `</span>
              <button class="like">
              <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
            `;

        const main = document.querySelector('main');
        main.appendChild(mediumThumbnail);
    }

    //sticker photographer total number of likes and price
    generateSummary() {

        let numberOfLikes = 0;
        this.allMedia.forEach(medium => {
            numberOfLikes = numberOfLikes + medium.likes
        });

        const totalNumberOfLikes = document.createElement('div')
        totalNumberOfLikes.className = "total_likes"

        totalNumberOfLikes.innerHTML = `
        <p class="total_number_of_likes">` + numberOfLikes + `</p>
        <i class="fas fa-heart fa-lg"></i>
          
        `

        const summary = document.querySelector('.sticker_summary')
        summary.appendChild(totalNumberOfLikes)

        const price = this.currentPhotographer.price;
        const photographerPrice = document.createElement('div')
        photographerPrice.className = "photographer_price"
        photographerPrice.innerHTML = price + "€/jour"
        summary.appendChild(photographerPrice)
    }

    removeAllThumbnails() {
        const mainNode = document.querySelector('main')
        mainNode.childNodes.forEach(nodeElement => {
            if (nodeElement.className == 'medium_thumbnail') {
                mainNode.removeChild(nodeElement)
            }
        })
    }

    renderDropdown() {
        
        const sortBy = document.createElement('span');
        sortBy.className = 'sort_by';
        sortBy.innerHTML = `Trier par`;
        document.querySelector('.dropdown_menu').appendChild(sortBy);

        const dropdown = document.createElement('div');
        dropdown.className = "dropdown";
        dropdown.innerHTML = `
        <button class="dropdown__button">Popularité</button>
        <div class="dropdown__content">
            <a class="dropdown__content__item" href="#">Date</a>
            <a class="dropdown__content__item" href="#">Titre</a>
      </div>
        `;
        document.querySelector('.dropdown_menu').appendChild(dropdown);

        const dropdrownButton = document.querySelector('.dropdown__button');
        const dropdrownContent = document.querySelector('.dropdown__content');

        dropdrownButton.addEventListener('click', () => {
            if (this.isDropdownVisible == false) {
                dropdrownContent.style.display = "block";
                this.isDropdownVisible = true; //content visibility state 
            } else {
                dropdrownContent.style.display = "none";
                this.isDropdownVisible = false;
            }
        });

        const dropdownItems = document.getElementsByClassName("dropdown__content__item");
        for(let item of dropdownItems){
            item.addEventListener('click', () => { 
                this.handleDropdownItemClick(dropdrownButton, item);
            })
        }

        
      
    }

    SortEnum = {
        DATE: "Date",
        POPULARITY : "Popularité",
        TITLE : "Titre",
    }

    handleDropdownItemClick(dropdrownButton, item) {
        dropdrownButton.click();

        this.removeAllThumbnails(); // TODO
        this.removeAllThumbnails();
        this.removeAllThumbnails();
        this.removeAllThumbnails();
        this.removeAllThumbnails();

        //Tri
        this.sortBy(item.innerHTML);

        //swap
        this.swapDropdownItems(item, dropdrownButton);
    }

    swapDropdownItems(item, dropdrownButton) {
        var temporary = item.innerHTML;
        item.innerHTML = dropdrownButton.innerHTML;
        dropdrownButton.innerHTML = temporary;
    }

    //Date, popularité, titre
    sortBy(sortType) {
        console.log(sortType)
        let sortedMedia = null;
        switch (sortType) {
            case this.SortEnum.DATE:
                sortedMedia = this.allMedia.sort((a, b) => new Date(b.date) - new Date(a.date))
                break;
            case this.SortEnum.POPULARITY:
                sortedMedia = this.allMedia.sort((a, b) => b.likes - a.likes);
                break;
            case this.SortEnum.TITLE:
                sortedMedia = this.allMedia.sort((a, b) => {
                    let aImage = a.image;
                    let bImage = b.image;
        
                    if (aImage == null) {
                        aImage = a.video
                    }
                    if (bImage == null) {
                        bImage = b.video
                    }
        
                    String(aImage).localeCompare(String(bImage), 'fr')
                }).reverse();
                break;
        }

        console.log(sortedMedia);
        sortedMedia.forEach (sortedMedium => {
            this.addMedium(sortedMedium)
        })
    }
}