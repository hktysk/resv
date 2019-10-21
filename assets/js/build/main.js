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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/src/main.ts":
/*!*******************************!*\
  !*** ./assets/js/src/main.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar rotate_1 = __webpack_require__(/*! ./rotate */ \"./assets/js/src/rotate.ts\");\nvar switch_mode_1 = __webpack_require__(/*! ./switch-mode */ \"./assets/js/src/switch-mode.ts\");\nrotate_1.rotate();\nswitch_mode_1.switchDeviceMode();\n\n\n//# sourceURL=webpack:///./assets/js/src/main.ts?");

/***/ }),

/***/ "./assets/js/src/rotate.ts":
/*!*********************************!*\
  !*** ./assets/js/src/rotate.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nfunction rotate() {\n    var btn = document.getElementById('rotate-icon');\n    var wrap = document.getElementById('wrap');\n    btn.onclick = function () {\n        if (btn.classList.contains('rotate-icon-stop'))\n            return;\n        wrap.classList.toggle('horizontal');\n        btn.classList.toggle('rotate-horizontal');\n    };\n}\nexports.rotate = rotate;\n\n\n//# sourceURL=webpack:///./assets/js/src/rotate.ts?");

/***/ }),

/***/ "./assets/js/src/switch-mode.ts":
/*!**************************************!*\
  !*** ./assets/js/src/switch-mode.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nfunction switchDeviceMode() {\n    var wrap = document.getElementById('wrap');\n    var rotateIcon = document.getElementById('rotate-icon');\n    var btn = {\n        mobile: document.getElementById('mobile-mode'),\n        pc: document.getElementById('pc-mode')\n    };\n    btn.mobile.onclick = function () {\n        wrap.classList.remove('pc-mode');\n        localStorage.setItem('mode', 'mobile');\n        btn.pc.classList.remove('select');\n        btn.mobile.classList.add('select');\n        rotateIcon.classList.remove('rotate-icon-stop');\n    };\n    btn.pc.onclick = function () {\n        wrap.classList.add('pc-mode');\n        localStorage.setItem('mode', 'pc');\n        btn.mobile.classList.remove('select');\n        btn.pc.classList.add('select');\n        rotateIcon.classList.add('rotate-icon-stop');\n    };\n    // Automatically switch mode of first view\n    var mode = localStorage.getItem('mode');\n    if (!mode) {\n        localStorage.setItem('mode', 'mobile');\n    }\n    else {\n        mode === 'mobile' ?\n            btn.mobile.click()\n            : btn.pc.click();\n    }\n}\nexports.switchDeviceMode = switchDeviceMode;\n\n\n//# sourceURL=webpack:///./assets/js/src/switch-mode.ts?");

/***/ })

/******/ });