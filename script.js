const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const colorPicker = document.querySelector(".colorPicker");

let gridSize = sliderControl.value;

createCanvas(gridSize);

colorPicker.addEventListener("change", function () {
  getColorPick();
});

sliderControl.addEventListener("change", function () {
  createCanvas(sliderControl.value);
});

sliderControl.addEventListener("input", function () {
  updateCounter(sliderControl.value);
});

clearBtn.addEventListener("click", function () {
  clearCanvas();
});

function createCanvas(gridSize) {
  deleteCanvas();
  for (let i = 0; i < (gridSize * gridSize); i++) {
    let div = document.createElement("div");

    wrapper.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    wrapper.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    div.setAttribute("class", "canvasFill");
    div.addEventListener("mousemove", function () {
      event.target.style.backgroundColor = getColorPick();
    });

    wrapper.appendChild(div);
  }
}

function clearCanvas() {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
}

function deleteCanvas() {
  const canvasFillItems = document.querySelectorAll('.canvasFill')
  canvasFillItems.forEach((item) => {
    item.remove()
  })
}

function updateCounter(value) {
  sliderCounter.forEach((counter) => {
    counter.textContent = value;
  });
}

function getColorPick() {
  const colorPicker = document.querySelector(".colorPicker");
  return colorPicker.value;
}
