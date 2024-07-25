import Game from "./game.js"
const canv = document.querySelector("canvas")
const chatContainer = document.querySelector("#chat-container")
const ctx = canv.getContext("2d")  
canv.width = window.innerWidth * .75
canv.height = window.innerHeight

let board_created = false

let g = new Game(canv.width, canv.height)
let socket = io()
g.socket = socket

let url = window.location.href;
let urlArr = url.split('/');
let roomID = urlArr[4];
const playerID = crypto.randomUUID()
console.log(roomID);

socket.emit("join room", roomID, localStorage.getItem("playerXID"), localStorage.getItem("playerOID"))

socket.on("give o id", oid => {
    localStorage.setItem("playerOID", oid)
    g.playerTeam = "o"
})

socket.on("start x", (xid) => {
    localStorage.setItem("playerXID", xid)
    g.playerTeam = "x"
})
socket.on("start game", () => {
    if (g.playerTeam == "x") {
        let para = document.createElement("p")
        para.innerHTML = "What size board do you want?";
        para.setAttribute("id", "board-size-text")
        chatContainer.appendChild(para)

        let boardInput = document.createElement("input");
        boardInput.setAttribute("type", "text")
        boardInput.setAttribute("id", "board-input")
        boardInput.addEventListener("keypress", e => {
            if (e.key == "Enter") {
                let size = boardInput.value
                socket.emit("set board size", size)
                g.boardsize = parseInt(size)
                
            }
        })
        chatContainer.appendChild(boardInput)
    }
    socket.emit("give ids", localStorage.getItem("playerID"), g.playerTeam)
})

socket.on("set board size", size => { //one the server sends
    g.board_size = size
    if (board_created == false) {
        console.log("testing")
        g.createBoard()
    }
})

socket.on("x rejoins", (boardState) => {
    console.log(boardState)
    g.playerTeam = "x"
    socket.emit("set board size", Math.sqrt(boardState.length))
    g.createBoard()
    board_created = true
    g.boardsize = parseInt(Math.sqrt(boardState.length))
    for (let i = 0; i < boardState.length; i++) {
        g.squares[i].piece = boardState[i]
    }

})

socket.on("o rejoins", (boardState) => {
    console.log(boardState)
    g.playerTeam = "o"
    socket.emit("set board size", Math.sqrt(boardState.length))
    g.createBoard()
    board_created = true
    g.boardsize = parseInt(Math.sqrt(boardState.length))
    for (let i = 0; i < boardState.length; i++) {
        g.squares[i].piece = boardState[i]
    }
})

socket.on("made turn", squareNum => {
    g.turn += 1
    if (g.turn%2==0) {
        g.squares[squareNum].piece = "x"
    }
    else {
        g.squares[squareNum].piece = "o"
    }
    g.squares[squareNum].isClicked = true
    g.check_winCons()
})

function main() {
    canv.width = window.innerWidth * .75
    canv.height = window.innerHeight
    ctx.fillStyle = "grey"
    ctx.fillRect(0, 0, canv.width, canv.height)
    g.update(canv.width, canv.height)
    g.draw(ctx)
}
setInterval(main, 17)