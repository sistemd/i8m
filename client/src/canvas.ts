import { Game, Rail } from './engine'

interface RailDrawing {
    rail: Rail
    timestamp: DOMHighResTimeStamp
}

const railDisplayDuration = 500 // milliseconds

export class Drawing {
    private rails: RailDrawing[] = []
    private canvas: CanvasRenderingContext2D

    constructor() {
        this.canvas = (document.getElementById('frame') as HTMLCanvasElement)
            .getContext('2d') as CanvasRenderingContext2D
    }

    addRails(rails: Rail[], timestamp: number): void {
            this.rails.push(...rails.map(rail => {
                return { rail, timestamp }
            }))
    }

    drawGame(game: Game, timestamp: number): void {
        // Drop rails drawn for longer than railDisplayDuration milliseconds.
        this.rails = this.rails.filter(
            railDrawing => timestamp - railDrawing.timestamp < railDisplayDuration)

        this.canvas.clearRect(0, 0, 500, 500)
        if (game.players !== null) {
            for (const player of Object.values(game.players)) {
                this.canvas.fillStyle = player.skin
                this.canvas.fillRect(player.position.x, player.position.y, 20, 20)
            }
        }

        for (const { rail, timestamp } of this.rails) {
            // XXX Fix this
            this.canvas.fillStyle = 'black'
            this.canvas.fillRect(rail.start.x, rail.start.y, rail.offset.x + 5, rail.offset.y + 5)
        }
    }
}
