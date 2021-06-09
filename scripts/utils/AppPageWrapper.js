import { AppModel } from "../models/AppModel";
import { HomePageModel } from "../models/HomePageModel";
import { MediumModel as MediumModel } from "../models/MediumModel";
import { PhotographerPageModel } from "../models/PhotographerPageModel";
import { PhotographerProfileModel } from "../models/PhotographerProfileModel";


export class AppPageWrapper {
    /**
     * create app data model
     * @param {Promise} json 
     * @returns 
     */

    constructor(json) {
        this.appModel = json.then(json => this.appPageWrapper(json))
    }

    /**
     * transform json data in typed class data model (appModel with 2 subclasses : homePageModel & PhotogrpaherPageModel)
     * @param {Promise} json 
     * @returns {AppModel}
     */
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
        const allTags = photographers.map(photographer => photographer.tags).flat(); //transform tags for each photographer in a flattened array (un-nested array)
        const tagsList = [...new Set(allTags)]; //new array with unique tags => remove duplicates with spread operator + set
        return tagsList;
    }

    createMediaList(json) {
        const mediaList = json.media.map(medium => new MediumModel(medium)); //map array<JSON medium> => array<mediumModel>
        return mediaList;

    }
}