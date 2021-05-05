export class Tags {
    /**
    * @param {Array<string>} tagsList
    */

    constructor(tagsList) {
        this.tagsList = tagsList;
    }

    /**
     * 
     * @param {HTMLDivElement} parentElement 
     * @param {*} tagsList 
     * @param {*} className 
     */
    appendTags(parentElement, className) {
        //console.log(parentElement)
        this.tagsList.forEach(tag => {
            const tagItem = document.createElement('div');
            tagItem.className = className;

            const checkboxTag = document.createElement('input');
            checkboxTag.type = "checkbox";
            checkboxTag.className = "tag_checkbox"
            checkboxTag.id = tag;
            tagItem.appendChild(checkboxTag)

            const labelTag = document.createElement('label');
            labelTag.className = "tag_name"
            labelTag.setAttribute("for", tag);
            labelTag.innerHTML = `#${tag}`;
            tagItem.appendChild(labelTag)

            parentElement.appendChild(tagItem)
        });
    }
    /**
     * 
     * @param {HTMLDivElement} parentElement 
     */
    addEventOnChange(parentElement, callback) {
        parentElement.childNodes.forEach(child => {
            child.addEventListener("change", () => {
                callback(child.firstChild.checked, child.firstChild.id)
            });
        })
    }
}

