$().ready(function() {

    // sockets for teh multiplayer
    var socket = io();

    $('.grid_square').click(function() {
        // Set clicked square as "selected"
        $('.grid_square').removeClass("selected");
        $(this).addClass("selected");
    });

    $(document).keypress(function(e) {
        console.log("keypress", e.which);
        var square_id = $('.grid_square.selected')[0].id;
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
        // TODO: prevent delete from going back in browser

    });

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

