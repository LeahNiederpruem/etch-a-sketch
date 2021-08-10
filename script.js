const body = document.body;
const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");

let pixelSize = 10;

const div = document.createElement("div");

function drawGrid(pixelSize) {
  for (let i = 0; i < calculateBlocks(pixelSize); i++) {
    let div = document.createElement("div");

    div.style.height = pixelSize + "px";
    div.style.width = pixelSize + "px";

    div.setAttribute("class", "canvasFill");
    div.addEventListener("mouseover", function () {
      event.target.setAttribute("id", "colorBlack");
    });

    wrapper.appendChild(div);
  }
}

function calculateBlocks(pixelSize) {
  return (500 / pixelSize) * (500 / pixelSize);
}

clearBtn.addEventListener("click", function () {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.removeAttribute("id", "colorBlack");
  });
});

drawGrid(pixelSize);