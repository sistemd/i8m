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
/*! exports provided: Drawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drawing", function() { return Drawing; });
var railDisplayDuration = 500; // milliseconds
var Drawing = /** @class */ (function () {
    function Drawing() {
        this.rails = [];
        this.canvas = document.getElementById('frame')
            .getContext('2d');
    }
    Drawing.prototype.addRails = function (rails, timestamp) {
        var _a;
        (_a = this.rails).push.apply(_a, rails.map(function (rail) {
            return { rail: rail, timestamp: timestamp };
        }));
    };
    Drawing.prototype.drawGame = function (game, timestamp) {
        // Drop rails drawn for longer than railDisplayDuration milliseconds.
        this.rails = this.rails.filter(function (railDrawing) { return timestamp - railDrawing.timestamp < railDisplayDuration; });
        this.canvas.clearRect(0, 0, 500, 500);
        if (game.players !== null) {
            for (var _i = 0, _a = Object.values(game.players); _i < _a.length; _i++) {
                var player = _a[_i];
                this.canvas.fillStyle = player.skin;
                this.canvas.fillRect(player.position.x, player.position.y, 20, 20);
            }
        }
        for (var _b = 0, _c = this.rails; _b < _c.length; _b++) {
            var _d = _c[_b], rail = _d.rail, timestamp_1 = _d.timestamp;
            // XXX Fix this
            this.canvas.fillStyle = 'black';
            this.canvas.fillRect(rail.start.x, rail.start.y, rail.offset.x + 5, rail.offset.y + 5);
        }
    };
    return Drawing;
}());



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
        cb(time, dt);
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
    if (document.URL.indexOf("http") != -1)
        return document.URL.replace("http", "ws");
    else
        return "ws://" + document.URL;
}
var webSocket = new WebSocket(connectionURL());
var game;
function updatePlayerDirection() {
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])("ArrowLeft"))
        direction.x = -1;
    else if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])("ArrowRight"))
        direction.x = 1;
    else
        direction.x = 0;
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])("ArrowUp"))
        direction.y = -1;
    else if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])("ArrowDown"))
        direction.y = 1;
    else
        direction.y = 0;
    var sent = false;
    if (Object(_engine__WEBPACK_IMPORTED_MODULE_0__["keyIsDown"])(" ")) {
        if (!sent) {
            webSocket.send(JSON.stringify({
                rail: {
                    direction: {
                        x: 1,
                        y: 0,
                    },
                },
            }));
            sent = true;
        }
    }
    else {
        sent = false;
    }
    direction = Object(_engine__WEBPACK_IMPORTED_MODULE_0__["normalized"])(direction);
}
var drawing = new _canvas__WEBPACK_IMPORTED_MODULE_1__["Drawing"]();
webSocket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    if (message.game.rails)
        drawing.addRails(message.game.rails, performance.now());
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
    Object(_engine__WEBPACK_IMPORTED_MODULE_0__["mainLoop"])(function (timestamp, dt) {
        updatePlayerDirection();
        if (game !== undefined)
            drawing.drawGame(game, timestamp);
    });
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFBQSxJQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBQyxlQUFlO0FBRS9DO0lBSUk7UUFIUSxVQUFLLEdBQWtCLEVBQUU7UUFJN0IsSUFBSSxDQUFDLE1BQU0sR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUI7YUFDaEUsVUFBVSxDQUFDLElBQUksQ0FBNkI7SUFDckQsQ0FBQztJQUVELDBCQUFRLEdBQVIsVUFBUyxLQUFhLEVBQUUsU0FBaUI7O1FBQ2pDLFVBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxX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RCxJQUFJLE9BQU8sQ0FBQyxJQUFJO1FBQUUsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFZLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBRUYsU0FBUyxDQUFDLE1BQU0sR0FBRztJQUNqQix5REFBUyxFQUFFLENBQUM7SUFDWixXQUFXLENBQUM7UUFDVixTQUFTLENBQUMsSUFBSSxDQUNaLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDYixTQUFTO1NBQ1YsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDTix3REFBUSxDQUFDLFVBQUMsU0FBUyxFQUFFLEVBQUU7UUFDckIscUJBQXFCLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksS0FBSyxTQUFTO1lBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBHYW1lLCBSYWlsIH0gZnJvbSAnLi9lbmdpbmUnXG5cbmludGVyZmFjZSBSYWlsRHJhd2luZyB7XG4gICAgcmFpbDogUmFpbFxuICAgIHRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcFxufVxuXG5jb25zdCByYWlsRGlzcGxheUR1cmF0aW9uID0gNTAwIC8vIG1pbGxpc2Vjb25kc1xuXG5leHBvcnQgY2xhc3MgRHJhd2luZyB7XG4gICAgcHJpdmF0ZSByYWlsczogUmFpbERyYXdpbmdbXSA9IFtdXG4gICAgcHJpdmF0ZSBjYW52YXM6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcmFtZScpIGFzIEhUTUxDYW52YXNFbGVtZW50KVxuICAgICAgICAgICAgLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgfVxuXG4gICAgYWRkUmFpbHMocmFpbHM6IFJhaWxbXSwgdGltZXN0YW1wOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucmFpbHMucHVzaCguLi5yYWlscy5tYXAocmFpbCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFpbCwgdGltZXN0YW1wIH1cbiAgICAgICAgICAgIH0pKVxuICAgIH1cblxuICAgIGRyYXdHYW1lKGdhbWU6IEdhbWUsIHRpbWVzdGFtcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIERyb3AgcmFpbHMgZHJhd24gZm9yIGxvbmdlciB0aGFuIHJhaWxEaXNwbGF5RHVyYXRpb24gbWlsbGlzZWNvbmRzLlxuICAgICAgICB0aGlzLnJhaWxzID0gdGhpcy5yYWlscy5maWx0ZXIoXG4gICAgICAgICAgICByYWlsRHJhd2luZyA9PiB0aW1lc3RhbXAgLSByYWlsRHJhd2luZy50aW1lc3RhbXAgPCByYWlsRGlzcGxheUR1cmF0aW9uKVxuXG4gICAgICAgIHRoaXMuY2FudmFzLmNsZWFyUmVjdCgwLCAwLCA1MDAsIDUwMClcbiAgICAgICAgaWYgKGdhbWUucGxheWVycyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwbGF5ZXIgb2YgT2JqZWN0LnZhbHVlcyhnYW1lLnBsYXllcnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuZmlsbFN0eWxlID0gcGxheWVyLnNraW5cbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5maWxsUmVjdChwbGF5ZXIucG9zaXRpb24ueCwgcGxheWVyLnBvc2l0aW9uLnksIDIwLCAyMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgeyByYWlsLCB0aW1lc3RhbXAgfSBvZiB0aGlzLnJhaWxzKSB7XG4gICAgICAgICAgICAvLyBYWFggRml4IHRoaXNcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmZpbGxTdHlsZSA9ICdibGFjaydcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmZpbGxSZWN0KHJhaWwuc3RhcnQueCwgcmFpbC5zdGFydC55LCByYWlsLm9mZnNldC54ICsgNSwgcmFpbC5vZmZzZXQueSArIDUpXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbnRlcmZhY2UgS2V5cyB7XG4gICAgQXJyb3dMZWZ0OiBib29sZWFuXG4gICAgQXJyb3dSaWdodDogYm9vbGVhblxuICAgIEFycm93VXA6IGJvb2xlYW5cbiAgICBBcnJvd0Rvd246IGJvb2xlYW5cbiAgICAnICc6IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgS2V5ID0ga2V5b2YgS2V5c1xuXG5jb25zdCBrZXlzOiBLZXlzID0ge1xuICAgIEFycm93TGVmdDogZmFsc2UsXG4gICAgQXJyb3dSaWdodDogZmFsc2UsXG4gICAgQXJyb3dVcDogZmFsc2UsXG4gICAgQXJyb3dEb3duOiBmYWxzZSxcbiAgICAnICc6IGZhbHNlLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhY2tLZXlzKCkge1xuICAgIGZ1bmN0aW9uIGtleWJvYXJkSGFuZGxlcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXNba2V5IGFzIEtleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGtleWJvYXJkSGFuZGxlcih0cnVlKVxuICAgIGRvY3VtZW50Lm9ua2V5dXAgPSBrZXlib2FyZEhhbmRsZXIoZmFsc2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrZXlJc0Rvd24oa2V5OiBLZXkpOiBib29sZWFuIHtcbiAgICByZXR1cm4ga2V5c1trZXldIHx8IGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluTG9vcChjYjogKHRpbWVzdGFtcDogbnVtYmVyLCBkdDogbnVtYmVyKSA9PiB2b2lkKSAge1xuICAgIGxldCBsYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXG5cbiAgICBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGR0ID0gdGltZSAtIGxhc3RUaW1lXG4gICAgICAgIGxhc3RUaW1lID0gdGltZVxuICAgICAgICBjYih0aW1lLCBkdClcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSlcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZlY3RvciB7XG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlbnNpdHkodjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHYueCAqIHYueCArIHYueSAqIHYueSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZWQodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCBhID0gaW50ZW5zaXR5KHYpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogdi54IC8gYSxcbiAgICAgICAgeTogdi55IC8gYSxcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGxheWVyIHtcbiAgICBwb3NpdGlvbjogVmVjdG9yXG4gICAgZGlyZWN0aW9uOiBWZWN0b3JcbiAgICBza2luOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYWlsIHtcbiAgICBzdGFydDogVmVjdG9yXG4gICAgb2Zmc2V0OiBWZWN0b3Jcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHYW1lIHtcbiAgICBwbGF5ZXJzOiB7IFtwbGF5ZXJJZDogc3RyaW5nXTogUGxheWVyIH1cbiAgICByYWlsczogUmFpbFtdXG59XG4iLCJpbXBvcnQgeyB0cmFja0tleXMsIG1haW5Mb29wLCBrZXlJc0Rvd24sIEdhbWUsIG5vcm1hbGl6ZWQgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IERyYXdpbmcgfSBmcm9tIFwiLi9jYW52YXNcIjtcblxubGV0IGRpcmVjdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuXG5jb25zdCBzcGVlZCA9IDAuMDE7XG5cbmZ1bmN0aW9uIGNvbm5lY3Rpb25VUkwoKSB7XG4gIGlmIChkb2N1bWVudC5VUkwuaW5kZXhPZihcImh0dHBcIikgIT0gLTEpXG4gICAgcmV0dXJuIGRvY3VtZW50LlVSTC5yZXBsYWNlKFwiaHR0cFwiLCBcIndzXCIpO1xuICBlbHNlIHJldHVybiBcIndzOi8vXCIgKyBkb2N1bWVudC5VUkw7XG59XG5cbmNvbnN0IHdlYlNvY2tldCA9IG5ldyBXZWJTb2NrZXQoY29ubmVjdGlvblVSTCgpKTtcblxubGV0IGdhbWU6IEdhbWUgfCB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYXllckRpcmVjdGlvbigpIHtcbiAgaWYgKGtleUlzRG93bihcIkFycm93TGVmdFwiKSkgZGlyZWN0aW9uLnggPSAtMTtcbiAgZWxzZSBpZiAoa2V5SXNEb3duKFwiQXJyb3dSaWdodFwiKSkgZGlyZWN0aW9uLnggPSAxO1xuICBlbHNlIGRpcmVjdGlvbi54ID0gMDtcblxuICBpZiAoa2V5SXNEb3duKFwiQXJyb3dVcFwiKSkgZGlyZWN0aW9uLnkgPSAtMTtcbiAgZWxzZSBpZiAoa2V5SXNEb3duKFwiQXJyb3dEb3duXCIpKSBkaXJlY3Rpb24ueSA9IDE7XG4gIGVsc2UgZGlyZWN0aW9uLnkgPSAwO1xuXG4gIGxldCBzZW50ID0gZmFsc2U7XG4gIGlmIChrZXlJc0Rvd24oXCIgXCIpKSB7XG4gICAgaWYgKCFzZW50KSB7XG4gICAgICB3ZWJTb2NrZXQuc2VuZChcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHJhaWw6IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjoge1xuICAgICAgICAgICAgICB4OiAxLFxuICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHNlbnQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzZW50ID0gZmFsc2U7XG4gIH1cblxuICBkaXJlY3Rpb24gPSBub3JtYWxpemVkKGRpcmVjdGlvbik7XG59XG5cbmNvbnN0IGRyYXdpbmcgPSBuZXcgRHJhd2luZygpO1xuXG53ZWJTb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICBpZiAobWVzc2FnZS5nYW1lLnJhaWxzKVxuICAgIGRyYXdpbmcuYWRkUmFpbHMobWVzc2FnZS5nYW1lLnJhaWxzLCBwZXJmb3JtYW5jZS5ub3coKSk7XG5cbiAgaWYgKG1lc3NhZ2UuZ2FtZSkgZ2FtZSA9IG1lc3NhZ2UuZ2FtZSBhcyBHYW1lO1xufTtcblxud2ViU29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgdHJhY2tLZXlzKCk7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICB3ZWJTb2NrZXQuc2VuZChcbiAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgfSlcbiAgICApO1xuICB9LCA1KTtcbiAgbWFpbkxvb3AoKHRpbWVzdGFtcCwgZHQpID0+IHtcbiAgICB1cGRhdGVQbGF5ZXJEaXJlY3Rpb24oKTtcbiAgICBpZiAoZ2FtZSAhPT0gdW5kZWZpbmVkKSBkcmF3aW5nLmRyYXdHYW1lKGdhbWUsIHRpbWVzdGFtcCk7XG4gIH0pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=