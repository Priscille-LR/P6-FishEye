import { AppModel } from "../models/AppModel";
import { HomePageModel } from "../models/HomePageModel";
import { MediumModel as MediumModel } from "../models/MediumModel";
import { PhotographerPageModel } from "../models/PhotographerPageModel";
import { PhotographerProfileModel } from "../models/PhotographerProfileModel";

export class DataFetcher {
    constructor(dataSource) {
        this.dataSource = dataSource; //json file
    }

    /**
     * fetch data from json
     * @returns {Promise<AppModel>} 
     */
    fetchSource() {
        const result = fetch(this.dataSource) // ressource request
            .then(resp => resp.json())
            .then(json => this.appPageWrapper(json))
        return result;
    }

    appPageWrapper(json) {
        const photographersList = json.photographers.map(photographer => new PhotographerProfileModel(photographer));
        const tagsList = this.createTagsList(json);
        const mediaList = this.createMediaList(json);
        const homePageModel = new HomePageModel(photographersList, tagsList);
        const mediaPageModel = new PhotographerPageModel(photographersList, mediaList);

        return new AppModel(homePageModel, mediaPageModel);
    }

    createTagsList(json) {
        let photographers = json.photographers;
        const allTags = photographers.map(photographer => photographer.tags).flat();
        const tagsList = [...new Set(allTags)];
        return tagsList;
    }

    createMediaList(json) {
        const mediaList = json.media.map(medium => new MediumModel(medium)); //map array<JSON medium> => array<mediumModel>
        return mediaList;

    }
}


