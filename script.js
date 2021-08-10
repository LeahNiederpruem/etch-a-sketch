const body = document.body;
const wrapper = document.querySelector(".canvas");

const div = document.createElement("div");
div.setAttribute("class", "canvasFill");

wrapper.appendChild(div);

// for (let i = 0; i < 5; i++) {
//     for (let j = 0; j < 5; j++) {
//         let div = document.createElement('div')
//         div.setAttribute('class', 'canvasFill')
//         wrapper.appendChild(div)
//     }
// }

for (let i = 1; i < 2500; i++) {
  let div = document.createElement("div");
  div.setAttribute("class", "canvasFill");
  wrapper.appendChild(div);
}
