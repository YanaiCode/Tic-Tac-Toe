export default class Input{
    constructor(game) {
        this.mouseDown = false
        this.hasClicked = false
        this.mouseX = 0
        this.mouseY = 0
        document.addEventListener("mousedown", e =>{
            this.mouseDown = true
        })
        document.addEventListener("mouseup", e =>{
            this.mouseDown = false
        })
        document.addEventListener("mousemove", e =>{
            this.mouseX = e.clientX 
            this.mouseY = e.clientY
        })
    }
    update() {

    }
    draw(ctx) {

    }
}