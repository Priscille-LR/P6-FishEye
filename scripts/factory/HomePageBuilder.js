import { Utils } from "../utils/Utils";
import { Tags } from "./Tags";
import { PhotographerProfileModel } from "../models/PhotographerProfileModel";
import { HomePageModel } from "../models/HomePageModel";
export class HomePageBuilder {
    /**
     * 
     * @param {Promise<HomePageModel>} homePageModel 
     */
    constructor(homePageModel) {
        this.homePageModelPromise = homePageModel
        this.clickedNavTags = [];
    }

    //display header and main (home page)
    render() {
        this.homePageModelPromise
            .then((homePageModel) => {
                this.photographers = homePageModel.photographersList
                this.allTags = homePageModel.tagsList

                this.renderHeader()
                this.renderMain(this.photographers)
            })
    }
    
    renderHeader() {
        const header = document.createElement('header');
        header.className = 'header_home';
        header.innerHTML = `
        <a class="logo" href="/">
            <img class="logo_img" src="/static/logo.svg" alt="Fisheye Home Page" />
        </a>
        <a class="go_main" href="#app">Passer au contenu</a>
        <nav class="main_nav" aria-label="main navigation" role="navigation">
        </nav>
        `;
        this.renderNavTags(header.querySelector(".main_nav"))

        const main = document.getElementById('app');
        document.querySelector('body').insertBefore(header, main);
    }

    renderNavTags(mainNav) {
        const tags = new Tags(this.allTags)
        tags.appendTags(mainNav, 'main_nav__item');
        tags.addEventOnChange(mainNav, (isChecked, tag) => this.handleTagClick(isChecked, tag));
    }

    handleTagClick(isChecked, tag) {
        if (isChecked) {
            this.clickedNavTags.push(tag);
            this.clickedNavTags = [...new Set(this.clickedNavTags)];
        } else {
            const currentIndex = this.clickedNavTags.indexOf(tag);
            this.clickedNavTags.splice(currentIndex, 1);
        }
        
        Utils.removeChildOf(".photographers", "article")
        this.sortPhotographers(this.photographers)
    }

    sortPhotographers(photographers) {
        let selectedPhotographers = [];
        this.clickedNavTags.forEach(clickedNavTag => {
            photographers.forEach(photographer => {
                if (photographer.getTags().includes(clickedNavTag)) {
                    selectedPhotographers.push(photographer)
                }
            });
        });

        if (this.clickedNavTags.length == 0) {
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
        document.getElementById("app").appendChild(title)
    }

    createPhotographersWrapper() {
        const photographersWrapper = document.createElement('div')
        photographersWrapper.className = 'photographers'
        photographersWrapper.ariaLabelledby = 'photographers'
        document.getElementById("app").appendChild(photographersWrapper)
    }

    /**
     * create article for each photographer; add their picture and content
     * @param {Array<PhotographerProfileModel>} photographers 
     */
    createArticle(photographers) {

        photographers.forEach(photographer => {

            const article = document.createElement('article')
            article.className = 'article';
            article.innerHTML = `<a class="photographer_thumbnail" href="/photographers-profile/${photographer.getId()}">`;

            this.appendPhotographerThumbnailPicture(article, photographer);
            this.appendPhotographerThumbnailContent(article, photographer);

            document.querySelector('.photographers').appendChild(article);
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
        alt="photographer's thumbnail picture" />`;

        article.querySelector('.photographer_thumbnail').appendChild(thumbnailPicture);
    }

    /**
     * 
     * @param {PhotographerProfileModel} photographer 
     */
    appendPhotographerThumbnailContent(article, photographer) {
        const thumbnailContent = document.createElement('div')
        thumbnailContent.className = 'photographer_thumbnail__content';
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