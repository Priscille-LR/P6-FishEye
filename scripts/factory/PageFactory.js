import { PhotographerPageBuilder } from "./PhotographerPageBuilder";
import { HomePageBuilder } from "./HomePageBuilder";

let registeredPages = {};
registeredPages["photographerPage"] = PhotographerPageBuilder;
registeredPages["homePage"] = HomePageBuilder;


export class PageFactory {
    constructor() {}

    getPage(type, props) {
        return new registeredPages[type](props);
    }
}

