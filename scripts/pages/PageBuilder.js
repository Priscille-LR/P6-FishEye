export class PageBuilder {
    renderHeader() {
        this.header = document.createElement('header');
        
        const main = document.getElementById('app');
        const pageInner = document.querySelector('.page_inner');

        pageInner.insertBefore( this.header, main);
    }

    handleTagClick(isChecked, tagId, tagArray) {
        const checkboxTag = document.getElementById(tagId);
        if (isChecked) {
            checkboxTag.setAttribute('aria-checked', 'true');
            tagArray.push(tagId);
            tagArray = [...new Set(tagArray)];
        } else {
            checkboxTag.setAttribute('aria-checked', 'false');
            const currentIndex = tagArray.indexOf(tagId);
            tagArray.splice(currentIndex, 1); //remove tag from active tags
        }
        
    }
}