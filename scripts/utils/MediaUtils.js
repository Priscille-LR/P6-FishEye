
export const mediaEnum = {
    PICTURE: "picture",
    VIDEO: "video",
}

export class MediaUtils {

    /**
     * determine whether medium = image or video
     * @param {JSON} medium 
     * @returns {String} media source
     */
    static getMediumSource(medium) {
        let source = medium.image;
        if (source == null) {
            source = medium.video;
        }
        return source;
    }

    /**
     * retrieve medium extension
     * @param {JSON} medium 
     * @returns {mediaEnum} 
     */
    static getMediumType(medium) {
        let extension = this.getMediumSource(medium).split('.').pop();
        if (/(jpg)$/ig.test(extension)) {
            return mediaEnum.PICTURE;
        }
        if (/(mp4)$/ig.test(extension)) {
            return mediaEnum.VIDEO;
        }
    }

}