const canvas = document.querySelector(".canvas");
const clearButton = document.querySelector(".clearButton");
const colorPicker = document.querySelector(".colorPicker");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const toolButtons = document.querySelectorAll(".toolButton");

let mouseDown = false;
let activeDrawMode = "pen";

document.body.onkeypress = (e) => {
  switch (e.key.toLowerCase()) {
    case "p":
      setActiveDrawMode("pen");
      break;
    case "s":
      setActiveDrawMode("pencil");
      break;
    case "r":
      setActiveDrawMode("random");
      break;
    case "e":
      setActiveDrawMode("erase");
      break;
    case "x":
      clearCanvas();
      break;
  }
};

document.body.onmousedown = () => {
  mouseDown = true;
};

document.body.onmouseup = () => {
  mouseDown = false;
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
  setActiveBtnStyle(drawMode);
  passDrawMode(drawMode);
};

const setActiveBtnStyle = (drawMode) => {
  if (drawMode != activeDrawMode) {
    document.querySelector(`#${activeDrawMode}-btn`).classList.remove("active");
  }

  activeDrawMode = drawMode;
  document.querySelector(`#${drawMode}-btn`).classList.add("active");
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

const passDrawMode = (drawMode) => {
  const gridCells = document.querySelectorAll(".canvasPixel");

  gridCells.forEach((gridCell) => {
    gridCell.shadingCount = 0;

    gridCell.onmouseover = (event) => {
      if (mouseDown) {
        drawWithMode(event, drawMode);
      }
    };
    gridCell.onmousedown = (event) => {
      drawWithMode(event, drawMode);
    };
  });
};

const drawWithMode = (event, drawMode) => {
  switch (drawMode) {
    case "pen":
      penMode(event);
      break;
    case "pencil":
      pencilMode(event);
      break;
    case "random":
      randomColorMode(event);
      break;
    case "erase":
      eraseMode(event);
      break;
  }
};

const penMode = (event) => {
  event.target.style.backgroundColor = getColorPick();
  event.target.style.opacity = "100%";
};

const pencilMode = (event) => {
  event.target.shadingCount += 1;
  event.target.style.backgroundColor = getColorPick();
  event.target.style.opacity = 0.2 * event.target.shadingCount;
};

const randomColorMode = (event) => {
  event.target.style.backgroundColor = `rgb(${rndColor()}, ${rndColor()}, ${rndColor()})`;
  event.target.style.opacity = "100%";
};

const eraseMode = (event) => {
  event.target.style.backgroundColor = "white";
};

const rndColor = () => {
  return Math.floor(Math.random() * 255);
};

const clearCanvas = () => {
  const gridCells = document.querySelectorAll(".canvasPixel");
  gridCells.forEach((gridCell) => {
    gridCell.style.backgroundColor = "white";
    gridCell.shadingCount = 0;
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