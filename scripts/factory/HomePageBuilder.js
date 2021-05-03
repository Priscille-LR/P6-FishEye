export class HomePageBuilder {
    constructor(json) {
        this.dataPromise = json
        this.clickedNavTags = [];
    }

    //display header and main (home page)
    render() {
        this.dataPromise
            .then((jsonData) => {
                let photographers = jsonData.photographers

                this.renderHeader(photographers)
                this.renderMain(photographers)
            })
    }

    renderHeader(photographers) {
        const header = this.createHeader()
        this.appendLogo(header)
        this.appendMainNav(photographers, header)

        const main = document.querySelector("main");
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
        logo.innerHTML = `
        <img class="logo_img" src="/static/logo.svg" alt="logo" />
        `;

        header.appendChild(logo);
    }

    appendMainNav(photographers, header) {
        const mainNav = document.createElement('nav');
        mainNav.className = 'main_nav';

        this.appendNavTags(photographers, mainNav)
        header.appendChild(mainNav);
    }

    appendNavTags(photographers, nav) {
        const allTags = photographers.map(photographer => photographer.tags).flat()
        const distinctTags = [...new Set(allTags)] //remove duplicates

        //add each tag dynamically in the nav
        distinctTags.forEach(tag => {
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

    createLabel(forParam, textParam) {
        const label = document.createElement('label');
        label.setAttribute("for", forParam);
        label.innerHTML = `${textParam}`;
        return label;
    }

    createInputField(id) {
        const inputField = document.createElement('input');
        inputField.className = 'input_field';
        inputField.type = "text";
        inputField.setAttribute("id", id);
        return inputField;
    }

    handleTagClick(photographers) {
        this.removeAllThumbnails();
        this.sortPhotographers(photographers)
    }

    removeAllThumbnails() {
        const photographersNode = document.querySelector('.photographers')
        for (let index = photographersNode.childNodes.length - 1; index >= 0 ; index--) {
            const child = photographersNode.childNodes[index];
            photographersNode.removeChild(child)
        }
    }

    sortPhotographers(photographers) {
        let selectedPhotographers = [];
        this.clickedNavTags.forEach(clickedNavTag => {
            photographers.forEach(photographer => {
                if (photographer.tags.includes(clickedNavTag)) {
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
        this.createArticle(photographers)
    }

    createMainTitle() {
        const title = document.createElement('h1')
        title.className = 'main_title'
        title.innerHTML = `Nos photographes`
        document.querySelector("main").appendChild(title)
    }

    createArticle(photographers) {

        photographers.forEach(photographer => {

            const article = document.createElement('article')
            article.className = 'article';
            article.innerHTML = `<a class="photographer_thumbnail" href="/photographers-profile/${photographer.id}">`;

            this.appendPhotographerThumbnailPicture(article, photographer);
            this.appendPhotographerThumbnailContent(article, photographer);

            document.querySelector('.photographers').appendChild(article);
        });
    }

    appendPhotographerThumbnailPicture(article, photographer) {
        const thumbnailPicture = document.createElement('a')
        thumbnailPicture.className = 'photographer_thumbnail__picture';
        thumbnailPicture.innerHTML = `
        <img class="photographer_thumbnail__picture"
        src="/static/Photographers ID Photos/${photographer.portrait}"
        alt="photographer's thumbnail picture" />`;

        article.querySelector('.photographer_thumbnail').appendChild(thumbnailPicture);
    }

    appendPhotographerThumbnailContent(article, photographer) {
        const thumbnailContent = document.createElement('div')
        thumbnailContent.className = 'photographer_thumbnail__content';
        thumbnailContent.innerHTML = `
        <h2 class="photographer_name">${photographer.name}</h2>
        <h3 class="photographer_location">${photographer.city}, ${photographer.country}</h3>
        <p class="photographer_desc">${photographer.tagline}</p>
        <p class="photographer_price">${photographer.price}€/jour</p>
        <div class="tags"></div>`;

        photographer.tags.forEach(photographerTag => {
            const tag = document.createElement('a')
            tag.className = 'tags__item';
            tag.innerHTML = `<span>#${photographerTag}</span>`
            thumbnailContent.querySelector('.tags').appendChild(tag)
        })

        article.querySelector('.photographer_thumbnail').appendChild(thumbnailContent);
    }
}
