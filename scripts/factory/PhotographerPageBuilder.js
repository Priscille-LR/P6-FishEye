import { MediaFactory } from './MediaFactory';

const mediaFactory = new MediaFactory();

export class PhotographerPageBuilder {

    SortEnum = {
        DATE: "Date",
        POPULARITY: "Popularité",
        TITLE: "Titre",
    }

    constructor(props) {
        this.jsonPromise = props.json
        this.isDropdownVisible = false //dropdown menu hidden by default
        this.allMedia = [];
        this.photographerTags = [];
    }

    render(id) {
        this.idPhotographer = id
        this.jsonPromise.then((jsonData) => {
            this.determineCurrentPhotographer(jsonData.photographers);
            this.determineCurrentPhotographerMedia(jsonData.media);

            this.renderHeader();
            this.renderBanner()
            this.renderMain()
        })
    }

    renderHeader() {
        const header = this.createHeader();
        this.appendLogo(header);

        const banner = document.querySelector(".banner");
        document.querySelector('body').insertBefore(header, banner);
    }

    createHeader() {
        const header = document.createElement('header');
        header.className = 'header_photographer_page';
        return header;
    }

    appendLogo(header) {
        const logo = document.createElement('a');
        logo.className = 'logo';
        logo.setAttribute("href", "/");
        logo.innerHTML = `<img class="logo_img" src="/static/logo.svg" alt="logo" />`;

        header.appendChild(logo);
    }

    // for each photographer, 
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
        this.createBannerContent();
        this.createBannerButton();
        this.createBannerPicture();
    }

    createBannerPicture() {
        const bannerPicture = document.createElement('div');
        bannerPicture.className = 'photographer__picture';
        bannerPicture.innerHTML = `
            <img
                class="photographer_thumbnail__picture picture_profile"
                src="/static/Photographers ID Photos/${this.currentPhotographer.portrait}"
                alt="photographer's thumbnail picture"
              />`;

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

            <h2 class="photographer_name">${this.currentPhotographer.name}</h2>
            <h3 class="photographer_location">${this.currentPhotographer.city}, ${this.currentPhotographer.country}</h3>
            <p class="photographer_desc">${this.currentPhotographer.tagline}</p>
            
            <div class="tags tags_photographer_page">
            </div>`;

        this.appendBannerContentTags(bannerContent);

        document.querySelector('.banner').appendChild(bannerContent);
    }

    appendBannerContentTags(bannerContent) {
        this.currentPhotographer.tags.forEach(photographerTag => {
            const tag = document.createElement('a');
            tag.className = 'tags__item';
            tag.innerHTML = `
         <span>#${photographerTag}</span>`;
            bannerContent.querySelector('.tags').appendChild(tag);


            tag.addEventListener('click', () => {
                console.log('u clicked')
                this.photographerTags.push(tag);
                this.photographerTags = [...new Set(this.photographerTags)];
                this.handleTagClick();
            });
        });
    }

    renderMain() {
        this.generateSummary()
        this.renderDropdown()
        this.sortBy(this.SortEnum.POPULARITY)
    }

    
    createMediumThumbnail(medium) {

        const mediumThumbnail = mediaFactory.renderMedium(medium, this.currentPhotographer);

        const main = document.querySelector('main');
        main.appendChild(mediumThumbnail);

        this.incrementNumberOfLikes(mediumThumbnail);
    }

    // sortByTag(tag) {

    //     this.currentPhotographer.tags.forEach(tag => {
    //         tag.addEventListener('click', () => {
    //             console.log('u cliked')
    //             
                
    //         });
    //     });
    // }

    handleTagClick() {
        this.removeAllThumbnails();
        this.sortMedia()
    }

    sortMedia() {
        let selectedMedia = [];
        this.photographerTags.forEach(clickedPhotographerTag => {
            this.allMedia.forEach(medium => {
                if (medium == clickedPhotographerTag) {
                    selectedMedia.push(medium)
                }
            });
        });

        selectedMedia = [...new Set(selectedMedia)];
        this.createMediumThumbnail(selectedMedia);
    }

    incrementNumberOfLikes(mediumThumbnail) {
        const likeButton = mediumThumbnail.querySelector('.like');
        const mediumLikes = mediumThumbnail.querySelector('.medium_number_of_likes');
        const totalLikes = document.querySelector('.total_number_of_likes');

        likeButton.addEventListener('click', () => {
            mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) + 1;
            totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;

        });
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
        for (let index = mainNode.childNodes.length - 1; index >= 0 ; index--) {
            const child = mainNode.childNodes[index];
            mainNode.removeChild(child)
        }
    }

    renderDropdown() {

        this.createSortByText();
        this.createDropdown();

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
        for (let item of dropdownItems) {
            item.addEventListener('click', () => {
                this.handleDropdownItemClick(dropdrownButton, item);
            })
        }
    }

    createDropdown() {
        const dropdown = document.createElement('div');
        dropdown.className = "dropdown";
        dropdown.innerHTML = `
        <button class="dropdown__button">${this.SortEnum.POPULARITY}</button>
        <div class="dropdown__content">
            <a class="dropdown__content__item" href="#">${this.SortEnum.DATE}</a>
            <a class="dropdown__content__item" href="#">${this.SortEnum.TITLE}</a>
      </div>`;

        document.querySelector('.dropdown_menu').appendChild(dropdown);
    }

    createSortByText() {
        const sortBy = document.createElement('span');
        sortBy.className = 'sort_by';
        sortBy.innerHTML = `Trier par`;
        document.querySelector('.dropdown_menu').appendChild(sortBy);
    }

    handleDropdownItemClick(dropdrownButton, item) {
        dropdrownButton.click();

        this.removeAllThumbnails(); //remove everything
        this.sortBy(item.innerHTML); //sort
        this.swapDropdownItems(item, dropdrownButton); //swap
    }

    swapDropdownItems(item, dropdrownButton) {
        var temporary = item.innerHTML;
        item.innerHTML = dropdrownButton.innerHTML;
        dropdrownButton.innerHTML = temporary;
    }

    sortBy(sortType) {
        let sortedMedia = null;
        switch (sortType) {
            case this.SortEnum.DATE:
                sortedMedia = this.allMedia.sort((a, b) => new Date(b.date) - new Date(a.date))
                break;
            case this.SortEnum.POPULARITY:
                sortedMedia = this.allMedia.sort((a, b) => b.likes - a.likes);
                break;
            case this.SortEnum.TITLE:
                sortedMedia = this.allMedia.sort(this.compareTitle);
                break;
        }

        sortedMedia.forEach(sortedMedium => {
            this.createMediumThumbnail(sortedMedium)
        })
    }

    compareTitle(a, b) {
        let aMedium = a.image;
        let bMedium = b.image;
      
        if (aMedium == null) {
            aMedium = a.video
            
        }
        if (bMedium == null) {
            bMedium = b.video
        }

        const t1 = mediaFactory.extractMediumTitle(aMedium)
        const t2 = mediaFactory.extractMediumTitle(bMedium)
        
         
        return t1.localeCompare(t2, 'fr') 
    }
}