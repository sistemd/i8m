import { Game, Vector } from './engine'

const canvas = (document.getElementById('frame') as HTMLCanvasElement)
    .getContext('2d') as CanvasRenderingContext2D

export function drawGame(game: Game): void {
    canvas.clearRect(0, 0, 500, 500)
    for (const { position, skin } of Object.values(game.players)) {
        canvas.fillStyle = skin
        canvas.fillRect(position.x, position.y, 20, 20)
    }

    if (game.rails === null)
        return

    for (const { start, offset } of Object.values(game.rails)) {
        canvas.fillStyle = 'black'
        canvas.fillRect(start.x, start.y, offset.x + 5, offset.y + 5)
    }
}
