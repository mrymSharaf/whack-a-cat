function init() {

    /*-------------------------------- Constants --------------------------------*/
    const totalCells = 6



    /*---------------------------- Variables (state) ----------------------------*/
    let cells = []

    /*------------------------ Cached Element References ------------------------*/
    const gridElm = document.querySelector('.grid')


    /*-------------------------------- Functions --------------------------------*/
    function createGrid() {
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            gridElm.appendChild(cell)
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

    function render() {
        addCat()
    }
    render()

    /*----------------------------- Event Listeners -----------------------------*/



}
document.addEventListener('DOMContentLoaded', init)