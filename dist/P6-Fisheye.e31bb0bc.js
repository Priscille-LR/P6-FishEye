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
})({"scripts/utils/DataFetcher.js":[function(require,module,exports) {
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
      return fetch(this.dataSource) // ressource requeste
      .then(function (resp) {
        console.log(resp);
        return resp.json(); //JSON.parse not working
      });
    }
  }]);

  return DataFetcher;
}();

exports.DataFetcher = DataFetcher;
},{}],"scripts/factory/HomePageBuilder.js":[function(require,module,exports) {
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

// Nom de classe
var HomePageBuilder = /*#__PURE__*/function () {
  function HomePageBuilder(dataPromise) {
    _classCallCheck(this, HomePageBuilder);

    this.dataPromise = dataPromise;
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
      var header = document.createElement('header');
      header.className = 'header_home';
      header.innerHTML = "\n      <nav class=\"main_nav\" aria-label=\"photographer categories\">\n      </nav>";
      var main = document.querySelector("main");
      document.querySelector('body').insertBefore(header, main);
      var allTags = [];
      photographers.forEach(function (photographer) {
        photographer.tags.forEach(function (photographerTag) {
          allTags.push(photographerTag);
        });
      });

      var distinctTags = _toConsumableArray(new Set(allTags)); //remove duplicates
      //add each tag dynamically in the nav


      distinctTags.forEach(function (tag) {
        var headerTag = document.createElement('a');
        headerTag.className = 'main_nav__item';
        headerTag.innerHTML = "\n         <span>" + "#" + tag + "</span>\n        ";
        document.querySelector('.main_nav').appendChild(headerTag);
      });
    }
  }, {
    key: "renderMain",
    value: function renderMain(photographers) {
      photographers.forEach(function (photographer) {
        var article = document.createElement('article');
        article.className = 'article';
        article.innerHTML = "\n            \n          <a class=\"photographer_thumbnail\" href=\"#\">\n              <img\n                class=\"photographer_thumbnail__picture\"\n                src=\"static/" + photographer.portrait + "\"\n                alt=\"photographer's thumbnail picture\"\n              />\n            <div class=\"photographer_thumbnail__content\">\n              <h2 class=\"photographer_name\">" + photographer.name + "</h2>\n              <h3 class=\"photographer_location\">" + photographer.city + ", " + photographer.country + "</h3>\n              <p class=\"photographer_desc\">" + photographer.tagline + "</p>\n              <p class=\"photographer_price\">" + photographer.price + "€/jour" + "</p>\n              \n              <div class=\"tags\">\n              </div>\n            </div>\n          </a>";
        photographer.tags.forEach(function (photographerTag) {
          var tag = document.createElement('a');
          tag.className = 'tags__item';
          tag.innerHTML = "\n             <span>" + "#" + photographerTag + "</span>\n            ";
          article.querySelector('.tags').appendChild(tag);
        });
        document.querySelector('.photographers').appendChild(article);
      });
    }
  }]);

  return HomePageBuilder;
}();

exports.HomePageBuilder = HomePageBuilder;
},{}],"scripts/factory/PhotographerPageBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographerPageBuilder = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PhotographerPageBuilder = /*#__PURE__*/function () {
  function PhotographerPageBuilder(json, id) {
    _classCallCheck(this, PhotographerPageBuilder);

    this.jsonPromise = json;
    this.idPhotographer = id;
    this.isDropdownVisible = false; //dropdown menu hidden by default
  }

  _createClass(PhotographerPageBuilder, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.jsonPromise.then(function (jsonData) {
        var photographers = jsonData.photographers; //for each photographer, 
        //  if their id == photographer wanted 
        //  then save photographer in currentPhotographer 

        var currentPhotographer = null;
        photographers.forEach(function (photographer) {
          if (photographer.id == _this.idPhotographer) {
            currentPhotographer = photographer; //whose id -> given in constructor parameter
          }
        });
        var media = jsonData.media;
        var allMedia = []; //for each medium, 
        //  if photographer id in media object = id in photographers object,
        //  then add medium to array

        media.forEach(function (medium) {
          if (medium.photographerId == _this.idPhotographer) {
            allMedia.push(medium);
          }
        });

        _this.renderBanner(currentPhotographer);

        _this.renderMain(currentPhotographer, allMedia, currentPhotographer.price);
      });
    }
  }, {
    key: "renderBanner",
    value: function renderBanner(photographer) {
      //banner text content for photographer's profile page
      var bannerContent = document.createElement('div');
      bannerContent.className = 'banner__text_content';
      bannerContent.innerHTML = "\n\n            <h2 class=\"photographer_name\">" + photographer.name + "</h2>\n            <h3 class=\"photographer_location\">" + photographer.city + ", " + photographer.country + "</h3>\n            <p class=\"photographer_desc\">" + photographer.tagline + "</p>\n            \n            <div class=\"tags\">\n            </div>\n\n        ";
      photographer.tags.forEach(function (photographerTag) {
        var tag = document.createElement('a');
        tag.className = 'tags__item';
        tag.innerHTML = "\n         <span>" + "#" + photographerTag + "</span>\n        ";
        bannerContent.querySelector('.tags').appendChild(tag);
      });
      document.querySelector('.banner').appendChild(bannerContent); //contact button 

      var contactButton = document.createElement('button');
      contactButton.className = 'button_contact';
      contactButton.innerHTML = "Contactez-moi";
      document.querySelector('.banner').appendChild(contactButton); //photographer's picture

      var bannerPicture = document.createElement('div');
      bannerPicture.className = 'photographer__picture';
      bannerPicture.innerHTML = "\n            <img\n                class=\"photographer_thumbnail__picture\"\n                src=\"static/Photographers ID Photos/" + photographer.portrait + "\"\n                alt=\"photographer's thumbnail picture\"\n              />\n            ";
      document.querySelector('.banner').appendChild(bannerPicture);
    }
  }, {
    key: "renderMain",
    value: function renderMain(currentPhotographer, allMedia, price) {
      var numberOfLikes = 0;
      allMedia.forEach(function (medium) {
        var mediumThumbnail = document.createElement('div');
        mediumThumbnail.className = "medium_thumbnail";
        var tmpMedium = medium.image;

        if (tmpMedium == null) {
          tmpMedium = medium.video;
        }

        mediumThumbnail.innerHTML = "\n            <img\n            class=\"medium_thumbnail__picture\"\n            src=\"static/" + currentPhotographer.name.split(' ')[0] + "/" + tmpMedium + "\"\n            alt=\"bird picture\"\n          />\n          <div class=\"medium_thumbnail__content\">\n            <h2 class=\"medium_title\">Temporary title</h2>\n            <div class=\"price_and_likes\">\n              <span class=\"medium_price\">" + medium.price + "\u20AC</span>\n              <span class=\"medium_number_of_likes\">" + medium.likes + "</span>\n              <button class=\"like\">\n              <i class=\"fas fa-heart\"></i>\n              </button>\n            </div>\n          </div>\n            ";
        var main = document.querySelector('main');
        main.appendChild(mediumThumbnail);
        numberOfLikes = numberOfLikes + medium.likes;
      }); //sticker photographer total number of likes and price

      var totalNumberOfLikes = document.createElement('div');
      totalNumberOfLikes.className = "total_likes";
      totalNumberOfLikes.innerHTML = "\n        <p class=\"total_number_of_likes\">" + numberOfLikes + "</p>\n        <i class=\"fas fa-heart fa-lg\"></i>\n          \n        ";
      var summary = document.querySelector('.sticker_summary');
      summary.appendChild(totalNumberOfLikes);
      var photographerPrice = document.createElement('div');
      photographerPrice.className = "photographer_price";
      photographerPrice.innerHTML = price + "€/jour";
      summary.appendChild(photographerPrice);
      this.renderDropdown();
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown() {
      var _this2 = this;

      var dropdrownButton = document.querySelector('.dropdown__button');
      var dropdrownContent = document.querySelector('.dropdown__content');
      dropdrownButton.addEventListener('click', function () {
        if (_this2.isDropdownVisible == false) {
          dropdrownContent.style.display = "block";
          _this2.isDropdownVisible = true; //content visibility state 
        } else {
          dropdrownContent.style.display = "none";
          _this2.isDropdownVisible = false;
        }
      });
      var dropdownItems = document.getElementsByClassName("dropdown__content__item");

      var _iterator = _createForOfIteratorHelper(dropdownItems),
          _step;

      try {
        var _loop = function _loop() {
          var item = _step.value;
          item.addEventListener('click', function () {
            dropdrownContent.style.display = "none";
            this.isDropdownVisible = false; //dropdrownButton.click() 

            var temporary = item.innerHTML;
            item.innerHTML = dropdrownButton.innerHTML;
            dropdrownButton.innerHTML = temporary;
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
    } // //filters dropdown menu
    // const dropdownMenu = document.createElement('nav');
    // dropdownMenu.className = 'dropdown';
    // dropdownMenu.innerHTML = `
    // <button class="dropdown__button">Popularité</button>
    // <div class="dropdown__content
    // <a href="#">Date</a>
    // <a href="#">Titre</a>
    //     `;
    // document.querySelector('.dropdown').appendChild(dropdownMenu);

  }]);

  return PhotographerPageBuilder;
}();

exports.PhotographerPageBuilder = PhotographerPageBuilder;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _DataFetcher = require("./scripts/utils/DataFetcher");

var _HomePageBuilder = require("./scripts/factory/HomePageBuilder");

var _PhotographerPageBuilder = require("./scripts/factory/PhotographerPageBuilder");

//var json = require('./src/FishEyeDataFR.json'); 
var dataFetcher = new _DataFetcher.DataFetcher('./static/FishEyeDataFR.json');
var jsonPromise = dataFetcher.fetchSource(); // const homePageBuilder = new HomePageBuilder(jsonPromise)
// homePageBuilder.render();

var photographerPageBuilder = new _PhotographerPageBuilder.PhotographerPageBuilder(jsonPromise, 82);
photographerPageBuilder.render();
},{"./scripts/utils/DataFetcher":"scripts/utils/DataFetcher.js","./scripts/factory/HomePageBuilder":"scripts/factory/HomePageBuilder.js","./scripts/factory/PhotographerPageBuilder":"scripts/factory/PhotographerPageBuilder.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64746" + '/');

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