import { PhotographerProfileModel } from "../models/PhotographerProfileModel";
import { Utils } from "../utils/Utils";

const body = document.getElementById("page");
const main = document.getElementById('app');



export class ContactModal {
    /**
     * 
     * @param {PhotographerProfileModel} currentPhotographer 
     */
    constructor(currentPhotographer) {
        this.currentPhotographer = currentPhotographer;
        this.focusableElements = [];
    }

    //modal creation 

    renderContactModal() {
        this.createContactModal();
        this.eventOnClose()
    }

    createContactModal() {
        const contactModal = document.createElement('dialog');
        contactModal.className = 'contact_modal';
        contactModal.setAttribute('role', 'dialog');
        contactModal.setAttribute('aria-labelledby', 'contact_modal__body__title');
        contactModal.ariaModal = 'true';
        contactModal.ariaHidden = 'true';
        contactModal.tabIndex = "-1";
        contactModal.innerHTML = `
        <div class="contact_modal__body">
            <h2 class="contact_modal__body__title">Contactez-moi <br> ${this.currentPhotographer.getName()}</h2>
            <button id="close_contact_modal" class="close_button" title="fermer la fenêtre" aria-label="close dialog" tabindex="-1">
                <i class="fas fa-times fa-3x" aria-hidden="true"></i>
            </button>     
        </div> 
        `;
        body.appendChild(contactModal);

        this.focusableElements.push(document.getElementById('close_contact_modal'));

        this.contactModal = document.querySelector('.contact_modal')

        this.createContactForm();
        this.createModalButton();
        this.addEventListenerValidate();
    }

    createContactForm() {
        const contactForm = document.createElement('form');
        contactForm.className = 'contact_form';
        contactForm.method = ("method", "post");
        contactForm.setAttribute = ("action", "submit");

        document.querySelector('.contact_modal__body').appendChild(contactForm);

        this.createFormFields();
    }

    createFormFields() {
        const contactForm = document.querySelector('.contact_form')

        //Firstname
        let fieldset = this.createFieldset();
        fieldset.appendChild(this.createLabel("firstname", "Prénom"));
        fieldset.appendChild(this.createInputField("firstname"));
        contactForm.appendChild(fieldset);


        //Lastname
        fieldset = this.createFieldset();
        fieldset.appendChild(this.createLabel("lastname", "Nom"));
        fieldset.appendChild(this.createInputField("lastname"));
        contactForm.appendChild(fieldset);


        //Email
        fieldset = this.createFieldset();
        fieldset.appendChild(this.createLabel("email", "Email"));
        fieldset.appendChild(this.createInputField("email"));
        contactForm.appendChild(fieldset);


        //Message
        fieldset = this.createFieldset();
        fieldset.appendChild(this.createLabel("message", "Votre message"));
        fieldset.appendChild(this.createTextArea("message"));
        contactForm.appendChild(fieldset);

    }

    createFieldset() {
        const fieldset = document.createElement('div');
        fieldset.className = 'fieldset';
        return fieldset;
    }

    createLabel(forParam, textParam) {
        const label = document.createElement('label');
        label.setAttribute("for", forParam);
        label.innerHTML = `${textParam}`;
        return label;
    }

    createInputField(id) {
        const inputField = document.createElement('input');
        inputField.className = 'input_field';
        inputField.type = "text";
        inputField.tabIndex = '-1';
        inputField.setAttribute("id", id);

        this.focusableElements.push(inputField);
        return inputField;
    }

    createTextArea(id) {
        const textAreaInput = document.createElement('textarea');
        textAreaInput.className = 'input_field';
        textAreaInput.setAttribute("id", id);
        textAreaInput.tabIndex = "-1";
        textAreaInput.setAttribute("rows", 5);
        this.focusableElements.push(textAreaInput);
        return textAreaInput;
    }

    createModalButton() {
        const modalBody = document.querySelector('.contact_modal__body');
        const modalButton = document.createElement('button');
        modalButton.className = 'button_contact submit_button';
        modalButton.type = "submit";
        modalButton.tabIndex = "-1";
        modalButton.innerHTML = `Envoyer`;

        this.focusableElements.push(modalButton);

        this.eventOnSubmit(modalButton, modalBody);

        document.querySelector('.contact_modal__body').appendChild(modalButton);
    }

    addEventListenerValidate() {
        const contactForm = document.querySelector('.contact_form');
        const inputs = contactForm.querySelectorAll('.input_field');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (this.validateFieldsFormat(input)) {
                    this.hideErrorMessage(input.parentElement);
                } else {
                    if (input.id === "email") {
                        this.showErrorMessage(input.parentElement, 'Veuillez entrer une adresse mail valide')
                    } else if (input.id === "message") {
                        this.showErrorMessage(input.parentElement, "Dites-m'en un peu plus...")
                    } else {
                        this.showErrorMessage(input.parentElement, 'Veuillez entrer au moins 2 caractères')
                    }
                }
            });
        });
    }

    //modal closing

    eventOnClose() {
        const closeButton = document.querySelector('.close_button');

        closeButton.addEventListener('click', () => this.hideContactModal());

        closeButton.addEventListener('keydown',(e) => {
            if(e.code === 'Enter') {
                this.hideContactModal();
            }
        })

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                this.hideContactModal();
            }
        })

        // main.addEventListener('click', (e) => {
        //     this.contactModal = document.querySelector('.contact_modal')
        //     if(e.target === this.contactModal) {
        //     this.hideContactModal()
        //     }
        // });
    }

    eventOnSubmit(modalButton, modalBody) {
        modalButton.addEventListener('click', (e) => {
            const inputs = [...modalBody.querySelectorAll('.input_field')];
            e.preventDefault();
            if (this.validateFields(modalBody) === true) {
                this.hideContactModal();
                inputs.map(input => {
                    const fields = {
                        input: input.id,
                        inputValue: input.value,
                    };
                    return fields;
                })
                    .forEach((field) => console.log(field.input + " : " + field.inputValue));
            } else {
                console.log("Merci de rensigner les champs");
            }
        });
    }

    showContactModal() {
        const contactModal = document.querySelector('.contact_modal');
        this.contactModal.style.display = "block";

        main.setAttribute('aria-hidden', 'true');
        contactModal.setAttribute('aria-hidden', 'false');

        this.keepFocusInModal();

    }

    keepFocusInModal() {
        const firstFocusableElement = this.focusableElements[0]; // close button
        const secondFocusableElement = this.focusableElements[1]; //first fieldset
        const lastFocusableElement = this.focusableElements[this.focusableElements.length - 1]; //submit button

        //focus on first input
        secondFocusableElement.focus();

        //trap focus in modal
        Utils.trapFocusInModal(this.focusableElements, firstFocusableElement, lastFocusableElement)
    }

    hideContactModal() {
        const contactModal = document.querySelector('.contact_modal');
        this.contactModal.style.display = "none";
        main.setAttribute('aria-hidden', 'false');
        contactModal.setAttribute('aria-hidden', 'true');
    }


    //fields validation 

    //error message is displayed when field is invalid	
    showErrorMessage(field, message) {
        field.setAttribute('data-error', message);
        field.setAttribute('data-error-visible', 'true');
    }

    //error message is hidden 
    hideErrorMessage(field) {
        field.removeAttribute('data-error');
        field.removeAttribute('data-error-visible');
    }

    validateFieldsFormat(input) {
        const fieldFormat = /^[A-Za-z\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']{2,}$/;
        const emailAddressFormat = /\S+@\S+\.\S+/;
        const messageFormat = /^[A-Za-z\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ'.,;:!?]{5,500}$/;

        if (input.id === "email") {
            if ((input.value.length != 0) && (emailAddressFormat.test(input.value))) {
                return true;
            } else {
                return false;
            }
        }
        if (input.id === "message") {
            if ((input.value.length != 0) && (messageFormat.test(input.value))) {
                return true;
            } else {
                return false;
            }

        } else {
            if ((input.value.length != 0) && (fieldFormat.test(input.value))) {
                return true;
            } else {
                return false;
            }
        }
    }

    validateFields(modalBody) {
        const inputs = modalBody.querySelectorAll('.input_field');
        let outcome = true
        inputs.forEach(input => {
            if (this.validateFieldsFormat(input) === false) {
                outcome = false
            }
        });
        return outcome;
    }
}