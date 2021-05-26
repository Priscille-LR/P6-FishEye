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


    static trapFocusInModal(focusableElements, firstFocusableElement, lastFocusableElement) {
        focusableElements.forEach(focusableElement => {
            focusableElement.addEventListener('keydown', (e) => {
                e.preventDefault();

                if (e.code === 'Tab' && e.shiftKey) { //going upwards
                    if (e.target === firstFocusableElement) { //if focus on close button => tab + shift => focus on submit button 
                        lastFocusableElement.focus();
                    } else {
                        let currentIndex = focusableElements.indexOf(focusableElement);
                        let previousIndex = currentIndex - 1;
                        focusableElements[previousIndex].focus();
                    }
                } else if (e.code === 'Tab') {
                    if (e.target === lastFocusableElement) { //going downwards
                        firstFocusableElement.focus(); //if focus on submit button => tab => focus on close button
                    } else {
                        let currentIndex = focusableElements.indexOf(focusableElement);
                        let nextIndex = currentIndex + 1;
                        focusableElements[nextIndex].focus();
                    }
                }
            });
        });
    }
}