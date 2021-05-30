import { MediaFactory } from './MediaFactory';
import { ContactModal } from "./ContactModal";
import { LightboxMedia } from "./LightboxMedia";
import { Tags } from "./Tags";
import { Utils } from "../utils/Utils";
import { PhotographerPageModel } from "../models/PhotographerPageModel";
import { PhotographerProfileModel } from '../models/PhotographerProfileModel';
import { MediumModel } from '../models/MediumModel';

//const body = document.getElementById("page");
const main = document.getElementById('app');

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
        this.photographerPageModelPromise = photographerPageModel;
    }

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
            this.lightboxMedia = new LightboxMedia(this.allMedia, this.currentPhotographer);
            
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

    renderHeader() {
        const header = document.createElement('header');
        header.className = 'header_photographer_page';
        header.role = 'heading';
        header.ariaLabel = 'Fisheye photographer page heading';
        header.innerHTML = `
        <a class="logo" href="/">
        <img class="logo_img" src="/static/logo.svg" alt="Fisheye Home Page" />
        </a>
        `;
        const pageInner = document.querySelector('.page_inner');
        pageInner.insertBefore(header, main);
    }

    renderMain() {
        this.renderBanner();
        this.renderDropdownMenu();
        this.createMediaWrapper();
        this.renderSummary();
        this.sortBy(this.SortEnum.POPULARITY);
    }


    //Banner
    renderBanner() {
        const banner = document.createElement('section');
        banner.className = 'banner';
        banner.innerHTML = `
        <div class="banner__text_content" aria-label="${this.currentPhotographer.getName()} info" >
            <h2 class="photographer_name">${this.currentPhotographer.getName()}</h2>
            <h3 class="photographer_location">${this.currentPhotographer.getLocation()}</h3>
            <p class="photographer_desc">${this.currentPhotographer.getTagline()}</p>
            <div class="tags tags_photographer_page"></div>
        </div>
        <button class="button_contact button_banner" aria-label="Contact Me" aria-haspopup="dialog" aria-controls="contact_modal"> Contactez-moi </button>
        <div class="photographer__picture">
            <img class="photographer_thumbnail__picture picture_profile" src="/static/Photographers ID Photos/${this.currentPhotographer.getPortrait()}" alt="">
        </div>`
        
        this.renderBannerTags(banner.querySelector(".tags_photographer_page"));
        
        this.openContactModal(banner);

        main.appendChild(banner);
    }

    //contact modal opening
    openContactModal(banner) {
        const buttonContact = banner.querySelector(".button_contact");
        
        buttonContact.addEventListener('click', () => {
            this.contactModal.showContactModal();
        });
        
        buttonContact.addEventListener('keydown', (e) => {
            if((e.code === 'Enter') || (e.code === 'Space')) {
                this.contactModal.showContactModal();   
            }
        })
    }

    renderBannerTags(bannerTags) {
        const tags = new Tags(this.currentPhotographer.getTags());
        tags.appendTags(bannerTags, 'photographer_tags__item')
        tags.addEventOnChange(bannerTags, (isChecked, tagId) => this.handleTagClick(isChecked, tagId));
    }

    handleTagClick(isChecked, tagId) {
        const checkboxTag = document.getElementById(tagId);
        if (isChecked) {
            checkboxTag.setAttribute('aria-checked', 'true');
            this.activePhotographerTags.push(tagId);
            this.activePhotographerTags = [...new Set(this.activePhotographerTags)];
        } else {
            checkboxTag.setAttribute('aria-checked', 'false');
            const currentIndex = this.activePhotographerTags.indexOf(tagId);
            this.activePhotographerTags.splice(currentIndex, 1);
        }
        Utils.removeChildOf("#app", "medium_thumbnail");
        this.sortMedia()
    }

    //sort media when medium tag = active photographer tag
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


    //dropdown
    renderDropdownMenu() {
        const dropdownMenu = this.createDropdownMenu();
        main.appendChild(dropdownMenu);

        const dropdown = document.querySelector('.dropdown');
        const dropdrownTrigger = document.querySelector('.dropdown__trigger');
        const dropdrownItems = document.querySelectorAll('.dropdown__content__item');
        const secondDropdownItem = dropdrownItems[1];
        const lastDropdownItem = dropdrownItems[2];

        for (const dropdrownItem of dropdrownItems) {
            dropdrownItem.addEventListener('click', () => {
                this.dropdownEvent(dropdrownItem, dropdown);
            })
            dropdrownItem.addEventListener('keydown', (e) => {
                if( e.code === 'Enter') {
                    this.dropdownEvent(dropdrownItem, dropdown);
                }
            })
        }

        //handle dropdown opening and closing with keayboard nav
        dropdrownTrigger.addEventListener('click', () => {
            if(dropdown.classList.contains('open')) {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        })

        dropdrownTrigger.addEventListener('keydown', (e) => {
            if((dropdown.classList.contains('open')) && (e.code === 'Enter')) {
                this.closeDropdown();
            } else if (e.code === 'Enter') {
                this.openDropdown();
            }
        })

        secondDropdownItem.addEventListener('keydown', (e) => {
            if(e.code === 'Tab' && e.shiftKey) {
                this.closeDropdown()
            }
        })

        lastDropdownItem.addEventListener('keydown', (e) => {
            if(e.code === 'Tab' && !e.shiftKey) {
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
            <a class="dropdown__trigger" role="button" aria-label="sort by" aria-controls="dropdown_content" aria-haspopup="listbox" aria-expanded="false" tabindex="0">
                <span>${this.SortEnum.POPULARITY}</span>
                <i class="expand fas fa-chevron-down"></i>
            </a>
        
            <div class="dropdown__content" role="listbox">
                <a class="dropdown__content__item selected" role="option" aria-label="sort by popularity" aria-selected="true" tabindex="0">${this.SortEnum.POPULARITY}</a>
                <a class="dropdown__content__item" role="option" aria-label="sort by date" aria-selected="false" tabindex="0">${this.SortEnum.DATE}</a>
                <a class="dropdown__content__item" role="option" aria-label="sort by title" aria-selected="false" tabindex="0">${this.SortEnum.TITLE}</a>
            </div>
        </div>`
        return dropdownMenu;
    }

    dropdownEvent(dropdrownItem, dropdown) {
        if (!dropdrownItem.classList.contains('selected')) {
            const selectedItem = dropdown.querySelector('.dropdown__content__item.selected');

            selectedItem.classList.remove('selected');
            dropdrownItem.classList.add('selected');
            dropdrownItem.setAttribute('aria-selected', 'true');
            dropdown.querySelector('.dropdown__trigger span').innerHTML = dropdrownItem.innerHTML;

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

    handleLikeButton(mediumThumbnail) {
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
            if(e.code === 'Enter') {
                this.displayMediumInLightbox(e, medium);
            }
        })

        this.handleLikeButton(mediumThumbnail);
    }    


    displayMediumInLightbox(e, medium) {
        e.preventDefault();
        if (this.selectedMedia.length == 0) {
            this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.mediaList);
        } else {
            this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.selectedMedia);
        }
    }
}