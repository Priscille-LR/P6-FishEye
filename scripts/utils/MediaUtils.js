
export const mediaEnum = {
    PICTURE: "picture",
    VIDEO: "video",
}

export class MediaUtils {

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