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
var keys = {};
function trackKeyboard() {
    function keyHandler(value) {
        return function (event) {
            switch (event.key) {
                case 'arrowLeft':
                    keys['arrowLeft'] = value;
                    break;
                case 'arrowRight':
                    keys['arrowRight'] = value;
                    break;
                case 'arrowUp':
                    keys['arrowUp'] = value;
                    break;
                case 'arrowDown':
                    keys['arrowDown'] = value;
                    break;
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

var canvas = document.getElementById('frame').getContext('2d');
canvas.fillStyle = 'red';
var player = { x: 0, y: 0, direction: { x: 0, y: 0 } };
var speed = 0.01;
var webSocket = new WebSocket('ws://localhost:8080');
function updatePlayerDirection() {
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('arrowLeft'))
        player.direction = { x: -1, y: 0 };
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('arrowRight'))
        player.direction = { x: 1, y: 0 };
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('arrowUp'))
        player.direction = { x: 0, y: -1 };
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])('arrowDown'))
        player.direction = { x: 0, y: 1 };
}
webSocket.onmessage = function (event) {
    console.log(event);
    var message = JSON.parse(event.data);
    console.log(message);
};
webSocket.onopen = function () {
    Object(_engine__WEBPACK_IMPORTED_MODULE_0__["trackKeyboard"])();
    setInterval(function () {
        webSocket.send(JSON.stringify(player.direction));
    }, 500);
    Object(_engine__WEBPACK_IMPORTED_MODULE_0__["mainLoop"])(function (dt) {
        updatePlayerDirection();
        canvas.clearRect(0, 0, 500, 500);
        canvas.fillRect(player.x, player.y, 20, 20);
    });
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU0sSUFBSSxHQUErQixFQUFFO0FBRXBDLFNBQVMsYUFBYTtJQUN6QixTQUFTLFVBQVUsQ0FBQyxLQUFjO1FBQzlCLE9BQU8sVUFBQyxLQUFvQjtZQUN4QixRQUFRLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsS0FBSyxXQUFXO29CQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLO29CQUN6QixNQUFLO2dCQUNULEtBQUssWUFBWTtvQkFDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSztvQkFDMUIsTUFBSztnQkFD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Q2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0FBQ04sQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCB0eXBlIEtleSA9ICdhcnJvd0xlZnQnfCdhcnJvd1JpZ2h0J3wnYXJyb3dVcCd8J2Fycm93RG93bidcblxuY29uc3Qga2V5czogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhY2tLZXlib2FyZCgpIHtcbiAgICBmdW5jdGlvbiBrZXlIYW5kbGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAga2V5c1snYXJyb3dMZWZ0J10gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBrZXlzWydhcnJvd1JpZ2h0J10gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBrZXlzWydhcnJvd1VwJ10gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGtleXNbJ2Fycm93RG93biddID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGtleUhhbmRsZXIodHJ1ZSlcbiAgICBkb2N1bWVudC5vbmtleXVwID0ga2V5SGFuZGxlcihmYWxzZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtleUlzRG93bihrZXk6IEtleSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBrZXlzW2tleV0gfHwgZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW5Mb29wKGNiOiAoZHQ6IG51bWJlcikgPT4gdm9pZCkgIHtcbiAgICBsZXQgbGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBkdCA9IHRpbWUgLSBsYXN0VGltZVxuICAgICAgICBsYXN0VGltZSA9IHRpbWVcbiAgICAgICAgY2IoZHQpXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpXG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSlcbn1cbiIsImltcG9ydCB7IHRyYWNrS2V5Ym9hcmQsIG1haW5Mb29wLCBrZXlJc0Rvd24gfSBmcm9tICcuL2VuZ2luZSdcblxuY29uc3QgY2FudmFzID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcmFtZScpIGFzIEhUTUxDYW52YXNFbGVtZW50KS5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuY2FudmFzLmZpbGxTdHlsZSA9ICdyZWQnXG5cbmNvbnN0IHBsYXllciA9IHsgeDogMCwgeTogMCwgZGlyZWN0aW9uOiB7IHg6IDAsIHk6IDAgfSB9XG5cbmNvbnN0IHNwZWVkID0gMC4wMVxuXG5jb25zdCB3ZWJTb2NrZXQgPSBuZXcgV2ViU29ja2V0KCd3czovL2xvY2FsaG9zdDo4MDgwJylcblxuZnVuY3Rpb24gdXBkYXRlUGxheWVyRGlyZWN0aW9uKCkge1xuICAgIGlmIChrZXlJc0Rvd24oJ2Fycm93TGVmdCcpKVxuICAgICAgICBwbGF5ZXIuZGlyZWN0aW9uID0geyB4OiAtMSwgeTogMCB9XG4gICAgaWYgKGtleUlzRG93bignYXJyb3dSaWdodCcpKVxuICAgICAgICBwbGF5ZXIuZGlyZWN0aW9uID0geyB4OiAxLCB5OiAwIH1cbiAgICBpZiAoa2V5SXNEb3duKCdhcnJvd1VwJykpXG4gICAgICAgIHBsYXllci5kaXJlY3Rpb24gPSB7IHg6IDAsIHk6IC0xIH1cbiAgICBpZiAoa2V5SXNEb3duKCdhcnJvd0Rvd24nKSlcbiAgICAgICAgcGxheWVyLmRpcmVjdGlvbiA9IHsgeDogMCwgeTogMSB9XG59XG5cbndlYlNvY2tldC5vbm1lc3NhZ2UgPSBldmVudCA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpXG4gICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxufVxuXG53ZWJTb2NrZXQub25vcGVuID0gKCkgPT4ge1xuICAgIHRyYWNrS2V5Ym9hcmQoKVxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgd2ViU29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGxheWVyLmRpcmVjdGlvbikpXG4gICAgfSwgNTAwKVxuICAgIG1haW5Mb29wKGR0ID0+IHtcbiAgICAgICAgdXBkYXRlUGxheWVyRGlyZWN0aW9uKClcbiAgICAgICAgY2FudmFzLmNsZWFyUmVjdCgwLCAwLCA1MDAsIDUwMClcbiAgICAgICAgY2FudmFzLmZpbGxSZWN0KHBsYXllci54LCBwbGF5ZXIueSwgMjAsIDIwKVxuICAgIH0pXG59XG4iXSwic291cmNlUm9vdCI6IiJ9