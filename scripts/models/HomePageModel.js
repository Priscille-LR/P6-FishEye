import { PhotographerProfileModel } from "./PhotographerProfileModel";

export class HomePageModel {

    /**
    * @param {Array<PhotographerProfileModel>} photographersList
    * @param {Array<string>} tagsList
    */
    constructor(photographersList, tagsList) {
        this.photographersList = photographersList;
        this.tagsList = tagsList;
    }

    getPhotographersList() {
        return this.photographersList
    }


    getTagsList() {
        return this.tagsList
    }
}