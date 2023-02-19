let boxCounter = 1;
let widgets = [];

window.onload = function() {
  addBox_Start(document.querySelector(".menu"));
};

// Event handler for preventing default drop behavior
function allowDrop(ev) {
  ev.preventDefault();
}

// Event handler for setting data to be transferred on drag start
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  let textareas = document.getElementsByTagName("textarea");
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].disabled = true;
  }
}

// Event handler for handling the drop event
function drop(ev) {
  var data = ev.dataTransfer.getData("text");
  var box = document.getElementById(data);
  var target = ev.target;
  var canvas = document.querySelector(".canvas");
  
  // If box is new, add a new one to the menu
  if (box.getAttribute("data-new") === "true") {
    addBox();
  }

  // Check if target is not the canvas or one of its children
  if (target.id !== 'canvas') {
    target = target.parentNode;
  }

  canvas.appendChild(box);

  // Set the position of the box based on the mouse position
  box.style.left = ev.clientX - box.offsetWidth / 2 + "px";
  box.style.top = ev.clientY - box.offsetHeight / 2 + "px";

  // Save the widget information
  let widget = {
    id: box.id,
    x: ev.clientX,
    y: ev.clientY
  };
  widgets.push(widget);

    // If box is new, add a textarea to it with the default value "Box"
    if (box.getAttribute("data-new") === "true") {
        var input = document.createElement("textarea");
        input.value = "Box";
        // If the textarea loses focus and its value is empty, set it back to "Box"
        input.onblur = function() {
        input.value = input.value || "Box";
        };
        box.appendChild(input);
        box.setAttribute("data-new", "false");
        // Initialize the resizing feature for the box
        initResize(box);
    }
  
  // Prevent default drop behavior
  ev.preventDefault();
  // Re-enable all textareas
  let textareas = document.getElementsByTagName("textarea");
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].disabled = false;
  }
  
}

// Function for adding a new box to the menu
function addBox() {
  var menu = document.querySelector(".menu");
  var box = document.createElement("div");
  // Add the "box" class to the new element
  box.classList.add("box");
  // Set the id of the new box to "Widget_" followed by the value of boxCounter
  box.id = "Widget_" + boxCounter;
  box.draggable = true;
  box.ondragstart = function(ev) {
    drag(ev);
  };
  // Set the "data-new" attribute of the box to "true", new boxes do not have text areas, until put on canvas
  box.setAttribute("data-new", "true");
  menu.appendChild(box);
  boxCounter++;
}

// Function for adding a new box. This is primarily for when the html first starts. Stuff breaks when touched
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
  
  // Function for resizing a box
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
  
  // Function for initializing the resizing feature for a box
  function initResize(box) {
    let resizer = document.createElement("div");
    resizer.classList.add("resizer");
    box.appendChild(resizer);
  
    resizer.addEventListener("mousedown", (e) => {
      startResize(e, box);
    });
  }
  
    // Function for starting the resize process
    function startResize(e, box) {
        // Flag to indicate that the resize process is ongoing
        let resizing = true;
        // Store the current x and y positions of the mouse
        let currentX = e.clientX;
        let currentY = e.clientY;
        // Store the initial width and height of the box
        let initialWidth = box.offsetWidth;
        let initialHeight = box.offsetHeight;
    
        // Add event listeners for the "mousemove" and "mouseup" events
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
    
    // Function for updating the size of the box as the mouse is moved
    function resize(e) {
        // If the resize process has ended, stop executing this function
        if (!resizing) {
            return;
        }
        // If the target of the event is not the box, stop the resize process
        if (e.target !== box) {
            stopResize();
            return;
        }
        // Calculate the difference between the current mouse position and the starting mouse position
        let dx = e.clientX - currentX;
        let dy = e.clientY - currentY;
        // Update the width and height of the box
        box.style.width = initialWidth + dx + "px";
        box.style.height = initialHeight + dy + "px";
    }
  
    // Function for stopping the resize process
    function stopResize() {
      // Set the flag to indicate that the resize process has ended
      resizing = false;
      // Remove the event listeners for the "mousemove" and "mouseup" events
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    }
  }
  
  
  
