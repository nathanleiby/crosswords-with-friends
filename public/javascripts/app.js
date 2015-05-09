$().ready(function() {

    $('.grid_square').click(function() {
        // Set clicked square as "selected"
        $('.grid_square').removeClass("selected")
        $(this).addClass("selected")
    });

    $(document).keypress(function(e) {
        console.log("keypress", e.which);
        if (97 <= e.which && e.which <= 97 + 25) {
            // force to capital letter
            e.which -= 97-65;
        }

        var selected_square = $('.grid_square.selected > .letter')
        if (65 <= e.which && e.which <= 65 + 25) {
            selected_square.text(String.fromCharCode(e.which))
        } else if (e.which == 32) {
            // Allow erasing the char entirely with SPACEBAR
            selected_square.text('_')
        }
        // TODO: prevent delete from going back in browser

    });

})

