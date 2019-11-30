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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/*! exports provided: drawGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawGame", function() { return drawGame; });
var canvas = document.getElementById('frame').getContext('2d');
function drawGame(state) {
    canvas.clearRect(0, 0, 500, 500);
    for (var _i = 0, _a = Object.values(state); _i < _a.length; _i++) {
        var _b = _a[_i], position = _b.position, skin = _b.skin;
        canvas.fillStyle = skin;
        canvas.fillRect(position.x, position.y, 20, 20);
    }
}


/***/ }),

/***/ "./src/engine.ts":
/*!***********************!*\
  !*** ./src/engine.ts ***!
  \***********************/
/*! exports provided: trackKeyboard, keyIsDown, mainLoop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackKeyboard", function() { return trackKeyboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyIsDown", function() { return keyIsDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mainLoop", function() { return mainLoop; });
var keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
};
function trackKeyboard() {
    function keyHandler(value) {
        return function (event) {
            for (var key in keys) {
                if (event.key === key) {
                    keys[key] = value;
                }
            }
        };
    }
    document.onkeydown = keyHandler(true);
    document.onkeyup = keyHandler(false);
}
function keyIsDown(key) {
    return keys[key] || false;
}
function mainLoop(cb) {
    var lastTime = performance.now();
    function update(time) {
        var dt = time - lastTime;
        lastTime = time;
        cb(dt);
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./src/engine.ts");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./src/canvas.ts");


var direction = { x: 0, y: 0 };
var speed = 0.01;
function connectionURL() {
    if (document.URL.indexOf('http') != -1)
        return document.URL.replace('http', 'ws');
    else
        return 'ws://' + document.URL;
}
var webSocket = new WebSocket(connectionURL());
var gameState;
function updatePlayerDirection() {
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('ArrowLeft'))
        direction = { x: -1, y: 0 };
    else if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('ArrowRight'))
        direction = { x: 1, y: 0 };
    else if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('ArrowUp'))
        direction = { x: 0, y: -1 };
    else if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('ArrowDown'))
        direction = { x: 0, y: 1 };
    else
        direction = { x: 0, y: 0 };
}
webSocket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    if (message.state)
        gameState = message.state;
};
webSocket.onopen = function () {
    Object(_engine__WEBPACK_IMPORTED_MODULE_0__["trackKeyboard"])();
    setInterval(function () {
        webSocket.send(JSON.stringify({
            direction: direction,
        }));
    }, 5);
    Object(_engine__WEBPACK_IMPORTED_MODULE_0__["mainLoop"])(function (dt) {
        updatePlayerDirection();
        if (gameState !== undefined)
            Object(_canvas__WEBPACK_IMPORTED_MODULE_1__["drawGame"])(gameState);
    });
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFBQSxJQUFNLE1BQU0sR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUE2QjtBQUU1RyxTQUFTLFFBQVEsQ0FBQyxLQUFnQjtJQUNyQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUNoQyxLQUFpQyxVQUFvQixFQUFwQixXQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFwQixjQUFv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QUMsRUFBRSxDQUFDLEVBQUU7QUFDbEMsQ0FBQztBQUVELFNBQVMsQ0FBQyxTQUFTLEdBQUcsZUFBSztJQUN2QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDdEMsSUFBSSxPQUFPLENBQUMsS0FBSztRQUNiLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBa0I7QUFDOUMsQ0FBQztBQUVELFNBQVMsQ0FBQyxNQUFNLEdBQUc7SUFDZiw2REFBYSxFQUFFO0lBQ2YsV0FBVyxDQUFDO1FBQ1IsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLFNBQVM7U0FDWixDQUFDLENBQUM7SUFDUCxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ0wsd0RBQVEsQ0FBQyxZQUFFO1FBQ1AscUJBQXFCLEVBQUU7UUFDdkIsSUFBSSxTQUFTLEtBQUssU0FBUztZQUN2Qix3REFBUSxDQUFDLFNBQVMsQ0FBQztJQUMzQixDQUFDLENBQUM7QUFDTixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgR2FtZVN0YXRlLCBWZWN0b3IgfSBmcm9tICcuL2VuZ2luZSdcblxuY29uc3QgY2FudmFzID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcmFtZScpIGFzIEhUTUxDYW52YXNFbGVtZW50KS5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0dhbWUoc3RhdGU6IEdhbWVTdGF0ZSk6IHZvaWQge1xuICAgIGNhbnZhcy5jbGVhclJlY3QoMCwgMCwgNTAwLCA1MDApXG4gICAgZm9yIChjb25zdCB7IHBvc2l0aW9uLCBza2luIH0gb2YgT2JqZWN0LnZhbHVlcyhzdGF0ZSkpIHtcbiAgICAgICAgY2FudmFzLmZpbGxTdHlsZSA9IHNraW5cbiAgICAgICAgY2FudmFzLmZpbGxSZWN0KHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIDIwLCAyMClcbiAgICB9XG59XG4iLCJpbnRlcmZhY2UgS2V5cyB7XG4gICAgQXJyb3dMZWZ0OiBib29sZWFuXG4gICAgQXJyb3dSaWdodDogYm9vbGVhblxuICAgIEFycm93VXA6IGJvb2xlYW5cbiAgICBBcnJvd0Rvd246IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgS2V5ID0ga2V5b2YgS2V5c1xuXG5jb25zdCBrZXlzOiBLZXlzID0ge1xuICAgIEFycm93TGVmdDogZmFsc2UsXG4gICAgQXJyb3dSaWdodDogZmFsc2UsXG4gICAgQXJyb3dVcDogZmFsc2UsXG4gICAgQXJyb3dEb3duOiBmYWxzZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrS2V5Ym9hcmQoKSB7XG4gICAgZnVuY3Rpb24ga2V5SGFuZGxlcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXNba2V5IGFzIEtleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGtleUhhbmRsZXIodHJ1ZSlcbiAgICBkb2N1bWVudC5vbmtleXVwID0ga2V5SGFuZGxlcihmYWxzZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtleUlzRG93bihrZXk6IEtleSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBrZXlzW2tleV0gfHwgZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW5Mb29wKGNiOiAoZHQ6IG51bWJlcikgPT4gdm9pZCkgIHtcbiAgICBsZXQgbGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBkdCA9IHRpbWUgLSBsYXN0VGltZVxuICAgICAgICBsYXN0VGltZSA9IHRpbWVcbiAgICAgICAgY2IoZHQpXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpXG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZWN0b3Ige1xuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVTdGF0ZSB7XG4gICAgW3BsYXllcklkOiBzdHJpbmddOiB7XG4gICAgICAgIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgIGRpcmVjdGlvbjogVmVjdG9yLFxuICAgICAgICBza2luOiBzdHJpbmcsXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgdHJhY2tLZXlib2FyZCwgbWFpbkxvb3AsIGtleUlzRG93biwgR2FtZVN0YXRlIH0gZnJvbSAnLi9lbmdpbmUnXG5pbXBvcnQgeyBkcmF3R2FtZSB9IGZyb20gJy4vY2FudmFzJ1xuXG5sZXQgZGlyZWN0aW9uID0geyB4OjAsIHk6MCB9XG5cbmNvbnN0IHNwZWVkID0gMC4wMVxuXG5mdW5jdGlvbiBjb25uZWN0aW9uVVJMKCkge1xuICAgIGlmIChkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cCcpICE9IC0xKVxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuVVJMLnJlcGxhY2UoJ2h0dHAnLCAnd3MnKVxuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuICd3czovLycgKyBkb2N1bWVudC5VUkxcbn1cblxuY29uc3Qgd2ViU29ja2V0ID0gbmV3IFdlYlNvY2tldChjb25uZWN0aW9uVVJMKCkpXG5cbmxldCBnYW1lU3RhdGU6IEdhbWVTdGF0ZXx1bmRlZmluZWRcblxuZnVuY3Rpb24gdXBkYXRlUGxheWVyRGlyZWN0aW9uKCkge1xuICAgIGlmIChrZXlJc0Rvd24oJ0Fycm93TGVmdCcpKVxuICAgICAgICBkaXJlY3Rpb24gPSB7IHg6IC0xLCB5OiAwIH1cbiAgICBlbHNlIGlmIChrZXlJc0Rvd24oJ0Fycm93UmlnaHQnKSlcbiAgICAgICAgZGlyZWN0aW9uID0geyB4OiAxLCB5OiAwIH1cbiAgICBlbHNlIGlmIChrZXlJc0Rvd24oJ0Fycm93VXAnKSlcbiAgICAgICAgZGlyZWN0aW9uID0geyB4OiAwLCB5OiAtMSB9XG4gICAgZWxzZSBpZiAoa2V5SXNEb3duKCdBcnJvd0Rvd24nKSlcbiAgICAgICAgZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxIH1cbiAgICBlbHNlXG4gICAgICAgIGRpcmVjdGlvbiA9IHsgeDogMCwgeTogMCB9XG59XG5cbndlYlNvY2tldC5vbm1lc3NhZ2UgPSBldmVudCA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlcbiAgICBpZiAobWVzc2FnZS5zdGF0ZSlcbiAgICAgICAgZ2FtZVN0YXRlID0gbWVzc2FnZS5zdGF0ZSBhcyBHYW1lU3RhdGVcbn1cblxud2ViU29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICB0cmFja0tleWJvYXJkKClcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHdlYlNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgfSkpXG4gICAgfSwgNSlcbiAgICBtYWluTG9vcChkdCA9PiB7XG4gICAgICAgIHVwZGF0ZVBsYXllckRpcmVjdGlvbigpXG4gICAgICAgIGlmIChnYW1lU3RhdGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRyYXdHYW1lKGdhbWVTdGF0ZSlcbiAgICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==