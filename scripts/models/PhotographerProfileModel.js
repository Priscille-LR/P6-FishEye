export class PhotographerProfileModel {
    constructor(photographer) {
        this.photographer = photographer;
    }

    getName() {
        return this.photographer.name
    }

    getLocation() {
        return `${this.photographer.city}, ${this.photographer.country}`
    }

    getTagline() {
        return this.photographer.tagline
    }

    getPrice() {
        return this.photographer.price
    }

    getTags() {
        return this.photographer.tags
    }

    getPortrait() {
        return this.photographer.portrait
    }

    getId() {
        return this.photographer.id
    }

}







