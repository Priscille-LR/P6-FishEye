export class Utils {

    static removeChildOf(node, classToRemove){
        const parentNode = document.querySelector(node)
    
        for (let index = parentNode.childNodes.length - 1; index >= 0 ; index--) {
            const child = parentNode.childNodes[index];
            if (child.className == classToRemove) {
               parentNode.removeChild(child)
            }
        }
    }
}