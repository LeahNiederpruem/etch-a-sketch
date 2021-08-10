const body = document.body;
const wrapper = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clearBtn");

const div = document.createElement("div");
div.setAttribute("class", "canvasFill");

wrapper.appendChild(div);

for (let i = 0; i < 625; i++) {
  let div = document.createElement("div");
  div.setAttribute("class", "canvasFill");
  div.addEventListener("mouseover", function () {
    event.target.setAttribute("id", "colorBlack");
  });
  wrapper.appendChild(div);
}

clearBtn.addEventListener("click", function () {
  const canvasFillItems = document.querySelectorAll(".canvasFill");
  canvasFillItems.forEach((item) => {
    item.removeAttribute("id", "colorBlack");
  });
});
