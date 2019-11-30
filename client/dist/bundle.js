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
canvas.fillStyle = 'red';
function drawGame(state) {
    canvas.clearRect(0, 0, 500, 500);
    for (var _i = 0, _a = Object.values(state); _i < _a.length; _i++) {
        var position = _a[_i].position;
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
var webSocket = new WebSocket('ws://localhost:8080');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFBQSxJQUFNLE1BQU0sR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUE2QjtBQUNuSCxNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUs7QUFFakIsU0FBUyxRQUFRLENBQUMsS0FBZ0I7SUFDckMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDaEMsS0FBMkIsVUFBb0IsRUFBcEIsV0FBTSxDQUFD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Q2YsNkRBQWEsRUFBRTtJQUNmLFdBQVcsQ0FBQztRQUNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixTQUFTO1NBQ1osQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNMLHdEQUFRLENBQUMsWUFBRTtRQUNQLHFCQUFxQixFQUFFO1FBQ3ZCLElBQUksU0FBUyxLQUFLLFNBQVM7WUFDdkIsd0RBQVEsQ0FBQyxTQUFTLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ04sQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEdhbWVTdGF0ZSwgVmVjdG9yIH0gZnJvbSAnLi9lbmdpbmUnXG5cbmNvbnN0IGNhbnZhcyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJhbWUnKSBhcyBIVE1MQ2FudmFzRWxlbWVudCkuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbmNhbnZhcy5maWxsU3R5bGUgPSAncmVkJ1xuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0dhbWUoc3RhdGU6IEdhbWVTdGF0ZSk6IHZvaWQge1xuICAgIGNhbnZhcy5jbGVhclJlY3QoMCwgMCwgNTAwLCA1MDApXG4gICAgZm9yIChjb25zdCB7IHBvc2l0aW9uIH0gb2YgT2JqZWN0LnZhbHVlcyhzdGF0ZSkpIHtcbiAgICAgICAgY2FudmFzLmZpbGxSZWN0KHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIDIwLCAyMClcbiAgICB9XG59XG4iLCJpbnRlcmZhY2UgS2V5cyB7XG4gICAgQXJyb3dMZWZ0OiBib29sZWFuXG4gICAgQXJyb3dSaWdodDogYm9vbGVhblxuICAgIEFycm93VXA6IGJvb2xlYW5cbiAgICBBcnJvd0Rvd246IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgS2V5ID0ga2V5b2YgS2V5c1xuXG5jb25zdCBrZXlzOiBLZXlzID0ge1xuICAgIEFycm93TGVmdDogZmFsc2UsXG4gICAgQXJyb3dSaWdodDogZmFsc2UsXG4gICAgQXJyb3dVcDogZmFsc2UsXG4gICAgQXJyb3dEb3duOiBmYWxzZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrS2V5Ym9hcmQoKSB7XG4gICAgZnVuY3Rpb24ga2V5SGFuZGxlcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXNba2V5IGFzIEtleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGtleUhhbmRsZXIodHJ1ZSlcbiAgICBkb2N1bWVudC5vbmtleXVwID0ga2V5SGFuZGxlcihmYWxzZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtleUlzRG93bihrZXk6IEtleSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBrZXlzW2tleV0gfHwgZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW5Mb29wKGNiOiAoZHQ6IG51bWJlcikgPT4gdm9pZCkgIHtcbiAgICBsZXQgbGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBkdCA9IHRpbWUgLSBsYXN0VGltZVxuICAgICAgICBsYXN0VGltZSA9IHRpbWVcbiAgICAgICAgY2IoZHQpXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpXG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZWN0b3Ige1xuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVTdGF0ZSB7XG4gICAgW3BsYXllcklkOiBzdHJpbmddOiB7XG4gICAgICAgIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgIGRpcmVjdGlvbjogVmVjdG9yLFxuICAgIH1cbn1cbiIsImltcG9ydCB7IHRyYWNrS2V5Ym9hcmQsIG1haW5Mb29wLCBrZXlJc0Rvd24sIEdhbWVTdGF0ZSB9IGZyb20gJy4vZW5naW5lJ1xuaW1wb3J0IHsgZHJhd0dhbWUgfSBmcm9tICcuL2NhbnZhcydcblxubGV0IGRpcmVjdGlvbiA9IHsgeDowLCB5OjAgfVxuXG5jb25zdCBzcGVlZCA9IDAuMDFcblxuY29uc3Qgd2ViU29ja2V0ID0gbmV3IFdlYlNvY2tldCgnd3M6Ly9sb2NhbGhvc3Q6ODA4MCcpXG5cbmxldCBnYW1lU3RhdGU6IEdhbWVTdGF0ZXx1bmRlZmluZWRcblxuZnVuY3Rpb24gdXBkYXRlUGxheWVyRGlyZWN0aW9uKCkge1xuICAgIGlmIChrZXlJc0Rvd24oJ0Fycm93TGVmdCcpKVxuICAgICAgICBkaXJlY3Rpb24gPSB7IHg6IC0xLCB5OiAwIH1cbiAgICBlbHNlIGlmIChrZXlJc0Rvd24oJ0Fycm93UmlnaHQnKSlcbiAgICAgICAgZGlyZWN0aW9uID0geyB4OiAxLCB5OiAwIH1cbiAgICBlbHNlIGlmIChrZXlJc0Rvd24oJ0Fycm93VXAnKSlcbiAgICAgICAgZGlyZWN0aW9uID0geyB4OiAwLCB5OiAtMSB9XG4gICAgZWxzZSBpZiAoa2V5SXNEb3duKCdBcnJvd0Rvd24nKSlcbiAgICAgICAgZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxIH1cbiAgICBlbHNlXG4gICAgICAgIGRpcmVjdGlvbiA9IHsgeDogMCwgeTogMCB9XG59XG5cbndlYlNvY2tldC5vbm1lc3NhZ2UgPSBldmVudCA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlcbiAgICBpZiAobWVzc2FnZS5zdGF0ZSlcbiAgICAgICAgZ2FtZVN0YXRlID0gbWVzc2FnZS5zdGF0ZSBhcyBHYW1lU3RhdGVcbn1cblxud2ViU29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICB0cmFja0tleWJvYXJkKClcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHdlYlNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgfSkpXG4gICAgfSwgNSlcbiAgICBtYWluTG9vcChkdCA9PiB7XG4gICAgICAgIHVwZGF0ZVBsYXllckRpcmVjdGlvbigpXG4gICAgICAgIGlmIChnYW1lU3RhdGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRyYXdHYW1lKGdhbWVTdGF0ZSlcbiAgICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==