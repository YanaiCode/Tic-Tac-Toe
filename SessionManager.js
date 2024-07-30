class SessionManager{
    constructor() {
        this.sessions = []
    }
    addSession(id) {
        this.sessions.push(new Session(id))
    }
    getSession(id) {
        for (let s of this.sessions) {
            if (s.id ==id) {
                return s
            }
        }
    }
}

class Session {
    constructor(id, boardSize) {
        this.id = id
        this.boardState = []
        this.playerXID = null
        this.playerOID = null
        this.gameStarted = false
        this.boardStateSize = null
        for (let i = 0; i < boardSize*boardSize; i++) {
            this.boardState.push("empty")
        }
        this.turn = 1
    }
    setSquare(squareID, playerTeam) {
        this.boardState[squareID] = playerTeam
    }
}

module.exports = SessionManager