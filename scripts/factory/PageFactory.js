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
    getPage(type, pageModel) {
        return new (registeredPages.get(type))(pageModel);
    }
}

