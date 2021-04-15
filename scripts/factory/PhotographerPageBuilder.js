export class PhotographerPageBuilder {

    constructor(json, id) {
        this.jsonPromise = json 
        this.idPhotographer = id
        this.isDropdownVisible = false //dropdown menu hidden by default
    }

    render() {
        this.jsonPromise.then((jsonData) => {
            let photographers = jsonData.photographers

            //for each photographer, 
            //  if their id == photographer wanted 
            //  then save photographer in currentPhotographer 
            let currentPhotographer = null;
            photographers.forEach(photographer => {
                if (photographer.id == this.idPhotographer) {
                    currentPhotographer = photographer; //whose id -> given in constructor parameter
                }
            })

            let media = jsonData.media
            const allMedia = [];

            //for each medium, 
            //  if photographer id in media object = id in photographers object,
            //  then add medium to array
            media.forEach(medium => {
                if (medium.photographerId == this.idPhotographer) {
                    allMedia.push(medium)
                }
            });
            this.renderBanner(currentPhotographer)
            this.renderMain(currentPhotographer, allMedia, currentPhotographer.price)
            
        })
    }

    renderBanner(photographer) {

        //banner text content for photographer's profile page
        const bannerContent = document.createElement('div');
        bannerContent.className = 'banner__text_content';
        bannerContent.innerHTML = `

            <h2 class="photographer_name">` + photographer.name + `</h2>
            <h3 class="photographer_location">` + photographer.city + ", " + photographer.country + `</h3>
            <p class="photographer_desc">` + photographer.tagline + `</p>
            
            <div class="tags">
            </div>

        `;

        photographer.tags.forEach(photographerTag => {
            const tag = document.createElement('a')
            tag.className = 'tags__item';
            tag.innerHTML = `
         <span>`+ "#" + photographerTag + `</span>
        `
            bannerContent.querySelector('.tags').appendChild(tag);
        })

        document.querySelector('.banner').appendChild(bannerContent);


        //contact button 
        const contactButton = document.createElement('button');
        contactButton.className = 'button_contact';
        contactButton.innerHTML = `Contactez-moi`;
        document.querySelector('.banner').appendChild(contactButton);


        //photographer's picture
        const bannerPicture = document.createElement('div');
        bannerPicture.className = 'photographer__picture';
        bannerPicture.innerHTML = `
            <img
                class="photographer_thumbnail__picture"
                src="static/Photographers ID Photos/`+ photographer.portrait + `"
                alt="photographer's thumbnail picture"
              />
            `;

        document.querySelector('.banner').appendChild(bannerPicture);

    }

    renderMain(currentPhotographer, allMedia, price) {
        let numberOfLikes = 0;
        allMedia.forEach(medium => {
            const mediumThumbnail = document.createElement('div')
            mediumThumbnail.className = "medium_thumbnail";

            let tmpMedium = medium.image
            if(tmpMedium == null){
                tmpMedium = medium.video
            }
            mediumThumbnail.innerHTML = `
            <img
            class="medium_thumbnail__picture"
            src="static/`+currentPhotographer.name.split(' ')[0]+"/"+ tmpMedium + `"
            alt="bird picture"
          />
          <div class="medium_thumbnail__content">
            <h2 class="medium_title">Temporary title</h2>
            <div class="price_and_likes">
              <span class="medium_price">`+ medium.price + `€</span>
              <span class="medium_number_of_likes">`+ medium.likes + `</span>
              <button class="like">
              <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
            `

            const main = document.querySelector('main');
            main.appendChild(mediumThumbnail);

            numberOfLikes = numberOfLikes + medium.likes
        });


        //sticker photographer total number of likes and price
        const totalNumberOfLikes = document.createElement('div')
        totalNumberOfLikes.className = "total_likes"

        totalNumberOfLikes.innerHTML = `
        <p class="total_number_of_likes">` + numberOfLikes + `</p>
        <i class="fas fa-heart fa-lg"></i>
          
        `

        const summary = document.querySelector('.sticker_summary')
        summary.appendChild(totalNumberOfLikes);

        const photographerPrice = document.createElement('div')
        photographerPrice.className = "photographer_price"
        photographerPrice.innerHTML = price + "€/jour"
        summary.appendChild(photographerPrice)

        this.renderDropdown()

    }

    renderDropdown() {
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
            item.addEventListener('click', function () { 
                dropdrownContent.style.display = "none";
                this.isDropdownVisible = false;
                //dropdrownButton.click() 

                
                var temporary = item.innerHTML;
                item.innerHTML = dropdrownButton.innerHTML;
                dropdrownButton.innerHTML = temporary;
                

            })
        }
      
    }

    // //filters dropdown menu
    // const dropdownMenu = document.createElement('nav');
    // dropdownMenu.className = 'dropdown';
    // dropdownMenu.innerHTML = `
    // <button class="dropdown__button">Popularité</button>
    // <div class="dropdown__content
    // <a href="#">Date</a>
    // <a href="#">Titre</a>
    //     `;

    // document.querySelector('.dropdown').appendChild(dropdownMenu);
}