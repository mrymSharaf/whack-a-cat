function init() {

    /*-------------------------------- Constants --------------------------------*/
    const totalCells = 6



    /*---------------------------- Variables (state) ----------------------------*/
    let cells = []
    let score = 0

    /*------------------------ Cached Element References ------------------------*/
    const gridElm = document.querySelector('.grid')
    const scoreElm = document.querySelector('#score')

    /*-------------------------------- Functions --------------------------------*/
    function createGrid() {
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            gridElm.appendChild(cell)
            gridElm.addEventListener('click', clickCat)
            cells.push(cell)
        }
    }
    createGrid()

    function addCat() {
        cells.forEach(cell => {
            cell.classList.remove('cat')
            cell.textContent = ''
        })

        const randomIndx = Math.floor(Math.random() * cells.length)
        const randomCell = cells[randomIndx]
        randomCell.classList.add('cat')
    }

    function clickCat(event) {
        if (event.target.classList.contains('cat')) {
            event.target.classList.remove('cat')
            addCat()
            score += 5
            scoreElm.textContent = (score)

        }
    }

    function render() {
        addCat()
    }
    render()

    /*----------------------------- Event Listeners -----------------------------*/



}
document.addEventListener('DOMContentLoaded', init)