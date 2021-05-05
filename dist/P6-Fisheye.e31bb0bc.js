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
})({"scripts/utils/Utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utils = void 0;

class Utils {
  static removeChildOf(node, classToRemove) {
    const parentNode = document.querySelector(node);
    console.log(parentNode);

    for (let index = parentNode.childNodes.length - 1; index >= 0; index--) {
      const child = parentNode.childNodes[index];

      if (child.className == classToRemove) {
        parentNode.removeChild(child);
      }
    }
  }

}

exports.Utils = Utils;
},{}],"scripts/factory/Tags.js":[function(require,module,exports) {
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
    //console.log(parentElement)
    this.tagsList.forEach(tag => {
      const tagItem = document.createElement('div');
      tagItem.className = className;
      const checkboxTag = document.createElement('input');
      checkboxTag.type = "checkbox";
      checkboxTag.className = "tag_checkbox";
      checkboxTag.id = tag;
      tagItem.appendChild(checkboxTag);
      const labelTag = document.createElement('label');
      labelTag.className = "tag_name";
      labelTag.setAttribute("for", tag);
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
},{}],"scripts/models/PhotographerProfileModel.js":[function(require,module,exports) {
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
},{}],"scripts/models/HomePageModel.js":[function(require,module,exports) {
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
},{"./PhotographerProfileModel":"scripts/models/PhotographerProfileModel.js"}],"scripts/factory/HomePageBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePageBuilder = void 0;

var _Utils = require("../utils/Utils");

var _Tags = require("./Tags");

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

var _HomePageModel = require("../models/HomePageModel");

class HomePageBuilder {
  /**
   * 
   * @param {Promise<HomePageModel>} homePageModel 
   */
  constructor(homePageModel) {
    this.homePageModelPromise = homePageModel;
    this.clickedNavTags = [];
  } //display header and main (home page)


  render() {
    this.homePageModelPromise.then(homePageModel => {
      let photographers = homePageModel.photographersList;
      this.allTags = homePageModel.tagsList;
      this.renderHeader(photographers);
      this.renderMain(photographers);
    });
  }

  renderHeader(photographers) {
    const header = this.createHeader();
    this.appendLogo(header);
    this.appendMainNav(photographers, header);
    this.appendMainAnchor(header);
    const main = document.getElementById("app");
    document.querySelector('body').insertBefore(header, main);
  }

  createHeader() {
    const header = document.createElement('header');
    header.className = 'header_home';
    return header;
  }

  appendLogo(header) {
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.innerHTML = "<img class=\"logo_img\" src=\"/static/logo.svg\" alt=\"Fisheye Home Page\" />";
    header.appendChild(logo);
  }

  appendMainNav(photographers, header) {
    const mainNav = document.createElement('nav');
    mainNav.className = 'main_nav';
    mainNav.ariaLabel = 'main navigation';
    mainNav.role = 'navigation';
    this.appendNavTags(photographers, mainNav);
    header.appendChild(mainNav);
  }

  appendMainAnchor(header) {
    const mainAnchor = document.createElement('a');
    mainAnchor.className = "go_main";
    mainAnchor.setAttribute = ("href", "#app");
    mainAnchor.innerHTML = "Passer au contenu";
    header.appendChild(mainAnchor);
  }

  appendNavTags(photographers, nav) {
    this.allTags.forEach(tag => {
      const tagName = tag.charAt(0).toUpperCase() + tag.substring(1);
      const headerTag = document.createElement('div');
      headerTag.className = 'main_nav__item';
      const checkboxTag = document.createElement('input');
      checkboxTag.type = "checkbox";
      checkboxTag.className = "tag_checkbox";
      checkboxTag.id = tagName;
      headerTag.appendChild(checkboxTag);
      const labelTag = document.createElement('label');
      labelTag.className = "tag_name";
      labelTag.setAttribute("for", tagName);
      labelTag.innerHTML = "#".concat(tagName);
      headerTag.appendChild(labelTag);
      nav.appendChild(headerTag); //listen to clicks on main nav tags

      headerTag.addEventListener("change", () => {
        if (checkboxTag.checked) {
          this.clickedNavTags.push(tag);
          this.clickedNavTags = [...new Set(this.clickedNavTags)];
        } else {
          const currentIndex = this.clickedNavTags.indexOf(tag);
          this.clickedNavTags.splice(currentIndex, 1);
        }

        this.handleTagClick(photographers);
      });
    });
  }

  handleTagClick(photographers) {
    _Utils.Utils.removeChildOf(".photographers", "article");

    this.sortPhotographers(photographers);
  }

  sortPhotographers(photographers) {
    let selectedPhotographers = [];
    this.clickedNavTags.forEach(clickedNavTag => {
      photographers.forEach(photographer => {
        if (photographer.getTags().includes(clickedNavTag)) {
          selectedPhotographers.push(photographer);
        }
      });
    });

    if (this.clickedNavTags.length == 0) {
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
    document.getElementById("app").appendChild(title);
  }

  createPhotographersWrapper() {
    const photographersWrapper = document.createElement('div');
    photographersWrapper.className = 'photographers';
    photographersWrapper.ariaLabelledby = 'photographers';
    document.getElementById("app").appendChild(photographersWrapper);
  }
  /**
   * 
   * @param {Array<PhotographerProfileModel>} photographers 
   */


  createArticle(photographers) {
    photographers.forEach(photographer => {
      const article = document.createElement('article');
      article.className = 'article';
      article.innerHTML = "<a class=\"photographer_thumbnail\" href=\"/photographers-profile/".concat(photographer.getId(), "\">");
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
    thumbnailPicture.innerHTML = "\n        <img class=\"photographer_thumbnail__picture\"\n        src=\"/static/Photographers ID Photos/".concat(photographer.getPortrait(), "\"\n        alt=\"photographer's thumbnail picture\" />");
    article.querySelector('.photographer_thumbnail').appendChild(thumbnailPicture);
  }
  /**
   * 
   * @param {PhotographerProfileModel} photographer 
   */


  appendPhotographerThumbnailContent(article, photographer) {
    const thumbnailContent = document.createElement('div');
    thumbnailContent.className = 'photographer_thumbnail__content';
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
},{"../utils/Utils":"scripts/utils/Utils.js","./Tags":"scripts/factory/Tags.js","../models/PhotographerProfileModel":"scripts/models/PhotographerProfileModel.js","../models/HomePageModel":"scripts/models/HomePageModel.js"}],"scripts/utils/MediaUtils.js":[function(require,module,exports) {
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
  // static getMediaTitle(medium) {
  //     let tmpMedium = this.getMediaSource(medium)
  //     let mediumTitle = tmpMedium.toLowerCase();
  //     let mediumTitleArray = mediumTitle.split(".");
  //     mediumTitle = mediumTitleArray[0];
  //     mediumTitleArray = mediumTitle.split("_");
  //     mediumTitle = mediumTitleArray.shift(); //remove 1st element in array 
  //     mediumTitle = mediumTitleArray.join(" "); //add elements of array into a string
  //     mediumTitle = mediumTitle.charAt(0).toUpperCase() + mediumTitle.slice(1);
  //     return mediumTitle;
  // }
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
},{}],"scripts/models/MediumModel.js":[function(require,module,exports) {
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
},{"../utils/MediaUtils":"scripts/utils/MediaUtils.js"}],"scripts/factory/MediaFactory.js":[function(require,module,exports) {
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

  appendThumbnailContent(medium, mediumThumbnail) {
    let mediumThumbnailContent = document.createElement('div');
    mediumThumbnailContent.className = "medium_thumbnail__content";
    mediumThumbnailContent.innerHTML = "\n            <h2 class=\"medium_title\">".concat(medium.getTitle(), "</h2>\n            <div class=\"price_and_likes\">\n              <span class=\"medium_price\">").concat(medium.getPrice(), "\u20AC</span>\n              <span class=\"medium_number_of_likes\">").concat(medium.getLikes(), "</span>\n              <label class=\"checkbox__like aria-label=\"likes\"> \n                <input type=\"checkbox\" class=\"checkbox__input\" name=\"like\" aria-labelledby=\"likes\">\n                    <i class=\"far fa-heart like__unchecked\"></i>\n                    <i class=\"fas fa-heart like__checked\"></i>\n                </input>   \n                </label>\n            </div>\n          </div>");
    mediumThumbnail.appendChild(mediumThumbnailContent);
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
    let mediumThumbnail = document.createElement('div');
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
    mediumThumbnail.appendChild(media);
    return mediumThumbnail;
  }

}

exports.MediaFactory = MediaFactory;
},{"../models/MediumModel":"scripts/models/MediumModel.js","../utils/MediaUtils":"scripts/utils/MediaUtils.js","../models/PhotographerProfileModel":"scripts/models/PhotographerProfileModel.js"}],"scripts/factory/ContactModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactModal = void 0;

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

class ContactModal {
  /**
   * 
   * @param {PhotographerProfileModel} currentPhotographer 
   */
  constructor(currentPhotographer) {
    this.currentPhotographer = currentPhotographer;
  } //modal creation 


  renderContactModal() {
    this.createContactModal();
    this.createContactModalBody();
    this.contactModal = document.querySelector('.contact_modal');
  }

  createContactModal() {
    const contactModal = document.createElement('dialog');
    contactModal.className = 'contact_modal';
    document.getElementById("app").appendChild(contactModal);
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
    modalTitle.innerHTML = "Contactez-moi </br> ".concat(this.currentPhotographer.getName());
    modalBody.appendChild(modalTitle);
  }

  appendCloseButton(modalBody) {
    const closeButton = document.createElement('button');
    closeButton.className = 'close_button';
    closeButton.role = "button";
    closeButton.ariaLabel = "close dialog";
    closeButton.innerHTML = "<i class=\"fas fa-times fa-3x\"></i>";
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
    this.addEventListenerValidate(contactForm);
    modalBody.appendChild(contactForm);
  }

  addEventListenerValidate(contactForm) {
    const inputs = contactForm.querySelectorAll('.input_field');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (this.validateFieldsFormat(input) === true) {
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
  }

  createFormData() {
    const formData = document.createElement('div');
    formData.className = 'formData';
    return formData;
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
    let formData = this.createFormData();
    formData.appendChild(this.createLabel("firstname", "Prénom"));
    formData.appendChild(this.createInputField("firstname"));
    contactForm.appendChild(formData); //Lastname

    formData = this.createFormData();
    formData.appendChild(this.createLabel("lastname", "Nom"));
    formData.appendChild(this.createInputField("lastname"));
    contactForm.appendChild(formData); //Email

    formData = this.createFormData();
    formData.appendChild(this.createLabel("email", "Email"));
    formData.appendChild(this.createInputField("email"));
    contactForm.appendChild(formData); //Message

    formData = this.createFormData();
    formData.appendChild(this.createLabel("message", "Votre message"));
    formData.appendChild(this.createTextArea("message"));
    contactForm.appendChild(formData);
  }

  createModalButton(modalBody) {
    const modalButton = document.createElement('button');
    modalButton.className = 'button_contact submit_button';
    modalButton.type = "submit";
    modalButton.innerHTML = "Envoyer";
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
    modalBody.appendChild(modalButton);
  }

  showContactModal() {
    this.contactModal.style.display = "block";
  }

  hideContactModal() {
    this.contactModal.style.display = "none";
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
},{"../models/PhotographerProfileModel":"scripts/models/PhotographerProfileModel.js"}],"scripts/factory/LightboxMedia.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightboxMedia = void 0;

var _MediaFactory = require("./MediaFactory");

var _MediumModel = require("../models/MediumModel");

var _PhotographerProfileModel = require("../models/PhotographerProfileModel");

var _Utils = require("../utils/Utils");

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
    this.mediaFactory = new _MediaFactory.MediaFactory();
  }

  renderLightboxMedia() {
    this.createLightboxMedia();
    this.createLightboxMediaBody();
    this.lightboxMedia = document.querySelector('.lightbox_media');
  }

  createLightboxMedia() {
    const lightboxMedia = document.createElement('dialog');
    lightboxMedia.className = 'lightbox_media';
    lightboxMedia.ariaLabel = "image close-up view";
    document.getElementById("app").appendChild(lightboxMedia);
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
    closeButton.role = "button";
    closeButton.ariaLabel = "close dialog";
    closeButton.innerHTML = "<i class=\"fas fa-times fa-3x\"></i>";
    closeButton.addEventListener('click', () => {
      this.hideLightboxMedia();
    });
    lightboxBody.appendChild(closeButton);
  }

  createNavButton(buttonClass, buttonIcon, accessibleName) {
    const button = document.createElement('button');
    button.className = buttonClass;
    button.innerHTML = "<i class=\"fas ".concat(buttonIcon, " fa-3x\"></i>");
    button.ariaLabel = accessibleName;
    return button;
  }

  appendNavButtons(lightboxBody) {
    const previousButton = this.createNavButton("previous_button", "fa-chevron-left", "previous image");
    const nextButton = this.createNavButton("next_button", "fa-chevron-right", "next image");
    lightboxBody.appendChild(previousButton);
    lightboxBody.appendChild(nextButton);
  }

  handleNav(lightboxBody) {
    const previousButton = lightboxBody.querySelector('.previous_button');
    const nextButton = lightboxBody.querySelector('.next_button');
    previousButton.addEventListener('click', () => {
      const currentIndex = this.mediaList.indexOf(this.medium);
      const newIndex = currentIndex - 1;
      const nextButton = lightboxBody.querySelector('.next_button');
      nextButton.style.display = "block";
      console.log(newIndex);

      if (newIndex >= 0) {
        this.showLightboxMedia(this.mediaList[newIndex], this.currentPhotographer, this.mediaList);
      }

      if (newIndex == 0) {
        previousButton.style.display = "none"; //disable prev button
      }
    });
    nextButton.addEventListener('click', () => {
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
    });
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

    _Utils.Utils.removeChildOf('.medium_box', 'lightbox_medium');

    const mediumTitle = document.querySelector('.lightbox_title');
    mediumTitle.innerHTML = medium.getTitle();
    const lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, "lightbox_medium", true);
    document.querySelector('.medium_box').insertBefore(lightboxMedium, mediumTitle);
    this.lightboxMedia.style.display = "block";
  }

  hideLightboxMedia() {
    this.lightboxMedia.style.display = "none";
  }

}

exports.LightboxMedia = LightboxMedia;
},{"./MediaFactory":"scripts/factory/MediaFactory.js","../models/MediumModel":"scripts/models/MediumModel.js","../models/PhotographerProfileModel":"scripts/models/PhotographerProfileModel.js","../utils/Utils":"scripts/utils/Utils.js"}],"scripts/models/PhotographerPageModel.js":[function(require,module,exports) {
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
},{"./MediumModel":"scripts/models/MediumModel.js","./PhotographerProfileModel":"scripts/models/PhotographerProfileModel.js"}],"scripts/factory/PhotographerPageBuilder.js":[function(require,module,exports) {
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
    this.isDropdownVisible = false; //dropdown menu hidden by default

    this.mediaList = [];
    this.activeTags = [];
    this.selectedMedia = [];
    this.mediaFactory = new _MediaFactory.MediaFactory();
  }

  render(id) {
    this.idPhotographer = id;
    this.photographerPageModelPromise.then(photographerPageModel => {
      this.determineCurrentPhotographer(photographerPageModel.getPhotographersList());
      this.determineCurrentPhotographerMedia(photographerPageModel.getMediaList());
      this.renderHeader();
      this.renderMain();
      this.contactModal = new _ContactModal.ContactModal(this.currentPhotographer);
      this.contactModal.renderContactModal();
      this.lightboxMedia = new _LightboxMedia.LightboxMedia(this.allMedia, this.currentPhotographer);
      this.lightboxMedia.renderLightboxMedia();
    });
  }

  renderHeader() {
    const header = this.createHeader();
    this.appendLogo(header);
    const main = document.querySelector("main");
    document.querySelector('body').insertBefore(header, main);
  }

  createHeader() {
    const header = document.createElement('header');
    header.className = 'header_photographer_page';
    return header;
  }

  appendLogo(header) {
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.setAttribute("href", "/");
    logo.innerHTML = "<img class=\"logo_img\" src=\"/static/logo.svg\" alt=\"Fisheye Home Page\" />";
    header.appendChild(logo);
  } // for each photographer, 
  //  if their id == photographer wanted 
  //  then save photographer in currentPhotographer 

  /**
   * 
   * @param {Array<PhotographerProfileModel} photographers 
   */


  determineCurrentPhotographer(photographers) {
    photographers.forEach(photographer => {
      if (photographer.getId() == this.idPhotographer) {
        this.currentPhotographer = photographer;
      }
    });
  } //for each medium, 
  //  if photographer id in media object = id in photographers object,
  //  then add medium to array

  /**
   * 
   * @param {Array<MediumModel>} media 
   */


  determineCurrentPhotographerMedia(media) {
    media.forEach(medium => {
      if (medium.getPhotographerId() == this.idPhotographer) {
        this.mediaList.push(medium);
      }
    });
  }

  renderMain() {
    this.renderBanner();
    this.renderSummary();
    this.renderDropdown();
    this.sortBy(this.SortEnum.POPULARITY);
  } //Banner


  renderBanner() {
    const banner = document.createElement('div');
    banner.className = 'banner';
    banner.innerHTML = "\n        <div class=\"banner__text_content\">\n            <h2 class=\"photographer_name\">".concat(this.currentPhotographer.getName(), "</h2>\n            <h3 class=\"photographer_location\">").concat(this.currentPhotographer.getLocation(), "</h3>\n            <p class=\"photographer_desc\">").concat(this.currentPhotographer.getTagline(), "</p>\n            <div class=\"tags tags_photographer_page\"></div>\n        </div>\n        <button class=\"button_contact button_banner\" aria-label=\"Contact Me\"> Contactez-moi </button>\n        <div class=\"photographer__picture\">\n            <img class=\"photographer_thumbnail__picture picture_profile\" src=\"/static/Photographers ID Photos/").concat(this.currentPhotographer.getPortrait(), "\" alt=\"\">\n        </div>");
    banner.querySelector(".button_banner").addEventListener('click', () => {
      this.launchContactModal();
    });
    this.appendBannerTags(banner.querySelector(".tags_photographer_page"));
    document.getElementById('app').appendChild(banner);
  }

  launchContactModal() {
    this.contactModal.showContactModal();
  }

  appendBannerTags(bannerTags) {
    const tags = new _Tags.Tags(this.currentPhotographer.getTags());
    tags.appendTags(bannerTags, 'photographer_tags__item');
    tags.addEventOnChange(bannerTags, (isChecked, tag) => this.handleTagClick(isChecked, tag));
  }

  handleTagClick(isChecked, tag) {
    console.log(isChecked);
    console.log(tag);

    if (isChecked) {
      this.activeTags.push(tag);
      this.activeTags = [...new Set(this.activeTags)];
    } else {
      const currentIndex = this.activeTags.indexOf(tag);
      this.activeTags.splice(currentIndex, 1);
    }

    _Utils.Utils.removeChildOf("#app", "medium_thumbnail");

    this.sortMedia();
  }

  sortMedia() {
    this.selectedMedia = [];
    console.log(this.activeTags);
    this.activeTags.forEach(clickedPhotographerTag => {
      this.mediaList.forEach(medium => {
        medium.getTags().forEach(tag => {
          console.log(tag);

          if (tag == clickedPhotographerTag) {
            this.selectedMedia.push(medium);
          }
        });
      });
    });
    console.log(this.selectedMedia);

    if (this.selectedMedia.length == 0) {
      this.mediaList.forEach(medium => {
        this.createMediumThumbnail(medium);
      });
    } else {
      this.selectedMedia = [...new Set(this.selectedMedia)];
      this.selectedMedia.forEach(selectedMedium => {
        this.createMediumThumbnail(selectedMedium);
      });
    }
  } //dropdown


  renderDropdown() {
    const dropdownMenu = this.createDropdownMenu();
    this.appendSortByText(dropdownMenu);
    this.appendDropdown(dropdownMenu);
    document.querySelector('main').appendChild(dropdownMenu);
    const dropdrownButton = document.querySelector('.dropdown__button');
    const dropdrownContent = document.querySelector('.dropdown__content');
    dropdrownButton.addEventListener('click', () => {
      if (this.isDropdownVisible == false) {
        dropdrownContent.style.display = "block";
        this.isDropdownVisible = true; //content visibility state 
      } else {
        dropdrownContent.style.display = "none";
        this.isDropdownVisible = false;
      }
    });
    const dropdownItems = document.getElementsByClassName("dropdown__content__item");

    for (let item of dropdownItems) {
      item.addEventListener('click', () => {
        this.handleDropdownItemClick(dropdrownButton, item);
      });
    }
  }

  createDropdownMenu() {
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = "dropdown_menu";
    return dropdownMenu;
  }

  appendSortByText(dropdownMenu) {
    const sortBy = document.createElement('span');
    sortBy.className = 'sort_by';
    sortBy.innerHTML = "Trier par";
    dropdownMenu.appendChild(sortBy);
  }

  appendDropdown(dropdownMenu) {
    const dropdown = document.createElement('div');
    dropdown.className = "dropdown";
    this.appendDropdownButton(dropdown);
    this.createDropdownContent(dropdown);
    dropdownMenu.appendChild(dropdown);
  }

  appendDropdownButton(dropdown) {
    const dropdownButton = document.createElement('button');
    dropdownButton.className = 'dropdown__button';
    dropdownButton.role = "button";
    dropdownButton.innerHTML = this.SortEnum.POPULARITY;
    dropdown.appendChild(dropdownButton);
  }

  createDropdownContent(dropdown) {
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown__content';
    this.appendDropdownItemDATE(dropdownContent);
    this.appendDropdownItemTITLE(dropdownContent);
    dropdown.appendChild(dropdownContent);
  }

  appendDropdownItemDATE(dropdownContent) {
    const dropdownItemDATE = document.createElement('a');
    dropdownItemDATE.className = 'dropdown__content__item';
    dropdownItemDATE.innerHTML = this.SortEnum.DATE;
    dropdownContent.appendChild(dropdownItemDATE);
  }

  appendDropdownItemTITLE(dropdownContent) {
    const dropdownItemTITLE = document.createElement('a');
    dropdownItemTITLE.className = 'dropdown__content__item';
    dropdownItemTITLE.innerHTML = this.SortEnum.TITLE;
    dropdownContent.appendChild(dropdownItemTITLE);
  } //sticker photographer total number of likes and price


  renderSummary() {
    const summary = this.createSummary();
    this.createTotalLikes(summary);
    this.createPhotographerPrice(summary);
  }

  createSummary() {
    const stickerSummary = document.createElement('div');
    stickerSummary.className = 'sticker_summary';
    document.querySelector('main').appendChild(stickerSummary);
    return stickerSummary;
  }

  createPhotographerPrice(summary) {
    const photographerPrice = document.createElement('div');
    photographerPrice.className = "photographer_price";
    photographerPrice.innerHTML = this.currentPhotographer.getPrice() + "€/jour";
    summary.appendChild(photographerPrice);
  }

  createTotalLikes(summary) {
    let numberOfLikes = 0;
    this.mediaList.forEach(medium => {
      numberOfLikes = numberOfLikes + medium.getLikes();
    });
    const totalNumberOfLikes = document.createElement('div');
    totalNumberOfLikes.className = "total_likes";
    totalNumberOfLikes.innerHTML = "\n        <p class=\"total_number_of_likes\">" + numberOfLikes + "</p>\n        <i class=\"fas fa-heart fa-lg\" aria-label=\"likes\"></i>";
    summary.appendChild(totalNumberOfLikes);
  }

  incrementNumberOfLikes(mediumThumbnail) {
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
    const main = document.querySelector('main');
    main.appendChild(mediumThumbnail);
    const mediumThumbnailMiniature = mediumThumbnail.querySelector('.medium_thumbnail__miniature');
    mediumThumbnailMiniature.addEventListener('click', () => {
      if (this.selectedMedia.length == 0) {
        this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.mediaList);
      } else {
        this.lightboxMedia.showLightboxMedia(medium, this.currentPhotographer, this.selectedMedia);
      }
    });
    this.incrementNumberOfLikes(mediumThumbnail);
  }

  handleDropdownItemClick(dropdrownButton, item) {
    dropdrownButton.click();

    _Utils.Utils.removeChildOf("#app", "medium_thumbnail"); //remove everything


    this.sortBy(item.innerHTML); //sort

    this.swapDropdownItems(item, dropdrownButton); //swap
  }

  swapDropdownItems(item, dropdrownButton) {
    var temporary = item.innerHTML;
    item.innerHTML = dropdrownButton.innerHTML;
    dropdrownButton.innerHTML = temporary;
  } //a & b = media


  sortBy(sortType) {
    let sortedMedia = null;

    switch (sortType) {
      case this.SortEnum.DATE:
        sortedMedia = this.mediaList.sort((a, b) => new Date(b.getDate()) - new Date(a.getDate()));
        break;

      case this.SortEnum.POPULARITY:
        sortedMedia = this.mediaList.sort((a, b) => b.getLikes() - a.getLikes());
        break;

      case this.SortEnum.TITLE:
        sortedMedia = this.mediaList.sort((a, b) => a.getTitle().localeCompare(b.getTitle(), 'fr'));
        break;
    }

    console.log(sortedMedia);
    sortedMedia.forEach(sortedMedium => {
      this.createMediumThumbnail(sortedMedium);
    });
  }

}

exports.PhotographerPageBuilder = PhotographerPageBuilder;
},{"./MediaFactory":"scripts/factory/MediaFactory.js","./ContactModal":"scripts/factory/ContactModal.js","./LightboxMedia":"scripts/factory/LightboxMedia.js","./Tags":"scripts/factory/Tags.js","../utils/Utils":"scripts/utils/Utils.js","../models/PhotographerPageModel":"scripts/models/PhotographerPageModel.js","../models/PhotographerProfileModel":"scripts/models/PhotographerProfileModel.js","../models/MediumModel":"scripts/models/MediumModel.js"}],"scripts/factory/PageFactory.js":[function(require,module,exports) {
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
},{"./HomePageBuilder":"scripts/factory/HomePageBuilder.js","./PhotographerPageBuilder":"scripts/factory/PhotographerPageBuilder.js"}],"scripts/models/AppModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppModel = void 0;

var _HomePageModel = require("../models/HomePageModel");

var _MediumModel = require("./MediumModel");

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
},{"../models/HomePageModel":"scripts/models/HomePageModel.js","./MediumModel":"scripts/models/MediumModel.js","./PhotographerPageModel":"scripts/models/PhotographerPageModel.js"}],"scripts/utils/PhotographersUtils.js":[function(require,module,exports) {
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
},{}],"scripts/utils/DataFetcher.js":[function(require,module,exports) {
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
},{"../models/AppModel":"scripts/models/AppModel.js","../models/HomePageModel":"scripts/models/HomePageModel.js","../models/MediumModel":"scripts/models/MediumModel.js","../models/PhotographerPageModel":"scripts/models/PhotographerPageModel.js","../models/PhotographerProfileModel":"scripts/models/PhotographerProfileModel.js","./PhotographersUtils":"scripts/utils/PhotographersUtils.js"}],"Router.js":[function(require,module,exports) {
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
  regex: /\/[A-Za-z\-]{1,}\/[0-9]{0,3}?$/,
  component: pageFactory.getPage(_PageFactory.PageFactoryEnum.PHOTOGRAPHER, json.then(appModel => appModel.photographerPageModel))
}];

const router = () => {
  const idPhotographer = location.pathname.split('/')[2];
  routes.find(route => route.regex.test(location.pathname)).component.render(idPhotographer);
};

exports.router = router;
},{"./scripts/factory/PageFactory":"scripts/factory/PageFactory.js","./scripts/models/AppModel":"scripts/models/AppModel.js","./scripts/utils/DataFetcher":"scripts/utils/DataFetcher.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Router = require("./Router");

window.addEventListener('hashchange', _Router.router); // identifier of the URL changes

window.addEventListener('load', _Router.router); // ressource has loaded
},{"./Router":"Router.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63039" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/P6-Fisheye.e31bb0bc.js.map