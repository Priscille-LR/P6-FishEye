import { MediaUtils } from "../utils/MediaUtils";

export class MediumModel {
    constructor(medium) {
        this.medium = medium;
    }

    getMediumType() {
        return MediaUtils.getMediumType(this.medium)
    }

    getSource() {
        return MediaUtils.getMediumSource(this.medium)
    }

    getTitle() {
        return this.medium.title
    }

    getPrice() {
        return this.medium.price
    }

    getLikes() {
        return this.medium.likes
    }

    getTags() {
        return this.medium.tags
    }

    getId() {
        return this.medium.id
    }

    getPhotographerId() {
        return this.medium.photographerId
    }
    
    getDate() {
        return this.medium.date
    }
    

}







