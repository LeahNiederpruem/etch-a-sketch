const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const colorPicker = document.querySelector(".colorPicker");

colorPicker.addEventListener("change", () => {
  getColorPick();
});

sliderControl.addEventListener("change", () => {
  createCanvas(sliderControl.value);
});

sliderControl.addEventListener("input", () => {
  updateCounter(sliderControl.value);
});

clearBtn.addEventListener("click", () => {
  clearCanvas();
});

const createCanvas = (gridSize) => {
  deleteCanvasContent();
  for (let i = 0; i < gridSize * gridSize; i++) {
    let gridCell = document.createElement("div");

    wrapper.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    wrapper.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    gridCell.setAttribute("class", "canvasFill");
    gridCell.addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = getColorPick();
    });

    wrapper.appendChild(gridCell);
  }
}

const clearCanvas = () => {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
}

const deleteCanvasContent = () => {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.remove();
  });
}

const updateCounter = (value) => {
  sliderCounter.forEach((counter) => {
    counter.textContent = value;
  });
}

const getColorPick = () => {
  return document.querySelector(".colorPicker").value;
}

createCanvas(sliderControl.value);