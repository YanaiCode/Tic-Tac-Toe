import Square from "./square.js"
import Input from "./input.js"
//approximate font size centering
//make it so that a player can only play on their turn
//wincons
//fix centering for board sizes > 3
//text for winning 

export default class Game{
    constructor(w, h) {
        this.screenWidth = w
        this.screenHeight = h
        this.squares = []
        this.turn = 1
        this.board_size = 3
        let number = 0
        this.winCons = []
        this.square_width = 0.4*w/this.board_size
        this.square_height = 0.4*h/this.board_size
        this.game_over = false
        

        for (let y = 0; y<this.board_size; y++) {
            for (let x = 0; x<this.board_size; x++) {
                // let square1 = new Square(this, x*.18*h+(1/2)*w, y*.18*h, x, y)
                let square1 = new Square(this, this.square_width*x+(1/2)*this.screenWidth-.2*w, this.square_width*y+(1/2)*this.screenHeight-.2*w, x, y)
                this.squares.push(square1)
                square1.number = number
                number += 1
            }  
        }
        this.input = new Input(this)
        this.init_winCons()
        for (let i=0; i<this.board_size*this.board_size; i++) {
            for (let n=0; n<this.board_size; n++) {
                if (this.squares[i].row == n) {
                    console.log("square in row " + n)
                }
            }
        }
    }
    update(w, h) {
        this.screenWidth = w
        this.screenHeight = h
        for (let square of this.squares) {
            square.update()
        }
    }
    draw(ctx) {
        for (let square of this.squares) {
            square.draw(ctx)
        }
    }
    init_winCons() {
        this.s = Math.sqrt(this.squares.length) //size
        //Rows
        for (let x = 0; x<this.s; x++) {
            let con = []
            for (let y = 0; y<this.s; y++) {
                con.push(x*this.s+y)
            }
            this.winCons.push(con)
        }

        //Columns
        for (let x = 0; x<this.s; x++) {
            let con = []
            for (let y = 0; y<this.s; y++) {
                con.push(y*this.s+x)
            }
            this.winCons.push(con)
        }

        //top right to bottom left diagonal
        let con = []
        for (let n = 0; n<this.s; n++) {
            con.push(n*(this.s-1)+this.s-1)
        }
        this.winCons.push(con)

        //top left to bottom right diagonal
        con = []
        for (let n = 0; n<this.s; n++) {
            con.push(n*(this.s+1))
        }
        this.winCons.push(con)
        console.log(this.winCons)
    }
    check_winCons(){
        let check_fail = false
        let is_tie = true
        for (let i=0; i<this.winCons.length; i++){
            for (let n=0; n<this.board_size-1; n++) {
                if (this.squares[this.winCons[i][n]].piece == this.squares[this.winCons[i][n+1]].piece && this.squares[this.winCons[i][0]].piece != "empty") {

                }
                else {
                    check_fail = true
                }
            }
            if (check_fail == false) {
                console.log(this.squares[this.winCons[i][0]].piece + " is the winner")
                this.game_over = true
            }

        check_fail = false
        }
        for (let x=0; x<this.squares.length; x++) {
            if (this.squares[x].piece == "empty") {
                is_tie = false
            }
        }
        if (is_tie == true) {
            console.log("tie")
        }
    }

//     for (let i=0; i<this.winCons.length; i++){
//         for (let n=0; n<this.board_size; n++)
//         if (this.squares[this.winCons[i][0]].piece == this.squares[this.winCons[i][1]].piece && this.squares[this.winCons[i][1]].piece == this.squares[this.winCons[i][2]].piece && this.squares[this.winCons[i][0]].piece != "empty") {
//             console.log("win")
//         }
//     }
    
// }

    /*
// con = wincons
# GET THE ROWS
for col in range(w):
    con = []
    for row in range(w):
        con.append(col * w + row)
    winCons.append(con)
    
# GET THE COLUMNS
for col in range(w):
    con = []
    for row in range(w):
        con.append(row*w + col)
    winCons.append(con)

# GET THE DIAGONAL (TOP RIGHT TO BOTTOM LEFT)
con = []
for n in range(w):
    con.append(n*(w-1) + w - 1)

# GET THE DIAGONAL (TOP LEFT TO BOTTOM RIGHT)
con = []
for n in range(w):
    con.append(n*(w + 1))
winCons.append(con)
*/
}