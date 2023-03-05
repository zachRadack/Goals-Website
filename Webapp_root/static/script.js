// this .ready thing basically makes it so all the code in here will not run
// untill all the html is finished loading,
// critical for all jquerey or else it make get ~funky~
$(document).ready(function() {

    // Makes main widget draggable
    $(".main_widget").draggable({
        helper: "clone",
        revert: "invalid",
        start: function(e, ui) {
            ui.helper.addClass("dragging"); // add class to differentiate from original element
          },
        stop: function(e, ui) {
            ui.helper.removeClass("dragging"); // remove class on stop
          }
    });

    // Makes mini widget draggable
    $(".mini-widget").draggable({
        helper: "clone",
        revert: "invalid",
        start: function(e, ui) {
            ui.helper.addClass("dragging"); // add class to differentiate from original element
          },
        stop: function(e, ui) {
            ui.helper.removeClass("dragging"); // remove class on stop
          }
    });

    // Make canvas accept droppables
    $(".canvas").droppable({
        drop: function drop(ev, ui) {
            // this makes it so only main_widget is accepted by canvas, the other methods seemed to get 
            // really werid
            if (ui.draggable.hasClass("main_widget")) {
                var canvas = $('.canvas');
                if (ui.draggable.attr('data-new') === 'true') {
                    // if it's a new widget, then it means we do not want to rip it out of the factory
                    // this part makes it so it just clones it instead
                    box = widget_clone(ui,canvas);
                    droppable_continer_cloned(box.children('.widget-container'));
                    canvas_css_Setup_canvas(ui,box,canvas,"true")
                }else{
                    // if its not a new widget, it gets not cloning, because I am mean like that
                    var box = ui.draggable;
                    canvas.append(box);
                    canvas_css_Setup_canvas(ui,box,canvas,"false")
                }
          }}
      });

      
    
})

// This makes the widget_container so it can accept droppable mini widgets
function droppable_continer_cloned(container){
    container.droppable({
        drop: function drop(ev, ui) {
            // this makes it so only main_widget is accepted by widgetContainer, the other methods seemed to get 
            // really werid, we could also expand this by changing the mini-widget bit to change what we want it to be
            if (ui.draggable.hasClass("mini-widget")) {
                // grabs current widget
                var widgetContainer = $(this);
                if (ui.draggable.attr('data-new') === 'true') {
                    // if it's a new widget, then it means we do not want to rip it out of the factory
                    // this part makes it so it just clones it instead
                    console.log("test1");
                    box = widget_clone(ui,widgetContainer);
                    console.log("test2");
                    console.log($(this).parent().width());

                    box.css({
                        
                        width: $(this).parent().width(),

                    });
                    if(ui.draggable.hasClass("textMiniWidget")){
                        text_widget(ui,box)
                    }
                    
                    //canvas_css_Setup_canvas_widget(ui,box,canvas,"true")
                }else{
                    // if its not a new widget, it gets not cloning, because I am mean like that
                    var box = ui.draggable;
                    widgetContainer.append(box);
                    //canvas_css_Setup_canvas_widget(ui,box,canvas,"false")
                }
        }
        }
      // end of ready function
    });
};


function widget_clone(ui,canvas) {
    //Clone widget, this was made to be as universal as possible
    var box = ui.draggable.clone();
    canvas.append(box);
    // Make the cloned element draggable, otherwise it would set and never move
    box.draggable({
        containment: "parent", // keep the element within the canvas
            start: function(e, ui) {
            ui.helper.addClass("dragging"); // add class to differentiate from original element
        },
        stop: function(e, ui) {
            ui.helper.removeClass("dragging"); // remove class on stop
        }
    });
    box.attr('data-new', false);
    return box
}






function canvas_css_Setup_canvas(ui,box,canvas,new_widget){
    //sets the position, if new_widget is true, then it will account for 
    // the appending of the thing to whatever canvas its being appended too.
    if(new_widget==="true"){
        // Set the position of the box based on the mouse position
        box.css({
            'position': 'absolute',
            'left': ui.position.left - canvas.offset().left + 'px',
            'top': ui.position.top - canvas.offset().top+ 'px'
        });
    }else{
        box.css({
            'position': 'absolute',
            'left': ui.position.left  + 'px',
            'top': ui.position.top+ 'px'
        });
    }
}

function text_widget(ui,box){

    var input = document.createElement("textarea");
    input.value = "Box";
    input.onblur = function() {
      input.value = input.value || "Box";
    };
    box.append(input);
}