const detail = document.querySelector("#project-detail");
const image = document.querySelector("#project-image");
const content = document.querySelector("#project-content");
const about = document.querySelector("#about");

for (const project of document.querySelectorAll(".project")) {
  const preview = project.querySelector(".project-visual");
  preview.addEventListener("click", () => {
    const thumbnail = preview.querySelector("img");
    image.src = thumbnail.src;
    image.alt = thumbnail.alt;
    content.replaceChildren(project.querySelector("template").content.cloneNode(true));
    detail.showModal();
    detail.scrollTop = 0;
  });
}

document.querySelector("#about-button").addEventListener("click", () => about.showModal());

detail.addEventListener("close", () => {
  const video = detail.querySelector("video");
  if (video) video.pause();
});
