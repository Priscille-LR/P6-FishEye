import { Utils } from "../utils/Utils";
import { Tags } from "../components/Tags";
import { PhotographerProfileModel } from "../models/PhotographerProfileModel";
import { HomePageModel } from "../models/HomePageModel";
import { PageBuilder } from "./PageBuilder";

const main = document.getElementById('app');

export class HomePageBuilder extends PageBuilder{
    /**
     * 
     * @param {Promise<HomePageModel>} homePageModel 
     */
    constructor(homePageModel) {
        super()
        this.homePageModelPromise = homePageModel //save homePageModel as class variable
        this.activeNavTags = []; //create array of tags as class variable
    }

    //display header and main (home page)
    render() {
        this.homePageModelPromise //uses promise 
            .then((homePageModel) => { //then => homePageModel => sets photographers and allTags as class vars
                this.photographers = homePageModel.photographersList
                this.allTags = homePageModel.tagsList

                this.renderHeader();
                this.renderMain(this.photographers);
            })
    }

    /**
     * renders header gotten from the super + add specific logic
     */
    renderHeader() {
        super.renderHeader()
        this.header.className = 'header_home';
        this.header.role = 'heading';
        this.header.ariaLabel = 'Fisheye home page heading';
        this.header.innerHTML = `
        <a class="logo" href="/">
            <img class="logo_img" src="/static/logo.svg" alt="Fisheye Home Page" />
        </a>
        <a class="go_main" href="#app" aria-label="go to main content" tabindex="0">Passer au contenu</a>
        <nav class="main_nav" role="navigation" aria-label="photographers categories">
        </nav>
        `;
        this.renderNavTags( this.header.querySelector(".main_nav"))
    }

    /**
     * creates new instance of Tags then appends tags to the main nav in the header
     * adds event listeners: handleTagClick() called on change
     */
    renderNavTags(mainNav) {
        const tags = new Tags(this.allTags)
        tags.appendTags(mainNav, 'main_nav__item');
        tags.addEventOnChange(mainNav, (isChecked, tagId) => this.handleTagClick(isChecked, tagId));
    }

    /**
     * calls method in super + removes photographer thumbnails, then sorts with the right tags
     */
    handleTagClick(isChecked, tagId) {
        super.handleTagClick(isChecked, tagId, this.activeNavTags)
        Utils.removeChildOf(".photographers_wrapper", "photographer_thumbnail_wrapper")
        this.sortPhotographers(this.photographers)
    }

    /**
     * for each photographer, checks if tag == active (clicked) tag; if so, tag is push to selected photographers array
     * if array is empty => create thumbnails of all photographers
     * if not => create thumbnails of photographers who have the active tags
     */
    sortPhotographers(photographers) {
        let selectedPhotographers = [];
        this.activeNavTags.forEach(activeNavTag => {
            photographers.forEach(photographer => {
                if (photographer.getTags().includes(activeNavTag)) {
                    selectedPhotographers.push(photographer)
                }
            });
        });

        if (this.activeNavTags.length == 0) {
            this.createArticle(photographers)
        } else {
            selectedPhotographers = [...new Set(selectedPhotographers)];
            this.createArticle(selectedPhotographers)
        }

    }

    renderMain(photographers) {
        this.createMainTitle()
        this.createPhotographersWrapper()
        this.createArticle(photographers)
    }

    createMainTitle() {
        const title = document.createElement('h1')
        title.className = 'main_title'
        title.ariaLabel = 'photographers'
        title.innerHTML = `Nos photographes`
        main.appendChild(title)
    }

    createPhotographersWrapper() {
        const photographersWrapper = document.createElement('div')
        photographersWrapper.className = 'photographers_wrapper';
        photographersWrapper.ariaLabelledby = 'photographers';
        document.getElementById("app").appendChild(photographersWrapper)
    }

    /**
     * create article for each photographer; add their picture and content
     * @param {Array<PhotographerProfileModel>} photographers 
     */
    createArticle(photographers) {

        photographers.forEach(photographer => {

            const article = document.createElement('article')
            article.className = 'photographer_thumbnail_wrapper';
            article.innerHTML = `<a class="photographer_thumbnail" href="/photographers-profile/${photographer.getId()}" aria-label="${photographer.getName()}">`;
            this.appendPhotographerThumbnailPicture(article, photographer);
            this.appendPhotographerThumbnailContent(article, photographer);

            document.querySelector('.photographers_wrapper').appendChild(article);
        });
    }

    /**
     * 
     * @param {PhotographerProfileModel} photographer 
     */
    appendPhotographerThumbnailPicture(article, photographer) {
        const thumbnailPicture = document.createElement('a')
        thumbnailPicture.className = 'photographer_thumbnail__picture';
        thumbnailPicture.innerHTML = `
        <img class="photographer_thumbnail__picture"
        src="/static/Photographers ID Photos/${photographer.getPortrait()}"
        alt="${photographer.getName()}'s thumbnail picture" />`;

        article.querySelector('.photographer_thumbnail').appendChild(thumbnailPicture);
    }

    /**
     * 
     * @param {PhotographerProfileModel} photographer 
     */
    appendPhotographerThumbnailContent(article, photographer) {
        const thumbnailContent = document.createElement('div')
        thumbnailContent.className = 'photographer_thumbnail__content';
        //thumbnailContent.ariaLabel = `${photographer.getName()} info`
        thumbnailContent.innerHTML = `
        <h2 class="photographer_name">${photographer.getName()}</h2>
        <h3 class="photographer_location">${photographer.getLocation()}</h3>
        <p class="photographer_desc">${photographer.getTagline()}</p>
        <p class="photographer_price">${photographer.getPrice()}€/jour</p>
        <div class="tags"></div>`;

        photographer.getTags().forEach(photographerTag => {
            const tag = document.createElement('a')
            tag.className = 'tags__item';
            tag.innerHTML = `<span>#${photographerTag}</span>`
            thumbnailContent.querySelector('.tags').appendChild(tag)
        })

        article.querySelector('.photographer_thumbnail').appendChild(thumbnailContent);
    }
}