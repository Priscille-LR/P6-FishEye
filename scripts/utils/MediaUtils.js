
export const mediaEnum = {
    PICTURE: "picture",
    VIDEO: "video",
}

export class MediaUtils {

    // static getMediaTitle(medium) {
    //     let tmpMedium = this.getMediaSource(medium)
    //     let mediumTitle = tmpMedium.toLowerCase();
    //     let mediumTitleArray = mediumTitle.split(".");
    //     mediumTitle = mediumTitleArray[0];
    //     mediumTitleArray = mediumTitle.split("_");
    //     mediumTitle = mediumTitleArray.shift(); //remove 1st element in array 
    //     mediumTitle = mediumTitleArray.join(" "); //add elements of array into a string
    //     mediumTitle = mediumTitle.charAt(0).toUpperCase() + mediumTitle.slice(1);
    //     return mediumTitle;
    // }

    static getMediaSource(medium) {
        let source = medium.image;
        if (source == null) {
            source = medium.video;
        }
        return source;
    }

    static getMediumType(medium) {
        let extension = this.getMediaSource(medium).split('.').pop();
        if (/(jpg)$/ig.test(extension)) {
            return mediaEnum.PICTURE;
        }
        if (/(mp4)$/ig.test(extension)) {
            return mediaEnum.VIDEO;
        }
    }

}