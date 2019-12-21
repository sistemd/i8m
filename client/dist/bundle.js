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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFBQSxJQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBQyxlQUFlO0FBRS9DO0lBSUk7UUFIUSxVQUFLLEdBQWtCLEVBQUU7UUFJN0IsSUFBSSxDQUFDLE1BQU0sR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUI7YUFDaEUsVUFBVSxDQUFDLElBQUksQ0FBNkI7SUFDckQsQ0FBQztJQUVELDBCQUFRLEdBQVIsVUFBUyxLQUFhLEVBQUUsU0FBaUI7O1FBQ2pDLFVBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxX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QUNYLFdBQVcsQ0FBQztRQUNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixTQUFTO1NBQ1osQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNMLHdEQUFRLENBQUMsVUFBQyxTQUFTLEVBQUUsRUFBRTtRQUNuQixxQkFBcUIsRUFBRTtRQUN2QixJQUFJLElBQUksS0FBSyxTQUFTO1lBQ2xCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztJQUN6QyxDQUFDLENBQUM7QUFDTixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgR2FtZSwgUmFpbCB9IGZyb20gJy4vZW5naW5lJ1xuXG5pbnRlcmZhY2UgUmFpbERyYXdpbmcge1xuICAgIHJhaWw6IFJhaWxcbiAgICB0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXBcbn1cblxuY29uc3QgcmFpbERpc3BsYXlEdXJhdGlvbiA9IDUwMCAvLyBtaWxsaXNlY29uZHNcblxuZXhwb3J0IGNsYXNzIERyYXdpbmcge1xuICAgIHByaXZhdGUgcmFpbHM6IFJhaWxEcmF3aW5nW10gPSBbXVxuICAgIHByaXZhdGUgY2FudmFzOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJhbWUnKSBhcyBIVE1MQ2FudmFzRWxlbWVudClcbiAgICAgICAgICAgIC5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIH1cblxuICAgIGFkZFJhaWxzKHJhaWxzOiBSYWlsW10sIHRpbWVzdGFtcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJhaWxzLnB1c2goLi4ucmFpbHMubWFwKHJhaWwgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHJhaWwsIHRpbWVzdGFtcCB9XG4gICAgICAgICAgICB9KSlcbiAgICB9XG5cbiAgICBkcmF3R2FtZShnYW1lOiBHYW1lLCB0aW1lc3RhbXA6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBEcm9wIHJhaWxzIGRyYXduIGZvciBsb25nZXIgdGhhbiByYWlsRGlzcGxheUR1cmF0aW9uIG1pbGxpc2Vjb25kcy5cbiAgICAgICAgdGhpcy5yYWlscyA9IHRoaXMucmFpbHMuZmlsdGVyKFxuICAgICAgICAgICAgcmFpbERyYXdpbmcgPT4gdGltZXN0YW1wIC0gcmFpbERyYXdpbmcudGltZXN0YW1wIDwgcmFpbERpc3BsYXlEdXJhdGlvbilcblxuICAgICAgICB0aGlzLmNhbnZhcy5jbGVhclJlY3QoMCwgMCwgNTAwLCA1MDApXG4gICAgICAgIGlmIChnYW1lLnBsYXllcnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGxheWVyIG9mIE9iamVjdC52YWx1ZXMoZ2FtZS5wbGF5ZXJzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLmZpbGxTdHlsZSA9IHBsYXllci5za2luXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuZmlsbFJlY3QocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55LCAyMCwgMjApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHsgcmFpbCwgdGltZXN0YW1wIH0gb2YgdGhpcy5yYWlscykge1xuICAgICAgICAgICAgLy8gWFhYIEZpeCB0aGlzXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5maWxsU3R5bGUgPSAnYmxhY2snXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5maWxsUmVjdChyYWlsLnN0YXJ0LngsIHJhaWwuc3RhcnQueSwgcmFpbC5vZmZzZXQueCArIDUsIHJhaWwub2Zmc2V0LnkgKyA1KVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW50ZXJmYWNlIEtleXMge1xuICAgIEFycm93TGVmdDogYm9vbGVhblxuICAgIEFycm93UmlnaHQ6IGJvb2xlYW5cbiAgICBBcnJvd1VwOiBib29sZWFuXG4gICAgQXJyb3dEb3duOiBib29sZWFuXG4gICAgJyAnOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIEtleSA9IGtleW9mIEtleXNcblxuY29uc3Qga2V5czogS2V5cyA9IHtcbiAgICBBcnJvd0xlZnQ6IGZhbHNlLFxuICAgIEFycm93UmlnaHQ6IGZhbHNlLFxuICAgIEFycm93VXA6IGZhbHNlLFxuICAgIEFycm93RG93bjogZmFsc2UsXG4gICAgJyAnOiBmYWxzZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrS2V5cygpIHtcbiAgICBmdW5jdGlvbiBrZXlib2FyZEhhbmRsZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4ga2V5cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzW2tleSBhcyBLZXldID0gdmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5vbmtleWRvd24gPSBrZXlib2FyZEhhbmRsZXIodHJ1ZSlcbiAgICBkb2N1bWVudC5vbmtleXVwID0ga2V5Ym9hcmRIYW5kbGVyKGZhbHNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24ga2V5SXNEb3duKGtleTogS2V5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleXNba2V5XSB8fCBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbkxvb3AoY2I6ICh0aW1lc3RhbXA6IG51bWJlciwgZHQ6IG51bWJlcikgPT4gdm9pZCkgIHtcbiAgICBsZXQgbGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBkdCA9IHRpbWUgLSBsYXN0VGltZVxuICAgICAgICBsYXN0VGltZSA9IHRpbWVcbiAgICAgICAgY2IodGltZSwgZHQpXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpXG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZWN0b3Ige1xuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50ZW5zaXR5KHY6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh2LnggKiB2LnggKyB2LnkgKiB2LnkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVkKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgY29uc3QgYSA9IGludGVuc2l0eSh2KVxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHYueCAvIGEsXG4gICAgICAgIHk6IHYueSAvIGEsXG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXllciB7XG4gICAgcG9zaXRpb246IFZlY3RvclxuICAgIGRpcmVjdGlvbjogVmVjdG9yXG4gICAgc2tpbjogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFpbCB7XG4gICAgc3RhcnQ6IFZlY3RvclxuICAgIG9mZnNldDogVmVjdG9yXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZSB7XG4gICAgcGxheWVyczogeyBbcGxheWVySWQ6IHN0cmluZ106IFBsYXllciB9XG4gICAgcmFpbHM6IFJhaWxbXVxufVxuIiwiaW1wb3J0IHsgdHJhY2tLZXlzLCBtYWluTG9vcCwga2V5SXNEb3duLCBHYW1lLCBub3JtYWxpemVkIH0gZnJvbSAnLi9lbmdpbmUnXG5pbXBvcnQgeyBEcmF3aW5nIH0gZnJvbSAnLi9jYW52YXMnXG5cbmxldCBkaXJlY3Rpb24gPSB7IHg6MCwgeTowIH1cblxuY29uc3Qgc3BlZWQgPSAwLjAxXG5cbmZ1bmN0aW9uIGNvbm5lY3Rpb25VUkwoKSB7XG4gICAgaWYgKGRvY3VtZW50LlVSTC5pbmRleE9mKCdodHRwJykgIT0gLTEpXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5VUkwucmVwbGFjZSgnaHR0cCcsICd3cycpXG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gJ3dzOi8vJyArIGRvY3VtZW50LlVSTFxufVxuXG5jb25zdCB3ZWJTb2NrZXQgPSBuZXcgV2ViU29ja2V0KGNvbm5lY3Rpb25VUkwoKSlcblxubGV0IGdhbWU6IEdhbWV8dW5kZWZpbmVkXG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYXllckRpcmVjdGlvbigpIHtcbiAgICBpZiAoa2V5SXNEb3duKCdBcnJvd0xlZnQnKSlcbiAgICAgICAgZGlyZWN0aW9uLnggPSAtMVxuICAgIGVsc2UgaWYgKGtleUlzRG93bignQXJyb3dSaWdodCcpKVxuICAgICAgICBkaXJlY3Rpb24ueCA9IDFcbiAgICBlbHNlXG4gICAgICAgIGRpcmVjdGlvbi54ID0gMFxuXG4gICAgaWYgKGtleUlzRG93bignQXJyb3dVcCcpKVxuICAgICAgICBkaXJlY3Rpb24ueSA9IC0xXG4gICAgZWxzZSBpZiAoa2V5SXNEb3duKCdBcnJvd0Rvd24nKSlcbiAgICAgICAgZGlyZWN0aW9uLnkgPSAxXG4gICAgZWxzZVxuICAgICAgICBkaXJlY3Rpb24ueSA9IDBcbiAgICBcbiAgICBsZXQgc2VudCA9IGZhbHNlXG4gICAgaWYgKGtleUlzRG93bignICcpKSB7XG4gICAgICAgIGlmICghc2VudCkge1xuICAgICAgICAgICAgd2ViU29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHJhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAxLCB5OiAwLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICBzZW50ID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VudCA9IGZhbHNlXG4gICAgfVxuXG4gICAgZGlyZWN0aW9uID0gbm9ybWFsaXplZChkaXJlY3Rpb24pXG59XG5cbmNvbnN0IGRyYXdpbmcgPSBuZXcgRHJhd2luZygpXG5cbndlYlNvY2tldC5vbm1lc3NhZ2UgPSBldmVudCA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlcbiAgICBpZiAobWVzc2FnZS5nYW1lLnJhaWxzKVxuICAgICAgICBkcmF3aW5nLmFkZFJhaWxzKG1lc3NhZ2UuZ2FtZS5yYWlscywgcGVyZm9ybWFuY2Uubm93KCkpXG5cbiAgICBpZiAobWVzc2FnZS5nYW1lKVxuICAgICAgICBnYW1lID0gbWVzc2FnZS5nYW1lIGFzIEdhbWVcbn1cblxud2ViU29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICB0cmFja0tleXMoKVxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgd2ViU29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICB9KSlcbiAgICB9LCA1KVxuICAgIG1haW5Mb29wKCh0aW1lc3RhbXAsIGR0KSA9PiB7XG4gICAgICAgIHVwZGF0ZVBsYXllckRpcmVjdGlvbigpXG4gICAgICAgIGlmIChnYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBkcmF3aW5nLmRyYXdHYW1lKGdhbWUsIHRpbWVzdGFtcClcbiAgICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==