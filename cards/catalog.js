const filters = document.querySelector("#filters");
const rows = document.querySelector("#card-rows");
const resultCount = document.querySelector("#result-count");
const table = document.querySelector(".table-wrap");
const empty = document.querySelector("#no-results");
const detail = document.querySelector("#card-detail");
const detailName = document.querySelector("#card-name");
const detailInfo = document.querySelector("#card-info");
const collator = new Intl.Collator("en", { numeric: true });
const money = new Intl.NumberFormat("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const cardsById = new Map(catalog.map((card) => [card.id, card]));
const sortBy = {
  id: (a, b) => a.id - b.id,
  "id-desc": (a, b) => b.id - a.id,
  price: (a, b) => a.price - b.price || a.id - b.id,
  "price-desc": (a, b) => b.price - a.price || a.id - b.id,
  name: (a, b) => collator.compare(a.name, b.name),
};

for (const key of ["type", "color", "rarity"]) {
  const values = [...new Set(catalog.map((card) => card[key]).filter(Boolean))].sort(collator.compare);
  filters.elements[key].append(...values.map((value) => new Option(value, value)));
}

function cell(content) {
  const node = document.createElement("td");
  node.append(content);
  return node;
}

function render() {
  const query = Object.fromEntries(new FormData(filters));
  const keyword = query.keyword.trim().toLowerCase();
  const matches = catalog.filter((card) =>
    (!query.type || card.type === query.type) &&
    (!query.color || card.color === query.color) &&
    (!query.rarity || card.rarity === query.rarity) &&
    (card.name + " " + card.effect).toLowerCase().includes(keyword)
  ).sort(sortBy[query.order] ?? sortBy.id);

  rows.replaceChildren(...matches.map((card) => {
    const row = document.createElement("tr");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.card = String(card.id);
    button.textContent = card.name;
    row.append(
      cell(card.id), cell(button), cell(card.type), cell(card.color ?? "—"),
      cell(card.rarity), cell(money.format(card.price)),
    );
    return row;
  }));
  resultCount.textContent = `显示 ${matches.length} / ${catalog.length} 张卡牌`;
  table.hidden = matches.length === 0;
  empty.hidden = matches.length > 0;
}

filters.addEventListener("input", render);
filters.addEventListener("submit", (event) => event.preventDefault());
filters.addEventListener("reset", () => requestAnimationFrame(render));

rows.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-card]");
  if (!button) return;
  const card = cardsById.get(Number(button.dataset.card));
  detailName.textContent = card.name;
  const fields = [
    ["编号", card.id], ["类型", card.type], ["颜色", card.color ?? "—"],
    ["稀有度", card.rarity], ["数量", card.count], ["价格", money.format(card.price)], ["效果", card.effect],
  ];
  detailInfo.replaceChildren(...fields.flatMap(([label, value]) => {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    return [term, description];
  }));
  detail.showModal();
});

render();
