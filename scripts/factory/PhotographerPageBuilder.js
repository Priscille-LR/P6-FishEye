import { MediaFactory } from './MediaFactory';
import { ContactModal } from "./ContactModal";
import { LightboxMedia } from "./LightboxMedia";
import { Tags } from "./Tags";
import { Utils } from "../utils/Utils";
import { PhotographerPageModel } from "../models/PhotographerPageModel";
import { PhotographerProfileModel } from '../models/PhotographerProfileModel';
import { MediumModel } from '../models/MediumModel';

export class PhotographerPageBuilder {

    SortEnum = {
        DATE: "Date",
        POPULARITY: "Popularité",
        TITLE: "Titre",
    }
    
    /**
     * 
     * @param {Promise<PhotographerPageModel>} photographerPageModel 
     */
    constructor(photographerPageModel) {
        this.photographerPageModelPromise = photographerPageModel
        this.isDropdownVisible = false //dropdown menu hidden by default
        this.mediaList = [];
        this.activeTags = [];
        this.selectedMedia = [];
        this.mediaFactory = new MediaFactory();
    }

    render(id) {
        this.idPhotographer = id
        this.photographerPageModelPromise
            .then((photographerPageModel) => {
                this.determineCurrentPhotographer(photographerPageModel.getPhotographersList());
                this.determineCurrentPhotographerMedia(photographerPageModel.getMediaList());

                this.renderHeader();
                this.renderMain();

                this.contactModal = new ContactModal(this.currentPhotographer);
                this.contactModal.renderContactModal();

                this.lightboxMedia = new LightboxMedia(this.allMedia, this.currentPhotographer);
                this.lightboxMedia.renderLightboxMedia();
            })
    }

    renderHeader() {
        const header = this.createHeader();
        this.appendLogo(header);

        const main = document.querySelector("main");
        document.querySelector('body').insertBefore(header, main);
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
        logo.innerHTML = `<img class="logo_img" src="/static/logo.svg" alt="Fisheye Home Page" />`;

        header.appendChild(logo);
    }

    // for each photographer, 
    //  if their id == photographer wanted 
    //  then save photographer in currentPhotographer 
    /**
     * 
     * @param {Array<PhotographerProfileModel} photographers 
     */
    determineCurrentPhotographer(photographers) {
        photographers.forEach(photographer => {
            if (photographer.getId() == this.idPhotographer) {
                this.currentPhotographer = photographer;
            }
        });
    }

    //for each medium, 
    //  if photographer id in media object = id in photographers object,
    //  then add medium to array
    /**
     * 
     * @param {Array<MediumModel>} media 
     */
    determineCurrentPhotographerMedia(media) {
        media.forEach(medium => {
            if (medium.getPhotographerId() == this.idPhotographer) {
                this.mediaList.push(medium);
            }
        });
    }

    renderMain() {
        this.renderBanner();
        this.renderSummary();
        this.renderDropdown();
        this.sortBy(this.SortEnum.POPULARITY);
    }


    //Banner
    renderBanner() {
        const banner = document.createElement('div');
        banner.className = 'banner';
        banner.innerHTML = `
        <div class="banner__text_content">
            <h2 class="photographer_name">${this.currentPhotographer.getName()}</h2>
            <h3 class="photographer_location">${this.currentPhotographer.getLocation()}</h3>
            <p class="photographer_desc">${this.currentPhotographer.getTagline()}</p>
            <div class="tags tags_photographer_page"></div>
        </div>
        <button class="button_contact button_banner" aria-label="Contact Me"> Contactez-moi </button>
        <div class="photographer__picture">
            <img class="photographer_thumbnail__picture picture_profile" src="/static/Photographers ID Photos/${this.currentPhotographer.getPortrait()}" alt="">
        </div>`

        banner.querySelector(".button_banner").addEventListener('click', () => {
            this.launchContactModal()
        });
        this.appendBannerTags(banner.querySelector(".tags_photographer_page"))
        document.getElementById('app').appendChild(banner);
    }

    launchContactModal() {
        this.contactModal.showContactModal();
    }

    appendBannerTags(bannerTags) {
        const tags = new Tags(this.currentPhotographer.getTags());
        tags.appendTags(bannerTags,'photographer_tags__item')
        tags.addEventOnChange(bannerTags, (isChecked, tag) => this.handleTagClick(isChecked, tag));
    }

    handleTagClick(isChecked, tag) {
        console.log(isChecked)
        console.log(tag)
        if (isChecked) {
            this.activeTags.push(tag);
            this.activeTags = [...new Set(this.activeTags)];
        } else {
            const currentIndex = this.activeTags.indexOf(tag);
            this.activeTags.splice(currentIndex, 1);
        }
        Utils.removeChildOf("#app", "medium_thumbnail");
        this.sortMedia()
    }

    sortMedia() {
       this.selectedMedia = [];
       console.log(this.activeTags)
        this.activeTags.forEach(clickedPhotographerTag => {
            this.mediaList.forEach(medium => {
                medium.getTags().forEach(tag => {
                    console.log(tag)
                    if (tag == clickedPhotographerTag) {
                        this.selectedMedia.push(medium)
                    }
                })
            });
        });
        console.log(this.selectedMedia)
        

        if (this.selectedMedia.length == 0) {
            this.mediaList.forEach(medium => {
                this.createMediumThumbnail(medium)

            });
        } else {
            this.selectedMedia = [...new Set(this.selectedMedia)];

            this.selectedMedia.forEach(selectedMedium => {
                this.createMediumThumbnail(selectedMedium);
            });
        }

    }

    //dropdown
    renderDropdown() {

        const dropdownMenu = this.createDropdownMenu();
        this.appendSortByText(dropdownMenu);
        this.appendDropdown(dropdownMenu);
        document.querySelector('main').appendChild(dropdownMenu);

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

    createDropdownMenu() {
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = "dropdown_menu";
        return dropdownMenu;
    }

    appendSortByText(dropdownMenu) {
        const sortBy = document.createElement('span');
        sortBy.className = 'sort_by';
        sortBy.innerHTML = `Trier par`;
        dropdownMenu.appendChild(sortBy);
    }

    appendDropdown(dropdownMenu) {
        const dropdown = document.createElement('div');
        dropdown.className = "dropdown";
        this.appendDropdownButton(dropdown);
        this.createDropdownContent(dropdown);
        dropdownMenu.appendChild(dropdown);
    }

    appendDropdownButton(dropdown) {
        const dropdownButton = document.createElement('button');
        dropdownButton.className = 'dropdown__button';
        dropdownButton.role = "button"
        dropdownButton.innerHTML = this.SortEnum.POPULARITY;
        dropdown.appendChild(dropdownButton);
    }

    createDropdownContent(dropdown) {
        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown__content';

        this.appendDropdownItemDATE(dropdownContent);
        this.appendDropdownItemTITLE(dropdownContent);

        dropdown.appendChild(dropdownContent);
    }

    appendDropdownItemDATE(dropdownContent) {
        const dropdownItemDATE = document.createElement('a');
        dropdownItemDATE.className = 'dropdown__content__item';
        dropdownItemDATE.innerHTML = this.SortEnum.DATE;
        dropdownContent.appendChild(dropdownItemDATE);
    }

    appendDropdownItemTITLE(dropdownContent) {
        const dropdownItemTITLE = document.createElement('a');
        dropdownItemTITLE.className = 'dropdown__content__item';
        dropdownItemTITLE.innerHTML = this.SortEnum.TITLE;
        dropdownContent.appendChild(dropdownItemTITLE);
    }


    //sticker photographer total number of likes and price
    renderSummary() {
        const summary = this.createSummary();
        this.createTotalLikes(summary);
        this.createPhotographerPrice(summary);

    }

    createSummary() {
        const stickerSummary = document.createElement('div');
        stickerSummary.className = 'sticker_summary';
        document.querySelector('main').appendChild(stickerSummary);
        return stickerSummary;
    }

    createPhotographerPrice(summary) {
        const photographerPrice = document.createElement('div');
        photographerPrice.className = "photographer_price";
        photographerPrice.innerHTML = this.currentPhotographer.getPrice() + "€/jour";

        summary.appendChild(photographerPrice);
    }

    createTotalLikes(summary) {
        let numberOfLikes = 0;
        this.mediaList.forEach(medium => {
            numberOfLikes = numberOfLikes + medium.getLikes()
        });

        const totalNumberOfLikes = document.createElement('div');
        totalNumberOfLikes.className = "total_likes";

        totalNumberOfLikes.innerHTML = `
        <p class="total_number_of_likes">` + numberOfLikes + `</p>
        <i class="fas fa-heart fa-lg" aria-label="likes"></i>`;

        summary.appendChild(totalNumberOfLikes);
    }

    incrementNumberOfLikes(mediumThumbnail) {
        const likeButton = mediumThumbnail.querySelector('.checkbox__input');
        const mediumLikes = mediumThumbnail.querySelector('.medium_number_of_likes');
        const totalLikes = document.querySelector('.total_number_of_likes');

        likeButton.addEventListener('change', () => {
            if (likeButton.checked) {
                mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) + 1;
                totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
            } else {
                mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) - 1;
                totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
            }

        });
    }

    /**
     * 
     * @param {MediumModel} medium 
     */
    createMediumThumbnail(medium) {
        const mediumThumbnail = this.mediaFactory.renderMedium(medium, this.currentPhotographer);

        const main = document.querySelector('main');
        main.appendChild(mediumThumbnail);

        const mediumThumbnailMiniature = mediumThumbnail.querySelector('.medium_thumbnail__miniature');

        mediumThumbnailMiniature.addEventListener('click', () => {
            if (this.selectedMedia.length == 0) {
                this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.mediaList)
            } else {
                this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.selectedMedia)
            }
        })

        this.incrementNumberOfLikes(mediumThumbnail);
    }

    handleDropdownItemClick(dropdrownButton, item) {
        dropdrownButton.click();

        Utils.removeChildOf("#app", "medium_thumbnail");//remove everything
        this.sortBy(item.innerHTML); //sort
        this.swapDropdownItems(item, dropdrownButton); //swap
    }

    swapDropdownItems(item, dropdrownButton) {
        var temporary = item.innerHTML;
        item.innerHTML = dropdrownButton.innerHTML;
        dropdrownButton.innerHTML = temporary;
    }

    //a & b = media
    sortBy(sortType) {
        let sortedMedia = null;
        switch (sortType) {
            case this.SortEnum.DATE:
                sortedMedia = this.mediaList.sort((a, b) => new Date(b.getDate()) - new Date(a.getDate()))
                break;
            case this.SortEnum.POPULARITY:
                sortedMedia = this.mediaList.sort((a, b) => b.getLikes() - a.getLikes());
                break;
            case this.SortEnum.TITLE:
                sortedMedia = this.mediaList.sort((a,b) => a.getTitle().localeCompare(b.getTitle(), 'fr'));
                break;
        }
        console.log(sortedMedia)
        sortedMedia.forEach(sortedMedium => {
            this.createMediumThumbnail(sortedMedium)
        })
    }
}