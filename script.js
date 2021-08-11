const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const colorPicker = document.querySelector(".colorPicker");

let gridSize = sliderControl.value;

colorPicker.addEventListener("change", function () {
  getPickedColor();
});

sliderControl.addEventListener("change", function () {
  updateCanvas(sliderControl.value);
});

sliderControl.addEventListener("input", function () {
  updateCounter(sliderControl.value);
});

clearBtn.addEventListener("click", function () {
  clearCanvas();
});

function createCanvas(gridSize) {
  for (let i = 0; i < gridAmount(gridSize); i++) {
    let div = document.createElement("div");

    wrapper.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    wrapper.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    div.setAttribute("class", "canvasFill");
    div.addEventListener("mouseover", function () {
      event.target.style.backgroundColor = getPickedColor();
    });

    wrapper.appendChild(div);
  }
}

function updateCanvas(value) {
  clearCanvas();
  createCanvas(value);
}

function clearCanvas() {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
}

function gridAmount(gridSize) {
  return gridSize * gridSize;
}

function updateCounter(value) {
  sliderCounter.forEach((counter) => {
    counter.textContent = value;
  });
}

function getPickedColor() {
  const colorPicker = document.querySelector(".colorPicker");
  return colorPicker.value;
}

createCanvas(gridSize);
