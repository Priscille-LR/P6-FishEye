import { PhotographerProfileModel } from "../models/PhotographerProfileModel";

export class ContactModal {
    /**
     * 
     * @param {PhotographerProfileModel} currentPhotographer 
     */
    constructor(currentPhotographer) {
        this.currentPhotographer = currentPhotographer;
    }

    //modal creation 

    renderContactModal() {
        this.createContactModal();
        this.eventOnClose()
    }

    createContactModal() {
        const contactModal = document.createElement('dialog');
        contactModal.className = 'contact_modal';
        contactModal.innerHTML = `
        <div class="contact_modal__body">
            <h2 class="contact_modal__body__title">Contactez-moi <br> ${this.currentPhotographer.getName()}</h2>
            <button class="close_button" aria-label="close dialog">
                <i class="fas fa-times fa-3x" aria-hidden="true"></i>
            </button>    
            <form class="contact_form"></form>    
        </div> 
        `;
        document.getElementById("app").appendChild(contactModal);
        
        this.contactModal = document.querySelector('.contact_modal')

        this.appendContactForm();
        this.createModalButton();
        
        
    }

    eventOnClose() {
        const closeButton = document.querySelector('.close_button')
        closeButton.addEventListener('click', () => {
            this.hideContactModal();
        });
    }

    appendContactForm() {
        const contactForm = document.createElement('form');
        contactForm.className = 'contact_form';
        contactForm.setAttribute = ("method", "post");
        contactForm.setAttribute = ("action", "submit");

        this.createFormFields(contactForm);
        this.addEventListenerValidate(contactForm);

        document.querySelector('.contact_form').appendChild(contactForm);
    }

    addEventListenerValidate(contactForm) {
        const inputs = contactForm.querySelectorAll('.input_field');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (this.validateFieldsFormat(input) === true) {
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

    createFieldset() {
        const fieldset = document.createElement('div');
        fieldset.className = 'formData';
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
        inputField.setAttribute("id", id);
        return inputField;
    }

    createTextArea(id) {
        const textAreaInput = document.createElement('textarea');
        textAreaInput.className = 'input_field';
        textAreaInput.setAttribute("id", id);
        textAreaInput.setAttribute("rows", 5);
        return textAreaInput;
    }

    createFormFields(contactForm) {

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

    createModalButton() {
        const modalBody = document.querySelector('.contact_modal__body');
        const modalButton = document.createElement('button');
        modalButton.className = 'button_contact submit_button';
        modalButton.type = "submit";
        modalButton.innerHTML = `Envoyer`;

        this.eventOnSubmit(modalButton, modalBody);
        
        document.querySelector('.contact_modal__body').appendChild(modalButton);
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
        this.contactModal.style.display = "block";
    }

    hideContactModal() {
       this.contactModal.style.display = "none";
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