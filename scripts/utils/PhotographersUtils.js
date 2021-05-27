export class PhotographersUtils {

    static getAllTags(json) {
        let photographers = json.photographers;
        const allTags = photographers.map(photographer => photographer.tags).flat();
        const tagsList = [...new Set(allTags)];
        return tagsList;
    }
}