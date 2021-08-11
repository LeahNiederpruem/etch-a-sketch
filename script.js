const body = document.body;
const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");

let gridSize = sliderControl.value;

function drawGrid(gridSize) {
  for (let i = 0; i < blockAmount(gridSize); i++) {
    let div = document.createElement("div");

    wrapper.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    wrapper.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    div.setAttribute("class", "canvasFill");
    div.addEventListener("mouseover", function () {
      event.target.style.backgroundColor = getColor();
    });

    wrapper.appendChild(div);
  }
}

function clearGrid() {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.remove();
  });
}

function updateNumber(value) {
  sliderCounter.forEach((counter) => {
    counter.textContent = value;
  });
}

function updateCounter(value) {
  clearGrid();
  drawGrid(value);
}

function blockAmount(gridSize) {
  return gridSize * gridSize;
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

sliderControl.addEventListener("change", function () {
  updateCounter(sliderControl.value);
});

sliderControl.addEventListener('input', function() {
    updateNumber(sliderControl.value)
})

drawGrid(gridSize);
