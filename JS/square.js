export default class Square{
    constructor(game, x, y, row, column) {
        this.piece = "empty"
        this.gameObj = game
        let w = this.gameObj.screenWidth
        let h = this.gameObj.screenHeight
        this.x = x
        this.y = y
        this.row = row
        this.column = column
        this.isClicked = false
        this.number = 0
        if (w > h) {
            this.size = 0.4*h/this.gameObj.board_size
        }
        else {
            this.size = 0.4*w/this.gameObj.board_size
        }
    }
    update() {
        let w = this.gameObj.screenWidth
        let h = this.gameObj.screenHeight
        let mx = this.gameObj.input.mouseX
        let my = this.gameObj.input.mouseY
        if (w > h) {
            this.size = 0.4*h/this.gameObj.board_size
            this.x = this.size*this.row+(1/2)*w-.2*h
            this.y = this.size*this.column+(1/2)*h-.2*h
        }
        else {
            this.size = 0.4*w/this.gameObj.board_size
            this.x = this.size*this.row+(1/2)*w-.2*w
            this.y = this.size*this.column+(1/2)*h-.2*w
        }
        let sx = this.x
        let sy = this.y
        let ss = this.size
        if (mx > sx && mx < sx + ss && my > sy && my < sy + ss) {
            this.color = "rgb(60, 60, 60)"
        }
        else {
            this.color = "black"
        }
        if (mx > sx && mx < sx + ss && my > sy && my < sy + ss && this.gameObj.input.mouseDown == true) {
            this.gameObj.input.hasClicked = true
        }
        if (mx > sx && mx < sx + ss && my > sy && my < sy + ss && this.gameObj.input.mouseDown == false && this.gameObj.input.hasClicked == true && this.isClicked == false && this.gameObj.game_over == false) {
            this.gameObj.input.hasClicked = false
            if (this.gameObj.turn%2==0) {
                this.piece = "o"
            }
            else {
                this.piece = "x"
            }
            this.gameObj.turn += 1
            this.isClicked = true
            this.gameObj.check_winCons()
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size , this.size) 
        ctx.strokeStyle = "white"
        ctx.strokeRect(this.x, this.y, this.size , this.size)
        if (this.piece == "x") {
            // let text_metric = ctx.measureText("x")
            // let text_width = text_metric.width
            // let text_height = text_metric.actualBoundingBoxAscent
            ctx.font = "bold 48px serif"
            ctx.fillStyle = "red"
            // ctx.fillText("x", this.x-text_width/2+this.size/2, this.y+text_height/2+this.size/2)
            ctx.fillText("x", this.x+this.size/2, this.y+this.size/2)
        }
        if (this.piece == "o") {
            // let text_metric = ctx.measureText("o")
            // let text_width = text_metric.width
            // let text_height = text_metric.actualBoundingBoxAscent
            ctx.font = "bold 48px serif"
            ctx.fillStyle = "blue"
            // ctx.fillText("o", this.x-text_width/2+this.size/2, this.y+text_height/2+this.size/2)
            ctx.fillText("o", this.x+this.size/2, this.y+this.size/2)
        }
    }
}