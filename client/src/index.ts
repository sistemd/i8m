import { trackKeyboard, mainLoop, keyIsDown, GameState } from './engine'
import { drawGame } from './canvas'

let direction = { x:0, y:0 }

const speed = 0.01

const webSocket = new WebSocket('ws://localhost:8080')

let gameState: GameState|undefined

function updatePlayerDirection() {
    if (keyIsDown('ArrowLeft'))
        direction = { x: -1, y: 0 }
    else if (keyIsDown('ArrowRight'))
        direction = { x: 1, y: 0 }
    else if (keyIsDown('ArrowUp'))
        direction = { x: 0, y: -1 }
    else if (keyIsDown('ArrowDown'))
        direction = { x: 0, y: 1 }
    else
        direction = { x: 0, y: 0 }
}

webSocket.onmessage = event => {
    const message = JSON.parse(event.data)
    if (message.state)
        gameState = message.state as GameState
}

webSocket.onopen = () => {
    trackKeyboard()
    setInterval(() => {
        webSocket.send(JSON.stringify({
            direction,
        }))
    }, 5)
    mainLoop(dt => {
        updatePlayerDirection()
        if (gameState !== undefined)
            drawGame(gameState)
    })
}
