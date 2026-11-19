const get = (id) => document.getElementById(id);
const ui = Object.fromEntries([
  "loading", "table", "status", "turn", "boards", "previous-player", "player-page", "next-player",
  "hand", "selected-name", "selected-info", "preview", "play-card", "bank-card", "property-card",
  "move-card", "end-turn", "restart", "history-button", "rules-button", "exit-button",
  "history", "rules", "exit", "new-game", "log", "choice", "choice-title", "choice-help",
  "choice-form", "options", "choice-count", "choice-notice", "confirm-choice", "cancel-choice",
].map((id) => [id, get(id)]));
const compactTypes = { PROPERTY: "PROP", MONEY: "MONEY", ACTION: "ACT", WILDCARD: "WILD", BUILDING: "BLDG" };
const propertyStyles = {
  BROWN: ["Brown", "#8b5e3c", [1, 2]], LIGHT_BLUE: ["Light Blue", "#78c8f5", [1, 2, 3]],
  PINK: ["Pink", "#ef74c6", [1, 2, 4]], ORANGE: ["Orange", "#f4a340", [1, 3, 5]],
  RED: ["Red", "#e35d5b", [2, 3, 6]], YELLOW: ["Yellow", "#f0d14f", [2, 4, 6]],
  GREEN: ["Green", "#4caf6f", [2, 4, 7]], DARK_BLUE: ["Dark Blue", "#3563d9", [3, 8]],
  RAILROAD: ["Railroad", "#4d4d4d", [1, 2, 3, 4]], UTILITY: ["Utility", "#8f92b4", [1, 2]],
};
const propertyNames = { BROWN: "棕色", LIGHT_BLUE: "浅蓝", PINK: "粉色", ORANGE: "橙色",
  RED: "红色", YELLOW: "黄色", GREEN: "绿色", DARK_BLUE: "深蓝", RAILROAD: "铁路", UTILITY: "公用事业" };
const actionColors = {
  "Deal Breaker": "#8b64c7", "Sly Deal": "#76b86a", "Forced Deal": "#7ec8a0",
  "Debt Collector": "#6db8da", "It's My Birthday": "#f3a79e", "Double The Rent": "#e7d06c",
  "Pass Go": "#98c2f0", "Just Say No": "#7cd7f3",
};
const phaseNames = {
  START_OF_TURN: "Start of Turn", PLAYING_CARDS: "Playing Cards", AWAITING_TARGET: "Choosing Target",
  AWAITING_PAYMENT: "Awaiting Payment", DISCARDING: "Discarding", TURN_END: "Turn End", GAME_OVER: "Game Over",
};
const auxiliaryDialogs = [ui.history, ui.rules, ui.exit];

let engine;
let state;
let selection;
let viewedPlayer = 0;
let botTimer;
let choiceKey;

function node(tag, text, className = "") {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}

function playerName(index) {
  return index === 0 ? "Player 1" : "Player 2 (Bot)";
}

function humanTurn() {
  return state.turn === 0 && state.phase === "PLAYING_CARDS" && !state.choice && !state.winner;
}

function run(action) {
  clearTimeout(botTimer);
  try {
    state = JSON.parse(action());
    if (!selectedCard()) selection = undefined;
    render();
    if (state.turn === 1 && !state.winner && !state.choice) {
      botTimer = setTimeout(() => run(engine.stepBot), 550);
    }
  } catch (error) {
    if (ui.table.hidden) ui.loading.textContent = "The game could not start. Refresh the page to try again.";
    else ui.status.textContent = "对局遇到问题，可以通过 Exit Game 重新开局。";
    console.error(error);
  }
}

function startGame() {
  viewedPlayer = 0;
  selection = undefined;
  ui.hand.scrollLeft = 0;
  run(engine.start);
}

function selectedCard() {
  if (!selection) return;
  const { id, player, zone } = selection;
  const seat = state.players[player];
  if (zone === "Properties") {
    return seat.sets.find((set) => set.color === selection.color)?.cards.find((card) => card.id === id);
  }
  return (zone === "Bank" ? seat.bank : seat.hand).find((card) => card.id === id);
}

function cardName(card) {
  const property = propertyStyles[card.description.split(": ")[1]];
  if (card.type === "PROPERTY" && property) return card.name.replace(/^[A-Z_]+/, property[0]);
  if (card.name === "Multi-colour Rent") return "Multicolor Rent";
  return card.name;
}

function cardFace(card, location, preview = false) {
  const name = cardName(card);
  const face = node(preview ? "div" : "button", "", "card");
  if (!preview) {
    face.type = "button";
    face.dataset.id = card.id;
    face.setAttribute("aria-label", name + ", " + card.value + "M");
    face.addEventListener("click", () => {
      selection = { ...location, id: card.id };
      renderSelection();
    });
  }

  const header = node("span", "", "card-header");
  header.append(node("span", preview && card.type !== "WILDCARD" ? card.type : compactTypes[card.type], "card-type"),
    node("span", card.value + "M", "card-value"));
  const body = node("span", "", "card-body");
  const lines = [];
  let accent = "#8e9ab0";
  let pill = "";
  let footer = card.canBank ? "Can also be banked" : "";
  switch (card.type) {
    case "MONEY":
      accent = "#d7b25d";
      footer = "Use in bank or to pay";
      body.append(node("span", "M", "money-symbol"), node("span", card.value + " MILLION", "money-amount"));
      break;
    case "PROPERTY": {
      const property = propertyStyles[card.description.split(": ")[1]];
      if (property) {
        const [label, color, rents] = property;
        accent = color;
        pill = "SET " + label;
        lines.push("Need " + rents.length + " to complete",
          "Rent " + rents.map((rent, i) => (i + 1) + "=" + rent + "M").join("  "));
      }
      footer = "Property card";
      break;
    }
    case "WILDCARD": {
      const anyColor = name === "Any Color Wildcard";
      const colors = name.replace(/ Wildcard$/, "").split("/");
      const active = propertyStyles[location.color];
      const accents = colors.map((color) => propertyStyles[color.toUpperCase().replaceAll(" ", "_")]?.[1] ?? "#8e9ab0");
      accent = anyColor ? "linear-gradient(to right, #5f6bf2, #f69d3c, #ef5d5d, #64b96a)"
        : "linear-gradient(to right, " + accents.join(", ") + ")";
      pill = anyColor ? "ANY COLOR" : "WILDCARD";
      lines.push(active ? "Active: " + active[0] : "Any set",
        anyColor ? "Matches any color" : "Switch between " + colors.join(" / ").toUpperCase());
      footer = anyColor ? "Cannot be used to pay from the table" : "Can move between sets";
      break;
    }
    case "BUILDING":
      accent = name === "House" ? "#59a96a" : "#ef6b6b";
      pill = name.toUpperCase();
      lines.push("Adds +" + (name === "House" ? 3 : 4) + " rent", "Attach to a full set");
      break;
    case "ACTION":
      accent = actionColors[name] ?? "#efcc58";
      pill = name.endsWith(" Rent") && name.includes("/") ? "Rent" : name;
      if (name === "Multicolor Rent") {
        lines.push("Rent on " + Object.values(propertyStyles).map(([label]) => label.toUpperCase()).sort().join(" / "));
      } else if (name.includes("/") && name.endsWith(" Rent")) {
        lines.push("Rent on " + name.replace(/ Rent$/, "").replace("/", " / ").toUpperCase());
      }
      lines.push(card.description.replaceAll("_", " "));
      break;
  }
  if (["#8b5e3c", "#3563d9", "#4d4d4d", "#8b64c7"].includes(accent)) face.style.setProperty("--card-ink", "#fff");
  face.style.setProperty("--card-color", accent);
  if (pill) body.prepend(node("span", pill, "card-pill"));
  for (const line of lines) body.append(node("span", line, "card-line"));
  face.append(header, node("strong", name, "card-title"), body, node("span", footer, "card-footer"));
  return face;
}

function cardsRow(cards, location) {
  const row = node("div", "", "table-cards");
  row.append(...cards.map((card) => cardFace(card, location)));
  return row;
}

function renderBoard() {
  const index = viewedPlayer;
  const player = state.players[index];
  const current = state.turn === index && !state.winner;
  const seat = node("section", "", current ? "seat current" : "seat");
  seat.append(node("h2", playerName(index) + (current ? " (Current Turn)" : "")),
    node("p", "Hand " + player.handCount + " | Bank " + player.balance + "M | Complete Sets " + player.completed, "seat-summary"),
    node("h3", "Bank"),
    player.bank.length ? cardsRow(player.bank, { player: index, zone: "Bank" })
      : node("p", "No bank cards on the table.", "muted"),
    node("h3", "Property Sets"));

  const sets = player.sets.filter((set) => set.cards.length > 0);
  if (sets.length) {
    const groups = node("div", "", "property-groups");
    for (const set of sets) {
      const [colorName, color] = propertyStyles[set.color] ?? [set.color, "#8e9ab0"];
      const group = node("div", "", "property-group");
      group.style.setProperty("--property-color", color);
      group.append(node("strong", colorName + " " + set.size + "/" + set.goal),
        cardsRow(set.cards, { player: index, zone: "Properties", color: set.color }));
      groups.append(group);
    }
    seat.append(groups);
  } else {
    seat.append(node("p", "No property sets on the table.", "muted"));
  }
  ui.boards.replaceChildren(seat);
  ui["player-page"].textContent = "Player " + (index + 1) + " / " + state.players.length;
  ui["previous-player"].disabled = index === 0;
  ui["next-player"].disabled = index === state.players.length - 1;
}

function renderSelection() {
  const card = selectedCard();
  ui["selected-name"].textContent = card ? cardName(card) : "Card Preview";
  ui["selected-info"].textContent = card ? playerName(selection.player) + " " + selection.zone + " | Value " + card.value + "M" : "";
  ui.preview.replaceChildren(card ? cardFace(card, selection, true)
    : node("p", "Select a card to preview.", "muted empty-preview"));
  const canPlay = Boolean(card && selection.zone === "Hand" && humanTurn() && state.plays > 0);
  ui["play-card"].disabled = !canPlay || card.type === "MONEY";
  ui["bank-card"].disabled = !canPlay || !card.canBank;
  ui["property-card"].disabled = !canPlay || !["PROPERTY", "WILDCARD"].includes(card.type);
  ui["move-card"].disabled = !(card?.type === "WILDCARD" && selection.player === 0
    && selection.zone === "Properties" && humanTurn());
  for (const button of ui.table.querySelectorAll("button[data-id]")) {
    button.setAttribute("aria-pressed", String(button.dataset.id === selection?.id));
  }
}

function render() {
  ui.loading.hidden = true;
  ui.table.hidden = false;
  const winner = state.players.findIndex((player) => player.name === state.winner);
  const phase = phaseNames[state.phase] ?? state.phase;
  ui.turn.textContent = (state.winner ? playerName(winner) + " wins" : playerName(state.turn)) + " | Phase: " + phase
    + " | Deck: " + state.deck + " | Discard: " + state.discard
    + " | Played: " + (3 - state.plays) + "/3 | Remaining: " + state.plays;
  ui.status.textContent = state.notice;
  ui["end-turn"].disabled = !humanTurn();
  ui.restart.hidden = !state.winner;
  ui.log.textContent = state.log.trim().split("\n").slice(-25).join("\n");
  renderBoard();
  ui.hand.replaceChildren(...state.players[0].hand.map((card) => cardFace(card, { player: 0, zone: "Hand" })));
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
  if (!ui.choice.open) {
    for (const dialog of auxiliaryDialogs) {
      if (dialog.open) dialog.close();
    }
    ui.choice.showModal();
  }
}

try {
  engine = await import("./engine.mjs");
  ui["previous-player"].addEventListener("click", () => {
    viewedPlayer -= 1;
    renderBoard();
    renderSelection();
  });
  ui["next-player"].addEventListener("click", () => {
    viewedPlayer += 1;
    renderBoard();
    renderSelection();
  });
  ui["end-turn"].addEventListener("click", () => run(engine.endTurn));
  for (const button of [ui["play-card"], ui["property-card"]]) {
    button.addEventListener("click", () => run(() => engine.play(selection.id, false)));
  }
  ui["bank-card"].addEventListener("click", () => run(() => engine.play(selection.id, true)));
  ui["move-card"].addEventListener("click", () => run(() => engine.moveWildcard(selection.id)));
  for (const dialog of auxiliaryDialogs) {
    ui[dialog.id + "-button"].addEventListener("click", () => dialog.showModal());
  }
  ui["new-game"].addEventListener("click", () => {
    ui.exit.close();
    startGame();
  });
  ui.restart.addEventListener("click", startGame);
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
  startGame();
} catch (error) {
  ui.loading.textContent = "The game could not load. Refresh the page to try again.";
  console.error(error);
}
