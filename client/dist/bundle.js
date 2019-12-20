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
var canvas = document.getElementById('frame')
    .getContext('2d');
function drawGame(game) {
    canvas.clearRect(0, 0, 500, 500);
    for (var _i = 0, _a = Object.values(game.players); _i < _a.length; _i++) {
        var _b = _a[_i], position = _b.position, skin = _b.skin;
        canvas.fillStyle = skin;
        canvas.fillRect(position.x, position.y, 20, 20);
    }
    if (game.rails === null)
        return;
    for (var _c = 0, _d = Object.values(game.rails); _c < _d.length; _c++) {
        var _e = _d[_c], start = _e.start, offset = _e.offset;
        canvas.fillStyle = 'black';
        canvas.fillRect(start.x, start.y, offset.x + 5, offset.y + 5);
    }
}


/***/ }),

/***/ "./src/engine.ts":
/*!***********************!*\
  !*** ./src/engine.ts ***!
  \***********************/
/*! exports provided: trackKeys, keyIsDown, mainLoop, intensity, normalized */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackKeys", function() { return trackKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyIsDown", function() { return keyIsDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mainLoop", function() { return mainLoop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intensity", function() { return intensity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalized", function() { return normalized; });
var keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    ' ': false,
};
function trackKeys() {
    function keyboardHandler(value) {
        return function (event) {
            for (var key in keys) {
                if (event.key === key) {
                    keys[key] = value;
                }
            }
        };
    }
    document.onkeydown = keyboardHandler(true);
    document.onkeyup = keyboardHandler(false);
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
function intensity(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
function normalized(v) {
    var a = intensity(v);
    return {
        x: v.x / a,
        y: v.y / a,
    };
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
var game;
function updatePlayerDirection() {
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('ArrowLeft'))
        direction.x = -1;
    else if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('ArrowRight'))
        direction.x = 1;
    else
        direction.x = 0;
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('ArrowUp'))
        direction.y = -1;
    else if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('ArrowDown'))
        direction.y = 1;
    else
        direction.y = 0;
    var sent = false;
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])(' ')) {
        if (!sent) {
            webSocket.send(JSON.stringify({
                rail: {
                    direction: {
                        x: 1, y: 0,
                    }
                }
            }));
            sent = true;
        }
    }
    else {
        sent = false;
    }
    direction = Object(_engine__WEBPACK_IMPORTED_MODULE_0__["normalized"])(direction);
    direction = { x: 1, y: 0 };
}
webSocket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    if (message.game)
        game = message.game;
};
webSocket.onopen = function () {
    Object(_engine__WEBPACK_IMPORTED_MODULE_0__["trackKeys"])();
    setInterval(function () {
        webSocket.send(JSON.stringify({
            direction: direction,
        }));
    }, 5);
    Object(_engine__WEBPACK_IMPORTED_MODULE_0__["mainLoop"])(function (dt) {
        updatePlayerDirection();
        if (game !== undefined)
            Object(_canvas__WEBPACK_IMPORTED_MODULE_1__["drawGame"])(game);
    });
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFBQSxJQUFNLE1BQU0sR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUI7S0FDakUsVUFBVSxDQUFDLElBQUksQ0FBNkI7QUFFMUMsU0FBUyxRQUFRLENBQUMsSUFBVTtJQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUNoQyxLQUFpQyxVQUEyQixFQUEzQixXQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMs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MERBQVUsQ0FBQyxTQUFTLENBQUM7SUFDakMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzlCLENBQUM7QUFFRCxTQUFTLENBQUMsU0FBUyxHQUFHLGVBQUs7SUFDdkIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3RDLElBQUksT0FBTyxDQUFDLElBQUk7UUFDWixJQUFJLEdBQUcsT0FBTyxDQUFDLElBQVk7QUFDbkMsQ0FBQztBQUVELFNBQVMsQ0FBQyxNQUFNLEdBQUc7SUFDZix5REFBUyxFQUFFO0lBQ1gsV0FBVyxDQUFDO1FBQ1IsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLFNBQVM7U0FDWixDQUFDLENBQUM7SUFDUCxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ0wsd0RBQVEsQ0FBQyxZQUFFO1FBQ1AscUJBQXFCLEVBQUU7UUFDdkIsSUFBSSxJQUFJLEtBQUssU0FBUztZQUNsQix3REFBUSxDQUFDLElBQUksQ0FBQztJQUN0QixDQUFDLENBQUM7QUFDTixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgR2FtZSwgVmVjdG9yIH0gZnJvbSAnLi9lbmdpbmUnXG5cbmNvbnN0IGNhbnZhcyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJhbWUnKSBhcyBIVE1MQ2FudmFzRWxlbWVudClcbiAgICAuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdHYW1lKGdhbWU6IEdhbWUpOiB2b2lkIHtcbiAgICBjYW52YXMuY2xlYXJSZWN0KDAsIDAsIDUwMCwgNTAwKVxuICAgIGZvciAoY29uc3QgeyBwb3NpdGlvbiwgc2tpbiB9IG9mIE9iamVjdC52YWx1ZXMoZ2FtZS5wbGF5ZXJzKSkge1xuICAgICAgICBjYW52YXMuZmlsbFN0eWxlID0gc2tpblxuICAgICAgICBjYW52YXMuZmlsbFJlY3QocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgMjAsIDIwKVxuICAgIH1cblxuICAgIGlmIChnYW1lLnJhaWxzID09PSBudWxsKVxuICAgICAgICByZXR1cm5cblxuICAgIGZvciAoY29uc3QgeyBzdGFydCwgb2Zmc2V0IH0gb2YgT2JqZWN0LnZhbHVlcyhnYW1lLnJhaWxzKSkge1xuICAgICAgICBjYW52YXMuZmlsbFN0eWxlID0gJ2JsYWNrJ1xuICAgICAgICBjYW52YXMuZmlsbFJlY3Qoc3RhcnQueCwgc3RhcnQueSwgb2Zmc2V0LnggKyA1LCBvZmZzZXQueSArIDUpXG4gICAgfVxufVxuIiwiaW50ZXJmYWNlIEtleXMge1xuICAgIEFycm93TGVmdDogYm9vbGVhblxuICAgIEFycm93UmlnaHQ6IGJvb2xlYW5cbiAgICBBcnJvd1VwOiBib29sZWFuXG4gICAgQXJyb3dEb3duOiBib29sZWFuXG4gICAgJyAnOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIEtleSA9IGtleW9mIEtleXNcblxuY29uc3Qga2V5czogS2V5cyA9IHtcbiAgICBBcnJvd0xlZnQ6IGZhbHNlLFxuICAgIEFycm93UmlnaHQ6IGZhbHNlLFxuICAgIEFycm93VXA6IGZhbHNlLFxuICAgIEFycm93RG93bjogZmFsc2UsXG4gICAgJyAnOiBmYWxzZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrS2V5cygpIHtcbiAgICBmdW5jdGlvbiBrZXlib2FyZEhhbmRsZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4ga2V5cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzW2tleSBhcyBLZXldID0gdmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5vbmtleWRvd24gPSBrZXlib2FyZEhhbmRsZXIodHJ1ZSlcbiAgICBkb2N1bWVudC5vbmtleXVwID0ga2V5Ym9hcmRIYW5kbGVyKGZhbHNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24ga2V5SXNEb3duKGtleTogS2V5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleXNba2V5XSB8fCBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbkxvb3AoY2I6IChkdDogbnVtYmVyKSA9PiB2b2lkKSAge1xuICAgIGxldCBsYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXG5cbiAgICBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGR0ID0gdGltZSAtIGxhc3RUaW1lXG4gICAgICAgIGxhc3RUaW1lID0gdGltZVxuICAgICAgICBjYihkdClcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSlcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZlY3RvciB7XG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlbnNpdHkodjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHYueCAqIHYueCArIHYueSAqIHYueSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZWQodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCBhID0gaW50ZW5zaXR5KHYpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogdi54IC8gYSxcbiAgICAgICAgeTogdi55IC8gYSxcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZSB7XG4gICAgcGxheWVyczoge1xuICAgICAgICBbcGxheWVySWQ6IHN0cmluZ106IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgICAgICBkaXJlY3Rpb246IFZlY3RvcixcbiAgICAgICAgICAgIHNraW46IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH1cbiAgICByYWlsczogQXJyYXk8e1xuICAgICAgICBzdGFydDogVmVjdG9yLFxuICAgICAgICBvZmZzZXQ6IFZlY3RvcixcbiAgICB9PlxufVxuIiwiaW1wb3J0IHsgdHJhY2tLZXlzLCBtYWluTG9vcCwga2V5SXNEb3duLCBHYW1lLCBub3JtYWxpemVkIH0gZnJvbSAnLi9lbmdpbmUnXG5pbXBvcnQgeyBkcmF3R2FtZSB9IGZyb20gJy4vY2FudmFzJ1xuXG5sZXQgZGlyZWN0aW9uID0geyB4OjAsIHk6MCB9XG5cbmNvbnN0IHNwZWVkID0gMC4wMVxuXG5mdW5jdGlvbiBjb25uZWN0aW9uVVJMKCkge1xuICAgIGlmIChkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cCcpICE9IC0xKVxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuVVJMLnJlcGxhY2UoJ2h0dHAnLCAnd3MnKVxuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuICd3czovLycgKyBkb2N1bWVudC5VUkxcbn1cblxuY29uc3Qgd2ViU29ja2V0ID0gbmV3IFdlYlNvY2tldChjb25uZWN0aW9uVVJMKCkpXG5cbmxldCBnYW1lOiBHYW1lfHVuZGVmaW5lZFxuXG5mdW5jdGlvbiB1cGRhdGVQbGF5ZXJEaXJlY3Rpb24oKSB7XG4gICAgaWYgKGtleUlzRG93bignQXJyb3dMZWZ0JykpXG4gICAgICAgIGRpcmVjdGlvbi54ID0gLTFcbiAgICBlbHNlIGlmIChrZXlJc0Rvd24oJ0Fycm93UmlnaHQnKSlcbiAgICAgICAgZGlyZWN0aW9uLnggPSAxXG4gICAgZWxzZVxuICAgICAgICBkaXJlY3Rpb24ueCA9IDBcblxuICAgIGlmIChrZXlJc0Rvd24oJ0Fycm93VXAnKSlcbiAgICAgICAgZGlyZWN0aW9uLnkgPSAtMVxuICAgIGVsc2UgaWYgKGtleUlzRG93bignQXJyb3dEb3duJykpXG4gICAgICAgIGRpcmVjdGlvbi55ID0gMVxuICAgIGVsc2VcbiAgICAgICAgZGlyZWN0aW9uLnkgPSAwXG4gICAgXG4gICAgbGV0IHNlbnQgPSBmYWxzZVxuICAgIGlmIChrZXlJc0Rvd24oJyAnKSkge1xuICAgICAgICBpZiAoIXNlbnQpIHtcbiAgICAgICAgICAgIHdlYlNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICByYWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogMSwgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgc2VudCA9IHRydWVcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbnQgPSBmYWxzZVxuICAgIH1cblxuICAgIGRpcmVjdGlvbiA9IG5vcm1hbGl6ZWQoZGlyZWN0aW9uKVxuICAgIGRpcmVjdGlvbiA9IHsgeDogMSwgeTogMCB9XG59XG5cbndlYlNvY2tldC5vbm1lc3NhZ2UgPSBldmVudCA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlcbiAgICBpZiAobWVzc2FnZS5nYW1lKVxuICAgICAgICBnYW1lID0gbWVzc2FnZS5nYW1lIGFzIEdhbWVcbn1cblxud2ViU29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICB0cmFja0tleXMoKVxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgd2ViU29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICB9KSlcbiAgICB9LCA1KVxuICAgIG1haW5Mb29wKGR0ID0+IHtcbiAgICAgICAgdXBkYXRlUGxheWVyRGlyZWN0aW9uKClcbiAgICAgICAgaWYgKGdhbWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRyYXdHYW1lKGdhbWUpXG4gICAgfSlcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=