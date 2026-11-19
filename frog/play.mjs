const board = document.querySelector("#frog-board");
const start = document.querySelector("#game-start");
const pause = document.querySelector("#game-pause");
const status = document.querySelector("#game-status");
const buttons = [...document.querySelectorAll("[data-direction]")];
const stats = Object.fromEntries(["score", "lives", "timer", "level"].map(
  (key) => [key, document.querySelector("#game-" + key)],
));
const directions = new Map([["ArrowUp", 1], ["ArrowDown", 2], ["ArrowLeft", 4], ["ArrowRight", 8]]);
const stepMs = 17;
const input = [];
let running = false;
let paused = false;
let lastTick;
let elapsed = 0;
let releaseKey = false;

try {
  const engine = await import("./engine.mjs");

  function render() {
    engine.paint();
    for (const [key, output] of Object.entries(stats)) {
      const value = String(engine[key]());
      if (output.textContent !== value) output.textContent = value;
    }
  }

  function updateControls() {
    pause.disabled = !running;
    pause.textContent = paused ? "继续" : "暂停";
    buttons.forEach((button) => { button.disabled = !running || paused; });
  }

  function enqueue(direction) {
    if (running && !paused && input.length < 4) input.push(direction);
  }

  function begin() {
    engine.reset();
    input.length = 0;
    elapsed = 0;
    releaseKey = false;
    lastTick = undefined;
    paused = false;
    running = true;
    start.textContent = "重新开始";
    status.textContent = "游戏进行中。";
    updateControls();
    render();
    board.focus({ preventScroll: true });
  }

  function togglePause() {
    if (!running) return;
    paused = !paused;
    engine.setPaused(paused);
    input.length = 0;
    status.textContent = paused ? "已暂停。" : "游戏进行中。";
    updateControls();
    render();
    if (!paused) board.focus({ preventScroll: true });
  }

  function frame(time) {
    if (running && !paused && lastTick !== undefined) {
      elapsed += Math.min(time - lastTick, 68);
      let changed = false;
      while (elapsed >= stepMs) {
        const key = releaseKey ? 0 : (input.shift() ?? 0);
        engine.step(key);
        releaseKey = key !== 0;
        elapsed -= stepMs;
        changed = true;
        if (engine.lives() === 0 || engine.won()) {
          running = false;
          status.textContent = engine.won() ? "已完成全部关卡！" : "游戏结束，可以重新开始。";
          updateControls();
          break;
        }
      }
      if (changed) render();
    }
    lastTick = time;
    requestAnimationFrame(frame);
  }

  start.addEventListener("click", begin);
  pause.addEventListener("click", togglePause);
  for (const button of buttons) {
    button.addEventListener("click", () => enqueue(Number(button.dataset.direction)));
  }
  board.addEventListener("keydown", (event) => {
    const direction = directions.get(event.key);
    if (direction || event.key.toLowerCase() === "p") {
      event.preventDefault();
      if (event.repeat) return;
      if (direction) enqueue(direction);
      else togglePause();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running && !paused) togglePause();
    lastTick = undefined;
  });

  engine.reset();
  render();
  start.disabled = false;
  status.textContent = "点击「开始游戏」进入第一关。";
  requestAnimationFrame(frame);
} catch (error) {
  status.textContent = "游戏加载失败，请刷新页面重试。";
  console.error(error);
}
