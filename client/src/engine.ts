interface Keys {
    ArrowLeft: boolean
    ArrowRight: boolean
    ArrowUp: boolean
    ArrowDown: boolean
}

export type Key = keyof Keys

const keys: Keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
}

export function trackKeyboard() {
    function keyHandler(value: boolean) {
        return (event: KeyboardEvent) => {
            for (const key in keys) {
                if (event.key === key) {
                    keys[key as Key] = value
                }
            }
        }
    }

    document.onkeydown = keyHandler(true)
    document.onkeyup = keyHandler(false)
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

export interface GameState {
    [playerId: string]: {
        position: Vector,
        direction: Vector,
        skin: string,
    }
}
