const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const colorPicker = document.querySelector(".colorPicker");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const toolButtons = document.querySelectorAll(".toolBtn");

const colorBtn = document.getElementById("color-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const trailBtn = document.getElementById("trail-btn");
const eraseBtn = document.getElementById("erase-btn");

let mouseDown = false;

sliderControl.onchange = () => {
  createCanvas(sliderControl.value);
};

sliderControl.oninput = () => {
  updateCounter(sliderControl.value);
};

clearBtn.onclick = () => {
  clearCanvas();
};

toolButtons.forEach((toolBtn) => {
  toolBtn.onclick = (e) => {
    console.log(toolBtn);
  };
});

const createCanvas = (gridSize) => {
  deleteCanvasContent();
  for (let i = 0; i < gridSize * gridSize; i++) {
    let gridCell = document.createElement("div");

    wrapper.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    wrapper.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    gridCell.setAttribute("class", "canvasFill");
    wrapper.appendChild(gridCell);
  }
  triggerDraw();
};

const triggerDraw = () => {
  let gridCells = document.querySelectorAll(".canvasFill");

  gridCells.forEach((gridCell) => {
    gridCell.onmousemove = (e) => {
      if (isMouseDown()) {
        e.target.style.backgroundColor = getColorPick();
      }
    };
    gridCell.onclick = (e) => {
      e.target.style.backgroundColor = getColorPick();
    };
  });
};

const isMouseDown = () => {
  document.body.onmousedown = () => {
    mouseDown = true;
  };

  document.body.onmouseup = () => {
    mouseDown = false;
  };

  if (mouseDown) {
    return true;
  }
};

const clearCanvas = () => {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
};

const deleteCanvasContent = () => {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.remove();
  });
};

const updateCounter = (value) => {
  sliderCounter.forEach((counter) => {
    counter.textContent = value;
  });
};

const getColorPick = () => {
  return document.querySelector(".colorPicker").value;
};

createCanvas(sliderControl.value);
