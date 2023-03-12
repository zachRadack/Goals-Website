// this .ready thing basically makes it so all the code in here will not run
// untill all the html is finished loading,
// critical for all jquerey or else it make get ~funky~
$(document).ready(function() {
	// Makes main widget and mini widget draggable
	// this only affects the ones who load in at widget factory
    $(".main_widget, .mini-widget").draggable({
        helper: "clone",
        revert: "invalid",
        start: function(e, ui) {
            ui.helper.addClass("dragging"); // add class to differentiate from original element
        },
        stop: function(e, ui) {
            ui.helper.removeClass("dragging");// remove class on stop
        }
    });
	
	// deals with the canvas, the area where widgets are placed around
    // this also handles main widget
    $(".canvas").droppable({
        drop: function(ev, ui) {
            if (ui.draggable.hasClass("main_widget")) {
                var canvas = $('.canvas');
                if (ui.draggable.attr('data-new') === 'true') {
                    // if it's a new widget, then it means we do not want to rip it out of the factory
                    // this part makes it so it just clones it instead
                var box = widget_clone(ui, canvas);
                droppable_continer_cloned(box.children('.widget-container'));
                canvas_css_Setup_canvas(ui, box, canvas, 'true');
                }else{
                    // if its not a new widget, it gets not cloning, because I am mean like that
                    canvas.append(ui.draggable);
                    //canvas_css_Setup_canvas(ui, box, canvas, 'false');
                }
                
            }
          }
    });
	});

    // when a main widget is added to canvas
    // its position become absolute and coordinates account for the 
    // canvas, so it should drop near where the user dropped it
    function canvas_css_Setup_canvas(ui, box, canvas, new_widget) {
        var position = {
            'position': 'absolute',
            'left': ui.position.left - canvas.offset().left + 'px',
            'top': ui.position.top - canvas.offset().top + 'px'
        };
        if (!new_widget) {
            position = {
                'position': 'absolute',
                'left': ui.position.left  + 'px',
                'top': ui.position.top+ 'px'
            };
        }else{
        box.css(position);
        }
    }
	
    // This makes the widget_container so it can accept droppable mini widgets
    function droppable_continer_cloned(container) {
        container.droppable({
            drop: function(ev, ui) {
                if (ui.draggable.hasClass("mini-widget")) {
                    var widgetContainer = $(this);
                    if (ui.draggable.attr('data-new') === 'true') {
                        var box = widget_clone(ui, widgetContainer);
                        }else{
                            widgetContainer.append(box);
                        }
                }
            },
        });

        // adds sortable to widget container so it can sort miniwidgets
        // This is what allows users to move mini widgets around
        container.sortable({
            connectWith: ".widget-container",
            placeholder: "mini-widget-placeholder"
        });
        container.disableSelection();
    }


    // clones widgets based on specific class stuff.
    // not s
    function widget_clone(ui, canvas) {
        var box = ui.draggable.clone();
        canvas.append(box);
        if (box.hasClass("main_widget")) {
            main_widgets_maker(box);
        } else if (box.hasClass("mini-widget")){
            mini_widgets_maker(ui, canvas, box)
        }else{
            box.draggable({
                start: function(e, ui) {
                    ui.helper.addClass("dragging");
                },
                stop: function(e, ui) {
                    ui.helper.removeClass("dragging");
                }
            });
        }
        box.attr('data-new', false);
        return box;
    }

    function main_widgets_maker(box) {
        // this creates a main widget which is draggable
        // What ever you add to this will be applied to the main
        // widgets in the canvas
        box.children('.widget-container');
        box.draggable({
            containment: "parent",
            start: function(e, ui) {
                ui.helper.addClass("dragging");
            },
            stop: function(e, ui) {
                ui.helper.removeClass("dragging");
            }
        });
    }

    function mini_widgets_maker(ui, canvas, box){
        // this sets the css so that it matches
        // parent width and position to 
        // realitve so it won't be draggable to whereever
        box.css({
            position: 'relative',
            width:  "100%",
        });
        /////////////////////////////////////////
        // To add mini widgets, add a hasClass
        // check here that checks the mini widgets class
        // it will then add whatever to the mini widget to make it work
        // to add style, check the css file or ask zach
        ////////////////////////////////////////
        if (ui.draggable.hasClass("textMiniWidget")) {
            text_widget(ui, box);
        }
    }
        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
        // THIS IS THE MINI WIDGET AREA, MINI WIDGET VARIANTS CAN BE
        // ADDED BELOW HERE
        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
        // this adds text area to the mini widget
        function text_widget(ui,box){
            var input = document.createElement("textarea");
            input.value = "Box";
            input.onblur = function() {
            input.value = input.value || "Box";
            };
            box.append(input);
        }



