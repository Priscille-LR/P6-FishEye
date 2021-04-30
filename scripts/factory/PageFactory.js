import { PhotographerPageBuilder } from "./PhotographerPageBuilder";
import { HomePageBuilder } from "./HomePageBuilder";

export const PagesFactoryEnum = {
    HOME: "HOME",
    PHOTOGRAPHER : "PHOTOGRAPHER",
}
//Map[key] = value
let registeredPages = {};
registeredPages[PagesFactoryEnum.PHOTOGRAPHER] = PhotographerPageBuilder;
registeredPages[PagesFactoryEnum.HOME] = HomePageBuilder;

export class PageFactory {
    getPage(type, props) {
        return new registeredPages[type](props);
    }
}

