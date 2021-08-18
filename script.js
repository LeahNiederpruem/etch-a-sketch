const canvas = document.querySelector(".canvas");
const clearButton = document.querySelector(".clearButton");
const colorPicker = document.querySelector(".colorPicker");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const toolButtons = document.querySelectorAll(".toolButton");

let mouseDown = false;
let activeDrawMode = "pen";

document.body.onkeypress = (e) => {
  switch (e.code) {
    case "KeyP":
      setActiveDrawMode("pen");
      break;
    case "KeyS":
      setActiveDrawMode("pencil");
      break;
    case "KeyR":
      setActiveDrawMode("rainbow");
      break;
    case "KeyE":
      setActiveDrawMode("erase");
      break;
    case "KeyX":
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

clearButton.onclick = () => {
  clearCanvas();
};

toolButtons.forEach((toolBtn) => {
  toolBtn.onclick = () => {
    setActiveDrawMode(toolBtn.dataset.drawMode);
  };
});

const setActiveDrawMode = (drawMode) => {
  activeDrawMode = drawMode;
  
  setActiveBtnStyle(drawMode);
  triggerDraw(drawMode);
};

const setActiveBtnStyle = (drawMode) => {
  toolButtons.forEach((toolButton) => {
    toolButton.classList.remove("active");
  });
  const styleButton = document.querySelector(`#${drawMode}-btn`);
  styleButton.classList.add("active");
};

const createCanvas = (gridSize) => {
  deleteCanvasCells();
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridCell = document.createElement("div");

    canvas.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    gridCell.setAttribute("class", "canvasPixel");
    canvas.appendChild(gridCell);
  }
};

const triggerDraw = (drawMode) => {
  const gridCells = document.querySelectorAll(".canvasPixel");

  gridCells.forEach((gridCell) => {
    gridCell.shadingCount = 0;

    gridCell.onmouseover = (event) => {
      if (isMouseDown()) {
        switch (drawMode) {
          case "pen":
            event.target.style.backgroundColor = getColorPick();
            event.target.style.opacity = "100%";
            break;
          case "pencil":
            event.target.shadingCount += 1;
            event.target.style.backgroundColor = getColorPick();
            event.target.style.opacity = 0.2 * event.target.shadingCount;
            break;
          case "rainbow":
            rainbowMode(event);
            break;
          case "erase":
            event.target.style.backgroundColor = "white";
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
  gridCell.target.style.backgroundColor = `rgb(${rndColor()}, ${rndColor()}, ${rndColor()})`;
};

const rndColor = () => {
  return Math.floor(Math.random() * 255);
};

const clearCanvas = () => {
  const gridCells = document.querySelectorAll(".canvasPixel");
  gridCells.forEach((gridCell) => {
    gridCell.style.backgroundColor = "white";
    gridCell.count = 0;
  });
};

const deleteCanvasCells = () => {
  const gridCells = document.querySelectorAll(".canvasPixel");
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
setActiveDrawMode(activeDrawMode);
