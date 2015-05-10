$().ready(function() {

    // sockets for teh multiplayer
    var socket = io();

    var select_by = 'row'; // can toggle between 'row' and 'col'
    var selected_square = null;

    $('.grid_square').click(function() {
        // Set clicked square as "selected"
        selectSquare($(this));
    });

    var selectSquare = function(s) {
        // input:
        //  s = a reference to a square

        // Remove all existing highlighting
        $('.grid_square').removeClass("selected");
        $('.grid_square').removeClass("highlighted");

        // "row_x_col_y"
        var attr_name = 'data-' + select_by;
        var row = s.attr(attr_name);

        var squares_in_row = $( "[" + attr_name + "='" + row + "']" );
        squares_in_row.addClass("highlighted");
        s.removeClass("highlighted");
        s.addClass("selected");

        selected_square = s;
        // highlight all square in row
        // then limit to just relevant ones
        // then allow toggling row/column
    };

    $('.grid_square').dblclick(function() {
        console.log("double click");
        if ($(this).hasClass('selected')) {
            select_by = (select_by == 'row') ? 'col' : 'row';
        };
        selectSquare($(this));

        console.log("select_by", select_by);
        return false;

    });


    $(document).keypress(function(e) {
        console.log("keypress", e.which);
        if (! selected_square || ! selected_square[0]) {
            return;
        }
        var square_id = selected_square[0].id;
        var character = '';

        if (97 <= e.which && e.which <= 97 + 25) {
            // force to capital letter
            e.which -= 97-65;
        }
        if (65 <= e.which && e.which <= 65 + 25) {
            character = String.fromCharCode(e.which);
        } else if (e.which == 32) {
            // Allow erasing the char entirely with SPACEBAR
            character = '_';
        }

        if (square_id && character !== '') {
            socket.emit('set_square_text', {'id': square_id, 'character': character})
        }

        // update selected square
        moveToNextSquare(selected_square, select_by);


        // TODO: prevent delete from going back in browser

    });

    var moveToNextSquare = function(current_square, direction) {
        var cur_row = parseInt(current_square.attr('data-row'));
        var cur_col = parseInt(current_square.attr('data-col'));
        if (select_by == 'row') {
            cur_col += 1;
        }
        if (select_by == 'col') {
            cur_row += 1;
        }

        var new_square = $('[data-row=' + cur_row + '][data-col=' + cur_col + ']');
        console.log(new_square);
        selectSquare(new_square);

    }

    // Send chat msg
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    // Display chat msg
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });

    // Set
    socket.on('set_square_text', function(msg) {
        console.log
        var square_id = msg['id'];
        var selected_square = $('#' + square_id + ' > .letter');
        selected_square.text(msg['character']);
    });
    //// Emit ready event.
    //io.emit('ready')

    //// Listen for the talk event.
    //io.on('talk', function(data) {
    //alert(data.message)
    //})


})

