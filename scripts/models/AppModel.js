import { HomePageModel } from "../models/HomePageModel";
import { PhotographerPageModel } from "./PhotographerPageModel";


export class AppModel {

    /**
    * @param {HomePageModel} homePage
    * @param {PhotographerPageModel} photographerPageModel
    */
    constructor(homePage, photographerPageModel) {
        this.homePageModel = homePage;
        this.photographerPageModel = photographerPageModel;
    }

    getHomePage() {
        return this.homePageModel
    }

    getMediaPageModel() {
        return this.photographerPageModel
    }
}