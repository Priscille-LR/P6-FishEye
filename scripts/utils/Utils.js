export class Utils {

    static removeChildOf(node, classToRemove){
        const parentNode = document.querySelector(node)
        console.log(parentNode)
        for (let index = parentNode.childNodes.length - 1; index >= 0 ; index--) {
            const child = parentNode.childNodes[index];
            if (child.className == classToRemove) {
               parentNode.removeChild(child)
            }
        }
    }

    //HOME
    removeAllThumbnails() {
        const photographersNode = document.querySelector('.photographers')
        for (let index = photographersNode.childNodes.length - 1; index >= 0 ; index--) {
            const child = photographersNode.childNodes[index];
            photographersNode.removeChild(child)
        }
    }

    //PHOTOGRAPHER
    removeAllThumbnails() {
        const mainNode = document.querySelector('main')
        for (let index = mainNode.childNodes.length - 1; index >= 0; index--) {
            const child = mainNode.childNodes[index];
            if (child.className == "medium_thumbnail") {
                mainNode.removeChild(child)
            }
        }
    }
    
}