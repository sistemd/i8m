import { GameState, Vector } from './engine'

const canvas = (document.getElementById('frame') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D

export function drawGame(state: GameState): void {
    canvas.clearRect(0, 0, 500, 500)
    for (const { position, skin } of Object.values(state)) {
        canvas.fillStyle = skin
        canvas.fillRect(position.x, position.y, 20, 20)
    }
}
