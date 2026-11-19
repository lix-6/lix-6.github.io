const get = (id) => document.getElementById(id);
const ui = Object.fromEntries([
  "start", "status", "table", "turn", "deck", "discard", "plays", "boards", "hand", "end-turn",
  "selected-name", "selected-info", "play-card", "bank-card", "log", "choice", "choice-title",
  "choice-help", "choice-form", "options", "choice-count", "choice-notice", "confirm-choice", "cancel-choice",
].map((id) => [id, get(id)]));
const typeLabel = { PROPERTY: "地产", MONEY: "现金", ACTION: "行动", WILDCARD: "万能地产", BUILDING: "建筑" };
const typeColor = { PROPERTY: "#ad5841", MONEY: "#27794b", ACTION: "#456f9b", WILDCARD: "#8764a4", BUILDING: "#a37932" };
const propertyColors = { BROWN: "#865236", LIGHT_BLUE: "#56a2bf", PINK: "#ba5d92", ORANGE: "#d57b38",
  RED: "#b64d48", YELLOW: "#cda32f", GREEN: "#398055", DARK_BLUE: "#365a9c", RAILROAD: "#343c42", UTILITY: "#6b6660" };
const propertyNames = { BROWN: "棕色", LIGHT_BLUE: "浅蓝", PINK: "粉色", ORANGE: "橙色",
  RED: "红色", YELLOW: "黄色", GREEN: "绿色", DARK_BLUE: "深蓝", RAILROAD: "铁路", UTILITY: "公用事业" };

let engine;
let state;
let selectedId;
let botTimer;
let choiceKey;

function node(tag, text, className = "") {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}

function humanTurn() {
  return state.turn === 0 && state.phase === "PLAYING_CARDS" && !state.choice && !state.winner;
}

function run(action) {
  clearTimeout(botTimer);
  try {
    state = JSON.parse(action());
    if (!state.players[0].hand.some((card) => card.id === selectedId)) selectedId = undefined;
    render();
    if (state.turn === 1 && !state.winner && !state.choice) {
      botTimer = setTimeout(() => run(engine.stepBot), 550);
    }
  } catch (error) {
    ui.status.textContent = "对局遇到问题，可以重新开局。";
    console.error(error);
  }
}

function renderSeat(player, own) {
  const seat = node("section", "", "seat");
  seat.append(node("h3", player.name), node("p",
    `手牌 ${player.handCount} 张 · 银行 ${player.balance}M · 完整地产 ${player.completed}/3`, "seat-summary"));
  const groups = node("div", "", "property-groups");
  const occupiedSets = player.sets.filter((set) => set.cards.length > 0);
  for (const set of occupiedSets) {
    const group = node("div", "", "property-group");
    group.style.setProperty("--property-color", propertyColors[set.color]);
    group.append(node("strong", `${propertyNames[set.color] ?? set.color} ${set.size}/${set.goal}`));
    const cards = node("div", "", "group-options");
    for (const card of set.cards) {
      if (own && card.type === "WILDCARD" && humanTurn()) {
        const move = node("button", card.name);
        move.type = "button";
        move.title = "移动万能地产";
        move.addEventListener("click", () => run(() => engine.moveWildcard(card.id)));
        cards.append(move);
      } else {
        cards.append(node("span", card.name));
      }
    }
    group.append(cards);
    groups.append(group);
  }
  seat.append(occupiedSets.length ? groups : node("p", "暂无地产"));
  if (player.bank.length) {
    const bank = node("ul");
    bank.setAttribute("aria-label", player.name + "的银行");
    for (const card of player.bank) {
      const amount = card.value + "M";
      bank.append(node("li", card.type === "MONEY" ? amount : `${card.name} · ${amount}`));
    }
    seat.append(bank);
  }
  return seat;
}

function renderSelection() {
  const card = state.players[0].hand.find((item) => item.id === selectedId);
  ui["selected-name"].textContent = card?.name ?? "选择一张手牌";
  ui["selected-info"].textContent = card ? card.description : "";
  const canPlay = Boolean(card && humanTurn() && state.plays > 0);
  ui["play-card"].disabled = !canPlay || card.type === "MONEY";
  ui["bank-card"].disabled = !canPlay || !card.canBank;
  for (const button of ui.hand.children) button.setAttribute("aria-pressed", String(button.dataset.id === selectedId));
}

function render() {
  ui.table.hidden = false;
  ui.start.textContent = "重新开局";
  ui.start.disabled = Boolean(state.choice?.required);
  ui.turn.textContent = state.winner ? `${state.winner}获胜` : state.turn === 0 ? "你的回合" : "机器人回合";
  ui.status.textContent = state.notice || (state.turn === 1 ? "机器人正在出牌。" : "选择手牌或结束回合。");
  for (const key of ["deck", "discard", "plays"]) ui[key].textContent = state[key];
  ui.boards.replaceChildren(...state.players.map((player, index) => renderSeat(player, index === 0)));
  ui.hand.replaceChildren(...state.players[0].hand.map((card) => {
    const button = node("button", "", "hand-card");
    button.type = "button";
    button.dataset.id = card.id;
    button.style.setProperty("--card-color", typeColor[card.type]);
    button.append(node("strong", card.name), node("span", `${typeLabel[card.type]} · ${card.value}M`));
    button.addEventListener("click", () => { selectedId = card.id; renderSelection(); });
    return button;
  }));
  ui["end-turn"].disabled = !humanTurn();
  ui.log.textContent = state.log.trim().split("\n").slice(-25).join("\n");
  renderSelection();
  renderChoice();
}

function selectedOptions() {
  return [...ui.options.querySelectorAll("input:checked")];
}

function updateChoiceCount() {
  const selected = selectedOptions();
  const choice = state.choice;
  if (choice.amount) {
    const value = selected.reduce((sum, input) => sum + Number(input.dataset.value), 0);
    const available = choice.options.reduce((sum, option) => sum + option.value, 0);
    ui["choice-count"].textContent = `已选 ${value}M / 需支付 ${choice.amount}M`;
    ui["confirm-choice"].disabled = value < Math.min(choice.amount, available) || selected.length < choice.min;
  } else {
    ui["choice-count"].textContent = choice.max > 1 ? `已选 ${selected.length} / ${choice.max}` : "";
    ui["confirm-choice"].disabled = selected.length < choice.min || selected.length > choice.max;
  }
}

function renderChoice() {
  const choice = state.choice;
  if (!choice) {
    choiceKey = undefined;
    if (ui.choice.open) ui.choice.close();
    return;
  }
  const key = JSON.stringify(choice);
  if (choiceKey !== key) {
    choiceKey = key;
    ui["choice-title"].textContent = choice.title;
    ui["choice-help"].textContent = choice.help;
    ui.options.replaceChildren(...choice.options.map((option) => {
      const label = node("label", "", "option");
      const input = node("input");
      input.type = choice.max === 1 ? "radio" : "checkbox";
      input.name = "selection";
      input.value = option.id;
      input.dataset.value = option.value;
      const detail = choice.amount ? [option.detail, option.value + "M"].filter(Boolean).join(" · ") : option.detail;
      label.append(input, node("span", propertyNames[option.id] ?? option.name), node("small", detail));
      return label;
    }));
  }
  ui["choice-notice"].textContent = state.notice;
  ui["cancel-choice"].hidden = choice.required;
  updateChoiceCount();
  if (!ui.choice.open) ui.choice.showModal();
}

try {
  engine = await import("./engine.mjs");
  ui.start.disabled = false;
  ui.status.textContent = "点击「开始对局」，与机器人对战。";
  ui.start.addEventListener("click", () => { selectedId = undefined; run(engine.start); });
  ui["end-turn"].addEventListener("click", () => run(engine.endTurn));
  ui["play-card"].addEventListener("click", () => run(() => engine.play(selectedId, false)));
  ui["bank-card"].addEventListener("click", () => run(() => engine.play(selectedId, true)));
  ui["choice-form"].addEventListener("change", updateChoiceCount);
  ui["choice-form"].addEventListener("submit", (event) => {
    event.preventDefault();
    run(() => engine.submit(selectedOptions().map((input) => input.value).join(",")));
  });
  ui["cancel-choice"].addEventListener("click", () => run(engine.cancel));
  ui.choice.addEventListener("cancel", (event) => {
    event.preventDefault();
    if (!state.choice.required) run(engine.cancel);
  });
} catch (error) {
  ui.status.textContent = "游戏加载失败，请刷新页面重试。";
  console.error(error);
}
