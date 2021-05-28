// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"NVBh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utils = void 0;

class Utils {
  static removeChildOf(node, classToRemove) {
    const parentNode = document.querySelector(node);

    for (let index = parentNode.childNodes.length - 1; index >= 0; index--) {
      const child = parentNode.childNodes[index];

      if (child.className == classToRemove) {
        parentNode.removeChild(child);
      }
    }
  }

  static trapFocusInModal(focusableElements, firstFocusableElement, lastFocusableElement) {
    focusableElements.forEach(focusableElement => {
      focusableElement.addEventListener('keydown', e => {
        if (e.code === 'Tab' && e.shiftKey) {
          //going upwards
          e.preventDefault();

          if (e.target === firstFocusableElement) {
            //if focus on close button => tab + shift => focus on submit button 
            lastFocusableElement.focus();
          } else {
            let currentIndex = focusableElements.indexOf(focusableElement);
            let previousIndex = currentIndex - 1;
            focusableElements[previousIndex].focus();
          }
        } else if (e.code === 'Tab') {
          e.preventDefault();

          if (e.target === lastFocusableElement) {
            //going downwards
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

exports.Utils = Utils;
},{}],"Y0eb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tags = void 0;

class Tags {
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
    this.tagsList.forEach(tag => {
      const tagItem = document.createElement('div');
      tagItem.className = className;
      const checkboxTag = document.createElement('input');
      checkboxTag.type = "checkbox";
      checkboxTag.className = "tag_checkbox";
      checkboxTag.id = tag;
      checkboxTag.setAttribute("aria-labelledby", tag);
      checkboxTag.ariaChecked = "false";
      checkboxTag.tabIndex = '0';
      tagItem.appendChild(checkboxTag);
      const labelTag = document.createElement('label');
      labelTag.className = "tag_name";
      labelTag.setAttribute("for", tag);
      labelTag.ariaLabel = "#".concat(tag);
      labelTag.innerHTML = "#".concat(tag);
      tagItem.appendChild(labelTag);
      parentElement.appendChild(tagItem);
    });
  }
  /**
   * 
   * @param {HTMLDivElement} parentElement 
   */


  addEventOnChange(parentElement, callback) {
    parentElement.childNodes.forEach(child => {
      child.addEventListener("change", () => {
        callback(child.firstChild.checked, child.firstChild.id);
      });
    });
  }

}

exports.Tags = Tags;
},{}],"qC2z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographerProfileModel = void 0;

class PhotographerProfileModel {
  constructor(photographer) {
    this.photographer = photographer;
  }

  getName() {
    return this.photographer.name;
  }

  getLocation() {
    return "".concat(this.photographer.city, ", ").concat(this.photographer.country);
  }

  getTagline() {
    return this.photographer.tagline;
  }

  getPrice() {
    return this.photographer.price;
  }

  getTags() {
    return this.photographer.tags;
  }

  getPortrait() {
    return this.photographer.portrait;
  }

  getId() {
    return this.photographer.id;
  }

}

exports.PhotographerProfileModel = PhotographerProfileModel;
},{}],"R9Qz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePageModel = void 0;

var _PhotographerProfileModel = require("./PhotographerProfileModel");

class HomePageModel {
  /**
  * @param {Array<PhotographerProfileModel>} photographersList
  * @param {Array<string>} tagsList
  */
  constructor(photographersList, tagsList) {
    this.photographersList = photographersList;
    this.tagsList = tagsList;
  }

  getPhotographersList() {
    return this.photographersList;
  }

  getTagsList() {
    return this.tagsList;
  }

}

exports.HomePageModel = HomePageModel;
},{"./PhotographerProfileModel":"qC2z"}],"hCgZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePageBuilder = void 0;

var _Utils = require("../utils/Utils");

var _Tags = require("./Tags");

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

var _HomePageModel = require("../models/HomePageModel");

const body = document.getElementById("page");
const main = document.getElementById('app');

class HomePageBuilder {
  /**
   * 
   * @param {Promise<HomePageModel>} homePageModel 
   */
  constructor(homePageModel) {
    this.homePageModelPromise = homePageModel;
    this.activeNavTags = [];
  } //display header and main (home page)


  render() {
    this.homePageModelPromise.then(homePageModel => {
      this.photographers = homePageModel.photographersList;
      this.allTags = homePageModel.tagsList;
      this.renderHeader();
      this.renderMain(this.photographers);
    });
  }

  renderHeader() {
    const header = document.createElement('header');
    header.className = 'header_home';
    header.role = 'heading';
    header.ariaLabel = 'Fisheye home page heading';
    header.innerHTML = "\n        <a class=\"logo\" href=\"/\">\n            <img class=\"logo_img\" src=\"/static/logo.svg\" alt=\"Fisheye Home Page\" />\n        </a>\n        <a class=\"go_main\" href=\"#app\" aria-label=\"go to main content\" tabindex=\"0\">Passer au contenu</a>\n        <nav class=\"main_nav\" role=\"navigation\" aria-label=\"photographers categories\">\n        </nav>\n        ";
    this.renderNavTags(header.querySelector(".main_nav"));
    body.insertBefore(header, main);
    this.onScrollEvent();
  } //go to main button is diplayed if user scrolls on page


  onScrollEvent() {
    const goMainButton = document.querySelector('.go_main');
    window.addEventListener('scroll', () => {
      goMainButton.style.display = 'block';
    });

    if (window.scrollY === 0) {
      goMainButton.style.display = 'none';
    }
  }

  renderNavTags(mainNav) {
    const tags = new _Tags.Tags(this.allTags);
    tags.appendTags(mainNav, 'main_nav__item');
    tags.addEventOnChange(mainNav, (isChecked, tagId) => this.handleTagClick(isChecked, tagId));
  }

  handleTagClick(isChecked, tagId) {
    const checkboxTag = document.getElementById(tagId);

    if (isChecked) {
      checkboxTag.setAttribute('aria-checked', 'true');
      this.activeNavTags.push(tagId);
      this.activeNavTags = [...new Set(this.activeNavTags)];
    } else {
      checkboxTag.setAttribute('aria-checked', 'false');
      const currentIndex = this.activeNavTags.indexOf(tagId);
      this.activeNavTags.splice(currentIndex, 1); //remove tag from active tags
    }

    _Utils.Utils.removeChildOf(".photographers", "photographer_thumbnail_wrapper");

    this.sortPhotographers(this.photographers);
  }

  sortPhotographers(photographers) {
    let selectedPhotographers = [];
    this.activeNavTags.forEach(activeNavTag => {
      photographers.forEach(photographer => {
        if (photographer.getTags().includes(activeNavTag)) {
          selectedPhotographers.push(photographer);
        }
      });
    });

    if (this.activeNavTags.length == 0) {
      this.createArticle(photographers);
    } else {
      selectedPhotographers = [...new Set(selectedPhotographers)];
      this.createArticle(selectedPhotographers);
    }
  }

  renderMain(photographers) {
    this.createMainTitle();
    this.createPhotographersWrapper();
    this.createArticle(photographers);
  }

  createMainTitle() {
    const title = document.createElement('h1');
    title.className = 'main_title';
    title.ariaLabel = 'photographers';
    title.innerHTML = "Nos photographes";
    main.appendChild(title);
  }

  createPhotographersWrapper() {
    const photographersWrapper = document.createElement('div');
    photographersWrapper.className = 'photographers';
    photographersWrapper.ariaLabelledby = 'photographers';
    document.getElementById("app").appendChild(photographersWrapper);
  }
  /**
   * create article for each photographer; add their picture and content
   * @param {Array<PhotographerProfileModel>} photographers 
   */


  createArticle(photographers) {
    photographers.forEach(photographer => {
      const article = document.createElement('article');
      article.className = 'photographer_thumbnail_wrapper';
      article.innerHTML = "<a class=\"photographer_thumbnail\" href=\"/photographers-profile/".concat(photographer.getId(), "\" aria-label=\"").concat(photographer.getName(), "\">");
      article.ariaLabel = "".concat(photographer.getName());
      this.appendPhotographerThumbnailPicture(article, photographer);
      this.appendPhotographerThumbnailContent(article, photographer);
      document.querySelector('.photographers').appendChild(article);
    });
  }
  /**
   * 
   * @param {PhotographerProfileModel} photographer 
   */


  appendPhotographerThumbnailPicture(article, photographer) {
    const thumbnailPicture = document.createElement('a');
    thumbnailPicture.className = 'photographer_thumbnail__picture';
    thumbnailPicture.innerHTML = "\n        <img class=\"photographer_thumbnail__picture\"\n        src=\"/static/Photographers ID Photos/".concat(photographer.getPortrait(), "\"\n        alt=\"").concat(photographer.getName(), "'s thumbnail picture\" />");
    article.querySelector('.photographer_thumbnail').appendChild(thumbnailPicture);
  }
  /**
   * 
   * @param {PhotographerProfileModel} photographer 
   */


  appendPhotographerThumbnailContent(article, photographer) {
    const thumbnailContent = document.createElement('div');
    thumbnailContent.className = 'photographer_thumbnail__content';
    thumbnailContent.ariaLabel = "".concat(photographer.getName(), " info");
    thumbnailContent.innerHTML = "\n        <h2 class=\"photographer_name\">".concat(photographer.getName(), "</h2>\n        <h3 class=\"photographer_location\">").concat(photographer.getLocation(), "</h3>\n        <p class=\"photographer_desc\">").concat(photographer.getTagline(), "</p>\n        <p class=\"photographer_price\">").concat(photographer.getPrice(), "\u20AC/jour</p>\n        <div class=\"tags\"></div>");
    photographer.getTags().forEach(photographerTag => {
      const tag = document.createElement('a');
      tag.className = 'tags__item';
      tag.innerHTML = "<span>#".concat(photographerTag, "</span>");
      thumbnailContent.querySelector('.tags').appendChild(tag);
    });
    article.querySelector('.photographer_thumbnail').appendChild(thumbnailContent);
  }

}

exports.HomePageBuilder = HomePageBuilder;
},{"../utils/Utils":"NVBh","./Tags":"Y0eb","../models/PhotographerProfileModel":"qC2z","../models/HomePageModel":"R9Qz"}],"HfbO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaUtils = exports.mediaEnum = void 0;
const mediaEnum = {
  PICTURE: "picture",
  VIDEO: "video"
};
exports.mediaEnum = mediaEnum;

class MediaUtils {
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

exports.MediaUtils = MediaUtils;
},{}],"I0hq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumModel = void 0;

var _MediaUtils = require("../utils/MediaUtils");

class MediumModel {
  constructor(medium) {
    this.medium = medium;
  }

  getMediumType() {
    return _MediaUtils.MediaUtils.getMediumType(this.medium);
  }

  getSource() {
    return _MediaUtils.MediaUtils.getMediaSource(this.medium);
  }

  getTitle() {
    return this.medium.title;
  }

  getPrice() {
    return this.medium.price;
  }

  getLikes() {
    return this.medium.likes;
  }

  getTags() {
    return this.medium.tags;
  }

  getId() {
    return this.medium.id;
  }

  getPhotographerId() {
    return this.medium.photographerId;
  }

  getDate() {
    return this.medium.date;
  }

}

exports.MediumModel = MediumModel;
},{"../utils/MediaUtils":"HfbO"}],"ogD9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaFactory = void 0;

var _MediumModel = require("../models/MediumModel");

var _MediaUtils = require("../utils/MediaUtils");

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

class MediaFactory {
  /**
   * 
   * @param {MediumModel} medium 
   * @param {PhotographerProfileModel} currentPhotographer 
   * @returns 
   */
  renderMedium(medium, currentPhotographer) {
    let mediumThumbnail = this.createMediumDisplay(medium, currentPhotographer, "medium_thumbnail");
    this.appendThumbnailContent(medium, mediumThumbnail);
    return mediumThumbnail;
  }
  /**
   * 
   * @param {MediumModel} medium 
   * @param {PhotographerProfileModel} currentPhotographer 
   * @param {string} className 
   * @param {boolean} controls 
   * @returns 
   */


  createMediumDisplay(medium, currentPhotographer, className) {
    let controls = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let mediumThumbnail = document.createElement('article');
    mediumThumbnail.className = className;
    mediumThumbnail.ariaLabel = medium.getTitle();
    const mediumType = medium.getMediumType();
    let mediumSource = String(medium.getSource());
    var media;

    switch (mediumType) {
      case _MediaUtils.mediaEnum.PICTURE:
        {
          media = document.createElement('img');
          media.src = "/static/".concat(currentPhotographer.getName().split(' ')[0], "/").concat(mediumSource);
          break;
        }

      case _MediaUtils.mediaEnum.VIDEO:
        {
          media = document.createElement('video');
          let source = document.createElement('source');
          source.src = "/static/".concat(currentPhotographer.getName().split(' ')[0], "/").concat(mediumSource);
          source.type = "video/mp4";
          media.controls = controls;

          if (controls) {
            media.autoplay = true;
          }

          media.appendChild(source);
          break;
        }

      default:
        mediumSource = String("");
    }

    media.className = "".concat(className, "__miniature");
    media.alt = medium.getTitle();
    media.tabIndex = "0";
    mediumThumbnail.appendChild(media);
    return mediumThumbnail;
  }

  appendThumbnailContent(medium, mediumThumbnail) {
    let mediumThumbnailContent = document.createElement('div');
    mediumThumbnailContent.className = "medium_thumbnail__content";
    mediumThumbnailContent.innerHTML = "\n            <h2 class=\"medium_title\">".concat(medium.getTitle(), "</h2>\n            <div class=\"price_and_likes\">\n              <span class=\"medium_price\" aria-label=\"price\">").concat(medium.getPrice(), "\u20AC</span>\n              \n              <span class=\"medium_number_of_likes\">").concat(medium.getLikes(), "</span>\n                <div class=\"likes\">\n                    <input type=\"checkbox\" id=\"checkbox__input\" class=\"checkbox__input\" name=\"like\" aria-labelledby=\"like this picture\" tabindex=\"0\">\n                        <i class=\"far fa-heart like__unchecked\"></i>\n                        <i class=\"fas fa-heart like__checked\"></i>\n                    </input>   \n                    <label class=\"checkbox__like\" for=\"checkbox__input\" aria-label=\"like this picture\"></label>\n                </div>\n            </div>\n          </div>");
    mediumThumbnail.appendChild(mediumThumbnailContent);
  }

}

exports.MediaFactory = MediaFactory;
},{"../models/MediumModel":"I0hq","../utils/MediaUtils":"HfbO","../models/PhotographerProfileModel":"qC2z"}],"JLPi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactModal = void 0;

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

var _Utils = require("../utils/Utils");

const body = document.getElementById("page");
const main = document.getElementById('app');

class ContactModal {
  /**
   * 
   * @param {PhotographerProfileModel} currentPhotographer 
   */
  constructor(currentPhotographer) {
    this.currentPhotographer = currentPhotographer;
    this.focusableElements = [];
  } //modal creation 


  renderContactModal() {
    this.createContactModal();
    this.eventOnClose();
  }

  createContactModal() {
    const contactModal = document.createElement('dialog');
    contactModal.className = 'contact_modal';
    contactModal.setAttribute('role', 'dialog');
    contactModal.setAttribute('aria-labelledby', 'contact_modal__body__title');
    contactModal.ariaModal = 'true';
    contactModal.ariaHidden = 'true';
    contactModal.tabIndex = "-1";
    contactModal.innerHTML = "\n        <div class=\"contact_modal__body\">\n            <h2 class=\"contact_modal__body__title\">Contactez-moi <br> ".concat(this.currentPhotographer.getName(), "</h2>\n            <button id=\"close_contact_modal\" class=\"close_button\" title=\"fermer la fen\xEAtre\" aria-label=\"close dialog\" tabindex=\"-1\">\n                <i class=\"fas fa-times fa-3x\" aria-hidden=\"true\"></i>\n            </button>     \n        </div> \n        ");
    body.appendChild(contactModal);
    this.focusableElements.push(document.getElementById('close_contact_modal'));
    this.contactModal = document.querySelector('.contact_modal');
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
    const contactForm = document.querySelector('.contact_form'); //Firstname

    let fieldset = this.createFieldset();
    fieldset.appendChild(this.createLabel("firstname", "Prénom"));
    fieldset.appendChild(this.createInputField("firstname"));
    contactForm.appendChild(fieldset); //Lastname

    fieldset = this.createFieldset();
    fieldset.appendChild(this.createLabel("lastname", "Nom"));
    fieldset.appendChild(this.createInputField("lastname"));
    contactForm.appendChild(fieldset); //Email

    fieldset = this.createFieldset();
    fieldset.appendChild(this.createLabel("email", "Email"));
    fieldset.appendChild(this.createInputField("email"));
    contactForm.appendChild(fieldset); //Message

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
    label.innerHTML = "".concat(textParam);
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
    modalButton.innerHTML = "Envoyer";
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
            this.showErrorMessage(input.parentElement, 'Veuillez entrer une adresse mail valide');
          } else if (input.id === "message") {
            this.showErrorMessage(input.parentElement, "Dites-m'en un peu plus...");
          } else {
            this.showErrorMessage(input.parentElement, 'Veuillez entrer au moins 2 caractères');
          }
        }
      });
    });
  } //modal closing


  eventOnClose() {
    const closeButton = document.querySelector('.close_button');
    closeButton.addEventListener('click', () => this.hideContactModal());
    closeButton.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        this.hideContactModal();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.hideContactModal();
      }
    }); // main.addEventListener('click', (e) => {
    //     this.contactModal = document.querySelector('.contact_modal')
    //     if(e.target === this.contactModal) {
    //     this.hideContactModal()
    //     }
    // });
  }

  eventOnSubmit(modalButton, modalBody) {
    modalButton.addEventListener('click', e => {
      const inputs = [...modalBody.querySelectorAll('.input_field')];
      e.preventDefault();

      if (this.validateFields(modalBody) === true) {
        this.hideContactModal();
        inputs.map(input => {
          const fields = {
            input: input.id,
            inputValue: input.value
          };
          return fields;
        }).forEach(field => console.log(field.input + " : " + field.inputValue));
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

    secondFocusableElement.focus(); //trap focus in modal

    _Utils.Utils.trapFocusInModal(this.focusableElements, firstFocusableElement, lastFocusableElement);
  }

  hideContactModal() {
    const contactModal = document.querySelector('.contact_modal');
    this.contactModal.style.display = "none";
    main.setAttribute('aria-hidden', 'false');
    contactModal.setAttribute('aria-hidden', 'true');
  } //fields validation 
  //error message is displayed when field is invalid	


  showErrorMessage(field, message) {
    field.setAttribute('data-error', message);
    field.setAttribute('data-error-visible', 'true');
  } //error message is hidden 


  hideErrorMessage(field) {
    field.removeAttribute('data-error');
    field.removeAttribute('data-error-visible');
  }

  validateFieldsFormat(input) {
    const fieldFormat = /^[A-Za-z\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']{2,}$/;
    const emailAddressFormat = /\S+@\S+\.\S+/;
    const messageFormat = /^[A-Za-z\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ'.,;:!?]{5,500}$/;

    if (input.id === "email") {
      if (input.value.length != 0 && emailAddressFormat.test(input.value)) {
        return true;
      } else {
        return false;
      }
    }

    if (input.id === "message") {
      if (input.value.length != 0 && messageFormat.test(input.value)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (input.value.length != 0 && fieldFormat.test(input.value)) {
        return true;
      } else {
        return false;
      }
    }
  }

  validateFields(modalBody) {
    const inputs = modalBody.querySelectorAll('.input_field');
    let outcome = true;
    inputs.forEach(input => {
      if (this.validateFieldsFormat(input) === false) {
        outcome = false;
      }
    });
    return outcome;
  }

}

exports.ContactModal = ContactModal;
},{"../models/PhotographerProfileModel":"qC2z","../utils/Utils":"NVBh"}],"syDU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightboxMedia = void 0;

var _MediaFactory = require("./MediaFactory");

var _MediumModel = require("../models/MediumModel");

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

var _Utils = require("../utils/Utils");

const body = document.getElementById("page");
const main = document.getElementById('app');

class LightboxMedia {
  /**
   * @param {Array<MediumModel>} mediaList 
   * @param {PhotographerProfileModel} currentPhotographer 
   */
  constructor() {
    let mediaList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let currentPhotographer = arguments.length > 1 ? arguments[1] : undefined;
    this.mediaList = mediaList;
    this.currentPhotographer = currentPhotographer;
    this.focusableElements = [];
    this.mediaFactory = new _MediaFactory.MediaFactory();
  }

  renderLightboxMedia() {
    this.createLightboxMedia();
    this.createLightboxMediaBody();
    this.eventOnClose();
    this.lightboxMedia = document.querySelector('.lightbox_media');
  }

  createLightboxMedia() {
    const lightboxMedia = document.createElement('dialog');
    lightboxMedia.className = 'lightbox_media';
    lightboxMedia.setAttribute('role', 'dialog');
    lightboxMedia.ariaLabel = "image close-up view";
    lightboxMedia.ariaModal = 'true';
    lightboxMedia.ariaHidden = 'true';
    lightboxMedia.tabIndex = "-1";
    body.appendChild(lightboxMedia);
  }

  createLightboxMediaBody() {
    const lightboxBody = document.createElement('div');
    lightboxBody.className = 'lightbox_media__body';
    this.appendCloseButton(lightboxBody);
    this.appendNavButtons(lightboxBody);
    this.handleNav(lightboxBody);
    this.appendMediumBox(lightboxBody);
    this.appendMediumTitle(lightboxBody);
    document.querySelector('.lightbox_media').appendChild(lightboxBody);
  }

  appendCloseButton(lightboxBody) {
    const closeButton = document.createElement('button');
    closeButton.className = 'close_button_lightbox';
    closeButton.setAttribute('role', 'button');
    closeButton.setAttribute('title', 'fermer la fenêtre');
    closeButton.ariaLabel = "close dialog";
    closeButton.tabIndex = "-1";
    closeButton.innerHTML = "<i class=\"fas fa-times fa-3x\"></i>";
    lightboxBody.appendChild(closeButton);
    this.focusableElements.push(closeButton);
  }

  createNavButton(buttonClass, buttonIcon, accessibleName) {
    const button = document.createElement('button');
    button.className = buttonClass;
    button.innerHTML = "<i class=\"fas ".concat(buttonIcon, " fa-3x\"></i>");
    button.ariaLabel = accessibleName;
    button.tabIndex = '-1';
    return button;
  }

  appendNavButtons(lightboxBody) {
    const previousButton = this.createNavButton("previous_button", "fa-chevron-left", "previous image");
    const nextButton = this.createNavButton("next_button", "fa-chevron-right", "next image");
    lightboxBody.appendChild(previousButton);
    lightboxBody.appendChild(nextButton); //add buttons to focusable elements array

    this.focusableElements.push(previousButton);
    this.focusableElements.push(nextButton);
  }

  handleNav(lightboxBody) {
    const previousButton = lightboxBody.querySelector('.previous_button');
    const nextButton = lightboxBody.querySelector('.next_button');
    previousButton.addEventListener('click', () => {
      this.showPreviousMedium(lightboxBody, previousButton);
    });
    nextButton.addEventListener('click', () => {
      this.showNextMedium(lightboxBody, nextButton);
    });
    this.handleKeyboardNav(lightboxBody);
  }

  showPreviousMedium(lightboxBody, previousButton) {
    const currentIndex = this.mediaList.indexOf(this.medium);
    const newIndex = currentIndex - 1;
    const nextButton = lightboxBody.querySelector('.next_button');
    nextButton.style.display = "block";

    if (newIndex >= 0) {
      this.showLightboxMedia(this.mediaList[newIndex], this.currentPhotographer, this.mediaList);
    }

    if (newIndex == 0) {
      previousButton.style.display = "none";
    }
  }

  showNextMedium(lightboxBody, nextButton) {
    const currentIndex = this.mediaList.indexOf(this.medium);
    const newIndex = currentIndex + 1;
    const previousButton = lightboxBody.querySelector('.previous_button');
    previousButton.style.display = "block";

    if (newIndex <= this.mediaList.length - 1) {
      this.showLightboxMedia(this.mediaList[newIndex], this.currentPhotographer, this.mediaList);
    }

    if (newIndex == this.mediaList.length - 1) {
      nextButton.style.display = "none";
    }
  }

  handleKeyboardNav(lightboxBody) {
    const firstFocusableElement = this.focusableElements[0]; //close button

    const secondFocusableElement = this.focusableElements[1]; //previous button

    const lastFocusableElement = this.focusableElements[2]; //next button

    const lightboxMedia = document.querySelector('.lightbox_media'); //navigate with left & right arrows

    lightboxMedia.addEventListener('keydown', e => {
      e.preventDefault();

      if (e.code === 'ArrowLeft') {
        this.showPreviousMedium(lightboxBody, secondFocusableElement);
      } else if (e.code === 'ArrowRight') {
        this.showNextMedium(lightboxBody, lastFocusableElement);
      }
    }); //navigate with tab + enter

    secondFocusableElement.addEventListener('keydown', e => {
      e.preventDefault();

      if (e.code === 'Enter') {
        this.showPreviousMedium(lightboxBody, secondFocusableElement);
      }
    });
    lastFocusableElement.addEventListener('keydown', e => {
      e.preventDefault();

      if (e.code === 'Enter') {
        this.showNextMedium(lightboxBody, lastFocusableElement);
      }
    }); //trap focus in modal

    _Utils.Utils.trapFocusInModal(this.focusableElements, firstFocusableElement, lastFocusableElement);
  }

  appendMediumBox(lightboxBody) {
    const nextButton = lightboxBody.querySelector('.next_button');
    const mediumBox = document.createElement('div');
    mediumBox.className = "medium_box";
    lightboxBody.insertBefore(mediumBox, nextButton);
  }

  appendMediumTitle(lightboxBody) {
    const mediumTitle = document.createElement('h2');
    mediumTitle.className = 'lightbox_title';
    lightboxBody.querySelector('.medium_box').appendChild(mediumTitle);
  }

  showLightboxMedia(medium, currentPhotographer, mediaList) {
    this.mediaList = mediaList;
    this.medium = medium;

    _Utils.Utils.removeChildOf('.medium_box', 'lightbox_medium'); //display lightbox


    const lightboxMedia = document.querySelector('.lightbox_media');
    this.lightboxMedia.style.display = "flex";
    main.setAttribute('aria-hidden', 'true');
    lightboxMedia.setAttribute('aria-hidden', 'false'); //add title dynamically

    const mediumTitle = document.querySelector('.lightbox_title');
    mediumTitle.innerHTML = medium.getTitle(); //display medium 

    const lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, "lightbox_medium", true);
    lightboxMedium.querySelector(".lightbox_medium__miniature").tabIndex = "-1";
    document.querySelector('.medium_box').insertBefore(lightboxMedium, mediumTitle); //if first medium is displayed, hide previous button;
    //if last one, hide next button

    const previousButton = document.querySelector('.previous_button');
    const nextButton = document.querySelector('.next_button');

    if (this.mediaList.indexOf(this.medium) == 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "block";
    }

    if (this.mediaList.indexOf(this.medium) == this.mediaList.length - 1) {
      nextButton.style.display = "none";
    } else {
      nextButton.style.display = "block";
    } //focus on close button


    const closeButton = this.focusableElements[0];
    closeButton.focus();
  }

  eventOnClose() {
    const closeButton = document.querySelector('.close_button_lightbox');
    closeButton.addEventListener('click', () => this.hideLightboxMedia());
    closeButton.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        this.hideLightboxMedia();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.hideLightboxMedia();
      }
    });
  }

  hideLightboxMedia() {
    const lightboxMedia = document.querySelector('.lightbox_media');
    this.lightboxMedia.style.display = "none";
    main.setAttribute('aria-hidden', 'false');
    lightboxMedia.setAttribute('aria-hidden', 'true');
  }

}

exports.LightboxMedia = LightboxMedia;
},{"./MediaFactory":"ogD9","../models/MediumModel":"I0hq","../models/PhotographerProfileModel":"qC2z","../utils/Utils":"NVBh"}],"dLVZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographerPageModel = void 0;

var _MediumModel = require("./MediumModel");

var _PhotographerProfileModel = require("./PhotographerProfileModel");

class PhotographerPageModel {
  /**
  * @param {Array<PhotographerProfileModel>} photographersList
  * @param {Array<MediumModel>} mediaList
  */
  constructor(photographersList, mediaList) {
    this.photographersList = photographersList;
    this.mediaList = mediaList;
  }

  getPhotographersList() {
    return this.photographersList;
  }

  getMediaList() {
    return this.mediaList;
  }

}

exports.PhotographerPageModel = PhotographerPageModel;
},{"./MediumModel":"I0hq","./PhotographerProfileModel":"qC2z"}],"UUh5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographerPageBuilder = void 0;

var _MediaFactory = require("./MediaFactory");

var _ContactModal = require("./ContactModal");

var _LightboxMedia = require("./LightboxMedia");

var _Tags = require("./Tags");

var _Utils = require("../utils/Utils");

var _PhotographerPageModel = require("../models/PhotographerPageModel");

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

var _MediumModel = require("../models/MediumModel");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const body = document.getElementById("page");
const main = document.getElementById('app');

class PhotographerPageBuilder {
  /**
   * 
   * @param {Promise<PhotographerPageModel>} photographerPageModel 
   */
  constructor(photographerPageModel) {
    _defineProperty(this, "SortEnum", {
      DATE: "Date",
      POPULARITY: "Popularité",
      TITLE: "Titre"
    });

    this.photographerPageModelPromise = photographerPageModel;
  }

  render(id) {
    this.idPhotographer = id;
    this.mediaList = [];
    this.activePhotographerTags = [];
    this.selectedMedia = [];
    this.mediaFactory = new _MediaFactory.MediaFactory();
    this.photographerPageModelPromise.then(photographerPageModel => {
      this.determineCurrentPhotographer(photographerPageModel.getPhotographersList());
      this.determineCurrentPhotographerMedia(photographerPageModel.getMediaList());
      this.contactModal = new _ContactModal.ContactModal(this.currentPhotographer);
      this.lightboxMedia = new _LightboxMedia.LightboxMedia(this.allMedia, this.currentPhotographer);
      this.contactModal.renderContactModal();
      this.lightboxMedia.renderLightboxMedia();
      this.renderHeader();
      this.renderMain();
    });
  }
  /**
   * save photographer in currentPhotographer if their id == photographer wanted 
   * @param {Array<PhotographerProfileModel} photographers 
   */


  determineCurrentPhotographer(photographers) {
    photographers.forEach(photographer => {
      if (photographer.getId() == this.idPhotographer) {
        this.currentPhotographer = photographer;
      }
    });
  }
  /**
   * add medium to array if photographer id in media object = id in photographers object
   * @param {Array<MediumModel>} media 
   */


  determineCurrentPhotographerMedia(media) {
    media.forEach(medium => {
      if (medium.getPhotographerId() == this.idPhotographer) {
        this.mediaList.push(medium);
      }
    });
    this.selectedMedia = this.mediaList;
  }

  renderHeader() {
    const header = document.createElement('header');
    header.className = 'header_photographer_page';
    header.role = 'heading';
    header.ariaLabel = 'Fisheye photographer page heading';
    header.innerHTML = "\n        <a class=\"logo\" href=\"/\">\n        <img class=\"logo_img\" src=\"/static/logo.svg\" alt=\"Fisheye Home Page\" />\n        </a>\n        ";
    body.insertBefore(header, main);
  }

  renderMain() {
    this.renderBanner();
    this.renderDropdownMenu();
    this.renderSummary();
    this.sortBy(this.SortEnum.POPULARITY);
  } //Banner


  renderBanner() {
    const banner = document.createElement('section');
    banner.className = 'banner';
    banner.innerHTML = "\n        <div class=\"banner__text_content\" aria-label=\"".concat(this.currentPhotographer.getName(), " info\" >\n            <h2 class=\"photographer_name\">").concat(this.currentPhotographer.getName(), "</h2>\n            <h3 class=\"photographer_location\">").concat(this.currentPhotographer.getLocation(), "</h3>\n            <p class=\"photographer_desc\">").concat(this.currentPhotographer.getTagline(), "</p>\n            <div class=\"tags tags_photographer_page\"></div>\n        </div>\n        <button class=\"button_contact button_banner\" aria-label=\"Contact Me\" aria-haspopup=\"dialog\" aria-controls=\"contact_modal\"> Contactez-moi </button>\n        <div class=\"photographer__picture\">\n            <img class=\"photographer_thumbnail__picture picture_profile\" src=\"/static/Photographers ID Photos/").concat(this.currentPhotographer.getPortrait(), "\" alt=\"\">\n        </div>");
    this.renderBannerTags(banner.querySelector(".tags_photographer_page"));
    this.openContactModal(banner);
    main.appendChild(banner);
  } //contact modal opening


  openContactModal(banner) {
    const buttonContact = banner.querySelector(".button_contact");
    buttonContact.addEventListener('click', () => {
      this.contactModal.showContactModal();
    });
    buttonContact.addEventListener('keydown', e => {
      if (e.code === 'Enter' || e.code === 'Space') {
        this.contactModal.showContactModal();
      }
    });
  }

  renderBannerTags(bannerTags) {
    const tags = new _Tags.Tags(this.currentPhotographer.getTags());
    tags.appendTags(bannerTags, 'photographer_tags__item');
    tags.addEventOnChange(bannerTags, (isChecked, tagId) => this.handleTagClick(isChecked, tagId));
  }

  handleTagClick(isChecked, tagId) {
    const checkboxTag = document.getElementById(tagId);

    if (isChecked) {
      checkboxTag.setAttribute('aria-checked', 'true');
      this.activePhotographerTags.push(tagId);
      this.activePhotographerTags = [...new Set(this.activePhotographerTags)];
    } else {
      checkboxTag.setAttribute('aria-checked', 'false');
      const currentIndex = this.activePhotographerTags.indexOf(tagId);
      this.activePhotographerTags.splice(currentIndex, 1);
    }

    _Utils.Utils.removeChildOf("#app", "medium_thumbnail");

    this.sortMedia();
  } //sort media when medium tag = active photographer tag


  sortMedia() {
    this.selectedMedia = [];
    this.activePhotographerTags.forEach(activePhotographerTag => {
      this.mediaList.forEach(medium => {
        medium.getTags().forEach(tag => {
          if (tag == activePhotographerTag) {
            this.selectedMedia.push(medium);
          }
        });
      });
    });

    if (this.selectedMedia.length == 0) {
      //if there are no media selected => display all thumbnails
      this.selectedMedia = this.mediaList;
    } else {
      //display selected media only 
      this.selectedMedia = [...new Set(this.selectedMedia)]; //remove duplicates
    }

    const selectedItem = document.querySelector('.dropdown__content__item.selected');
    this.handleDropdownItemClick(selectedItem); //double sort => sort according to dropdown filter
  } //dropdown


  renderDropdownMenu() {
    const dropdownMenu = this.createDropdownMenu();
    main.appendChild(dropdownMenu);
    const dropdown = document.querySelector('.dropdown');
    const dropdrownTrigger = document.querySelector('.dropdown__trigger');
    const dropdrownItems = document.querySelectorAll('.dropdown__content__item');
    const secondDropdownItem = dropdrownItems[1];
    const lastDropdownItem = dropdrownItems[2];

    for (const dropdrownItem of dropdrownItems) {
      dropdrownItem.addEventListener('click', () => {
        this.dropdownEvent(dropdrownItem, dropdown);
      });
      dropdrownItem.addEventListener('keydown', e => {
        if (e.code === 'Enter') {
          this.dropdownEvent(dropdrownItem, dropdown);
        }
      });
    } //handle dropdown opening and closing with keayboard nav


    dropdrownTrigger.addEventListener('click', () => {
      if (dropdown.classList.contains('open')) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    });
    dropdrownTrigger.addEventListener('keydown', e => {
      if (dropdown.classList.contains('open') && e.code === 'Enter') {
        this.closeDropdown();
      } else if (e.code === 'Enter') {
        this.openDropdown();
      }
    });
    secondDropdownItem.addEventListener('keydown', e => {
      if (e.code === 'Tab' && e.shiftKey) {
        this.closeDropdown();
      }
    });
    lastDropdownItem.addEventListener('keydown', e => {
      if (e.code === 'Tab' && !e.shiftKey) {
        this.closeDropdown();
      }
    });
  }

  createDropdownMenu() {
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = "dropdown_wrapper";
    dropdownMenu.innerHTML = "\n        <span class=\"sort_by\">Trier par</span>\n        <div class=\"dropdown\">\n            <a class=\"dropdown__trigger\" role=\"button\" aria-label=\"sort by\" aria-controls=\"dropdown_content\" aria-haspopup=\"listbox\" aria-expanded=\"false\" tabindex=\"0\">\n                <span>".concat(this.SortEnum.POPULARITY, "</span>\n                <i class=\"expand fas fa-chevron-down\"></i>\n            </a>\n        \n            <div class=\"dropdown__content\" role=\"listbox\">\n                <a class=\"dropdown__content__item selected\" role=\"option\" aria-label=\"sort by popularity\" aria-selected=\"true\" tabindex=\"0\">").concat(this.SortEnum.POPULARITY, "</a>\n                <a class=\"dropdown__content__item\" role=\"option\" aria-label=\"sort by date\" aria-selected=\"false\" tabindex=\"0\">").concat(this.SortEnum.DATE, "</a>\n                <a class=\"dropdown__content__item\" role=\"option\" aria-label=\"sort by title\" aria-selected=\"false\" tabindex=\"0\">").concat(this.SortEnum.TITLE, "</a>\n            </div>\n        </div>");
    return dropdownMenu;
  }

  dropdownEvent(dropdrownItem, dropdown) {
    if (!dropdrownItem.classList.contains('selected')) {
      const selectedItem = dropdown.querySelector('.dropdown__content__item.selected');
      selectedItem.classList.remove('selected');
      dropdrownItem.classList.add('selected');
      dropdrownItem.setAttribute('aria-selected', 'true');
      dropdown.querySelector('.dropdown__trigger span').innerHTML = dropdrownItem.innerHTML;
      this.closeDropdown();
      this.handleDropdownItemClick(dropdrownItem);
    }
  }

  handleDropdownItemClick(item) {
    _Utils.Utils.removeChildOf("#app", "medium_thumbnail");

    this.sortBy(item.innerHTML);
  }

  openDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdrownTrigger = document.querySelector('.dropdown__trigger');
    dropdown.classList.add('open');
    dropdrownTrigger.setAttribute('aria-expanded', 'true');
  }

  closeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdrownTrigger = document.querySelector('.dropdown__trigger');
    dropdown.classList.remove('open');
    dropdrownTrigger.setAttribute('aria-expanded', 'false');
  }

  sortBy(sortType) {
    let sortedMedia = null;

    switch (sortType) {
      case this.SortEnum.DATE:
        sortedMedia = this.selectedMedia.sort((a, b) => new Date(b.getDate()) - new Date(a.getDate()));
        break;

      case this.SortEnum.POPULARITY:
        sortedMedia = this.selectedMedia.sort((a, b) => b.getLikes() - a.getLikes());
        break;

      case this.SortEnum.TITLE:
        sortedMedia = this.selectedMedia.sort((a, b) => a.getTitle().localeCompare(b.getTitle(), 'fr'));
        break;
    }

    sortedMedia.forEach(sortedMedium => {
      this.createMediumThumbnail(sortedMedium);
    });
  } //sticker photographer total number of likes and price


  renderSummary() {
    let numberOfLikes = 0;
    this.mediaList.forEach(medium => {
      numberOfLikes = numberOfLikes + medium.getLikes();
    });
    const stickerSummary = document.createElement('div');
    stickerSummary.className = 'sticker_summary';
    stickerSummary.innerHTML = "\n        <div class=\"total_likes\">\n            <p class=\"total_number_of_likes\">".concat(numberOfLikes, "</p>\n            <i class=\"fas fa-heart fa-lg\" aria-label=\"likes\" aria-hidden=\"true\"></i>\n        </div>\n        <div class=\"photographer_price\">").concat(this.currentPhotographer.getPrice(), "\u20AC/jour</div>\n        ");
    main.appendChild(stickerSummary);
  }

  handleLikeButton(mediumThumbnail) {
    const likeButton = mediumThumbnail.querySelector('.checkbox__input');
    const mediumLikes = mediumThumbnail.querySelector('.medium_number_of_likes');
    const totalLikes = document.querySelector('.total_number_of_likes');
    likeButton.addEventListener('change', () => {
      if (likeButton.checked) {
        mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) + 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
      } else {
        mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) - 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
      }
    });
  }
  /**
   * 
   * @param {MediumModel} medium 
   */


  createMediumThumbnail(medium) {
    const mediumThumbnail = this.mediaFactory.renderMedium(medium, this.currentPhotographer);
    main.appendChild(mediumThumbnail);
    const mediumThumbnailMiniature = mediumThumbnail.querySelector('.medium_thumbnail__miniature');
    mediumThumbnailMiniature.addEventListener('click', e => {
      this.displayMediumInLightbox(e, medium);
    });
    mediumThumbnailMiniature.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        this.displayMediumInLightbox(e, medium);
      }
    });
    this.handleLikeButton(mediumThumbnail);
  }

  displayMediumInLightbox(e, medium) {
    e.preventDefault();

    if (this.selectedMedia.length == 0) {
      this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.mediaList);
    } else {
      this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.selectedMedia);
    }
  }

}

exports.PhotographerPageBuilder = PhotographerPageBuilder;
},{"./MediaFactory":"ogD9","./ContactModal":"JLPi","./LightboxMedia":"syDU","./Tags":"Y0eb","../utils/Utils":"NVBh","../models/PhotographerPageModel":"dLVZ","../models/PhotographerProfileModel":"qC2z","../models/MediumModel":"I0hq"}],"OGNz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageFactory = exports.PageFactoryEnum = void 0;

var _HomePageBuilder = require("./HomePageBuilder");

var _PhotographerPageBuilder = require("./PhotographerPageBuilder");

const PageFactoryEnum = {
  HOME: "home",
  PHOTOGRAPHER: "photographer"
}; //Map[key] = value

exports.PageFactoryEnum = PageFactoryEnum;
let registeredPages = new Map([[PageFactoryEnum.PHOTOGRAPHER, _PhotographerPageBuilder.PhotographerPageBuilder], [PageFactoryEnum.HOME, _HomePageBuilder.HomePageBuilder]]);

class PageFactory {
  getPage(type, pageModel) {
    return new (registeredPages.get(type))(pageModel);
  }

}

exports.PageFactory = PageFactory;
},{"./HomePageBuilder":"hCgZ","./PhotographerPageBuilder":"UUh5"}],"EDpa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppModel = void 0;

var _HomePageModel = require("../models/HomePageModel");

var _PhotographerPageModel = require("./PhotographerPageModel");

class AppModel {
  /**
  * @param {HomePageModel} homePage
  * @param {PhotographerPageModel} photographerPageModel
  */
  constructor(homePage, photographerPageModel) {
    this.homePageModel = homePage;
    this.photographerPageModel = photographerPageModel;
  }

  getHomePage() {
    return this.homePageModel;
  }

  getMediaPageModel() {
    return this.photographerPageModel;
  }

}

exports.AppModel = AppModel;
},{"../models/HomePageModel":"R9Qz","./PhotographerPageModel":"dLVZ"}],"y3IM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographersUtils = void 0;

class PhotographersUtils {
  static getAllTags(json) {
    let photographers = json.photographers;
    const allTags = photographers.map(photographer => photographer.tags).flat();
    const tagsList = [...new Set(allTags)];
    return tagsList;
  }

}

exports.PhotographersUtils = PhotographersUtils;
},{}],"m2rA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFetcher = void 0;

var _AppModel = require("../models/AppModel");

var _HomePageModel = require("../models/HomePageModel");

var _MediumModel = require("../models/MediumModel");

var _PhotographerPageModel = require("../models/PhotographerPageModel");

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

var _PhotographersUtils = require("./PhotographersUtils");

class DataFetcher {
  constructor(dataSource) {
    this.dataSource = dataSource; //json file
  }

  fetchSource() {
    const result = fetch(this.dataSource) // ressource request
    .then(resp => resp.json()).then(json => this.appPageWrapper(json));
    return result;
  }

  appPageWrapper(json) {
    const tagsList = _PhotographersUtils.PhotographersUtils.getAllTags(json);

    const photographersList = json.photographers.map(photographer => new _PhotographerProfileModel.PhotographerProfileModel(photographer));
    const homePageModel = new _HomePageModel.HomePageModel(photographersList, tagsList);
    const mediaList = this.createMediaList(json);
    const mediaPageModel = new _PhotographerPageModel.PhotographerPageModel(photographersList, mediaList);
    return new _AppModel.AppModel(homePageModel, mediaPageModel);
  }

  createMediaList(json) {
    const mediaList = json.media.map(medium => new _MediumModel.MediumModel(medium)); //map array<JSON medium> => array<mediumModel>

    return mediaList;
  }

}

exports.DataFetcher = DataFetcher;
},{"../models/AppModel":"EDpa","../models/HomePageModel":"R9Qz","../models/MediumModel":"I0hq","../models/PhotographerPageModel":"dLVZ","../models/PhotographerProfileModel":"qC2z","./PhotographersUtils":"y3IM"}],"jmDk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _PageFactory = require("./scripts/factory/PageFactory");

var _AppModel = require("./scripts/models/AppModel");

var _DataFetcher = require("./scripts/utils/DataFetcher");

const dataFetcher = new _DataFetcher.DataFetcher('/static/FishEyeData-new.json');
const json = dataFetcher.fetchSource();
const pageFactory = new _PageFactory.PageFactory(); //possible routes

const routes = [{
  regex: /\/{1}$/gm,
  component: pageFactory.getPage(_PageFactory.PageFactoryEnum.HOME, json.then(appModel => appModel.homePageModel))
}, {
  regex: /\/[A-Za-z-]{1,}\/[0-9]{0,3}?$/,
  component: pageFactory.getPage(_PageFactory.PageFactoryEnum.PHOTOGRAPHER, json.then(appModel => appModel.photographerPageModel))
}];

const router = () => {
  const idPhotographer = location.pathname.split('/')[2];
  routes.find(route => route.regex.test(location.pathname)).component.render(idPhotographer);
};

exports.router = router;
},{"./scripts/factory/PageFactory":"OGNz","./scripts/models/AppModel":"EDpa","./scripts/utils/DataFetcher":"m2rA"}],"Focm":[function(require,module,exports) {
"use strict";

var _Router = require("./Router");

window.addEventListener('hashchange', _Router.router); // identifier of the URL changes

window.addEventListener('load', _Router.router); // ressource has loaded
},{"./Router":"jmDk"}]},{},["Focm"], null)
//# sourceMappingURL=/P6-Fisheye.334dc839.js.map