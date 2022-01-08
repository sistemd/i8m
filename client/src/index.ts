import { trackKeys, mainLoop, keyIsDown, Game, normalized } from "./engine";
import { Drawing } from "./canvas";

let direction = { x: 0, y: 0 };

const speed = 0.01;

function connectionURL() {
  if (document.URL.indexOf("http") != -1)
    return document.URL.replace("http", "ws");
  else return "ws://" + document.URL;
}

const webSocket = new WebSocket(connectionURL());

let game: Game | undefined;

function updatePlayerDirection() {
  if (keyIsDown("ArrowLeft")) direction.x = -1;
  else if (keyIsDown("ArrowRight")) direction.x = 1;
  else direction.x = 0;

  if (keyIsDown("ArrowUp")) direction.y = -1;
  else if (keyIsDown("ArrowDown")) direction.y = 1;
  else direction.y = 0;

  let sent = false;
  if (keyIsDown(" ")) {
    if (!sent) {
      webSocket.send(
        JSON.stringify({
          rail: {
            direction: {
              x: 1,
              y: 0,
            },
          },
        })
      );
      sent = true;
    }
  } else {
    sent = false;
  }

  direction = normalized(direction);
}

const drawing = new Drawing();

webSocket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.game.rails)
    drawing.addRails(message.game.rails, performance.now());

  if (message.game) game = message.game as Game;
};

webSocket.onopen = () => {
  trackKeys();
  setInterval(() => {
    webSocket.send(
      JSON.stringify({
        direction,
      })
    );
  }, 5);
  mainLoop((timestamp, dt) => {
    updatePlayerDirection();
    if (game !== undefined) drawing.drawGame(game, timestamp);
  });
};
