let boxCounter = 1;
let widgets = [];

window.onload = function() {
  addBox_Start(document.querySelector(".menu"));
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  let textareas = document.getElementsByTagName("textarea");
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].disabled = true;
  }
}


function drop(ev) {
  var data = ev.dataTransfer.getData("text");
  var box = document.getElementById(data);
  var target = ev.target;
  var canvas = document.querySelector(".canvas");
  if (box.getAttribute("data-new") === "true") {
  addBox();
  }

  // Check if target is not the canvas or one of its children
  if (target.id !== 'canvas') {
    target = target.parentNode;
  }

  canvas.appendChild(box);

  box.style.left = ev.clientX - box.offsetWidth / 2 + "px";
  box.style.top = ev.clientY - box.offsetHeight / 2 + "px";

  let widget = {
    id: box.id,
    x: ev.clientX,
    y: ev.clientY
  };
  widgets.push(widget);

  if (box.getAttribute("data-new") === "true") {
    var input = document.createElement("textarea");
	
    input.value = "Box";
    input.onblur = function() {
      input.value = input.value || "Box";
    };
    box.appendChild(input);
    box.setAttribute("data-new", "false");
	initResize(box);

  }

  ev.preventDefault();
  let textareas = document.getElementsByTagName("textarea");
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].disabled = false;
  }

}


function addBox() {
  var menu = document.querySelector(".menu");
  var box = document.createElement("div");
  box.classList.add("box");
  box.id = "Widget_" + boxCounter;
  box.draggable = true;
  box.ondragstart = function(ev) {
    drag(ev);
  };
  box.setAttribute("data-new", "true");
  menu.appendChild(box);
  boxCounter++;
}

function addBox_Start(parentElement) {
  var box = document.createElement("div");
  box.classList.add("box");
  box.id = "Widget_" + boxCounter;
  box.draggable = true;
  box.ondragstart = function(ev) {
    drag(ev);
  };
  box.setAttribute("data-new", "true");
  parentElement.appendChild(box);
  boxCounter++;
}

function resizeBox(box, e) {
// Get the current mouse position
let mouseX = e.clientX;
let mouseY = e.clientY;

// Get the current width and height of the box
let boxWidth = box.offsetWidth;
let boxHeight = box.offsetHeight;

// Get the textarea within the box
let textarea = box.querySelector("textarea");

// Check if the mouse is on the right edge of the box
if (mouseX > box.offsetLeft + boxWidth - 10) {
// Update the width of the box
box.style.width = mouseX - box.offsetLeft + 10 + "px";
// Update the width of the textarea
textarea.style.width = "100%";
}
// Update the height of the textarea
textarea.style.height = "100%";

// Check if the mouse is on the bottom edge of the box
if (mouseY > box.offsetTop + boxHeight - 10) {
// Update the height of the box
box.style.height = mouseY - box.offsetTop + 10 + "px";
}
}

function initResize(box) {
  let resizer = document.createElement("div");
  resizer.classList.add("resizer");
  box.appendChild(resizer);

  resizer.addEventListener("mousedown", (e) => {
    startResize(e, box);
  });
}

function startResize(e, box) {
  let resizing = true;
  let currentX = e.clientX;
  let currentY = e.clientY;
  let initialWidth = box.offsetWidth;
  let initialHeight = box.offsetHeight;

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);

  function resize(e) {
    if (!resizing) {
      return;
    }
    if (e.target !== box) {
      stopResize();
      return;
    }
    let dx = e.clientX - currentX;
    let dy = e.clientY - currentY;
    box.style.width = initialWidth + dx + "px";
    box.style.height = initialHeight + dy + "px";
  }

  function stopResize() {
    resizing = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  }
}


