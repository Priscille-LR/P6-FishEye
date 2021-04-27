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
})({"scripts/factory/MediaFactory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaFactory = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MediaFactory = /*#__PURE__*/function () {
  function MediaFactory() {
    _classCallCheck(this, MediaFactory);

    _defineProperty(this, "mediaEnum", {
      PICTURE: "picture",
      VIDEO: "video"
    });
  }

  _createClass(MediaFactory, [{
    key: "getMediumType",
    value: function getMediumType(tmpMedium) {
      var extension = tmpMedium.split('.').pop();

      if (/(jpg)$/ig.test(extension)) {
        return this.mediaEnum.PICTURE;
      }

      if (/(mp4)$/ig.test(extension)) {
        return this.mediaEnum.VIDEO;
      }
    }
  }, {
    key: "extractMediumTitle",
    value: function extractMediumTitle(medium) {
      var tmpMedium = this.getMediumFile(medium);
      var mediumTitle = String(tmpMedium.toLowerCase());
      mediumTitle = mediumTitle.substring(0, tmpMedium.length - 4); //remove extension

      var mediumTitleArray = mediumTitle.split("_");
      mediumTitleArray.shift(); //remove 1st element in array 

      mediumTitle = mediumTitleArray.join(" "); //add elements of array into a string

      mediumTitle = mediumTitle.charAt(0).toUpperCase() + mediumTitle.slice(1);
      return mediumTitle;
    }
  }, {
    key: "renderMedium",
    value: function renderMedium(medium, currentPhotographer) {
      var mediumTitle = this.extractMediumTitle(medium);
      var mediumThumbnail = this.createMediumDisplay(medium, currentPhotographer, mediumTitle, "medium_thumbnail");
      this.appendThumbnailContent(mediumTitle, medium, mediumThumbnail);
      return mediumThumbnail;
    }
  }, {
    key: "appendThumbnailContent",
    value: function appendThumbnailContent(mediumTitle, medium, mediumThumbnail) {
      var mediumThumbnailContent = document.createElement('div');
      mediumThumbnailContent.className = "medium_thumbnail__content";
      mediumThumbnailContent.innerHTML = "\n            <h2 class=\"medium_title\">".concat(mediumTitle, "</h2>\n            <div class=\"price_and_likes\">\n              <span class=\"medium_price\">").concat(medium.price, "\u20AC</span>\n              <span class=\"medium_number_of_likes\">").concat(medium.likes, "</span>\n              <label class=\"checkbox__like\"> \n                <input type=\"checkbox\" class=\"checkbox__input\" name=\"like\">\n                    <i class=\"far fa-heart like__unchecked\"></i>\n                    <i class=\"fas fa-heart like__checked\"></i>\n                </input>   \n                </label>\n            </div>\n          </div>");
      mediumThumbnail.appendChild(mediumThumbnailContent);
    }
  }, {
    key: "createMediumDisplay",
    value: function createMediumDisplay(medium, currentPhotographer, mediumTitle, className) {
      var mediumThumbnail = document.createElement('div');
      mediumThumbnail.className = className;
      var mediumType = this.getMediumType(this.getMediumFile(medium));

      switch (mediumType) {
        case this.mediaEnum.PICTURE:
          {
            var _tmpMedium = String(medium.image);

            mediumThumbnail.innerHTML = "<img class=\"".concat(className, "__miniature\" \n                src=\"/static/").concat(currentPhotographer.name.split(' ')[0], "/").concat(_tmpMedium, "\"\n                alt=\"").concat(mediumTitle, "\"/>");
            break;
          }

        case this.mediaEnum.VIDEO:
          {
            var _tmpMedium2 = String(medium.video);

            mediumThumbnail.innerHTML = "\n                <video id=\"".concat(className, "__miniature\" title=\"").concat(mediumTitle, "\" controls>\n                <source src=\"/static/").concat(currentPhotographer.name.split(' ')[0], "/").concat(_tmpMedium2, "\">\n                type=\"video/mp4\">\n                </video>");
            break;
          }

        default:
          tmpMedium = String("");
      }

      return mediumThumbnail;
    }
  }, {
    key: "getMediumFile",
    value: function getMediumFile(medium) {
      var tmpMedium = medium.image;

      if (tmpMedium == null) {
        tmpMedium = medium.video;
      }

      return tmpMedium;
    }
  }]);

  return MediaFactory;
}();

exports.MediaFactory = MediaFactory;
},{}],"scripts/factory/ContactModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactModal = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ContactModal = /*#__PURE__*/function () {
  function ContactModal(currentPhotographer) {
    _classCallCheck(this, ContactModal);

    this.currentPhotographer = currentPhotographer;
  } //modal creation 


  _createClass(ContactModal, [{
    key: "renderContactModal",
    value: function renderContactModal() {
      this.createContactModal();
      this.createContactModalBody();
      this.contactModal = document.querySelector('.contact_modal');
    }
  }, {
    key: "createContactModal",
    value: function createContactModal() {
      var contactModal = document.createElement('div');
      contactModal.className = 'contact_modal';
      document.querySelector('main').appendChild(contactModal);
    }
  }, {
    key: "createContactModalBody",
    value: function createContactModalBody() {
      var modalBody = document.createElement('div');
      modalBody.className = 'contact_modal__body';
      this.appendModalTitle(modalBody);
      this.appendCloseButton(modalBody);
      this.appendContactForm(modalBody);
      this.createModalButton(modalBody);
      document.querySelector('.contact_modal').appendChild(modalBody);
    }
  }, {
    key: "appendModalTitle",
    value: function appendModalTitle(modalBody) {
      var modalTitle = document.createElement('h2');
      modalTitle.className = 'contact_modal__body__title';
      modalTitle.innerHTML = "Contactez-moi </br> ".concat(this.currentPhotographer.name);
      modalBody.appendChild(modalTitle);
    }
  }, {
    key: "appendCloseButton",
    value: function appendCloseButton(modalBody) {
      var _this = this;

      var closeButton = document.createElement('button');
      closeButton.className = 'close_button';
      closeButton.innerHTML = "<i class=\"fas fa-times fa-3x\"></i>";
      closeButton.addEventListener('click', function () {
        _this.hideContactModal();
      });
      modalBody.appendChild(closeButton);
    }
  }, {
    key: "appendContactForm",
    value: function appendContactForm(modalBody) {
      var contactForm = document.createElement('form');
      contactForm.className = 'contact_form';
      contactForm.setAttribute = ("method", "post");
      contactForm.setAttribute = ("action", "submit");
      this.createFormFields(contactForm);
      this.addEventListenerOnInputs(contactForm);
      modalBody.appendChild(contactForm);
    }
  }, {
    key: "createFormFields",
    value: function createFormFields(contactForm) {
      //Firstname
      var formData = this.createFormData();
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
  }, {
    key: "createFormData",
    value: function createFormData() {
      var formData = document.createElement('div');
      formData.className = 'formData';
      formData.innerHTML = "";
      return formData;
    }
  }, {
    key: "createLabel",
    value: function createLabel(forParam, textParam) {
      var label = document.createElement('label');
      label.setAttribute("for", forParam);
      label.innerHTML = "".concat(textParam);
      return label;
    }
  }, {
    key: "createInputField",
    value: function createInputField(id) {
      var inputField = document.createElement('input');
      inputField.className = 'input_field';
      inputField.type = "text";
      inputField.setAttribute("id", id);
      return inputField;
    }
  }, {
    key: "createTextArea",
    value: function createTextArea(id) {
      var textAreaInput = document.createElement('textarea');
      textAreaInput.className = 'input_field';
      textAreaInput.setAttribute("id", id);
      textAreaInput.setAttribute("rows", 5);
      return textAreaInput;
    }
  }, {
    key: "createModalButton",
    value: function createModalButton(modalBody) {
      var modalButton = document.createElement('button');
      modalButton.className = 'button_contact submit_button';
      modalButton.innerHTML = "Envoyer";
      modalBody.appendChild(modalButton);
    }
  }, {
    key: "showContactModal",
    value: function showContactModal() {
      this.contactModal.style.display = "block";
    }
  }, {
    key: "hideContactModal",
    value: function hideContactModal() {
      this.contactModal.style.display = "none";
    } //fields validation 
    //error message is displayed when field is invalid	

  }, {
    key: "showErrorMessage",
    value: function showErrorMessage(field, message) {
      field.setAttribute('data-error', message);
      field.setAttribute('data-error-visible', 'true');
    } //error message is hidden 

  }, {
    key: "hideErrorMessage",
    value: function hideErrorMessage(field) {
      field.removeAttribute('data-error');
      field.removeAttribute('data-error-visible');
    }
  }, {
    key: "validateFieldsFormat",
    value: function validateFieldsFormat(text) {
      var fieldFormat = /^[A-Za-z\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']{2,}$/;
      var emailAddressFormat = /\S+@\S+\.\S+/;
      var inputs = document.querySelectorAll('.input_field');
      inputs.forEach(function (input) {
        if (input.id === "email") {
          if (text.length != 0 && emailAddressFormat.test(text)) {
            return true;
          } else {
            return false;
          }
        } else {
          if (text.length != 0 && fieldFormat.test(text)) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
  }, {
    key: "addEventListenerOnInputs",
    value: function addEventListenerOnInputs(contactForm) {
      var _this2 = this;

      var inputs = contactForm.querySelectorAll('.input_field');
      inputs.forEach(function (input) {
        input.addEventListener('blur', function () {
          if (_this2.validateFieldsFormat(input.value) === true) {
            _this2.hideErrorMessage(input.parentElement);
          } else {
            console.log("input ".concat(input.id, " got an error"));

            _this2.showErrorMessage(input.parentElement, 'Veuillez entrer au moins 2 caractères');
          }
        });
      });
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this3 = this;

      var form = document.querySelector('.contact_form');
      form.addEventListener('submit', function () {
        e.preventDefault();
        console.log(inputs);

        _this3.hideContactModal();
      });
    }
  }]);

  return ContactModal;
}();

exports.ContactModal = ContactModal;
},{}],"scripts/factory/LightboxMedia.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightboxMedia = void 0;

var _MediaFactory = require("./MediaFactory");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LightboxMedia = /*#__PURE__*/function () {
  function LightboxMedia(allMedia, currentPhotographer) {
    _classCallCheck(this, LightboxMedia);

    this.allMedia = allMedia;
    this.currentPhotographer = currentPhotographer;
    this.mediaFactory = new _MediaFactory.MediaFactory();
  }

  _createClass(LightboxMedia, [{
    key: "renderLightboxMedia",
    value: function renderLightboxMedia() {
      this.createLightboxMedia();
      this.createLightboxMediaBody();
      this.lightboxMedia = document.querySelector('.lightbox_media');
    }
  }, {
    key: "createLightboxMedia",
    value: function createLightboxMedia() {
      var lightboxMedia = document.createElement('div');
      lightboxMedia.className = 'lightbox_media';
      document.querySelector('main').appendChild(lightboxMedia);
    }
  }, {
    key: "createLightboxMediaBody",
    value: function createLightboxMediaBody() {
      var lightboxBody = document.createElement('div');
      lightboxBody.className = 'lightbox_media__body';
      this.appendCloseButton(lightboxBody);
      this.appendPreviousButton(lightboxBody);
      this.appendMediumBox(lightboxBody);
      this.appendNextButton(lightboxBody);
      document.querySelector('.lightbox_media').appendChild(lightboxBody);
    }
  }, {
    key: "appendCloseButton",
    value: function appendCloseButton(lightboxBody) {
      var _this = this;

      var closeButton = document.createElement('button');
      closeButton.className = 'close_button_lightbox';
      closeButton.innerHTML = "<i class=\"fas fa-times fa-3x\"></i>";
      closeButton.addEventListener('click', function () {
        _this.hideLightboxMedia();
      });
      lightboxBody.appendChild(closeButton);
    }
  }, {
    key: "appendPreviousButton",
    value: function appendPreviousButton(lightboxBody) {
      var previousButton = document.createElement('button');
      previousButton.className = 'previous_button';
      previousButton.innerHTML = "<i class=\"fas fa-chevron-left fa-3x\"></i>";
      lightboxBody.appendChild(previousButton);
    }
  }, {
    key: "appendMediumBox",
    value: function appendMediumBox(lightboxBody) {
      var mediumBox = document.createElement('div');
      mediumBox.className = "medium_box";
      lightboxBody.appendChild(mediumBox);
    }
  }, {
    key: "appendMedium",
    value: function appendMedium() {}
  }, {
    key: "appendNextButton",
    value: function appendNextButton(lightboxBody) {
      var nextButton = document.createElement('button');
      nextButton.className = 'next_button';
      nextButton.innerHTML = "<i class=\"fas fa-chevron-right fa-3x\"></i>";
      lightboxBody.appendChild(nextButton);
    }
  }, {
    key: "showLightboxMedia",
    value: function showLightboxMedia(medium, currentPhotographer, title) {
      this.removeLightboxMedium();
      var lightboxMedium = this.mediaFactory.createMediumDisplay(medium, currentPhotographer, title, "lightbox_medium");
      document.querySelector('.medium_box').appendChild(lightboxMedium);
      this.lightboxMedia.style.display = "block";
    }
  }, {
    key: "hideLightboxMedia",
    value: function hideLightboxMedia() {
      this.lightboxMedia.style.display = "none";
    }
  }, {
    key: "removeLightboxMedium",
    value: function removeLightboxMedium() {
      var mainNode = document.querySelector('.medium_box');

      for (var index = mainNode.childNodes.length - 1; index >= 0; index--) {
        var child = mainNode.childNodes[index];
        mainNode.removeChild(child);
      }
    }
  }]);

  return LightboxMedia;
}();

exports.LightboxMedia = LightboxMedia;
},{"./MediaFactory":"scripts/factory/MediaFactory.js"}],"scripts/factory/PhotographerPageBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographerPageBuilder = void 0;

var _MediaFactory = require("./MediaFactory");

var _ContactModal = require("./ContactModal");

var _LightboxMedia = require("./LightboxMedia");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PhotographerPageBuilder = /*#__PURE__*/function () {
  function PhotographerPageBuilder(props) {
    _classCallCheck(this, PhotographerPageBuilder);

    _defineProperty(this, "SortEnum", {
      DATE: "Date",
      POPULARITY: "Popularité",
      TITLE: "Titre"
    });

    this.jsonPromise = props.json;
    this.isDropdownVisible = false; //dropdown menu hidden by default

    this.allMedia = [];
    this.photographerTags = [];
    this.mediaFactory = new _MediaFactory.MediaFactory();
  }

  _createClass(PhotographerPageBuilder, [{
    key: "render",
    value: function render(id) {
      var _this = this;

      this.idPhotographer = id;
      this.jsonPromise.then(function (jsonData) {
        _this.determineCurrentPhotographer(jsonData.photographers);

        _this.determineCurrentPhotographerMedia(jsonData.media);

        _this.renderHeader();

        _this.renderMain();

        _this.contactModal = new _ContactModal.ContactModal(_this.currentPhotographer);

        _this.contactModal.renderContactModal();

        _this.lightboxMedia = new _LightboxMedia.LightboxMedia(_this.allMedia, _this.currentPhotographer);

        _this.lightboxMedia.renderLightboxMedia();
      });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var header = this.createHeader();
      this.appendLogo(header);
      var main = document.querySelector("main");
      document.querySelector('body').insertBefore(header, main);
    }
  }, {
    key: "createHeader",
    value: function createHeader() {
      var header = document.createElement('header');
      header.className = 'header_photographer_page';
      return header;
    }
  }, {
    key: "appendLogo",
    value: function appendLogo(header) {
      var logo = document.createElement('a');
      logo.className = 'logo';
      logo.setAttribute("href", "/");
      logo.innerHTML = "<img class=\"logo_img\" src=\"/static/logo.svg\" alt=\"logo\" />";
      header.appendChild(logo);
    } // for each photographer, 
    //  if their id == photographer wanted 
    //  then save photographer in currentPhotographer 

  }, {
    key: "determineCurrentPhotographer",
    value: function determineCurrentPhotographer(photographers) {
      var _this2 = this;

      photographers.forEach(function (photographer) {
        if (photographer.id == _this2.idPhotographer) {
          _this2.currentPhotographer = photographer;
        }
      });
    } //for each medium, 
    //  if photographer id in media object = id in photographers object,
    //  then add medium to array

  }, {
    key: "determineCurrentPhotographerMedia",
    value: function determineCurrentPhotographerMedia(media) {
      var _this3 = this;

      media.forEach(function (medium) {
        if (medium.photographerId == _this3.idPhotographer) {
          _this3.allMedia.push(medium);
        }
      });
    }
  }, {
    key: "renderMain",
    value: function renderMain() {
      this.renderBanner();
      this.renderSummary();
      this.renderDropdown();
      this.sortBy(this.SortEnum.POPULARITY);
    }
  }, {
    key: "renderBanner",
    value: function renderBanner() {
      this.createBanner();
      this.createBannerContent();
      this.createBannerButton();
      this.createBannerPicture();
    }
  }, {
    key: "createBanner",
    value: function createBanner() {
      var banner = document.createElement('div');
      banner.className = 'banner';
      banner.innerHTML = "";
      document.querySelector('main').appendChild(banner);
    }
  }, {
    key: "createBannerContent",
    value: function createBannerContent() {
      var bannerContent = document.createElement('div');
      bannerContent.className = 'banner__text_content';
      bannerContent.innerHTML = "\n\n            <h2 class=\"photographer_name\">".concat(this.currentPhotographer.name, "</h2>\n            <h3 class=\"photographer_location\">").concat(this.currentPhotographer.city, ", ").concat(this.currentPhotographer.country, "</h3>\n            <p class=\"photographer_desc\">").concat(this.currentPhotographer.tagline, "</p>\n            \n            <div class=\"tags tags_photographer_page\">\n            </div>");
      document.querySelector('.banner').appendChild(bannerContent);
      this.appendBannerContentTags(bannerContent);
    }
  }, {
    key: "appendBannerContentTags",
    value: function appendBannerContentTags(bannerContent) {
      var _this4 = this;

      this.currentPhotographer.tags.forEach(function (photographerTag) {
        var tag = document.createElement('a');
        tag.className = 'tags__item';
        tag.innerHTML = "<span>#".concat(photographerTag, "</span>");
        bannerContent.querySelector('.tags').appendChild(tag);
        tag.addEventListener('click', function () {
          _this4.photographerTags.push(photographerTag);

          _this4.photographerTags = _toConsumableArray(new Set(_this4.photographerTags));

          _this4.handleTagClick();
        });
      });
    }
  }, {
    key: "handleTagClick",
    value: function handleTagClick() {
      this.removeAllThumbnails();
      this.sortMedia();
    }
  }, {
    key: "sortMedia",
    value: function sortMedia() {
      var _this5 = this;

      var selectedMedia = [];
      this.photographerTags.forEach(function (clickedPhotographerTag) {
        _this5.allMedia.forEach(function (medium) {
          medium.tags.forEach(function (tag) {
            if (tag == clickedPhotographerTag) {
              selectedMedia.push(medium);
            }
          });
        });
      });
      selectedMedia = _toConsumableArray(new Set(selectedMedia));
      selectedMedia.forEach(function (selectedMedium) {
        _this5.createMediumThumbnail(selectedMedium);
      });
    }
  }, {
    key: "createBannerButton",
    value: function createBannerButton() {
      var _this6 = this;

      var contactButton = document.createElement('button');
      contactButton.className = 'button_contact';
      contactButton.innerHTML = "Contactez-moi";
      contactButton.addEventListener('click', function () {
        _this6.launchContactModal();
      });
      document.querySelector('.banner').appendChild(contactButton);
    }
  }, {
    key: "createBannerPicture",
    value: function createBannerPicture() {
      var bannerPicture = document.createElement('div');
      bannerPicture.className = 'photographer__picture';
      bannerPicture.innerHTML = "\n            <img\n                class=\"photographer_thumbnail__picture picture_profile\"\n                src=\"/static/Photographers ID Photos/".concat(this.currentPhotographer.portrait, "\"\n                alt=\"photographer's thumbnail picture\"\n              />");
      document.querySelector('.banner').appendChild(bannerPicture);
    }
  }, {
    key: "launchContactModal",
    value: function launchContactModal() {
      this.contactModal.showContactModal();
    } //sticker photographer total number of likes and price

  }, {
    key: "renderSummary",
    value: function renderSummary() {
      var summary = this.createSummary();
      this.createTotalLikes(summary);
      this.createPhotographerPrice(summary);
    }
  }, {
    key: "createSummary",
    value: function createSummary() {
      var stickerSummary = document.createElement('div');
      stickerSummary.className = 'sticker_summary';
      stickerSummary.innerHTML = "";
      document.querySelector('main').appendChild(stickerSummary);
      return stickerSummary;
    }
  }, {
    key: "createTotalLikes",
    value: function createTotalLikes(summary) {
      var numberOfLikes = 0;
      this.allMedia.forEach(function (medium) {
        numberOfLikes = numberOfLikes + medium.likes;
      });
      var totalNumberOfLikes = document.createElement('div');
      totalNumberOfLikes.className = "total_likes";
      totalNumberOfLikes.innerHTML = "\n        <p class=\"total_number_of_likes\">" + numberOfLikes + "</p>\n        <i class=\"fas fa-heart fa-lg\"></i>";
      summary.appendChild(totalNumberOfLikes);
    }
  }, {
    key: "incrementNumberOfLikes",
    value: function incrementNumberOfLikes(mediumThumbnail) {
      var likeButton = mediumThumbnail.querySelector('.checkbox__input');
      var mediumLikes = mediumThumbnail.querySelector('.medium_number_of_likes');
      var totalLikes = document.querySelector('.total_number_of_likes');
      likeButton.addEventListener('change', function () {
        if (likeButton.checked) {
          mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) + 1;
          totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
        } else {
          mediumLikes.innerHTML = parseInt(mediumLikes.innerHTML) - 1;
          totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
        }
      });
    }
  }, {
    key: "createMediumThumbnail",
    value: function createMediumThumbnail(medium) {
      var _this7 = this;

      var mediumThumbnail = this.mediaFactory.renderMedium(medium, this.currentPhotographer);
      mediumThumbnail.addEventListener('click', function () {
        var title = mediumThumbnail.querySelector(".medium_thumbnail__miniature").getAttribute("alt");

        _this7.lightboxMedia.showLightboxMedia(medium, _this7.currentPhotographer, title);
      });
      var main = document.querySelector('main');
      main.appendChild(mediumThumbnail);
      this.incrementNumberOfLikes(mediumThumbnail);
    } // countTotalLikes() {
    // }

  }, {
    key: "createPhotographerPrice",
    value: function createPhotographerPrice(stickerSummary) {
      var price = this.currentPhotographer.price;
      var photographerPrice = document.createElement('div');
      photographerPrice.className = "photographer_price";
      photographerPrice.innerHTML = price + "€/jour";
      stickerSummary.appendChild(photographerPrice);
    }
  }, {
    key: "removeAllThumbnails",
    value: function removeAllThumbnails() {
      var mainNode = document.querySelector('main');

      for (var index = mainNode.childNodes.length - 1; index >= 0; index--) {
        var child = mainNode.childNodes[index];

        if (child.className == "medium_thumbnail") {
          mainNode.removeChild(child);
        }
      }
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown() {
      var _this8 = this;

      this.createDropdownMenu();
      this.createSortByText();
      this.createDropdown();
      var dropdrownButton = document.querySelector('.dropdown__button');
      var dropdrownContent = document.querySelector('.dropdown__content');
      dropdrownButton.addEventListener('click', function () {
        if (_this8.isDropdownVisible == false) {
          dropdrownContent.style.display = "block";
          _this8.isDropdownVisible = true; //content visibility state 
        } else {
          dropdrownContent.style.display = "none";
          _this8.isDropdownVisible = false;
        }
      });
      var dropdownItems = document.getElementsByClassName("dropdown__content__item");

      var _iterator = _createForOfIteratorHelper(dropdownItems),
          _step;

      try {
        var _loop = function _loop() {
          var item = _step.value;
          item.addEventListener('click', function () {
            _this8.handleDropdownItemClick(dropdrownButton, item);
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "createDropdownMenu",
    value: function createDropdownMenu() {
      var dropdownMenu = document.createElement('div');
      dropdownMenu.className = "dropdown_menu";
      dropdownMenu.innerHTML = "";
      var main = document.querySelector('main');
      main.appendChild(dropdownMenu);
    }
  }, {
    key: "createSortByText",
    value: function createSortByText() {
      var sortBy = document.createElement('span');
      sortBy.className = 'sort_by';
      sortBy.innerHTML = "Trier par";
      document.querySelector('.dropdown_menu').appendChild(sortBy);
    }
  }, {
    key: "createDropdown",
    value: function createDropdown() {
      var dropdown = document.createElement('div');
      dropdown.className = "dropdown";
      dropdown.innerHTML = "\n        <button class=\"dropdown__button\">".concat(this.SortEnum.POPULARITY, "</button>\n        <div class=\"dropdown__content\">\n            <a class=\"dropdown__content__item\" href=\"#\">").concat(this.SortEnum.DATE, "</a>\n            <a class=\"dropdown__content__item\" href=\"#\">").concat(this.SortEnum.TITLE, "</a>\n      </div>");
      document.querySelector('.dropdown_menu').appendChild(dropdown);
    }
  }, {
    key: "handleDropdownItemClick",
    value: function handleDropdownItemClick(dropdrownButton, item) {
      dropdrownButton.click();
      this.removeAllThumbnails(); //remove everything

      this.sortBy(item.innerHTML); //sort

      this.swapDropdownItems(item, dropdrownButton); //swap
    }
  }, {
    key: "swapDropdownItems",
    value: function swapDropdownItems(item, dropdrownButton) {
      var temporary = item.innerHTML;
      item.innerHTML = dropdrownButton.innerHTML;
      dropdrownButton.innerHTML = temporary;
    } //a & b = media

  }, {
    key: "sortBy",
    value: function sortBy(sortType) {
      var _this9 = this;

      var sortedMedia = null;

      switch (sortType) {
        case this.SortEnum.DATE:
          sortedMedia = this.allMedia.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });
          break;

        case this.SortEnum.POPULARITY:
          sortedMedia = this.allMedia.sort(function (a, b) {
            return b.likes - a.likes;
          });
          break;

        case this.SortEnum.TITLE:
          sortedMedia = this.allMedia.sort(this.compareTitle);
          break;
      }

      sortedMedia.forEach(function (sortedMedium) {
        _this9.createMediumThumbnail(sortedMedium);
      });
    }
  }, {
    key: "compareTitle",
    value: function compareTitle(a, b) {
      var t1 = this.mediaFactory.extractMediumTitle(a);
      var t2 = this.mediaFactory.extractMediumTitle(b);
      return t1.localeCompare(t2, 'fr');
    }
  }]);

  return PhotographerPageBuilder;
}();

exports.PhotographerPageBuilder = PhotographerPageBuilder;
},{"./MediaFactory":"scripts/factory/MediaFactory.js","./ContactModal":"scripts/factory/ContactModal.js","./LightboxMedia":"scripts/factory/LightboxMedia.js"}],"scripts/factory/HomePageBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePageBuilder = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomePageBuilder = /*#__PURE__*/function () {
  function HomePageBuilder(props) {
    _classCallCheck(this, HomePageBuilder);

    this.dataPromise = props.json;
    this.clickedNavTags = [];
  } //display header and main (home page)


  _createClass(HomePageBuilder, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.dataPromise.then(function (jsonData) {
        var photographers = jsonData.photographers;

        _this.renderHeader(photographers);

        _this.renderMain(photographers);
      });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(photographers) {
      var header = this.createHeader();
      this.appendLogo(header);
      this.appendMainNav(photographers, header);
      var main = document.querySelector("main");
      document.querySelector('body').insertBefore(header, main); // document.querySelector(".banner").style.display = "none";
      // document.querySelector(".dropdown_menu").style.display = "none";
      // document.querySelector(".sticker_summary").style.display = "none";
    }
  }, {
    key: "createHeader",
    value: function createHeader() {
      var header = document.createElement('header');
      header.className = 'header_home';
      return header;
    }
  }, {
    key: "appendLogo",
    value: function appendLogo(header) {
      var logo = document.createElement('a');
      logo.className = 'logo';
      logo.innerHTML = "\n        <img class=\"logo_img\" src=\"/static/logo.svg\" alt=\"logo\" />\n        ";
      header.appendChild(logo);
    }
  }, {
    key: "appendMainNav",
    value: function appendMainNav(photographers, header) {
      var mainNav = document.createElement('nav');
      mainNav.className = 'main_nav';
      this.appendNavTags(photographers, mainNav);
      header.appendChild(mainNav);
    }
  }, {
    key: "appendNavTags",
    value: function appendNavTags(photographers, nav) {
      var _this2 = this;

      var allTags = photographers.map(function (photographer) {
        return photographer.tags;
      }).flat();

      var distinctTags = _toConsumableArray(new Set(allTags)); //remove duplicates
      //add each tag dynamically in the nav


      distinctTags.forEach(function (tag) {
        var headerTag = document.createElement('a');
        var tagName = tag.charAt(0).toUpperCase() + tag.substring(1);
        headerTag.className = 'main_nav__item';
        headerTag.innerHTML = "<span>#".concat(tagName, "</span>");
        nav.appendChild(headerTag); //listen to clicks on main nav tags

        headerTag.addEventListener("click", function (event) {
          _this2.clickedNavTags.push(tag);

          _this2.clickedNavTags = _toConsumableArray(new Set(_this2.clickedNavTags));

          _this2.handleTagClick(photographers);
        });
      });
    }
  }, {
    key: "handleTagClick",
    value: function handleTagClick(photographers) {
      this.removeAllThumbnails();
      this.sortPhotographers(photographers);
    }
  }, {
    key: "removeAllThumbnails",
    value: function removeAllThumbnails() {
      var photographersNode = document.querySelector('.photographers');

      for (var index = photographersNode.childNodes.length - 1; index >= 0; index--) {
        var child = photographersNode.childNodes[index];
        photographersNode.removeChild(child);
      }
    }
  }, {
    key: "sortPhotographers",
    value: function sortPhotographers(photographers) {
      var selectedPhotographers = [];
      this.clickedNavTags.forEach(function (clickedNavTag) {
        photographers.forEach(function (photographer) {
          if (photographer.tags.includes(clickedNavTag)) {
            selectedPhotographers.push(photographer);
          }
        });
      });
      selectedPhotographers = _toConsumableArray(new Set(selectedPhotographers));
      this.createArticle(selectedPhotographers);
    }
  }, {
    key: "renderMain",
    value: function renderMain(photographers) {
      this.createMainTitle();
      this.createArticle(photographers);
    }
  }, {
    key: "createMainTitle",
    value: function createMainTitle() {
      var title = document.createElement('h1');
      title.className = 'main_title';
      title.innerHTML = "Nos photographes";
      document.querySelector("main").appendChild(title);
    }
  }, {
    key: "createArticle",
    value: function createArticle(photographers) {
      var _this3 = this;

      photographers.forEach(function (photographer) {
        var article = document.createElement('article');
        article.className = 'article';
        article.innerHTML = "<a class=\"photographer_thumbnail\" href=\"/photographers-profile/".concat(photographer.id, "\">");

        _this3.appendPhotographerThumbnailPicture(article, photographer);

        _this3.appendPhotographerThumbnailContent(article, photographer);

        document.querySelector('.photographers').appendChild(article);
      });
    }
  }, {
    key: "appendPhotographerThumbnailPicture",
    value: function appendPhotographerThumbnailPicture(article, photographer) {
      var thumbnailPicture = document.createElement('a');
      thumbnailPicture.className = 'photographer_thumbnail__picture';
      thumbnailPicture.innerHTML = "\n        <img class=\"photographer_thumbnail__picture\"\n        src=\"/static/Photographers ID Photos/".concat(photographer.portrait, "\"\n        alt=\"photographer's thumbnail picture\" />");
      article.querySelector('.photographer_thumbnail').appendChild(thumbnailPicture);
    }
  }, {
    key: "appendPhotographerThumbnailContent",
    value: function appendPhotographerThumbnailContent(article, photographer) {
      var thumbnailContent = document.createElement('div');
      thumbnailContent.className = 'photographer_thumbnail__content';
      thumbnailContent.innerHTML = "\n        <h2 class=\"photographer_name\">".concat(photographer.name, "</h2>\n        <h3 class=\"photographer_location\">").concat(photographer.city, ", ").concat(photographer.country, "</h3>\n        <p class=\"photographer_desc\">").concat(photographer.tagline, "</p>\n        <p class=\"photographer_price\">").concat(photographer.price, "\u20AC/jour</p>\n        <div class=\"tags\"></div>");
      photographer.tags.forEach(function (photographerTag) {
        var tag = document.createElement('a');
        tag.className = 'tags__item';
        tag.innerHTML = "<span>#".concat(photographerTag, "</span>");
        thumbnailContent.querySelector('.tags').appendChild(tag);
      });
      article.querySelector('.photographer_thumbnail').appendChild(thumbnailContent);
    }
  }]);

  return HomePageBuilder;
}();

exports.HomePageBuilder = HomePageBuilder;
},{}],"scripts/factory/PageFactory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageFactory = void 0;

var _PhotographerPageBuilder = require("./PhotographerPageBuilder");

var _HomePageBuilder = require("./HomePageBuilder");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//Map[key] = value
var registeredPages = {};
registeredPages["photographerPage"] = _PhotographerPageBuilder.PhotographerPageBuilder;
registeredPages["homePage"] = _HomePageBuilder.HomePageBuilder;

var PageFactory = /*#__PURE__*/function () {
  function PageFactory() {
    _classCallCheck(this, PageFactory);
  }

  _createClass(PageFactory, [{
    key: "getPage",
    value: function getPage(type, props) {
      return new registeredPages[type](props);
    }
  }]);

  return PageFactory;
}();

exports.PageFactory = PageFactory;
},{"./PhotographerPageBuilder":"scripts/factory/PhotographerPageBuilder.js","./HomePageBuilder":"scripts/factory/HomePageBuilder.js"}],"scripts/utils/DataFetcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFetcher = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataFetcher = /*#__PURE__*/function () {
  function DataFetcher(dataSource) {
    _classCallCheck(this, DataFetcher);

    this.dataSource = dataSource; //json file
  }

  _createClass(DataFetcher, [{
    key: "fetchSource",
    value: function fetchSource() {
      return fetch(this.dataSource) // ressource request
      .then(function (resp) {
        console.log(resp);
        return resp.json();
      });
    }
  }]);

  return DataFetcher;
}();

exports.DataFetcher = DataFetcher;
},{}],"Router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _PageFactory = require("./scripts/factory/PageFactory");

var _DataFetcher = require("./scripts/utils/DataFetcher");

var dataFetcher = new _DataFetcher.DataFetcher('/static/FishEyeDataFR.json');
var jsonPromise = dataFetcher.fetchSource();
var pageFactory = new _PageFactory.PageFactory();
var props = {
  json: jsonPromise
}; //possible routes

var routes = [{
  path: "/",
  component: pageFactory.getPage("homePage", props)
}, {
  path: "/photographers-profile/",
  component: pageFactory.getPage("photographerPage", props)
}]; //match for photographer page regex

var photographerURLRegex = /\/[A-Za-z\-]{1,}\/[0-9]{0,3}?$/;

var router = function router() {
  //for each route, return component (page)
  // check if requested page corresponds to a photographer page (with regex)
  var potentialMatches = routes.map(function (route) {
    return {
      component: route.component,
      result: photographerURLRegex.test(route.path) && photographerURLRegex.test(location.pathname) //current url

    };
  });
  var matchedPage = potentialMatches.find(function (potentialMatch) {
    return potentialMatch.result == true;
  });

  if (matchedPage != null) {
    // photographer page match
    var idPhotographer = location.pathname.split('/')[2];
    matchedPage.component.render(idPhotographer);
  } else {
    routes.find(function (route) {
      return route.path == "/";
    }).component.render(); //return to home page
  }
};

exports.router = router;
},{"./scripts/factory/PageFactory":"scripts/factory/PageFactory.js","./scripts/utils/DataFetcher":"scripts/utils/DataFetcher.js"}],"index.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65310" + '/');

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