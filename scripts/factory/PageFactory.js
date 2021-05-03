import { HomePageBuilder } from "./HomePageBuilder";
import { PhotographerPageBuilder } from "./PhotographerPageBuilder";


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
    getPage(type, json) {
        return new (registeredPages.get(type))(json);
    }
}

