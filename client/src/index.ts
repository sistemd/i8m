function connectionURL() {
  if (document.URL.indexOf("http") != -1)
    return document.URL.replace("http", "ws");
  else return "ws://" + document.URL;
}

class Vector {
  constructor(readonly x: number, readonly y: number) {}

  intensity(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalized(): NormalizedVector {
    return new NormalizedVector(this.x, this.y);
  }
}

class NormalizedVector extends Vector {
  constructor(x: number, y: number) {
    if (x === 0 && y === 0) {
      super(0, 0);
      return;
    }

    const normalized = NormalizedVector.normalized(new Vector(x, y));
    super(normalized.x, normalized.y);
  }

  private static normalized(direction: Vector): Vector {
    const a = direction.intensity();
    return new Vector(direction.x / a, direction.y / a);
  }
}

interface Direction {
  readonly direction: NormalizedVector;
}

interface Position {
  readonly position: Vector;
}

class DirectionSender {
  private lastSentDirection: Direction = { direction: new Vector(0, 0) };

  shouldSend(direction: Direction): boolean {
    if (
      direction.direction.x === this.lastSentDirection.direction.x &&
      direction.direction.y === this.lastSentDirection.direction.y
    ) {
      return false;
    }

    this.lastSentDirection = direction;
    return true;
  }
}

class UserInput {
  onMovementDirectionChanged?: (newDirection: Direction) => void = undefined;
  onAimDirectionChanged?: (newDirection: Direction) => void = undefined;
  onRailFired?: (target: Position) => void = undefined;

  private readonly keys: Record<string, boolean> = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    " ": false,
  };

  trackInputs() {
    this.trackKeys();
    this.trackMouse();
  }

  private trackKeys() {
    const keyboardHandler = (set: boolean) => {
      return (event: KeyboardEvent) => {
        for (const key in this.keys) {
          if (event.key === key) {
            this.keys[key] = set;
          }
        }

        this.movementDirectionChanged();
      };
    };

    document.onkeydown = keyboardHandler(true);
    document.onkeyup = keyboardHandler(false);
  }

  private trackMouse() {
    // TODO Possibly this shouldn't be on document
    document.onclick = (e) => {
      if (e.button !== 0) {
        return;
      }
    };
    // TODO Track aiming direction
  }

  private movementDirectionChanged() {
    const direction = this.getMovementDirection();
    this.onMovementDirectionChanged?.call(undefined, direction);
  }

  private getMovementDirection(): Direction {
    let x = 0;
    let y = 0;

    if (this.keyIsDown("ArrowLeft")) x = -1;
    else if (this.keyIsDown("ArrowRight")) x = 1;
    else x = 0;

    if (this.keyIsDown("ArrowUp")) y = -1;
    else if (this.keyIsDown("ArrowDown")) y = 1;
    else y = 0;

    return { direction: new Vector(x, y).normalized() };
  }

  private keyIsDown(key: string): boolean {
    return this.keys[key] || false;
  }
}

class Game {
  private readonly webSocket: WebSocket;
  private readonly movementDirectionSender = new DirectionSender();
  private staticTerrain?: StaticTerrain = undefined; // TODO
  // TODO In the future, this class should probably hold the player ID as well to know how to reconnect

  onGameStateUpdated?: (newState: GameState) => void;

  constructor() {
    this.webSocket = new WebSocket(connectionURL());
  }

  start() {
    const input = new UserInput();
    input.trackInputs();

    input.onMovementDirectionChanged = (newDirection: Direction) => {
      if (this.movementDirectionSender.shouldSend(newDirection)) {
        console.log(newDirection.direction.x, newDirection.direction.y);
        this.webSocket.send(
          JSON.stringify({
            direction: newDirection.direction,
          })
        );
      }
    };

    input.onAimDirectionChanged = undefined; // TODO

    input.onRailFired = undefined; // TODO

    this.webSocket.onopen = () => {
      this.webSocket.send(
        JSON.stringify({
          fetchTerrain: true,
        })
      );
    };

    this.webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.game) {
        this.onGameStateUpdated?.call(undefined, message.game);
      }
      if (message.staticTerrain) {
        this.staticTerrain = message.staticTerrain;
      }
    };
  }

  getStaticTerrain(): StaticTerrain | undefined {
    return this.staticTerrain;
  }
}

interface StaticTerrain {}

interface Player {
  position: Vector;
  direction: Vector;
  skin: string;
}

interface Rail {
  start: Vector;
  offset: Vector;
}

interface GameState {
  players: { [playerId: string]: Player };
  rails: Rail[];
}

interface RailDrawing {
  rail: Rail;
  timestamp: DOMHighResTimeStamp;
}

const railDisplayDuration = 500; // milliseconds

class Drawing {
  private rails: RailDrawing[] = [];
  private canvas: CanvasRenderingContext2D;

  constructor() {
    this.canvas = (
      document.getElementById("frame") as HTMLCanvasElement
    ).getContext("2d") as CanvasRenderingContext2D;
  }

  drawGame(game: GameState): void {
    const timestamp = performance.now();

    //this.addRails(game.rails, timestamp);

    // Drop rails drawn for longer than railDisplayDuration milliseconds.
    this.rails = this.rails.filter(
      (railDrawing) => timestamp - railDrawing.timestamp < railDisplayDuration
    );

    this.canvas.clearRect(0, 0, 500, 500);
    if (game.players !== null) {
      for (const player of Object.values(game.players)) {
        this.canvas.fillStyle = player.skin;
        this.canvas.fillRect(player.position.x, player.position.y, 20, 20);
      }
    }

    for (const { rail } of this.rails) {
      // XXX Fix this
      this.canvas.fillStyle = "black";
      this.canvas.fillRect(
        rail.start.x,
        rail.start.y,
        rail.offset.x + 5,
        rail.offset.y + 5
      );
    }
  }

  private addRails(rails: Rail[], timestamp: number): void {
    this.rails.push(
      ...rails.map((rail) => {
        return { rail, timestamp };
      })
    );
  }
}

function main() {
  const game = new Game();
  const drawing = new Drawing();

  game.onGameStateUpdated = (gameState) => {
    drawing.drawGame(gameState);
  };

  game.start();
}

main();
