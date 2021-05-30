import { MediumModel } from "./MediumModel";
import { PhotographerProfileModel } from "./PhotographerProfileModel";

export class PhotographerPageModel {

    /**
   * @param {Array<PhotographerProfileModel>} photographersList
    * @param {Array<MediumModel>} mediaList
    */
    constructor(photographersList, mediaList) {
        this.photographersList = photographersList;
        this.mediaList = mediaList;
    }

    getPhotographersList() {
        return this.photographersList;
    }

    getMediaList() {
        return this.mediaList;
    }
}