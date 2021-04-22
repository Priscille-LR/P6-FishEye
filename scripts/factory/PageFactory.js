import { PhotographerPageBuilder } from "./PhotographerPageBuilder";
import { HomePageBuilder } from "./HomePageBuilder";

//Map[key] = value
let registeredPages = {};
registeredPages["photographerPage"] = PhotographerPageBuilder;
registeredPages["homePage"] = HomePageBuilder;

export class PageFactory {
    
    getPage(type, props) {
        return new registeredPages[type](props);
    }
}

