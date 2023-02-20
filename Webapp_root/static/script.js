let boxCounter = 1;
let widgets = [];

$(function() {
  addBox_Start($(".menu"));
  $(".box").draggable({ helper: "clone", revert: "invalid" });
  $(".canvas").droppable({
    drop: function drop(ev, ui) {
        var box = ui.draggable;
        var canvas = $('.canvas');
      
        // If box is new, add a new one to the menu
        if (box.attr('data-new') === 'true') {
          addBox();
        }
      
        canvas.append(box);
      
        // Set the position of the box based on the mouse position
        box.css({
          'left': ui.position.left + 'px',
          'top': ui.position.top + 'px'
        });
      
        // Save the widget information
        let widget = {
          id: box.attr('id'),
          x: ui.position.left,
          y: ui.position.top
        };
        widgets.push(widget);
      
        // If box is new, add a textarea to it with the default value "Box"
        if (box.attr('data-new') === 'true') {
          var input = $('<textarea>').val('Box');
          // If the textarea loses focus and its value is empty, set it back to "Box"
          input.on('blur', function() {
            $(this).val($(this).val());
          });
          box.append(input);
          box.attr('data-new', 'false');
          // Initialize the resizing feature for the box
          initResize(box);
        }
      
        // Re-enable all textareas
        $('textarea').prop('disabled', false);
      
        // Prevent default drop behavior
        return false;
      }
      
      
  });
});


// Function for adding a new box to the menu
function addBox() {
  var menu = $(".menu");
  var box = $("<div>").addClass("box").attr("id", "Widget_" + boxCounter).attr("data-new", "true").draggable({helper: "clone",cursor: "move",revert: "invalid"});
  menu.append(box);
  boxCounter++;
}

  

// Function for adding a new box. This is primarily for when the html first starts. Stuff breaks when touched
function addBox_Start(parentElement) {
    var box = $("<div>", { class: "box", id: "Widget_" + boxCounter});
    box.draggable({ helper: "clone", revert: "invalid" });
    box.attr("data-new", "true");
    parentElement.append(box);
    boxCounter++;
  }
  
  // Function for resizing a box
  function resizeBox(box, e) {
    // Get the current mouse position
    let mouseX = e.clientX;
    let mouseY = e.clientY;
  
    // Get the current width and height of the box
    let boxWidth = box.width();
    let boxHeight = box.height();
  
    // Get the textarea within the box
    let textarea = box.find("textarea");
  
    // Check if the mouse is on the right edge of the box
    if (mouseX > box.offset().left + boxWidth - 10) {
      // Update the width of the box
      box.width(mouseX - box.offset().left + 10);
      // Update the width of the textarea
      textarea.width("100%");
    }
    // Update the height of the textarea
    textarea.height("100%");
  
    // Check if the mouse is on the bottom edge of the box
    if (mouseY > box.offset().top + boxHeight - 10) {
      // Update the height of the box
      box.height(mouseY - box.offset().top + 10);
    }
  }
  
  // Function for initializing the resizing feature for a box
  function initResize(box) {
    let resizer = $("<div>", { class: "resizer" });
    box.append(resizer);
  
    resizer.on("mousedown", (e) => {
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
    let initialWidth = box.width();
    let initialHeight = box.height();
  
    // Add event listeners for the "mousemove" and "mouseup" events
    $(document).on("mousemove", resize);
    $(document).on("mouseup", stopResize);
  
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
      box.width(initialWidth + dx);
      box.height(initialHeight + dy);
    }
  
    // Function for stopping the resize process
    function stopResize() {
      // Set the flag to indicate that the resize process has ended
      resizing = false;
      // Remove the event listeners for the "mousemove" and "mouseup" events
      $(document).off("mousemove", resize);
      $(document).off("mouseup", stopResize);
    }
  }
  // Function for loading the widgets
function loadWidgets(widgets) {
    // Loop through each widget and add it to the canvas
    widgets.forEach(function(widget) {
      var box = $("#" + widget.id);
      box.attr("data-new", "false");
      // Set the position of the box based on the saved position
      box.css({ left: widget.x - box.width() / 2, top: widget.y - box.height() / 2 });
      var input = box.find("textarea");
      input.on("blur", function() {
        input.val(input.val() || "Box");
      });
      initResize(box);
      $(".canvas").append(box);
    });
  }
  
  // Function for saving the widget positions
  function saveWidgets() {
    // Create an array to store the widget information
    let widgets = [];
  
    // Loop through each box and add its information to the array
    $(".box").each(function() {
      let box = $(this);
      let widget = {
        id: box.attr("id"),
        x: parseInt(box.css("left")) + box.width() / 2,
        y: parseInt(box.css("top")) + box.height() / 2
      };
      widgets.push(widget);
    });
  
    // Convert the widget information to a string and store it in local storage
    localStorage.setItem("widgets", JSON.stringify(widgets));
  }
  
  // Load the widgets from local storage if they exist
  if (localStorage.getItem("widgets")) {
    let storedWidgets = JSON.parse(localStorage.getItem("widgets"));
    loadWidgets(storedWidgets);
  }
  
  // Save the widget positions on window unload
  $(window).on("unload", function() {
    saveWidgets();
  });
