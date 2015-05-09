util = require 'util'

example_board = [
    'HUAC.TEMPO.RIMS',
    'USSR.ONTAP.EROO',
    'BEHINDBARS.HORN',
    '...TOOL...TANGO',
    'INSET.ONTHEBEAM',
    'NOURI.CURED.DNA',
    'RUNINS.MOA.....',
    'ENGAGEMENTRINGS',
    '.....PER.HADDIE',
    'AKA.TINAS.HEAVE',
    'BANKVAULT.ROKER',
    'ARENA...ARAL...',
    'CAME.HOBBYHORSE',
    'UTIL.ADELA.GELT',
    'SECT.HELEN.YOYO'
]

class Grid

    constructor: (n) ->
        @rows = []
        for r in example_board
            row = []
            for item in r
                # TODO: compute correct number
                row.push new Square(item, 0)
            @rows.push row

    isBlack: (row, col) ->
        @rows[row][col].black

class Square
    constructor: (letter, number) ->
        @black = letter == '.'
        @correct_letter = letter
        @user_letter = null
        @number = 0 # TODO: .

module.exports = {
    Grid: Grid,
    Square: Square
}

g = new Grid()
console.log g.isBlack(0,0) # 0th row, 0th item
console.log g.isBlack(0,4) # 0th row, 4th item
