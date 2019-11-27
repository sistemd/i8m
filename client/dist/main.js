const canvas = document.getElementById('frame').getContext('2d')

const player = { x: 0, y: 0, direction: { x: 0, y: 0 } }

const speed = 0.01

canvas.fillStyle = 'red'

let lastTime = performance.now()

function update(time) {
    const dt = time - lastTime
    lastTime = time
    player.x += player.direction.x * speed * dt
    player.y += player.direction.y * speed * dt
    canvas.clearRect(0, 0, 500, 500)
    canvas.fillRect(player.x, player.y, 20, 20)
    requestAnimationFrame(update)
}

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

    document.onkeydown = event => {
        switch (event.key) {
            case 'ArrowLeft':
                player.direction = { x: -1, y: 0 }
                break
            case 'ArrowRight':
                player.direction = { x: 1, y: 0 }
                break
            case 'ArrowUp':
                player.direction = { x: 0, y: 1 }
                break
            case 'ArrowDown':
                player.direction = { x: 0, y: -1 }
                break
            default:
                player.direction = { x: 0, y: 0}
                break
        }
    }
}

requestAnimationFrame(update)
