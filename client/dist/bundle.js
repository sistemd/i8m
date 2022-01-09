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
        this.staticTerrain = undefined; // TODO
        this.webSocket = new WebSocket(connectionURL());
    }
    Game.prototype.start = function () {
        var _this = this;
        var input = new UserInput();
        input.trackInputs();
        input.onMovementDirectionChanged = function (newDirection) {
            if (_this.movementDirectionSender.shouldSend(newDirection)) {
                console.log(newDirection.direction.x, newDirection.direction.y);
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
            if (message.staticTerrain) {
                _this.staticTerrain = message.staticTerrain;
            }
        };
    };
    Game.prototype.getStaticTerrain = function () {
        return this.staticTerrain;
    };
    return Game;
}());
var railDisplayDuration = 500; // milliseconds
var Drawing = /** @class */ (function () {
    function Drawing() {
        this.rails = [];
        this.canvas = document.getElementById("frame").getContext("2d");
    }
    Drawing.prototype.drawGame = function (game) {
        var timestamp = performance.now();
        //this.addRails(game.rails, timestamp);
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
            var rail = _c[_b].rail;
            // XXX Fix this
            this.canvas.fillStyle = "black";
            this.canvas.fillRect(rail.start.x, rail.start.y, rail.offset.x + 5, rail.offset.y + 5);
        }
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
        drawing.drawGame(gameState);
    };
    game.start();
}
main();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxTQUFTLGFBQWE7SUFDcEIsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBQ3ZDLE9BQU8sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7QUFDckMsQ0FBQztBQUVEO0lBQ0UsZ0JBQXFCLENBQVMsRUFBVyxDQUFTO1FBQTdCLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBVyxNQUFDLEdBQUQsQ0FBQyxDQUFRO0lBQUcs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QUM7SUFDSCxjQUFDO0FBQUQsQ0FBQztBQUVELFNBQVMsSUFBSTtJQUNYLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDeEIsSUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUU5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsVUFBQyxTQUFTO1FBQ2xDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2YsQ0FBQztBQUVELElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZnVuY3Rpb24gY29ubmVjdGlvblVSTCgpIHtcbiAgaWYgKGRvY3VtZW50LlVSTC5pbmRleE9mKFwiaHR0cFwiKSAhPSAtMSlcbiAgICByZXR1cm4gZG9jdW1lbnQuVVJMLnJlcGxhY2UoXCJodHRwXCIsIFwid3NcIik7XG4gIGVsc2UgcmV0dXJuIFwid3M6Ly9cIiArIGRvY3VtZW50LlVSTDtcbn1cblxuY2xhc3MgVmVjdG9yIHtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgeDogbnVtYmVyLCByZWFkb25seSB5OiBudW1iZXIpIHt9XG5cbiAgaW50ZW5zaXR5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cbiAgbm9ybWFsaXplZCgpOiBOb3JtYWxpemVkVmVjdG9yIHtcbiAgICByZXR1cm4gbmV3IE5vcm1hbGl6ZWRWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xuICB9XG59XG5cbmNsYXNzIE5vcm1hbGl6ZWRWZWN0b3IgZXh0ZW5kcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIGlmICh4ID09PSAwICYmIHkgPT09IDApIHtcbiAgICAgIHN1cGVyKDAsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBOb3JtYWxpemVkVmVjdG9yLm5vcm1hbGl6ZWQobmV3IFZlY3Rvcih4LCB5KSk7XG4gICAgc3VwZXIobm9ybWFsaXplZC54LCBub3JtYWxpemVkLnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbm9ybWFsaXplZChkaXJlY3Rpb246IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgY29uc3QgYSA9IGRpcmVjdGlvbi5pbnRlbnNpdHkoKTtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihkaXJlY3Rpb24ueCAvIGEsIGRpcmVjdGlvbi55IC8gYSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERpcmVjdGlvbiB7XG4gIHJlYWRvbmx5IGRpcmVjdGlvbjogTm9ybWFsaXplZFZlY3Rvcjtcbn1cblxuaW50ZXJmYWNlIFBvc2l0aW9uIHtcbiAgcmVhZG9ubHkgcG9zaXRpb246IFZlY3Rvcjtcbn1cblxuY2xhc3MgRGlyZWN0aW9uU2VuZGVyIHtcbiAgcHJpdmF0ZSBsYXN0U2VudERpcmVjdGlvbjogRGlyZWN0aW9uID0geyBkaXJlY3Rpb246IG5ldyBWZWN0b3IoMCwgMCkgfTtcblxuICBzaG91bGRTZW5kKGRpcmVjdGlvbjogRGlyZWN0aW9uKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgZGlyZWN0aW9uLmRpcmVjdGlvbi54ID09PSB0aGlzLmxhc3RTZW50RGlyZWN0aW9uLmRpcmVjdGlvbi54ICYmXG4gICAgICBkaXJlY3Rpb24uZGlyZWN0aW9uLnkgPT09IHRoaXMubGFzdFNlbnREaXJlY3Rpb24uZGlyZWN0aW9uLnlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RTZW50RGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmNsYXNzIFVzZXJJbnB1dCB7XG4gIG9uTW92ZW1lbnREaXJlY3Rpb25DaGFuZ2VkPzogKG5ld0RpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB2b2lkID0gdW5kZWZpbmVkO1xuICBvbkFpbURpcmVjdGlvbkNoYW5nZWQ/OiAobmV3RGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHZvaWQgPSB1bmRlZmluZWQ7XG4gIG9uUmFpbEZpcmVkPzogKHRhcmdldDogUG9zaXRpb24pID0+IHZvaWQgPSB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBrZXlzOiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPiA9IHtcbiAgICBBcnJvd0xlZnQ6IGZhbHNlLFxuICAgIEFycm93UmlnaHQ6IGZhbHNlLFxuICAgIEFycm93VXA6IGZhbHNlLFxuICAgIEFycm93RG93bjogZmFsc2UsXG4gICAgXCIgXCI6IGZhbHNlLFxuICB9O1xuXG4gIHRyYWNrSW5wdXRzKCkge1xuICAgIHRoaXMudHJhY2tLZXlzKCk7XG4gICAgdGhpcy50cmFja01vdXNlKCk7XG4gIH1cblxuICBwcml2YXRlIHRyYWNrS2V5cygpIHtcbiAgICBjb25zdCBrZXlib2FyZEhhbmRsZXIgPSAoc2V0OiBib29sZWFuKSA9PiB7XG4gICAgICByZXR1cm4gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMua2V5cykge1xuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgdGhpcy5rZXlzW2tleV0gPSBzZXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlbWVudERpcmVjdGlvbkNoYW5nZWQoKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGtleWJvYXJkSGFuZGxlcih0cnVlKTtcbiAgICBkb2N1bWVudC5vbmtleXVwID0ga2V5Ym9hcmRIYW5kbGVyKGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhY2tNb3VzZSgpIHtcbiAgICAvLyBUT0RPIFBvc3NpYmx5IHRoaXMgc2hvdWxkbid0IGJlIG9uIGRvY3VtZW50XG4gICAgZG9jdW1lbnQub25jbGljayA9IChlKSA9PiB7XG4gICAgICBpZiAoZS5idXR0b24gIT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8gVE9ETyBUcmFjayBhaW1pbmcgZGlyZWN0aW9uXG4gIH1cblxuICBwcml2YXRlIG1vdmVtZW50RGlyZWN0aW9uQ2hhbmdlZCgpIHtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmdldE1vdmVtZW50RGlyZWN0aW9uKCk7XG4gICAgdGhpcy5vbk1vdmVtZW50RGlyZWN0aW9uQ2hhbmdlZD8uY2FsbCh1bmRlZmluZWQsIGRpcmVjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGdldE1vdmVtZW50RGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcblxuICAgIGlmICh0aGlzLmtleUlzRG93bihcIkFycm93TGVmdFwiKSkgeCA9IC0xO1xuICAgIGVsc2UgaWYgKHRoaXMua2V5SXNEb3duKFwiQXJyb3dSaWdodFwiKSkgeCA9IDE7XG4gICAgZWxzZSB4ID0gMDtcblxuICAgIGlmICh0aGlzLmtleUlzRG93bihcIkFycm93VXBcIikpIHkgPSAtMTtcbiAgICBlbHNlIGlmICh0aGlzLmtleUlzRG93bihcIkFycm93RG93blwiKSkgeSA9IDE7XG4gICAgZWxzZSB5ID0gMDtcblxuICAgIHJldHVybiB7IGRpcmVjdGlvbjogbmV3IFZlY3Rvcih4LCB5KS5ub3JtYWxpemVkKCkgfTtcbiAgfVxuXG4gIHByaXZhdGUga2V5SXNEb3duKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMua2V5c1trZXldIHx8IGZhbHNlO1xuICB9XG59XG5cbmNsYXNzIEdhbWUge1xuICBwcml2YXRlIHJlYWRvbmx5IHdlYlNvY2tldDogV2ViU29ja2V0O1xuICBwcml2YXRlIHJlYWRvbmx5IG1vdmVtZW50RGlyZWN0aW9uU2VuZGVyID0gbmV3IERpcmVjdGlvblNlbmRlcigpO1xuICBwcml2YXRlIHN0YXRpY1RlcnJhaW4/OiBTdGF0aWNUZXJyYWluID0gdW5kZWZpbmVkOyAvLyBUT0RPXG4gIC8vIFRPRE8gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjbGFzcyBzaG91bGQgcHJvYmFibHkgaG9sZCB0aGUgcGxheWVyIElEIGFzIHdlbGwgdG8ga25vdyBob3cgdG8gcmVjb25uZWN0XG5cbiAgb25HYW1lU3RhdGVVcGRhdGVkPzogKG5ld1N0YXRlOiBHYW1lU3RhdGUpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53ZWJTb2NrZXQgPSBuZXcgV2ViU29ja2V0KGNvbm5lY3Rpb25VUkwoKSk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBjb25zdCBpbnB1dCA9IG5ldyBVc2VySW5wdXQoKTtcbiAgICBpbnB1dC50cmFja0lucHV0cygpO1xuXG4gICAgaW5wdXQub25Nb3ZlbWVudERpcmVjdGlvbkNoYW5nZWQgPSAobmV3RGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIGlmICh0aGlzLm1vdmVtZW50RGlyZWN0aW9uU2VuZGVyLnNob3VsZFNlbmQobmV3RGlyZWN0aW9uKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhuZXdEaXJlY3Rpb24uZGlyZWN0aW9uLngsIG5ld0RpcmVjdGlvbi5kaXJlY3Rpb24ueSk7XG4gICAgICAgIHRoaXMud2ViU29ja2V0LnNlbmQoXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBuZXdEaXJlY3Rpb24uZGlyZWN0aW9uLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlucHV0Lm9uQWltRGlyZWN0aW9uQ2hhbmdlZCA9IHVuZGVmaW5lZDsgLy8gVE9ET1xuXG4gICAgaW5wdXQub25SYWlsRmlyZWQgPSB1bmRlZmluZWQ7IC8vIFRPRE9cblxuICAgIHRoaXMud2ViU29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgIHRoaXMud2ViU29ja2V0LnNlbmQoXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBmZXRjaFRlcnJhaW46IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLndlYlNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgaWYgKG1lc3NhZ2UuZ2FtZSkge1xuICAgICAgICB0aGlzLm9uR2FtZVN0YXRlVXBkYXRlZD8uY2FsbCh1bmRlZmluZWQsIG1lc3NhZ2UuZ2FtZSk7XG4gICAgICB9XG4gICAgICBpZiAobWVzc2FnZS5zdGF0aWNUZXJyYWluKSB7XG4gICAgICAgIHRoaXMuc3RhdGljVGVycmFpbiA9IG1lc3NhZ2Uuc3RhdGljVGVycmFpbjtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZ2V0U3RhdGljVGVycmFpbigpOiBTdGF0aWNUZXJyYWluIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0aWNUZXJyYWluO1xuICB9XG59XG5cbmludGVyZmFjZSBTdGF0aWNUZXJyYWluIHt9XG5cbmludGVyZmFjZSBQbGF5ZXIge1xuICBwb3NpdGlvbjogVmVjdG9yO1xuICBkaXJlY3Rpb246IFZlY3RvcjtcbiAgc2tpbjogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUmFpbCB7XG4gIHN0YXJ0OiBWZWN0b3I7XG4gIG9mZnNldDogVmVjdG9yO1xufVxuXG5pbnRlcmZhY2UgR2FtZVN0YXRlIHtcbiAgcGxheWVyczogeyBbcGxheWVySWQ6IHN0cmluZ106IFBsYXllciB9O1xuICByYWlsczogUmFpbFtdO1xufVxuXG5pbnRlcmZhY2UgUmFpbERyYXdpbmcge1xuICByYWlsOiBSYWlsO1xuICB0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXA7XG59XG5cbmNvbnN0IHJhaWxEaXNwbGF5RHVyYXRpb24gPSA1MDA7IC8vIG1pbGxpc2Vjb25kc1xuXG5jbGFzcyBEcmF3aW5nIHtcbiAgcHJpdmF0ZSByYWlsczogUmFpbERyYXdpbmdbXSA9IFtdO1xuICBwcml2YXRlIGNhbnZhczogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FudmFzID0gKFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmFtZVwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudFxuICAgICkuZ2V0Q29udGV4dChcIjJkXCIpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgfVxuXG4gIGRyYXdHYW1lKGdhbWU6IEdhbWVTdGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgLy90aGlzLmFkZFJhaWxzKGdhbWUucmFpbHMsIHRpbWVzdGFtcCk7XG5cbiAgICAvLyBEcm9wIHJhaWxzIGRyYXduIGZvciBsb25nZXIgdGhhbiByYWlsRGlzcGxheUR1cmF0aW9uIG1pbGxpc2Vjb25kcy5cbiAgICB0aGlzLnJhaWxzID0gdGhpcy5yYWlscy5maWx0ZXIoXG4gICAgICAocmFpbERyYXdpbmcpID0+IHRpbWVzdGFtcCAtIHJhaWxEcmF3aW5nLnRpbWVzdGFtcCA8IHJhaWxEaXNwbGF5RHVyYXRpb25cbiAgICApO1xuXG4gICAgdGhpcy5jYW52YXMuY2xlYXJSZWN0KDAsIDAsIDUwMCwgNTAwKTtcbiAgICBpZiAoZ2FtZS5wbGF5ZXJzICE9PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IHBsYXllciBvZiBPYmplY3QudmFsdWVzKGdhbWUucGxheWVycykpIHtcbiAgICAgICAgdGhpcy5jYW52YXMuZmlsbFN0eWxlID0gcGxheWVyLnNraW47XG4gICAgICAgIHRoaXMuY2FudmFzLmZpbGxSZWN0KHBsYXllci5wb3NpdGlvbi54LCBwbGF5ZXIucG9zaXRpb24ueSwgMjAsIDIwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHsgcmFpbCB9IG9mIHRoaXMucmFpbHMpIHtcbiAgICAgIC8vIFhYWCBGaXggdGhpc1xuICAgICAgdGhpcy5jYW52YXMuZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgdGhpcy5jYW52YXMuZmlsbFJlY3QoXG4gICAgICAgIHJhaWwuc3RhcnQueCxcbiAgICAgICAgcmFpbC5zdGFydC55LFxuICAgICAgICByYWlsLm9mZnNldC54ICsgNSxcbiAgICAgICAgcmFpbC5vZmZzZXQueSArIDVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRSYWlscyhyYWlsczogUmFpbFtdLCB0aW1lc3RhbXA6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmFpbHMucHVzaChcbiAgICAgIC4uLnJhaWxzLm1hcCgocmFpbCkgPT4ge1xuICAgICAgICByZXR1cm4geyByYWlsLCB0aW1lc3RhbXAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgY29uc3QgZHJhd2luZyA9IG5ldyBEcmF3aW5nKCk7XG5cbiAgZ2FtZS5vbkdhbWVTdGF0ZVVwZGF0ZWQgPSAoZ2FtZVN0YXRlKSA9PiB7XG4gICAgZHJhd2luZy5kcmF3R2FtZShnYW1lU3RhdGUpO1xuICB9O1xuXG4gIGdhbWUuc3RhcnQoKTtcbn1cblxubWFpbigpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==