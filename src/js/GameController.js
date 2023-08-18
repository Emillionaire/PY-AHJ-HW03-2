export default class GameController {
    constructor (gameField) {
        this.gameField = gameField
    }

    init () {
        this.score = 0
        this.missScore = 0
        const scoreEl = document.querySelector('.score')
        scoreEl.textContent = `Score: ${this.score}`
        const missScoreEl = document.querySelector('.miss-score')
        missScoreEl.textContent = `Miss: ${this.missScore}`

        if (this._timeout) {
            clearTimeout(this._timeout)
        }

        this._timeout = setInterval(() => {
            if (this.prevCell) {
                this.prevCell.classList.add('hide')
            }

            const position = Math.floor(Math.random() * this.gameField.boardSize * this.gameField.boardSize)

            const cell = document.querySelector(`[data-id='${position}']`)
            cell.classList.remove('hide')
            this.prevCell = cell
        }, 1000)
    }

    setHandlers () {
        const gameField = document.querySelector('.game-field')
        gameField.addEventListener('click', (e) => {
            console.log(e.target)
            const cell = e.target
            if (!cell.classList.contains('hide')) {
                cell.classList.add('hide')
                this.addPoint()
            } else {
                this.addMissPoint()
            }
        })
    }

    addPoint () {
        const scoreEl = document.querySelector('.score')
        this.score++

        scoreEl.textContent = `Score: ${this.score}`
    }

    addMissPoint () {
        const missScoreEl = document.querySelector('.miss-score')
        this.missScore++

        missScoreEl.textContent = `Miss: ${this.missScore}`
        if (this.missScore >= 5) {
            alert('You lost')
            this.init()
        }
    }
}
