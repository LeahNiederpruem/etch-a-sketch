const body = document.body;
const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelector(".sliderCounter");

let pixelSize = sliderControl.value;

function drawGrid(pixelSize) {
  for (let i = 0; i < blockAmount(pixelSize); i++) {
    let div = document.createElement("div");

    div.style.height = pixelSize + "px";
    div.style.width = pixelSize + "px";

    div.setAttribute("class", "canvasFill");
    div.addEventListener("mouseover", function () {
      event.target.style.backgroundColor = getColor();
    });

    wrapper.appendChild(div);
  }
}

function clearGridItems() {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.remove();
  });
}

function updateCounter(value) {
  sliderCounter.textContent = value;
  clearGridItems();
  drawGrid(value);
}

function blockAmount(pixelSize) {
  return (500 / pixelSize) * (500 / pixelSize);
}

function clearCanvas() {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
}

function getColor() {
    const colorPicker = document.querySelector(".colorPicker");
    return colorPicker.value;
}

clearBtn.addEventListener("click", function () {
  clearCanvas();
});

drawGrid(pixelSize);
