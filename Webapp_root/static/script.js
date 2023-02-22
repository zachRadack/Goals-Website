let boxCounter = 3;

let widgets = [];

$(function() {
  //addBox_Start($(".menu"));


    // this should be applied to all widgets
  $(".drag_widgets").draggable({
    helper: "clone",
    revert: "invalid",
    start: function(e, ui) {
      ui.helper.addClass("dragging"); // add class to differentiate from original element
    },
    stop: function(e, ui) {
      ui.helper.removeClass("dragging"); // remove class on stop
    }
  });
  

  //this makes main_Widget droppable
  $(".Main_widget.accept-droppable .widget-container").droppable({
    accept: ".Mini_widget.accept-draggable",
    drop: function(event, ui) {
      var mini_widget_box = ui.draggable;
      if (mini_widget_box.hasClass("Mini_widget")) {
        if (mini_widget_box.attr('data-new') === 'true') {
          // sees if its a new mini_widget, if so spawns a new one inside the menu area
          if (mini_widget_box.hasClass("Mini_widget")) {
            addBox_Mini_widget();
            mini_widget_box.attr('data-new', false);
          }
        }
        // append the mini widget to the container element inside the main widget
        $(this).append(mini_widget_box);
      }
    }
  }).sortable({
  connectWith: ".Main_widget .widget-container",
  items: ".Mini_widget",
  handle: ".Mini_widget_handle"
});

  
  
  
  $(".canvas").droppable({
    accept: ".Main_widget",
    drop: function drop(ev, ui) {
        var box = ui.draggable;
        var canvas = $('.canvas');
        if (ui.draggable.hasClass("Main_widget")) {
        // If box is new, add a new one to the menu
        if (box.attr('data-new') === 'true') {
            
                addBox_Main_widget();
                box.attr('data-new', false);
            
            
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

        return false;
      }}
  });

  // Make the mini-widget sortable
  $(".Mini_widget.accept-draggable").draggable({
    helper: "clone",
    revert: "invalid",
    start: function(e, ui) {
      ui.helper.addClass("dragging"); // add class to differentiate from original element
    },
    stop: function(e, ui) {
      ui.helper.removeClass("dragging"); // remove class on stop
    }
  });
  $(".Mini_widget").sortable({
    helper: "clone",
    revert: "invalid",
    containment: "parent",
    start: function(e, ui) {
      ui.item.addClass("dragging"); // add class to differentiate from original element
    },
    stop: function(e, ui) {
      ui.item.removeClass("dragging"); // remove class on stop
    }
  });
});


// Function for adding a new box to the menu
function addBox_Main_widget() {
    var menu = $(".menu");
    var new_main_widget = $("<div>").addClass("Main_widget drag_widgets accept-droppable").attr("id", "Widget_" + boxCounter).attr("data-new", "true").draggable({helper: "clone",cursor: "move",revert: "invalid"});
    var widget_cointainer = $("<div>").addClass("widget-container ui-droppable ui-sortable").attr("id", "widget-container_" + boxCounter);
    new_main_widget.append(widget_cointainer);
    menu.append(new_main_widget);
    boxCounter++;
  }

  function addBox_Mini_widget() {
    var menu = $(".menu");
    var box = $("<div>").addClass("Mini_widget").attr("id", "Mini_widget_" + boxCounter).attr("data-new", "true").draggable({helper: "clone",cursor: "move",revert: "invalid"});
    menu.append(box);
    boxCounter++;
  }
  
  // Function for adding a new box. This is primarily for when the html first starts. Stuff breaks when touched
  function addBox_Start(parentElement) {
    var new_main_widget = $("<div>").addClass("Main_widget drag_widgets accept-droppable").attr("id", "Widget_" + boxCounter).attr("data-new", "true").draggable({helper: "clone",cursor: "move",revert: "invalid"});
    var widget_cointainer = $("<div>").addClass("widget-container ui-droppable ui-sortable");
    new_main_widget.append(widget_cointainer);
      parentElement.append(new_main_widget);
      boxCounter++;
    }
