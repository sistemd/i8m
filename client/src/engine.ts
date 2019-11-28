export type Key = 'arrowLeft'|'arrowRight'|'arrowUp'|'arrowDown'

const keys: { [key: string]: boolean } = {}

export function trackKeyboard() {
    function keyHandler(value: boolean) {
        return (event: KeyboardEvent) => {
            switch (event.key) {
                case 'arrowLeft':
                    keys['arrowLeft'] = value
                    break
                case 'arrowRight':
                    keys['arrowRight'] = value
                    break
                case 'arrowUp':
                    keys['arrowUp'] = value
                    break
                case 'arrowDown':
                    keys['arrowDown'] = value
                    break
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
