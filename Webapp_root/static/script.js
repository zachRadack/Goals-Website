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
    // Make canvas droppable
    $(".canvas").droppable({
        drop: function drop(ev, ui) {
            console.log("hi");

            
            
            // this makes it so only main_widget is accepted by canvas, the other methods seemed to get 
            // really werid
            if (ui.draggable.hasClass("main_widget")) {
                var canvas = $('.canvas');
                if (ui.draggable.attr('data-new') === 'true') {
                    // if it's a new widget, then it means we do not want to rip it out of the factory
                    // this part makes it so it just clones it instead
                    box = widget_clone(ui,canvas);
                    canvas_css_Setup(ui,box,canvas,"true")
                }else{
                    // if its not a new widget, it gets not cloning, because I am mean like that
                    var box = ui.draggable;
                    canvas.append(box);
                    canvas_css_Setup(ui,box,canvas,"false")
                }
                
                
            
        
                
          }}
      });
    
    
    
});

function widget_clone(ui,canvas) {
    //Clone widget

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

function canvas_css_Setup(ui,box,canvas,new_widget){
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