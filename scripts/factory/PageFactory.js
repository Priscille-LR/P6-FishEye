import { PhotographerPageBuilder } from "./PhotographerPageBuilder";
import { HomePageBuilder } from "./HomePageBuilder";

export const PageFactoryEnum = {
    HOME: "home",
    PHOTOGRAPHER : "photographer",
}
//Map[key] = value
let registeredPages = new Map([
    [PageFactoryEnum.PHOTOGRAPHER, PhotographerPageBuilder],
    [PageFactoryEnum.HOME, HomePageBuilder]
])

export class PageFactory {
    getPage(type, props) {
        return new (registeredPages.get(type))(props);
    }
}

