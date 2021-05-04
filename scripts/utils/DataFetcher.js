import { AppModel } from "../models/AppModel";
import { HomePageModel } from "../models/HomePageModel";
import { MediumModel as MediumModel } from "../models/MediumModel";
import { PhotographerPageModel } from "../models/PhotographerPageModel";
import { PhotographerProfileModel } from "../models/PhotographerProfileModel";
import { PhotographersUtils } from "./PhotographersUtils";

export class DataFetcher {
    constructor(dataSource) {
        this.dataSource = dataSource; //json file
    }

    fetchSource() {
        const result = fetch(this.dataSource) // ressource request
        .then(resp => resp.json())
        .then(json => this.appPageWrapper(json))
        return result;
    }


    appPageWrapper(json) {
        const tagsList = PhotographersUtils.getAllTags(json); 
        const photographersList = json.photographers.map(photographer => new PhotographerProfileModel(photographer));
        const homePageModel = new HomePageModel(photographersList, tagsList);
       
        const mediaList = this.createMediaList(json)
        const mediaPageModel = new PhotographerPageModel(photographersList, mediaList);
        
        return new AppModel(homePageModel, mediaPageModel)
    }


    createMediaList(json){
        const mediaList = json.media.map(medium => new MediumModel(medium)) //map array<JSON medium> => array<mediumModel>
        return mediaList;
      
    }



}


