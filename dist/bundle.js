/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ({

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(194);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(198)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./styles.scss", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./styles.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(195);
exports = module.exports = __webpack_require__(196)(false);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box; }\n\nhtml {\n  -webkit-font-smoothing: antialiased;\n  background: url(\"/moon.jpeg\");\n  background-size: cover;\n  background-attachment: fixed;\n  box-sizing: border-box;\n  color: #fff;\n  font-family: Avenir, Helvetica, sans-serif;\n  font-size: 25px;\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\nsection {\n  margin: 40px auto;\n  max-width: 1150px; }\n\n.glitch {\n  color: transparent;\n  font-family: NATS;\n  font-size: 100px;\n  letter-spacing: 105px;\n  line-height: 1;\n  margin: 50px 0;\n  text-transform: uppercase; }\n  .glitch + p {\n    font-size: 30px;\n    letter-spacing: 9px;\n    margin: 0;\n    text-transform: uppercase; }\n\nh2 {\n  letter-spacing: 3px;\n  text-transform: uppercase; }\n\nli {\n  list-style-type: none;\n  text-align: center; }\n\n.card {\n  align-items: center;\n  background: #000;\n  border-radius: 2px;\n  display: flex;\n  font-size: 20px;\n  justify-content: space-between;\n  line-height: 0;\n  margin-bottom: 16px;\n  padding: 10px 30px;\n  position: relative; }\n  .card::after {\n    animation: gradient 3s ease alternate infinite;\n    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);\n    background-size: 300% 300%;\n    border-radius: 2px;\n    content: '';\n    height: calc(100% + 1px * 2);\n    left: calc(-1 * 1px);\n    position: absolute;\n    top: calc(-1 * 1px);\n    width: calc(100% + 1px * 2);\n    z-index: -1; }\n  .card p {\n    font-size: 15px;\n    text-transform: uppercase; }\n    .card p span {\n      margin-right: 7px; }\n  .card:first-of-type {\n    background: none; }\n    .card:first-of-type h2,\n    .card:first-of-type p {\n      font-size: 30px; }\n  .card:nth-of-type(2) h2,\n  .card:nth-of-type(2) p {\n    font-size: 25px; }\n  .card:nth-of-type(3) h2,\n  .card:nth-of-type(3) p {\n    font-size: 20px; }\n\n.request {\n  width: 100%;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 60px; }\n  .request input,\n  .request button {\n    height: 100%;\n    background: white;\n    font-size: 25px;\n    border: none; }\n  .request input {\n    padding: 13px;\n    width: 100%; }\n  .request button {\n    width: 20%;\n    margin: 20px 0;\n    background-image: linear-gradient(-134deg, #3023AE 0%, #C86DD7 100%);\n    color: white;\n    border-radius: 0; }\n\n.playlist img {\n  max-width: 200px;\n  opacity: 0; }\n\n.currently-playing,\n.up-next:nth-of-type(2),\n.up-next:nth-of-type(3) {\n  display: flex;\n  align-items: center;\n  margin: 100px; }\n\n.currently-playing {\n  justify-content: center; }\n  .currently-playing .song-info {\n    transform: translateX(0);\n    animation: fadeInLeftFirst 750ms ease 250ms forwards; }\n  .currently-playing h2 {\n    font-size: 40px; }\n  .currently-playing h3 {\n    font-size: 30px; }\n  .currently-playing img {\n    max-width: 350px;\n    animation: fadeIn 500ms ease forwards; }\n\n.up-next {\n  font-size: 70%; }\n  .up-next:nth-of-type(2) {\n    justify-content: flex-end; }\n    .up-next:nth-of-type(2) .song-info {\n      animation: fadeInLeft 500ms ease 750ms forwards; }\n    .up-next:nth-of-type(2) img {\n      animation: fadeIn 500ms ease 500ms forwards; }\n  .up-next:nth-of-type(3) .song-info {\n    animation: fadeInLeft 500ms ease 1.25s forwards; }\n  .up-next:nth-of-type(3) img {\n    animation: fadeIn 500ms ease 1s forwards; }\n\n.song-info {\n  background: #fffffff0;\n  padding: 30px 100px 30px 40px;\n  line-height: 1.4;\n  opacity: 0; }\n  .song-info p {\n    font-size: 22px;\n    text-transform: lowercase;\n    letter-spacing: 7px;\n    font-style: italic;\n    color: #3e2ab1; }\n  .song-info h2,\n  .song-info h3 {\n    color: #000; }\n  .song-info h3 {\n    color: #696969;\n    letter-spacing: 7px;\n    text-transform: uppercase; }\n  .song-info h2,\n  .song-info h3,\n  .song-info p {\n    margin: 0; }\n\n.glitch {\n  color: white;\n  font-size: 100px;\n  position: relative; }\n\n@keyframes noise-anim {\n  0% {\n    clip: rect(93px, 9999px, 70px, 0); }\n  5% {\n    clip: rect(43px, 9999px, 51px, 0); }\n  10% {\n    clip: rect(23px, 9999px, 2px, 0); }\n  15% {\n    clip: rect(99px, 9999px, 34px, 0); }\n  20% {\n    clip: rect(21px, 9999px, 83px, 0); }\n  25% {\n    clip: rect(41px, 9999px, 26px, 0); }\n  30% {\n    clip: rect(28px, 9999px, 53px, 0); }\n  35% {\n    clip: rect(88px, 9999px, 13px, 0); }\n  40% {\n    clip: rect(34px, 9999px, 63px, 0); }\n  45% {\n    clip: rect(42px, 9999px, 19px, 0); }\n  50% {\n    clip: rect(61px, 9999px, 18px, 0); }\n  55% {\n    clip: rect(95px, 9999px, 47px, 0); }\n  60% {\n    clip: rect(72px, 9999px, 20px, 0); }\n  65% {\n    clip: rect(29px, 9999px, 90px, 0); }\n  70% {\n    clip: rect(45px, 9999px, 25px, 0); }\n  75% {\n    clip: rect(66px, 9999px, 51px, 0); }\n  80% {\n    clip: rect(75px, 9999px, 52px, 0); }\n  85% {\n    clip: rect(6px, 9999px, 45px, 0); }\n  90% {\n    clip: rect(54px, 9999px, 50px, 0); }\n  95% {\n    clip: rect(20px, 9999px, 77px, 0); }\n  100% {\n    clip: rect(88px, 9999px, 16px, 0); } }\n\n.glitch:after {\n  content: attr(data-text);\n  position: absolute;\n  left: 2px;\n  text-shadow: -1px 0 #ef4e7b;\n  top: 0;\n  color: white;\n  overflow: hidden;\n  clip: rect(0, 900px, 0, 0);\n  animation: noise-anim 4s infinite linear alternate-reverse; }\n\n@keyframes noise-anim-2 {\n  0% {\n    clip: rect(88px, 9999px, 68px, 0); }\n  5% {\n    clip: rect(50px, 9999px, 10px, 0); }\n  10% {\n    clip: rect(86px, 9999px, 24px, 0); }\n  15% {\n    clip: rect(16px, 9999px, 30px, 0); }\n  20% {\n    clip: rect(90px, 9999px, 33px, 0); }\n  25% {\n    clip: rect(8px, 9999px, 94px, 0); }\n  30% {\n    clip: rect(15px, 9999px, 48px, 0); }\n  35% {\n    clip: rect(44px, 9999px, 75px, 0); }\n  40% {\n    clip: rect(21px, 9999px, 68px, 0); }\n  45% {\n    clip: rect(25px, 9999px, 2px, 0); }\n  50% {\n    clip: rect(86px, 9999px, 4px, 0); }\n  55% {\n    clip: rect(14px, 9999px, 73px, 0); }\n  60% {\n    clip: rect(32px, 9999px, 50px, 0); }\n  65% {\n    clip: rect(56px, 9999px, 23px, 0); }\n  70% {\n    clip: rect(48px, 9999px, 62px, 0); }\n  75% {\n    clip: rect(59px, 9999px, 34px, 0); }\n  80% {\n    clip: rect(95px, 9999px, 64px, 0); }\n  85% {\n    clip: rect(69px, 9999px, 76px, 0); }\n  90% {\n    clip: rect(26px, 9999px, 25px, 0); }\n  95% {\n    clip: rect(12px, 9999px, 16px, 0); }\n  100% {\n    clip: rect(39px, 9999px, 82px, 0); } }\n\n.glitch:before {\n  content: attr(data-text);\n  position: absolute;\n  left: -2px;\n  text-shadow: 1px 0 #5073b8;\n  top: 0;\n  color: white;\n  overflow: hidden;\n  clip: rect(0, 900px, 0, 0);\n  animation: noise-anim-2 6s infinite linear alternate-reverse; }\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 0.9; } }\n\n@keyframes fadeInLeftFirst {\n  0% {\n    opacity: 0;\n    transform: translateX(-50px); }\n  100% {\n    opacity: 1;\n    transform: translateX(-100px); } }\n\n@keyframes fadeInLeft {\n  0% {\n    opacity: 0;\n    transform: translateX(-20px); }\n  100% {\n    opacity: 1;\n    transform: translateX(-70px); } }\n\n@font-face {\n  font-family: 'NATS';\n  font-style: normal;\n  font-weight: normal;\n  src: url(" + escape(__webpack_require__(197)) + ") format(\"woff2\"); }\n\n.header, .input-label {\n  color: #fff; }\n\n.header {\n  font-size: 60pt;\n  position: relative;\n  display: block;\n  font-weight: bold;\n  text-align: center; }\n\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr; }\n\n.label {\n  display: grid;\n  justify-items: end;\n  font-size: 35pt;\n  height: 55px;\n  width: 42vw;\n  margin-top: 20px; }\n\n.input {\n  display: grid;\n  justify-items: start;\n  width: 23vw;\n  height: 25px;\n  margin-top: 45px;\n  margin-left: 15px;\n  font-size: 14pt; }\n\n#password {\n  font-size: 24pt; }\n\n/*\n.parent {\n    display: flex;\n   \n}\n\n.input{\n    display: flex;\n    flex-direction: column;\n}\n\n.label{\n    display: flex;\n    flex-direction: column;\n}\n\n\n\n#username, #password {\n    height: 30px;\n    width: 300px;\n    padding-top: 10px;\n    margin-bottom: 10px;\n    padding-bottom: 0px;\n    position: relative;\n    bottom: 8px;\n    font-size: 12pt;\n}\n\n.input-label {\n    font-size: 35pt;\n    font-weight: normal;\n\n    \n}\n\n#password {\n    margin-left: 20px;\n    height:25px;\n    margin-top: 50px;\n    padding-top: 0;\n}\n\n#username {\n    margin-top: 50px;\n    margin-left: 20px;\n    height: 25px;\n    padding-top: 0;\n    font-family: 'NATS', Avenir, Helvetica, sans-serif;\n}\n\n.label, .input {\n    text-align: right;\n    width: 50vw;\n}\n\n.flex {\n    display: flex;\n    \n    \n}\n.input{\n    display: flex;\n} */\n#submit {\n  width: 306px;\n  margin-left: 570px;\n  margin-top: 45px;\n  background-image: linear-gradient(-134deg, #3023AE 0%, #C86DD7 100%);\n  color: white;\n  border-radius: 0;\n  height: 60px;\n  border: none;\n  font-size: 20pt;\n  padding-left: 0;\n  padding-right: 0; }\n\n#pw-flex {\n  height: 50px; }\n", ""]);

// exports


/***/ }),

/***/ 195:
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ 196:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./fonts/NATS.woff2";

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(199);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 199:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(73);
module.exports = __webpack_require__(193);


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: SyntaxError: /Users/andrew/oca/spacebox/package.json: Error while parsing JSON - Unexpected token < in JSON at position 1213\n    at JSON.parse (<anonymous>)\n    at readConfigPackage (/Users/andrew/oca/spacebox/node_modules/@babel/core/lib/config/files/package.js:57:20)\n    at /Users/andrew/oca/spacebox/node_modules/@babel/core/lib/config/files/utils.js:29:12\n    at cachedFunction (/Users/andrew/oca/spacebox/node_modules/@babel/core/lib/config/caching.js:33:19)\n    at findPackageData (/Users/andrew/oca/spacebox/node_modules/@babel/core/lib/config/files/package.js:33:11)\n    at buildRootChain (/Users/andrew/oca/spacebox/node_modules/@babel/core/lib/config/config-chain.js:103:85)\n    at loadPrivatePartialConfig (/Users/andrew/oca/spacebox/node_modules/@babel/core/lib/config/partial.js:85:55)\n    at Object.loadPartialConfig (/Users/andrew/oca/spacebox/node_modules/@babel/core/lib/config/partial.js:110:18)\n    at Object.<anonymous> (/Users/andrew/oca/spacebox/node_modules/babel-loader/lib/index.js:140:26)\n    at Generator.next (<anonymous>)\n    at asyncGeneratorStep (/Users/andrew/oca/spacebox/node_modules/babel-loader/lib/index.js:3:103)\n    at _next (/Users/andrew/oca/spacebox/node_modules/babel-loader/lib/index.js:5:194)\n    at /Users/andrew/oca/spacebox/node_modules/babel-loader/lib/index.js:5:364\n    at new Promise (<anonymous>)\n    at Object.<anonymous> (/Users/andrew/oca/spacebox/node_modules/babel-loader/lib/index.js:5:97)\n    at Object.loader (/Users/andrew/oca/spacebox/node_modules/babel-loader/lib/index.js:56:18)\n    at Object.<anonymous> (/Users/andrew/oca/spacebox/node_modules/babel-loader/lib/index.js:51:12)");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map