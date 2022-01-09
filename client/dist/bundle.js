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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function connectionURL() {
    if (document.URL.indexOf("http") != -1)
        return document.URL.replace("http", "ws");
    else
        return "ws://" + document.URL;
}
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.intensity = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.normalized = function () {
        return new NormalizedVector(this.x, this.y);
    };
    return Vector;
}());
var NormalizedVector = /** @class */ (function (_super) {
    __extends(NormalizedVector, _super);
    function NormalizedVector(x, y) {
        var _this = this;
        if (x === 0 && y === 0) {
            _this = _super.call(this, 0, 0) || this;
            return;
        }
        var normalized = NormalizedVector.normalized(new Vector(x, y));
        _this = _super.call(this, normalized.x, normalized.y) || this;
        return _this;
    }
    NormalizedVector.normalized = function (direction) {
        var a = direction.intensity();
        return new Vector(direction.x / a, direction.y / a);
    };
    return NormalizedVector;
}(Vector));
var DirectionSender = /** @class */ (function () {
    function DirectionSender() {
        this.lastSentDirection = { direction: new Vector(0, 0) };
    }
    DirectionSender.prototype.shouldSend = function (direction) {
        if (direction.direction.x === this.lastSentDirection.direction.x &&
            direction.direction.y === this.lastSentDirection.direction.y) {
            return false;
        }
        this.lastSentDirection = direction;
        return true;
    };
    return DirectionSender;
}());
var UserInput = /** @class */ (function () {
    function UserInput() {
        this.onMovementDirectionChanged = undefined;
        this.onAimDirectionChanged = undefined;
        this.onRailFired = undefined;
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
            " ": false,
        };
    }
    UserInput.prototype.trackInputs = function () {
        this.trackKeys();
        this.trackMouse();
    };
    UserInput.prototype.trackKeys = function () {
        var _this = this;
        var keyboardHandler = function (set) {
            return function (event) {
                for (var key in _this.keys) {
                    if (event.key === key) {
                        _this.keys[key] = set;
                    }
                }
                _this.movementDirectionChanged();
            };
        };
        document.onkeydown = keyboardHandler(true);
        document.onkeyup = keyboardHandler(false);
    };
    UserInput.prototype.trackMouse = function () {
        // TODO Possibly this shouldn't be on document
        document.onclick = function (e) {
            if (e.button !== 0) {
                return;
            }
        };
        // TODO Track aiming direction
    };
    UserInput.prototype.movementDirectionChanged = function () {
        var _a;
        var direction = this.getMovementDirection();
        (_a = this.onMovementDirectionChanged) === null || _a === void 0 ? void 0 : _a.call(undefined, direction);
    };
    UserInput.prototype.getMovementDirection = function () {
        var x = 0;
        var y = 0;
        if (this.keyIsDown("ArrowLeft"))
            x = -1;
        else if (this.keyIsDown("ArrowRight"))
            x = 1;
        else
            x = 0;
        if (this.keyIsDown("ArrowUp"))
            y = -1;
        else if (this.keyIsDown("ArrowDown"))
            y = 1;
        else
            y = 0;
        return { direction: new Vector(x, y).normalized() };
    };
    UserInput.prototype.keyIsDown = function (key) {
        return this.keys[key] || false;
    };
    return UserInput;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.movementDirectionSender = new DirectionSender();
        this.terrain = undefined; // TODO
        this.webSocket = new WebSocket(connectionURL());
    }
    Game.prototype.start = function () {
        var _this = this;
        var input = new UserInput();
        input.trackInputs();
        input.onMovementDirectionChanged = function (newDirection) {
            if (_this.movementDirectionSender.shouldSend(newDirection)) {
                _this.webSocket.send(JSON.stringify({
                    direction: newDirection.direction,
                }));
            }
        };
        input.onAimDirectionChanged = undefined; // TODO
        input.onRailFired = undefined; // TODO
        this.webSocket.onopen = function () {
            _this.webSocket.send(JSON.stringify({
                fetchTerrain: true,
            }));
        };
        this.webSocket.onmessage = function (event) {
            var _a;
            var message = JSON.parse(event.data);
            if (message.game) {
                (_a = _this.onGameStateUpdated) === null || _a === void 0 ? void 0 : _a.call(undefined, message.game);
            }
            if (message.terrain) {
                _this.terrain = message.terrain;
            }
        };
    };
    Game.prototype.getTerrain = function () {
        return this.terrain;
    };
    return Game;
}());
var railDisplayDuration = 500; // milliseconds
var Drawing = /** @class */ (function () {
    function Drawing() {
        this.rails = [];
        this.canvas = document.getElementById("frame").getContext("2d");
    }
    Drawing.prototype.drawGame = function (game, terrain) {
        var timestamp = performance.now();
        //this.addRails(game.rails, timestamp);
        // Drop rails drawn for longer than railDisplayDuration milliseconds.
        this.rails = this.rails.filter(function (railDrawing) { return timestamp - railDrawing.timestamp < railDisplayDuration; });
        this.canvas.clearRect(0, 0, 500, 500);
        this.drawTerrain(terrain);
        if (game.players !== null) {
            for (var _i = 0, _a = Object.values(game.players); _i < _a.length; _i++) {
                var player = _a[_i];
                this.canvas.fillStyle = player.skin;
                this.canvas.beginPath();
                console.log(player.radius);
                this.canvas.ellipse(player.position.x, player.position.y, player.radius, player.radius, 0, 0, 2 * Math.PI);
                this.canvas.fill();
            }
        }
        for (var _b = 0, _c = this.rails; _b < _c.length; _b++) {
            var rail = _c[_b].rail;
            // XXX Fix this
            this.canvas.fillStyle = "black";
            this.canvas.fillRect(rail.start.x, rail.start.y, rail.offset.x + 5, rail.offset.y + 5);
        }
    };
    Drawing.prototype.drawTerrain = function (terrain) {
        this.canvas.fillStyle = "black";
        for (var _i = 0, _a = terrain.polygons; _i < _a.length; _i++) {
            var polygon = _a[_i];
            this.drawPolygon(polygon);
        }
    };
    Drawing.prototype.drawPolygon = function (polygon) {
        var started = false;
        this.canvas.beginPath();
        for (var _i = 0, _a = polygon.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!started) {
                started = true;
                this.canvas.moveTo(point.x, point.y);
            }
            else {
                this.canvas.lineTo(point.x, point.y);
            }
        }
        this.canvas.closePath();
        this.canvas.fill();
    };
    Drawing.prototype.addRails = function (rails, timestamp) {
        var _a;
        (_a = this.rails).push.apply(_a, rails.map(function (rail) {
            return { rail: rail, timestamp: timestamp };
        }));
    };
    return Drawing;
}());
function main() {
    var game = new Game();
    var drawing = new Drawing();
    game.onGameStateUpdated = function (gameState) {
        var _a;
        drawing.drawGame(gameState, (_a = game.getTerrain(), (_a !== null && _a !== void 0 ? _a : { polygons: [] })));
    };
    game.start();
}
main();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxTQUFTLGFBQWE7SUFDcEIsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBQ3ZDLE9BQU8sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7QUFDckMsQ0FBQztBQUVEO0lBQ0UsZ0JBQXFCLENBQVMsRUFBVyxDQUFTO1FBQTdCLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBVyxNQUFDLEdBQUQsQ0FBQyxDQUFRO0lBQUcs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QUFBRCxDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1gsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTlCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFDLFNBQVM7O1FBQ2xDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxRQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsdUNBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUMsQ0FBQztJQUNyRSxDQUFDLENBQUM7SUFFRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDZixDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJmdW5jdGlvbiBjb25uZWN0aW9uVVJMKCkge1xuICBpZiAoZG9jdW1lbnQuVVJMLmluZGV4T2YoXCJodHRwXCIpICE9IC0xKVxuICAgIHJldHVybiBkb2N1bWVudC5VUkwucmVwbGFjZShcImh0dHBcIiwgXCJ3c1wiKTtcbiAgZWxzZSByZXR1cm4gXCJ3czovL1wiICsgZG9jdW1lbnQuVVJMO1xufVxuXG5jbGFzcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSB4OiBudW1iZXIsIHJlYWRvbmx5IHk6IG51bWJlcikge31cblxuICBpbnRlbnNpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuICBub3JtYWxpemVkKCk6IE5vcm1hbGl6ZWRWZWN0b3Ige1xuICAgIHJldHVybiBuZXcgTm9ybWFsaXplZFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XG4gIH1cbn1cblxuY2xhc3MgTm9ybWFsaXplZFZlY3RvciBleHRlbmRzIFZlY3RvciB7XG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgICAgc3VwZXIoMCwgMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IE5vcm1hbGl6ZWRWZWN0b3Iubm9ybWFsaXplZChuZXcgVmVjdG9yKHgsIHkpKTtcbiAgICBzdXBlcihub3JtYWxpemVkLngsIG5vcm1hbGl6ZWQueSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVkKGRpcmVjdGlvbjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCBhID0gZGlyZWN0aW9uLmludGVuc2l0eSgpO1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGRpcmVjdGlvbi54IC8gYSwgZGlyZWN0aW9uLnkgLyBhKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlyZWN0aW9uIHtcbiAgcmVhZG9ubHkgZGlyZWN0aW9uOiBOb3JtYWxpemVkVmVjdG9yO1xufVxuXG5pbnRlcmZhY2UgUG9zaXRpb24ge1xuICByZWFkb25seSBwb3NpdGlvbjogVmVjdG9yO1xufVxuXG5jbGFzcyBEaXJlY3Rpb25TZW5kZXIge1xuICBwcml2YXRlIGxhc3RTZW50RGlyZWN0aW9uOiBEaXJlY3Rpb24gPSB7IGRpcmVjdGlvbjogbmV3IFZlY3RvcigwLCAwKSB9O1xuXG4gIHNob3VsZFNlbmQoZGlyZWN0aW9uOiBEaXJlY3Rpb24pOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICBkaXJlY3Rpb24uZGlyZWN0aW9uLnggPT09IHRoaXMubGFzdFNlbnREaXJlY3Rpb24uZGlyZWN0aW9uLnggJiZcbiAgICAgIGRpcmVjdGlvbi5kaXJlY3Rpb24ueSA9PT0gdGhpcy5sYXN0U2VudERpcmVjdGlvbi5kaXJlY3Rpb24ueVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMubGFzdFNlbnREaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuY2xhc3MgVXNlcklucHV0IHtcbiAgb25Nb3ZlbWVudERpcmVjdGlvbkNoYW5nZWQ/OiAobmV3RGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHZvaWQgPSB1bmRlZmluZWQ7XG4gIG9uQWltRGlyZWN0aW9uQ2hhbmdlZD86IChuZXdEaXJlY3Rpb246IERpcmVjdGlvbikgPT4gdm9pZCA9IHVuZGVmaW5lZDtcbiAgb25SYWlsRmlyZWQ/OiAodGFyZ2V0OiBQb3NpdGlvbikgPT4gdm9pZCA9IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHJlYWRvbmx5IGtleXM6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+ID0ge1xuICAgIEFycm93TGVmdDogZmFsc2UsXG4gICAgQXJyb3dSaWdodDogZmFsc2UsXG4gICAgQXJyb3dVcDogZmFsc2UsXG4gICAgQXJyb3dEb3duOiBmYWxzZSxcbiAgICBcIiBcIjogZmFsc2UsXG4gIH07XG5cbiAgdHJhY2tJbnB1dHMoKSB7XG4gICAgdGhpcy50cmFja0tleXMoKTtcbiAgICB0aGlzLnRyYWNrTW91c2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhY2tLZXlzKCkge1xuICAgIGNvbnN0IGtleWJvYXJkSGFuZGxlciA9IChzZXQ6IGJvb2xlYW4pID0+IHtcbiAgICAgIHJldHVybiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5rZXlzKSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICB0aGlzLmtleXNba2V5XSA9IHNldDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vdmVtZW50RGlyZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQub25rZXlkb3duID0ga2V5Ym9hcmRIYW5kbGVyKHRydWUpO1xuICAgIGRvY3VtZW50Lm9ua2V5dXAgPSBrZXlib2FyZEhhbmRsZXIoZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFja01vdXNlKCkge1xuICAgIC8vIFRPRE8gUG9zc2libHkgdGhpcyBzaG91bGRuJ3QgYmUgb24gZG9jdW1lbnRcbiAgICBkb2N1bWVudC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBUT0RPIFRyYWNrIGFpbWluZyBkaXJlY3Rpb25cbiAgfVxuXG4gIHByaXZhdGUgbW92ZW1lbnREaXJlY3Rpb25DaGFuZ2VkKCkge1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZ2V0TW92ZW1lbnREaXJlY3Rpb24oKTtcbiAgICB0aGlzLm9uTW92ZW1lbnREaXJlY3Rpb25DaGFuZ2VkPy5jYWxsKHVuZGVmaW5lZCwgZGlyZWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TW92ZW1lbnREaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICBsZXQgeCA9IDA7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgaWYgKHRoaXMua2V5SXNEb3duKFwiQXJyb3dMZWZ0XCIpKSB4ID0gLTE7XG4gICAgZWxzZSBpZiAodGhpcy5rZXlJc0Rvd24oXCJBcnJvd1JpZ2h0XCIpKSB4ID0gMTtcbiAgICBlbHNlIHggPSAwO1xuXG4gICAgaWYgKHRoaXMua2V5SXNEb3duKFwiQXJyb3dVcFwiKSkgeSA9IC0xO1xuICAgIGVsc2UgaWYgKHRoaXMua2V5SXNEb3duKFwiQXJyb3dEb3duXCIpKSB5ID0gMTtcbiAgICBlbHNlIHkgPSAwO1xuXG4gICAgcmV0dXJuIHsgZGlyZWN0aW9uOiBuZXcgVmVjdG9yKHgsIHkpLm5vcm1hbGl6ZWQoKSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBrZXlJc0Rvd24oa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5rZXlzW2tleV0gfHwgZmFsc2U7XG4gIH1cbn1cblxuY2xhc3MgR2FtZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2ViU29ja2V0OiBXZWJTb2NrZXQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgbW92ZW1lbnREaXJlY3Rpb25TZW5kZXIgPSBuZXcgRGlyZWN0aW9uU2VuZGVyKCk7XG4gIHByaXZhdGUgdGVycmFpbj86IFRlcnJhaW4gPSB1bmRlZmluZWQ7IC8vIFRPRE9cbiAgLy8gVE9ETyBJbiB0aGUgZnV0dXJlLCB0aGlzIGNsYXNzIHNob3VsZCBwcm9iYWJseSBob2xkIHRoZSBwbGF5ZXIgSUQgYXMgd2VsbCB0byBrbm93IGhvdyB0byByZWNvbm5lY3RcblxuICBvbkdhbWVTdGF0ZVVwZGF0ZWQ/OiAobmV3U3RhdGU6IEdhbWVTdGF0ZSkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLndlYlNvY2tldCA9IG5ldyBXZWJTb2NrZXQoY29ubmVjdGlvblVSTCgpKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IGlucHV0ID0gbmV3IFVzZXJJbnB1dCgpO1xuICAgIGlucHV0LnRyYWNrSW5wdXRzKCk7XG5cbiAgICBpbnB1dC5vbk1vdmVtZW50RGlyZWN0aW9uQ2hhbmdlZCA9IChuZXdEaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgaWYgKHRoaXMubW92ZW1lbnREaXJlY3Rpb25TZW5kZXIuc2hvdWxkU2VuZChuZXdEaXJlY3Rpb24pKSB7XG4gICAgICAgIHRoaXMud2ViU29ja2V0LnNlbmQoXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBuZXdEaXJlY3Rpb24uZGlyZWN0aW9uLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlucHV0Lm9uQWltRGlyZWN0aW9uQ2hhbmdlZCA9IHVuZGVmaW5lZDsgLy8gVE9ET1xuXG4gICAgaW5wdXQub25SYWlsRmlyZWQgPSB1bmRlZmluZWQ7IC8vIFRPRE9cblxuICAgIHRoaXMud2ViU29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgIHRoaXMud2ViU29ja2V0LnNlbmQoXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBmZXRjaFRlcnJhaW46IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLndlYlNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgaWYgKG1lc3NhZ2UuZ2FtZSkge1xuICAgICAgICB0aGlzLm9uR2FtZVN0YXRlVXBkYXRlZD8uY2FsbCh1bmRlZmluZWQsIG1lc3NhZ2UuZ2FtZSk7XG4gICAgICB9XG4gICAgICBpZiAobWVzc2FnZS50ZXJyYWluKSB7XG4gICAgICAgIHRoaXMudGVycmFpbiA9IG1lc3NhZ2UudGVycmFpbjtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZ2V0VGVycmFpbigpOiBUZXJyYWluIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy50ZXJyYWluO1xuICB9XG59XG5cbmludGVyZmFjZSBQb2x5Z29uIHtcbiAgcG9pbnRzOiBWZWN0b3JbXTtcbn1cblxuaW50ZXJmYWNlIFRlcnJhaW4ge1xuICBwb2x5Z29uczogUG9seWdvbltdO1xufVxuXG5pbnRlcmZhY2UgUGxheWVyIHtcbiAgcG9zaXRpb246IFZlY3RvcjtcbiAgZGlyZWN0aW9uOiBWZWN0b3I7XG4gIHNraW46IHN0cmluZztcbiAgcmFkaXVzOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBSYWlsIHtcbiAgc3RhcnQ6IFZlY3RvcjtcbiAgb2Zmc2V0OiBWZWN0b3I7XG59XG5cbmludGVyZmFjZSBHYW1lU3RhdGUge1xuICBwbGF5ZXJzOiB7IFtwbGF5ZXJJZDogc3RyaW5nXTogUGxheWVyIH07XG4gIHJhaWxzOiBSYWlsW107XG59XG5cbmludGVyZmFjZSBSYWlsRHJhd2luZyB7XG4gIHJhaWw6IFJhaWw7XG4gIHRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcDtcbn1cblxuY29uc3QgcmFpbERpc3BsYXlEdXJhdGlvbiA9IDUwMDsgLy8gbWlsbGlzZWNvbmRzXG5cbmNsYXNzIERyYXdpbmcge1xuICBwcml2YXRlIHJhaWxzOiBSYWlsRHJhd2luZ1tdID0gW107XG4gIHByaXZhdGUgY2FudmFzOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYW52YXMgPSAoXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyYW1lXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50XG4gICAgKS5nZXRDb250ZXh0KFwiMmRcIikgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICB9XG5cbiAgZHJhd0dhbWUoZ2FtZTogR2FtZVN0YXRlLCB0ZXJyYWluOiBUZXJyYWluKTogdm9pZCB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICAvL3RoaXMuYWRkUmFpbHMoZ2FtZS5yYWlscywgdGltZXN0YW1wKTtcblxuICAgIC8vIERyb3AgcmFpbHMgZHJhd24gZm9yIGxvbmdlciB0aGFuIHJhaWxEaXNwbGF5RHVyYXRpb24gbWlsbGlzZWNvbmRzLlxuICAgIHRoaXMucmFpbHMgPSB0aGlzLnJhaWxzLmZpbHRlcihcbiAgICAgIChyYWlsRHJhd2luZykgPT4gdGltZXN0YW1wIC0gcmFpbERyYXdpbmcudGltZXN0YW1wIDwgcmFpbERpc3BsYXlEdXJhdGlvblxuICAgICk7XG5cbiAgICB0aGlzLmNhbnZhcy5jbGVhclJlY3QoMCwgMCwgNTAwLCA1MDApO1xuXG4gICAgdGhpcy5kcmF3VGVycmFpbih0ZXJyYWluKTtcblxuICAgIGlmIChnYW1lLnBsYXllcnMgIT09IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3QgcGxheWVyIG9mIE9iamVjdC52YWx1ZXMoZ2FtZS5wbGF5ZXJzKSkge1xuICAgICAgICB0aGlzLmNhbnZhcy5maWxsU3R5bGUgPSBwbGF5ZXIuc2tpbjtcbiAgICAgICAgdGhpcy5jYW52YXMuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllci5yYWRpdXMpO1xuICAgICAgICB0aGlzLmNhbnZhcy5lbGxpcHNlKFxuICAgICAgICAgIHBsYXllci5wb3NpdGlvbi54LFxuICAgICAgICAgIHBsYXllci5wb3NpdGlvbi55LFxuICAgICAgICAgIHBsYXllci5yYWRpdXMsXG4gICAgICAgICAgcGxheWVyLnJhZGl1cyxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMiAqIE1hdGguUElcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jYW52YXMuZmlsbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgeyByYWlsIH0gb2YgdGhpcy5yYWlscykge1xuICAgICAgLy8gWFhYIEZpeCB0aGlzXG4gICAgICB0aGlzLmNhbnZhcy5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICB0aGlzLmNhbnZhcy5maWxsUmVjdChcbiAgICAgICAgcmFpbC5zdGFydC54LFxuICAgICAgICByYWlsLnN0YXJ0LnksXG4gICAgICAgIHJhaWwub2Zmc2V0LnggKyA1LFxuICAgICAgICByYWlsLm9mZnNldC55ICsgNVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYXdUZXJyYWluKHRlcnJhaW46IFRlcnJhaW4pIHtcbiAgICB0aGlzLmNhbnZhcy5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgZm9yIChjb25zdCBwb2x5Z29uIG9mIHRlcnJhaW4ucG9seWdvbnMpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24ocG9seWdvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmF3UG9seWdvbihwb2x5Z29uOiBQb2x5Z29uKSB7XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNhbnZhcy5iZWdpblBhdGgoKTtcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHBvbHlnb24ucG9pbnRzKSB7XG4gICAgICBpZiAoIXN0YXJ0ZWQpIHtcbiAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FudmFzLm1vdmVUbyhwb2ludC54LCBwb2ludC55KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FudmFzLmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jYW52YXMuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jYW52YXMuZmlsbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRSYWlscyhyYWlsczogUmFpbFtdLCB0aW1lc3RhbXA6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmFpbHMucHVzaChcbiAgICAgIC4uLnJhaWxzLm1hcCgocmFpbCkgPT4ge1xuICAgICAgICByZXR1cm4geyByYWlsLCB0aW1lc3RhbXAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgY29uc3QgZHJhd2luZyA9IG5ldyBEcmF3aW5nKCk7XG5cbiAgZ2FtZS5vbkdhbWVTdGF0ZVVwZGF0ZWQgPSAoZ2FtZVN0YXRlKSA9PiB7XG4gICAgZHJhd2luZy5kcmF3R2FtZShnYW1lU3RhdGUsIGdhbWUuZ2V0VGVycmFpbigpID8/IHsgcG9seWdvbnM6IFtdIH0pO1xuICB9O1xuXG4gIGdhbWUuc3RhcnQoKTtcbn1cblxubWFpbigpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==