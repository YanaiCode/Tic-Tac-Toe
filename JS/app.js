import Game from "./game.js"
const canv = document.querySelector("canvas")
const ctx = canv.getContext("2d")  
canv.width = window.innerWidth
canv.height = window.innerHeight

let g = new Game(canv.width, canv.height)

function main() {
    canv.width = window.innerWidth
    canv.height = window.innerHeight
    ctx.fillStyle = "grey"
    ctx.fillRect(0, 0, canv.width, canv.height)
    g.update(canv.width, canv.height)
    g.draw(ctx)
}
setInterval(main, 17)