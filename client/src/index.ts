import { trackKeyboard, mainLoop, keyIsDown } from './engine'

const canvas = (document.getElementById('frame') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D

const player = { x: 0, y: 0, direction: { x: 0, y: 0 } }

const speed = 0.01

canvas.fillStyle = 'red'

const webSocket = new WebSocket('ws://localhost:8080')

function updatePlayerDirection() {
    if (keyIsDown('arrowLeft'))
        player.direction = { x: -1, y: 0 }
    if (keyIsDown('arrowRight'))
        player.direction = { x: 1, y: 0 }
    if (keyIsDown('arrowUp'))
        player.direction = { x: 0, y: -1 }
    if (keyIsDown('arrowDown'))
        player.direction = { x: 0, y: 1 }
}

webSocket.onmessage = event => {
    console.log(event)
    const message = JSON.parse(event.data)
    console.log(message)
}

webSocket.onopen = () => {
    trackKeyboard()
    setInterval(() => {
        webSocket.send(JSON.stringify(player.direction))
    }, 500)
    mainLoop(dt => {
        updatePlayerDirection()
        canvas.clearRect(0, 0, 500, 500)
        canvas.fillRect(player.x, player.y, 20, 20)
    })
}
