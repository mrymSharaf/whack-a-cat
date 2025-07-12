function init() {

    /*-------------------------------- Constants --------------------------------*/
    const totalCells = 6



    /*---------------------------- Variables (state) ----------------------------*/
    let cells = []
    let score = 0
    let speed

    /*------------------------ Cached Element References ------------------------*/
    const gridElm = document.querySelector('.grid')
    const scoreElm = document.querySelector('#score')
    const playbtn = document.querySelector('#play-game')

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
    
    function startGame() {
        addCat()
        speed = setInterval(addCat, 2000)
    }
    
    function render() {
        createGrid()
    }
    render()

    /*----------------------------- Event Listeners -----------------------------*/
    playbtn.addEventListener('click', startGame)

}
document.addEventListener('DOMContentLoaded', init)