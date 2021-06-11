import { HomePageBuilder } from "../pages/HomePageBuilder";
import { PageBuilder } from "../pages/PageBuilder";
import { PhotographerPageBuilder } from "../pages/PhotographerPageBuilder";


export const PageFactoryEnum = {
    HOME: "home",
    PHOTOGRAPHER : "photographer",
}

/**
 * Map => key-value pairs
 * links the enum to the classes; it is then used in the getPage() to return a class (either PhotographerPageBuilder or HomePageBuilder)
 */
let registeredPages = new Map([
    [PageFactoryEnum.PHOTOGRAPHER, PhotographerPageBuilder], //type of class
    [PageFactoryEnum.HOME, HomePageBuilder]
])

/**
 * @returns {PageBuilder}
 */
export class PageFactory {
    getPage(type, pageModelPromise) {
        return new (registeredPages.get(type))(pageModelPromise);
    }
}

