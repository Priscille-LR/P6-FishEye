import { HomePageBuilder } from "../pages/HomePageBuilder";
import { PageBuilder } from "../pages/PageBuilder";
import { PhotographerPageBuilder } from "../pages/PhotographerPageBuilder";


export const PageFactoryEnum = {
    HOME: "home",
    PHOTOGRAPHER : "photographer",
}

let registeredPages = new Map([
    [PageFactoryEnum.PHOTOGRAPHER, PhotographerPageBuilder], //type of class
    [PageFactoryEnum.HOME, HomePageBuilder]
])

/**
 * @returns {PageBuilder}
 */
export class PageFactory {
    getPage(type, pageModel) {
        return new (registeredPages.get(type))(pageModel);
    }
}

