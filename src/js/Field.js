export default class Field {
    constructor (boardSize) {
        this.boardSize = boardSize
        this.gameField = document.querySelector('.game-field')
    }

    createField () {
        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            const fieldCell = document.createElement('div')
            fieldCell.classList.add('field-cell', 'hide')
            fieldCell.dataset.id = i

            this.gameField.appendChild(fieldCell)
        }
    }
}
