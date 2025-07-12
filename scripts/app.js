function init() {

    /*-------------------------------- Constants --------------------------------*/
    const totalCells = 6
    const time = 30


    /*---------------------------- Variables (state) ----------------------------*/
    let cells = []
    let score = 0
    let speed
    let levelSpeed = 3000

    /*------------------------ Cached Element References ------------------------*/
    const gridElm = document.querySelector('.grid')
    const scoreElm = document.querySelector('#score')
    const playbtn = document.querySelector('#play-game')
    const easyLvl = document.querySelector('#easy')
    const midLvl = document.querySelector('#medium')
    const hardLvl = document.querySelector('#hard')

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
            scoreElm.textContent = score
        }
    }

    function startGame() {
        addCat()
        speed = setInterval(addCat, levelSpeed)
    }

    function levelChange() {
        clearInterval(speed)
        addCat()
        speed = setInterval(addCat, levelSpeed)
    }

    function render() {
        createGrid()
    }

    /*----------------------------- Event Listeners -----------------------------*/
    playbtn.addEventListener('click', startGame)
    easyLvl.addEventListener('click', () => {
        levelSpeed = 3000
        levelChange()
    })
    midLvl.addEventListener('click', () => {
        levelSpeed = 1000
        levelChange()
    })
    hardLvl.addEventListener('click', () => {
        levelSpeed = 500
        levelChange()
    })

    render()
}
document.addEventListener('DOMContentLoaded', init)