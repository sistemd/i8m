import { GameState, Vector } from './engine'

const canvas = (document.getElementById('frame') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
canvas.fillStyle = 'red'

export function drawGame(state: GameState): void {
    canvas.clearRect(0, 0, 500, 500)
    for (const { position } of Object.values(state)) {
        canvas.fillRect(position.x, position.y, 20, 20)
    }
}
