import { Utils } from "../utils/Utils";
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
                let photographers = homePageModel.photographersList
                this.allTags = homePageModel.tagsList

                this.renderHeader(photographers)
                this.renderMain(photographers)
            })
    }

    renderHeader(photographers) {
        const header = this.createHeader();
        this.appendLogo(header);
        this.appendMainNav(photographers, header);
        this.appendMainAnchor(header);

        const main = document.getElementById("app");
        document.querySelector('body').insertBefore(header, main);
    }

    createHeader() {
        const header = document.createElement('header');
        header.className = 'header_home';
        return header;
    }

    appendLogo(header) {
        const logo = document.createElement('a');
        logo.className = 'logo';
        logo.innerHTML = `<img class="logo_img" src="/static/logo.svg" alt="Fisheye Home Page" />`;

        header.appendChild(logo);
    }

    appendMainNav(photographers, header) {
        const mainNav = document.createElement('nav');
        mainNav.className = 'main_nav';
        mainNav.ariaLabel = 'main navigation';
        mainNav.role = 'navigation'

        this.appendNavTags(photographers, mainNav)
        header.appendChild(mainNav);
    }

    appendMainAnchor(header) {
        const mainAnchor = document.createElement('a');
        mainAnchor.className = "go_main";
        mainAnchor.setAttribute = ("href", "#app");
        mainAnchor.innerHTML = `Passer au contenu`;

        header.appendChild(mainAnchor);
    }


    appendNavTags(photographers, nav) {
        //add each tag dynamically in the nav
        this.allTags.forEach(tag => {
            const tagName = tag.charAt(0).toUpperCase() + tag.substring(1);
            const headerTag = document.createElement('div');
            headerTag.className = 'main_nav__item';

            const checkboxTag = document.createElement('input');
            checkboxTag.type = "checkbox";
            checkboxTag.className = "tag_checkbox"
            checkboxTag.id = tagName;
            headerTag.appendChild(checkboxTag)

            const labelTag = document.createElement('label');
            labelTag.className = "tag_name"
            labelTag.setAttribute("for", tagName);
            labelTag.innerHTML = `#${tagName}`;
            headerTag.appendChild(labelTag)

            nav.appendChild(headerTag);

            //listen to clicks on main nav tags
            headerTag.addEventListener("change", () => {

                if (checkboxTag.checked) {
                this.clickedNavTags.push(tag);
                this.clickedNavTags = [...new Set(this.clickedNavTags)];
                } else {
                    const currentIndex = this.clickedNavTags.indexOf(tag);
                    this.clickedNavTags.splice(currentIndex, 1);
                }
                this.handleTagClick(photographers)
            });
        });
    }

    handleTagClick(photographers) {
        Utils.removeChildOf(".photographers", "article")
        this.sortPhotographers(photographers)
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
     * 
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
