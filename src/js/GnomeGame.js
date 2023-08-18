import Field from "./Field"
import GameController from "./GameController"

export default class GnomeGame {
    constructor (boardSize) {
        this.boardSize = boardSize
    }

    start () {
        const field = new Field(this.boardSize)
        field.createField()
        const gameController = new GameController(field)
        gameController.init()
        gameController.setHandlers()
    }
}
