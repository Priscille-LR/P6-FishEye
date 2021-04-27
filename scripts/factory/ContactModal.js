export class ContactModal {
    constructor(currentPhotographer) {
        this.currentPhotographer = currentPhotographer;
    }

    //modal creation 

    renderContactModal() {
        this.createContactModal();
        this.createContactModalBody();
        
        this.contactModal = document.querySelector('.contact_modal');
    }

    createContactModal() {
        const contactModal = document.createElement('div');
        contactModal.className = 'contact_modal';

        document.querySelector('main').appendChild(contactModal);
    }

    createContactModalBody() {
        const modalBody = document.createElement('div');
        modalBody.className = 'contact_modal__body';

        this.appendModalTitle(modalBody);
        this.appendCloseButton(modalBody);
        this.appendContactForm(modalBody);
        this.createModalButton(modalBody);
        

        document.querySelector('.contact_modal').appendChild(modalBody);
    }

    appendModalTitle(modalBody) {
        const modalTitle = document.createElement('h2');
        modalTitle.className = 'contact_modal__body__title';
        modalTitle.innerHTML = `Contactez-moi </br> ${this.currentPhotographer.name}`;

        modalBody.appendChild(modalTitle);

    }

    appendCloseButton(modalBody) {
        const closeButton = document.createElement('button');
        closeButton.className = 'close_button';
        closeButton.innerHTML = `<i class="fas fa-times fa-3x"></i>`;
        closeButton.addEventListener('click', () => {
            this.hideContactModal();
        });
        modalBody.appendChild(closeButton);

    }

    appendContactForm(modalBody) {
        const contactForm = document.createElement('form');
        contactForm.className = 'contact_form';
        contactForm.setAttribute = ("method", "post");
        contactForm.setAttribute = ("action", "submit");

        this.createFormFields(contactForm);
        this.addEventListenerOnInputs(contactForm);

        modalBody.appendChild(contactForm);
    }

    createFormFields(contactForm) {

        //Firstname
        let formData = this.createFormData();
        formData.appendChild(this.createLabel("firstname", "Prénom"));
        formData.appendChild(this.createInputField("firstname"));
        contactForm.appendChild(formData);

        //Lastname
        formData = this.createFormData();
        formData.appendChild(this.createLabel("lastname", "Nom"));
        formData.appendChild(this.createInputField("lastname"));
        contactForm.appendChild(formData);

        //Email
        formData = this.createFormData();
        formData.appendChild(this.createLabel("email", "Email"));
        formData.appendChild(this.createInputField("email"));
        contactForm.appendChild(formData);

        //Message
        formData = this.createFormData();
        formData.appendChild(this.createLabel("message", "Votre message"));
        formData.appendChild(this.createTextArea("message"));
        contactForm.appendChild(formData);
    }


    createFormData() {
        const formData = document.createElement('div');
        formData.className = 'formData';
        formData.innerHTML = ``;
        return formData;
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

    createModalButton(modalBody) {
        const modalButton = document.createElement('button');
        modalButton.className = 'button_contact submit_button';
        modalButton.innerHTML = `Envoyer`;
        modalBody.appendChild(modalButton);
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

    validateFieldsFormat(text) {
        const fieldFormat = /^[A-Za-z\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']{2,}$/;
        const emailAddressFormat = /\S+@\S+\.\S+/;

        const inputs = document.querySelectorAll('.input_field');

        inputs.forEach(input => {
            if (input.id === "email") {
                if ((text.length != 0) && (emailAddressFormat.test(text))) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if ((text.length != 0) && (fieldFormat.test(text))) {
                    return true;
                } else {
                    return false;
                }
            }
        });
    }

    addEventListenerOnInputs(contactForm) {
        const inputs = contactForm.querySelectorAll('.input_field');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (this.validateFieldsFormat(input.value) === true) {
                    this.hideErrorMessage(input.parentElement)
                } else {
                    console.log(`input ${input.id} got an error`)
                    this.showErrorMessage(input.parentElement, 'Veuillez entrer au moins 2 caractères')
                }
            });
        });
    }

    submitForm() {
        const form = document.querySelector('.contact_form');

        form.addEventListener('submit', () => {
            e.preventDefault();
            console.log(inputs);
            this.hideContactModal();
        })
    }

}