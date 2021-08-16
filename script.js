const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");
const colorPicker = document.querySelector(".colorPicker");
const sliderControl = document.querySelector(".sliderControl");
const sliderCounter = document.querySelectorAll(".sliderCounter");
const toolButtons = document.querySelectorAll(".toolBtn");

let mouseDown = false;
let activeDrawMode = "color-btn";

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
  switch (drawMode) {
    case "color-btn":
      setActiveStyle(drawMode);
      triggerDraw(getColorPick());
      break;
    case "erase-btn":
      setActiveStyle(drawMode);
      triggerDraw("#FFFFFF");
      break;
    case "trail-btn":
      setActiveStyle(drawMode);
      break;
  }
};

const setActiveStyle = (drawMode) => {
  toolButtons.forEach((toolButton) => {
    toolButton.style.backgroundColor = null;
  });
  const styleButton = document.querySelector(`#${drawMode}`);
  styleButton.style.backgroundColor = "#ededed";
};

const createCanvas = (gridSize) => {
  deleteCanvasContent();
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
    gridCell.onmousemove = (e) => {
      if (isMouseDown()) {
        e.target.style.backgroundColor = drawMode;
      }
    };
    gridCell.onclick = (e) => {
      e.target.style.backgroundColor = drawMode;
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
