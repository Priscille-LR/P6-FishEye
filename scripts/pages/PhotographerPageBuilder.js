import { MediaFactory } from '../factory/MediaFactory';
import { ContactModal } from "../components/ContactModal";
import { LightboxMedia } from "../components/LightboxMedia";
import { Tags } from "../components/Tags";
import { Utils } from "../utils/Utils";
import { PhotographerPageModel } from "../models/PhotographerPageModel";
import { PhotographerProfileModel } from '../models/PhotographerProfileModel';
import { MediumModel } from '../models/MediumModel';
import { PageBuilder } from './PageBuilder';

//const body = document.getElementById("page");
const main = document.getElementById('app');

export class PhotographerPageBuilder extends PageBuilder {

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
        super()
        this.photographerPageModelPromise = photographerPageModel; //save photographerPageModel as class variable
    }

    /**
     * render page; with current photographer and their media list
     * @param {String} id 
     */
    render(id) {
        this.idPhotographer = id;
        this.mediaList = [];
        this.activePhotographerTags = [];
        this.selectedMedia = [];
        this.mediaFactory = new MediaFactory();

        this.photographerPageModelPromise.then((photographerPageModel) => {
            this.determineCurrentPhotographer(photographerPageModel.getPhotographersList());
            this.determineCurrentPhotographerMedia(photographerPageModel.getMediaList());
            this.contactModal = new ContactModal(this.currentPhotographer);
            this.lightboxMedia = new LightboxMedia(this.selectedMedia, this.currentPhotographer);

            this.contactModal.renderContactModal();
            this.lightboxMedia.renderLightboxMedia();

            this.renderHeader();
            this.renderMain();

        })
    }

    /**
     * save photographer in currentPhotographer if their id == photographer wanted 
     * @param {Array<PhotographerProfileModel} photographers 
     */
    determineCurrentPhotographer(photographers) {
        photographers.forEach(photographer => {
            if (photographer.getId() == this.idPhotographer) {
                this.currentPhotographer = photographer;
            }
        });
    }

    /**
     * add medium to array if photographer id in media object = id in photographers object
     * @param {Array<MediumModel>} media 
     */
    determineCurrentPhotographerMedia(media) {
        media.forEach(medium => {
            if (medium.getPhotographerId() == this.idPhotographer) {
                this.mediaList.push(medium);
            }
        });
        this.selectedMedia = this.mediaList
    }

    /**
     * renders header gotten from the super + add specific logic
     */
    renderHeader() {
        super.renderHeader()
        this.header.className = 'header_photographer_page';
        this.header.role = 'heading';
        this.header.ariaLabel = 'Fisheye photographer page heading';
        this.header.innerHTML = `
        <a class="logo" href="/">
        <img class="logo_img" src="/static/logo.svg" alt="Fisheye Home Page" />
        </a>
        `;
    }

    renderMain() {
        this.renderBanner();
        this.renderDropdownMenu();
        this.createMediaWrapper();
        this.renderSummary();
        this.sortBy(this.SortEnum.POPULARITY); //by default, sort is done based on popularity
    }

    renderBanner() {
        const banner = document.createElement('section');
        banner.className = 'banner';
        banner.innerHTML = `
        <div class="banner__text_content">
            <h1 class="photographer_name">${this.currentPhotographer.getName()}</h1>
            <h2 class="photographer_location">${this.currentPhotographer.getLocation()}</h2>
            <p class="photographer_desc">${this.currentPhotographer.getTagline()}</p>
            <div class="tags tags_photographer_page"></div>
        </div>
        <button class="button_contact button_banner" aria-label="Contact Me" aria-haspopup="dialog"> Contactez-moi </button>
        <div class="banner__photographer_picture">
            <img class="profile_picture" src="/static/Photographers ID Photos/${this.currentPhotographer.getPortrait()}" alt="${this.currentPhotographer.getName()}">
        </div>`

        this.renderBannerTags(banner.querySelector(".tags_photographer_page"));

        this.openContactModal(banner);

        main.appendChild(banner);
    }

    openContactModal(banner) {
        const buttonContact = banner.querySelector(".button_contact");

        buttonContact.addEventListener('click', () => {
            this.contactModal.showContactModal();
        });

        buttonContact.addEventListener('keydown', (e) => {
            if ((e.code === 'Enter') || (e.code === 'Space')) {
                this.contactModal.showContactModal();
            }
        })
    }

    /**
     * creates new instance of Tags then appends tags to the banner
     * adds event listeners: handleTagClick() called on change
     */
    renderBannerTags(bannerTags) {
        const tags = new Tags(this.currentPhotographer.getTags());
        tags.appendTags(bannerTags, 'photographer_tags__item')
        tags.addEventOnChange(bannerTags, (isChecked, tagId) => this.handleTagClick(isChecked, tagId));
    }

    /**
     * calls method in super + removes photographer thumbnails, then sorts with the right tags
     */
    handleTagClick(isChecked, tagId) {
        super.handleTagClick(isChecked, tagId, this.activePhotographerTags)
        Utils.removeChildOf("#app", "medium_thumbnail");
        this.sortMedia()
    }

    /**
     * sort media when medium tag = active photographer tag
     * */
    sortMedia() {
        this.selectedMedia = [];
        this.activePhotographerTags.forEach(activePhotographerTag => {
            this.mediaList.forEach(medium => {
                medium.getTags().forEach(tag => {
                    if (tag == activePhotographerTag) {
                        this.selectedMedia.push(medium)
                    }
                })
            });
        });

        if (this.selectedMedia.length == 0) { //if there are no media selected => display all thumbnails
            this.selectedMedia = this.mediaList
        } else { //display selected media only 
            this.selectedMedia = [...new Set(this.selectedMedia)]; //remove duplicates
        }

        const selectedItem = document.querySelector('.dropdown__content__item.selected');
        this.handleDropdownItemClick(selectedItem) //double sort => sort according to dropdown filter
    }

    renderDropdownMenu() {
        const dropdownMenu = this.createDropdownMenu();
        main.appendChild(dropdownMenu);

        const dropdown = document.querySelector('.dropdown');
        const dropdrownTrigger = document.querySelector('.dropdown__trigger');
        const dropdrownItems = document.querySelectorAll('.dropdown__content__item');
        const secondDropdownItem = dropdrownItems[1];
        const lastDropdownItem = dropdrownItems[2];

        //listens to click or keydown on each dropdownItem; calls dropdownEvent() on events
        for (const dropdrownItem of dropdrownItems) {
            dropdrownItem.addEventListener('click', () => {
                this.dropdownEvent(dropdrownItem, dropdown);
            })
            dropdrownItem.addEventListener('keydown', (e) => {
                if (e.code === 'Enter') {
                    this.dropdownEvent(dropdrownItem, dropdown);
                }
            })
        }

        //handle dropdown opening and closing on click/keydown on the dropdown button 
        dropdrownTrigger.addEventListener('click', () => {
            if (dropdown.classList.contains('open')) {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        })

        dropdrownTrigger.addEventListener('keydown', (e) => {
            if ((dropdown.classList.contains('open')) && (e.code === 'Enter')) {
                this.closeDropdown();
            } else if (e.code === 'Enter') {
                this.openDropdown();
            }
        })

        //closes dropdown if tab+shift keys pressed
        secondDropdownItem.addEventListener('keydown', (e) => {
            if (e.code === 'Tab' && e.shiftKey) {
                this.closeDropdown()
            }
        })

        //closes dropdown if tab+!shift keys pressed
        lastDropdownItem.addEventListener('keydown', (e) => {
            if (e.code === 'Tab' && !e.shiftKey) {
                this.closeDropdown()
            }
        })
    }

    createDropdownMenu() {
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = "dropdown_wrapper";
        dropdownMenu.innerHTML = `
        
        <span class="sort_by">Trier par</span>
        <div class="dropdown">
        <div aria-live="polite">
            <a class="dropdown__trigger" role="button" aria-label="sort by ${this.SortEnum.POPULARITY}" aria-controls="dropdown_content" aria-haspopup="listbox" aria-expanded="false" tabindex="0">
                <span>${this.SortEnum.POPULARITY}</span>
                <i class="expand fas fa-chevron-down"></i>
            </a>
            </div>
            <div class="dropdown__content" role="listbox">
                <a class="dropdown__content__item selected" role="option" aria-label="sort by popularity" aria-selected="true" tabindex="0">${this.SortEnum.POPULARITY}</a>
                <a class="dropdown__content__item" role="option" aria-label="sort by date" aria-selected="false" tabindex="0">${this.SortEnum.DATE}</a>
                <a class="dropdown__content__item" role="option" aria-label="sort by title" aria-selected="false" tabindex="0">${this.SortEnum.TITLE}</a>
            </div>
        </div>`
        return dropdownMenu;
    }

    /**
     * clicked dropdown item becomes selected item (swap)
     */
    dropdownEvent(dropdrownItem, dropdown) {
        if (!dropdrownItem.classList.contains('selected')) {
            const selectedItem = dropdown.querySelector('.dropdown__content__item.selected');

            selectedItem.classList.remove('selected');
            dropdrownItem.classList.add('selected');
            dropdrownItem.setAttribute('aria-selected', 'true');
            dropdown.querySelector('.dropdown__trigger span').innerHTML = dropdrownItem.innerHTML;

            const dropdrownTrigger = document.querySelector('.dropdown__trigger');
            dropdrownTrigger.ariaLabel = "sort by " + dropdrownItem.innerHTML

            this.closeDropdown();
            this.handleDropdownItemClick(dropdrownItem);
        }
    }

    handleDropdownItemClick(item) {
        Utils.removeChildOf(".media_wrapper", "medium_thumbnail");
        this.sortBy(item.innerHTML);
    }

    openDropdown() {
        const dropdown = document.querySelector('.dropdown');
        const dropdrownTrigger = document.querySelector('.dropdown__trigger');
        dropdown.classList.add('open');
        dropdrownTrigger.setAttribute('aria-expanded', 'true');
    }

    closeDropdown() {
        const dropdown = document.querySelector('.dropdown');
        const dropdrownTrigger = document.querySelector('.dropdown__trigger');
        dropdown.classList.remove('open');
        dropdrownTrigger.setAttribute('aria-expanded', 'false');
    }

    sortBy(sortType) {
        let sortedMedia = null;

        switch (sortType) {
            case this.SortEnum.DATE:
                sortedMedia = this.selectedMedia.sort((a, b) => new Date(b.getDate()) - new Date(a.getDate()));
                break;
            case this.SortEnum.POPULARITY:
                sortedMedia = this.selectedMedia.sort((a, b) => b.getLikes() - a.getLikes());
                break;
            case this.SortEnum.TITLE:
                sortedMedia = this.selectedMedia.sort((a, b) => a.getTitle().localeCompare(b.getTitle(), 'fr'));
                break;
        }
        sortedMedia.forEach(sortedMedium => {
            this.createMediumThumbnail(sortedMedium)
        })
    }


    //sticker photographer total number of likes and price
    renderSummary() {
        let numberOfLikes = 0;
        this.mediaList.forEach(medium => {
            numberOfLikes = numberOfLikes + medium.getLikes()
        });

        const stickerSummary = document.createElement('div');
        stickerSummary.className = 'sticker_summary';
        stickerSummary.innerHTML = `
        <div class="total_likes">
            <p class="total_number_of_likes">${numberOfLikes}</p>
            <i class="fas fa-heart fa-lg" aria-label="likes" aria-hidden="true"></i>
        </div>
        <div class="photographer_price">${this.currentPhotographer.getPrice()}€/jour</div>
        `
        main.appendChild(stickerSummary);

    }



    createMediaWrapper() {
        const mediaWrapper = document.createElement('div');
        mediaWrapper.className = 'media_wrapper';
        mediaWrapper.ariaLabelledby = 'media';
        document.getElementById("app").appendChild(mediaWrapper);
    }

    /**
     * 
     * @param {MediumModel} medium 
     */
    createMediumThumbnail(medium) {
        const mediaWrapper = document.querySelector('.media_wrapper');
        const mediumThumbnail = this.mediaFactory.renderMedium(medium, this.currentPhotographer);
        mediaWrapper.appendChild(mediumThumbnail);

        const mediumThumbnailMiniature = mediumThumbnail.querySelector('.medium_thumbnail__miniature');
        mediumThumbnailMiniature.addEventListener('click', (e) => {
            this.displayMediumInLightbox(e, medium);
        })

        mediumThumbnailMiniature.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                this.displayMediumInLightbox(e, medium);
            }
        })

        this.handleLikeButton(mediumThumbnail, medium);
    }

    /**
     * increments number of likes for the medium + increments total number of likes
     * @param {MediumModel} medium
     */
    // handleLikeButton(mediumThumbnail, medium) {
    //     //const likeButton = mediumThumbnail.querySelector('.likes');
    //     const checkboxes = document.querySelectorAll("checkbox__input");
        
    //     checkboxes.forEach(checkbox => {
    //         checkbox.addEventListener('change', () => {
    //             const mediumLikes = mediumThumbnail.querySelector('.medium_number_of_likes');
    //             const totalLikes = document.querySelector('.total_number_of_likes');
    //             //e.preventDefault();
    //             if (checkbox.checked) {
    //                 console.log("checked")
    //                 //checkbox.setAttribute("checked", "false")
    //                 //checkbox.checked = false;
    //                 checkbox.setAttribute('aria-checked', 'true');
    //                 mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) + 1;
    //                 totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
    //             } else {
    //                 console.log("unchecked")
    //                 // checkbox.setAttribute("checked", "true")
    //                 // checkbox.checked = true;
    //                 checkbox.setAttribute('aria-checked', 'false');
    //                 mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) - 1;
    //                 totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
    //             }
    //         });
    //     });

    // }

    handleLikeButton(mediumThumbnail) {
        const likeButton = mediumThumbnail.querySelector('.checkbox__input');
        const mediumLikes = mediumThumbnail.querySelector('.medium_number_of_likes');
        const totalLikes = document.querySelector('.total_number_of_likes');

        likeButton.addEventListener('change', () => {
            if (likeButton.checked) {
                likeButton.setAttribute('aria-checked', 'true');
                mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) + 1;
                totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
            } else {
                likeButton.setAttribute('aria-checked', 'false');
                mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) - 1;
                totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
            }

        });
    }
    

    /**
     * if there's no selected media, lightbox shows all media of the photographer
     * else, it shows only the selected media
     */
    displayMediumInLightbox(e, medium) {
        e.preventDefault();
        if (this.selectedMedia.length == 0) {
            this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.mediaList);
        } else {
            this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.selectedMedia);
        }
    }
}