// Nom de classe
export class HomePageBuilder {
    constructor(props) {
        this.dataPromise = props.json 
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
        const header = document.createElement('header');
        header.className = 'header_home';
        header.innerHTML = `
      <nav class="main_nav" aria-label="photographer categories">
      </nav>`;
        const main = document.querySelector("main")
        document.querySelector('body').insertBefore(header, main)

        // const allTags = [];

        // photographers.forEach(photographer => {
        //     photographer.tags.forEach(photographerTag => {
        //         allTags.push(photographerTag);
        //     })
        // });

        console.log("allTAGS")
        const allTags = photographers.map(photographer => photographer.tags).flat();
        console.log(allTags)


        const distinctTags = [...new Set(allTags)]; //remove duplicates

        //add each tag dynamically in the nav
        distinctTags.forEach(tag => {
            const headerTag = document.createElement('a')
            headerTag.className = 'main_nav__item';
            headerTag.innerHTML = `
         <span>`+ "#" + tag + `</span>
        `
            document.querySelector('.main_nav').appendChild(headerTag)
        })

    }

    renderMain(photographers) {

        const title = document.createElement('h1');
        title.className = 'main_title';
        title.innerHTML = `Nos photographes`;
        document.querySelector("main").appendChild(title);

        photographers.forEach(photographer => {

            const article = document.createElement('article') 
            article.className = 'article'; 
            article.innerHTML = `
            
          <a class="photographer_thumbnail" href="/photographers-profile/`+photographer.id+`">
              <img
                class="photographer_thumbnail__picture"
                src="/static/Photographers ID Photos/`+ photographer.portrait + `"
                alt="photographer's thumbnail picture"
              />
            <div class="photographer_thumbnail__content">
              <h2 class="photographer_name">` + photographer.name + `</h2>
              <h3 class="photographer_location">` + photographer.city + ", " + photographer.country + `</h3>
              <p class="photographer_desc">` + photographer.tagline + `</p>
              <p class="photographer_price">` + photographer.price + "€/jour" + `</p>
              
              <div class="tags">
              </div>
            </div>
          </a>`;


            photographer.tags.forEach(photographerTag => {
                const tag = document.createElement('a')
                tag.className = 'tags__item';
                tag.innerHTML = `
             <span>`+ "#" + photographerTag + `</span>
            `
                article.querySelector('.tags').appendChild(tag)
            })


            document.querySelector('.photographers').appendChild(article);

        });
    }


}
