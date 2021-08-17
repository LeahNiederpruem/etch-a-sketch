const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const colorPicker = document.querySelector(".colorPicker");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const toolButtons = document.querySelectorAll(".toolBtn");

let mouseDown = false;
let activeDrawMode = "color-btn";

document.body.onkeypress = (e) => {
  switch (e.key) {
    case "p":
      setActiveDrawMode("color-btn");
      break;
    case "s":
      setActiveDrawMode("shading-btn");
      break;
    case "r":
      setActiveDrawMode("rainbow-btn");
      break;
    case "e":
      setActiveDrawMode("erase-btn");
      break;
    case "x":
      clearCanvas();
      break;
  }
};

colorPicker.onchange = () => {
  setActiveDrawMode(activeDrawMode);
};

sliderControl.onchange = () => {
  createCanvas(sliderControl.value);
  setActiveDrawMode(activeDrawMode);
};

sliderControl.oninput = () => {
  updateCounter(sliderControl.value);
};

clearBtn.onclick = () => {
  clearCanvas();
};

toolButtons.forEach((toolBtn) => {
  toolBtn.onclick = () => {
    setActiveDrawMode(toolBtn.getAttribute("id"));
  };
});

const setActiveDrawMode = (drawMode) => {
  activeDrawMode = drawMode;

  if (drawMode) {
    setActiveBtnStyle(drawMode);
    triggerDraw(drawMode);
  }
};

const setActiveBtnStyle = (drawMode) => {
  toolButtons.forEach((toolButton) => {
    toolButton.style.backgroundColor = null;
  });
  const styleButton = document.querySelector(`#${drawMode}`);
  styleButton.style.backgroundColor = "#ededed";
};

const createCanvas = (gridSize) => {
  deleteCanvasCells();
  for (let i = 0; i < gridSize * gridSize; i++) {
    let gridCell = document.createElement("div");

    wrapper.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    wrapper.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    gridCell.setAttribute("class", "canvasFill");
    wrapper.appendChild(gridCell);
  }
};

const triggerDraw = (drawMode) => {
  let gridCells = document.querySelectorAll(".canvasFill");

  gridCells.forEach((gridCell) => {
    gridCell.count = 0;

    gridCell.onmouseover = (gridCell) => {
      if (isMouseDown()) {
        switch (drawMode) {
          case "color-btn":
            gridCell.target.style.backgroundColor = getColorPick();
            gridCell.target.style.opacity = "100%";
            break;
          case "shading-btn":
            gridCell.target.count += 1;
            gridCell.target.style.backgroundColor = getColorPick();
            gridCell.target.style.opacity = 0.2 * gridCell.target.count;
            console.log(gridCell.target.style.opacity);
            break;
          case "rainbow-btn":
            rainbowMode(gridCell);
            break;
          case "erase-btn":
            gridCell.target.style.backgroundColor = "white";
            break;
        }
      }
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

const rainbowMode = (gridCell) => {
  let colorRed = Math.floor(Math.random() * 255);
  let colorGreen = Math.floor(Math.random() * 255);
  let colorBlue = Math.floor(Math.random() * 255);
  gridCell.target.style.backgroundColor = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
};

const clearCanvas = () => {
  const gridCells = document.querySelectorAll(".canvasFill");
  gridCells.forEach((gridCell) => {
    gridCell.style.backgroundColor = "white";
    gridCell.count = 0;
  });
};

const deleteCanvasCells = () => {
  const gridCells = document.querySelectorAll(".canvasFill");
  gridCells.forEach((gridCell) => {
    gridCell.remove();
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
