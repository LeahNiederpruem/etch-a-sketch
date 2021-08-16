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
    gridCell.count = 0;

    gridCell.onmouseover = (e) => {
      if (isMouseDown()) {
        switch (drawMode) {
          case "color-btn":
            e.target.style.backgroundColor = getColorPick();
            e.target.style.opacity = "100%";
            break;
          case "shading-btn":
            e.target.count += 1;
            e.target.style.backgroundColor = getColorPick();
            e.target.style.opacity = 0.2 * e.target.count;
            console.log(e.target.style.opacity);
            break;
          case "rainbow-btn":
            rainbowMode(e);
            break;
          case "erase-btn":
            e.target.style.backgroundColor = "white";
            break;
        }
      }
    };
    gridCell.onmousedown = (gridCell) => {
      console.log(gridCell);
      triggerDraw(drawMode);
    };
    // gridCell.onmousedown = (e) => {
    //   console.log(e);
    //   e.target.style.backgroundColor = triggerDraw(drawMode);
    // };
  });
};

const rainbowMode = (e) => {
  let generatedRed = Math.floor(Math.random() * 255);
  let generatedGreen = Math.floor(Math.random() * 255);
  let generatedBlue = Math.floor(Math.random() * 255);
  e.target.style.backgroundColor = `rgb(${generatedRed}, ${generatedGreen}, ${generatedBlue})`;
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
  const gridCells = document.querySelectorAll(".canvasFill");
  gridCells.forEach((gridCell) => {
    gridCell.style.backgroundColor = "white";
    gridCell.count = 0;
  });
};

const deleteCanvasContent = () => {
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
