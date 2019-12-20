interface Keys {
    ArrowLeft: boolean
    ArrowRight: boolean
    ArrowUp: boolean
    ArrowDown: boolean
    ' ': boolean
}

export type Key = keyof Keys

const keys: Keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    ' ': false,
}

export function trackKeys() {
    function keyboardHandler(value: boolean) {
        return (event: KeyboardEvent) => {
            for (const key in keys) {
                if (event.key === key) {
                    keys[key as Key] = value
                }
            }
        }
    }

    document.onkeydown = keyboardHandler(true)
    document.onkeyup = keyboardHandler(false)
}

export function keyIsDown(key: Key): boolean {
    return keys[key] || false
}

export function mainLoop(cb: (dt: number) => void)  {
    let lastTime = performance.now()

    function update(time: number) {
        const dt = time - lastTime
        lastTime = time
        cb(dt)
        requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
}

export interface Vector {
    x: number
    y: number
}

export function intensity(v: Vector): number {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

export function normalized(v: Vector): Vector {
    const a = intensity(v)
    return {
        x: v.x / a,
        y: v.y / a,
    }
}

export interface Game {
    players: {
        [playerId: string]: {
            position: Vector,
            direction: Vector,
            skin: string,
        }
    }
    rails: Array<{
        start: Vector,
        offset: Vector,
    }>
}
