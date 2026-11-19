const portfolio = {
  name: "Yixuan_Li",
  email: "",
  deal: { contribution: "", repository: "", video: "" },
  frog: { contribution: "", repository: "https://github.com/lix-6/FroggerGame", video: "" },
  cards: { contribution: "", repository: "", video: "" },
};

const screenshots = {
  deal: [
    ["./media/deal.webp", "大富翁 Deal · 本地对局"],
    ["./media/deal-turn.webp", "大富翁 Deal · 回合操作后"],
  ],
  frog: [["./media/frog.webp", "青蛙过河 · 闯关画面"]],
};

const gallery = document.querySelector("#gallery");
const galleryImage = document.querySelector("#gallery-image");
const galleryCaption = document.querySelector("#gallery-caption");
const galleryControls = document.querySelector(".gallery-controls");
const demo = document.querySelector("#demo");
const video = demo.querySelector("video");
let currentGallery;
let currentIndex;

function showScreenshot(index) {
  currentIndex = (index + currentGallery.length) % currentGallery.length;
  const [source, caption] = currentGallery[currentIndex];
  galleryImage.src = source;
  galleryImage.alt = caption;
  galleryCaption.textContent = caption;
}

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    currentGallery = screenshots[button.dataset.gallery];
    showScreenshot(0);
    galleryControls.hidden = currentGallery.length < 2;
    gallery.showModal();
  });
});
document.querySelector("#gallery-prev").addEventListener("click", () => showScreenshot(currentIndex - 1));
document.querySelector("#gallery-next").addEventListener("click", () => showScreenshot(currentIndex + 1));
gallery.addEventListener("keydown", (event) => {
  if (currentGallery.length < 2) return;
  if (event.key === "ArrowLeft") showScreenshot(currentIndex - 1);
  if (event.key === "ArrowRight") showScreenshot(currentIndex + 1);
});

if (portfolio.name) {
  document.querySelector("#brand-name").textContent = portfolio.name + " · 项目集";
  document.title = portfolio.name + " · 软件工程项目集";
}
if (portfolio.email) {
  const link = document.querySelector("#email-link");
  link.href = "mailto:" + portfolio.email;
  link.hidden = false;
}

for (const id of ["deal", "frog", "cards"]) {
  const project = portfolio[id];
  const article = document.getElementById(id);
  const actions = article.querySelector(".project-links");
  if (project.contribution) {
    const contribution = article.querySelector(".contribution");
    contribution.textContent = "我的贡献：" + project.contribution;
    contribution.hidden = false;
  }
  if (project.video) {
    const button = document.createElement("button");
    button.className = "button";
    button.type = "button";
    button.textContent = "播放演示";
    button.addEventListener("click", () => {
      document.querySelector("#demo-title").textContent = article.querySelector("h3").textContent;
      video.src = project.video;
      demo.showModal();
    });
    actions.append(button);
  }
  if (project.repository) {
    const link = document.createElement("a");
    link.className = "button";
    link.href = project.repository;
    link.textContent = "查看源码";
    actions.append(link);
  }
  actions.hidden = !actions.childElementCount;
}

demo.addEventListener("close", () => {
  video.pause();
  video.removeAttribute("src");
  video.load();
});
