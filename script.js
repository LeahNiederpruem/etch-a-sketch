const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const toolButtons = document.querySelectorAll(".toolBtn");
const colorPicker = document.querySelector(".colorPicker");

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
  let isToggled = false;
  toolBtn.addEventListener("click", (e) => {
    console.log(e.path[0].id);
  });
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
  toggleDraw();
};

const isMouseDown = () => {
  document.body.onmousedown = () => {
    mouseDown = true;
    console.log(mouseDown);
  };

  document.body.onmouseup = () => {
    mouseDown = false;
    console.log(mouseDown);
  };

  if (mouseDown) {
    return true;
  } else {
    return false;
  }
};

const toggleDraw = () => {
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
