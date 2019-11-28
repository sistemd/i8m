import { trackKeyboard, mainLoop } from './engine'

const canvas = (document.getElementById('frame') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D

const player = { x: 0, y: 0, direction: { x: 0, y: 0 } }

const speed = 0.01

canvas.fillStyle = 'red'

const webSocket = new WebSocket('ws://localhost:8080')

webSocket.onmessage = event => {
    const position = JSON.parse(event.data)
    console.log(position)
    player.x = position['X']
    player.y = position['Y']
}

webSocket.onopen = () => {
    setInterval(() => {
        webSocket.send(JSON.stringify(player))
    }, 50)

    trackKeyboard()
}

mainLoop(dt => {
    player.x += player.direction.x * speed * dt
    player.y += player.direction.y * speed * dt
    canvas.clearRect(0, 0, 500, 500)
    canvas.fillRect(player.x, player.y, 20, 20)
})
