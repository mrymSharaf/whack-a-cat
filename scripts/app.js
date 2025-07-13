function init() {

    /*-------------------------------- Constants --------------------------------*/
    const totalCells = 6
    const hits = 15

    /*---------------------------- Variables (state) ----------------------------*/
    let cells = []
    let score = 0
    let catSpeed
    let dogSpeed
    let levelSpeed = 1500
    let numOfSec = 30
    let clikedCats = 0
    let hitsLeft
    let endGame = false
    let countDown

    /*------------------------ Cached Element References ------------------------*/
    const gridElm = document.querySelector('.grid')
    const scoreElm = document.querySelector('#score')
    const playbtn = document.querySelector('#play-game')
    const easyLvl = document.querySelector('#easy')
    const midLvl = document.querySelector('#medium')
    const hardLvl = document.querySelector('#hard')
    const timeElm = document.querySelector('#time')
    const messageElm = document.querySelector('.message')

    /*-------------------------------- Functions --------------------------------*/
    function createGrid() {
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.addEventListener('click', clickCat)
            cell.addEventListener('click', clickDog)
            gridElm.appendChild(cell)
            cells.push(cell)
        }
    }

    function addCat() {
        if (endGame)
            return

        cells.forEach(cell => {
            cell.classList.remove('cat')
        })

        const randomIndx = Math.floor(Math.random() * cells.length)
        const randomCell = cells[randomIndx]
        if (!randomCell.classList.contains('dog')) {
            randomCell.classList.add('cat')
        }
    }

    function clickCat(event) {
        if (event.target.classList.contains('cat')) {
            event.target.classList.remove('cat')

            score += 5
            scoreElm.textContent = score

            clikedCats += 1
            hitsLeft = hits - clikedCats
            if (hitsLeft <= 0) {
                messageElm.textContent = 'Winner!'
            } else {
                messageElm.textContent = `You have ${Math.max(0, hitsLeft)} hits left`
            }
            if (clikedCats >= hits) {
                gameOver(true)
            }

        }
    }

    function addDog() {
        if (endGame)
            return
        cells.forEach(cell => {
            cell.classList.remove('dog')
        })

        const randomIndx = Math.floor(Math.random() * cells.length)
        const randomCell = cells[randomIndx]
        if (!randomCell.classList.contains('cat')) {
            randomCell.classList.add('dog')
        }
    }

    function clickDog(event) {
        if (event.target.classList.contains('dog')) {
            event.target.classList.remove('dog')

            document.body.classList.add('freez-cursor')
            messageElm.textContent = 'You clicked a dog pausing..'
            setTimeout(() => {
                document.body.classList.remove('freez-cursor')
                messageElm.textContent = `You have ${Math.max(0, hitsLeft)} hits left`
            }, 2000)
        }
    }

    function startGame() {
        endGame = false
        clikedCats = 0
        score = 0
        numOfSec = 30
        hitsLeft = hits
        countDownTimer()
        addCat()
        addDog()
        playbtn.textContent = 'Play'
        catSpeed = setInterval(addCat, levelSpeed)
        dogSpeed = setInterval(addDog, levelSpeed)
        messageElm.textContent = 'Starting..'
    }

    function levelChange() {
        clearInterval(catSpeed)
        clearInterval(dogSpeed)
        if (!endGame) {
            catSpeed = setInterval(addCat, levelSpeed)
            dogSpeed = setInterval(addDog, levelSpeed)
        }
    }

    function countDownTimer() {
        countDown = setInterval(() => {
            if (numOfSec <= 0) {
                clearInterval(countDown)
                clearInterval(catSpeed)
                clearInterval(dogSpeed)
                if (clikedCats >= hits) {
                    gameOver(true)
                }
                else {
                    gameOver(false)
                }
            }
            timeElm.textContent = `0:${numOfSec}`
            numOfSec -= 1
        }, 1000)

    }

    function gameOver(win) {
        endGame = true
        clearInterval(catSpeed)
        clearInterval(dogSpeed)
        clearInterval(countDown)
        if (win) {
            messageElm.textContent = 'Winner!'
        }
        if (!win) {
            messageElm.textContent = 'You Loose!'
        }
        playbtn.textContent = 'Play Again'
    }

    function render() {
        createGrid()
    }

    /*----------------------------- Event Listeners -----------------------------*/
    playbtn.addEventListener('click', startGame)
    easyLvl.addEventListener('click', () => {
        levelSpeed = 1500
        levelChange()
    })
    midLvl.addEventListener('click', () => {
        levelSpeed = 1000
        levelChange()
    })
    hardLvl.addEventListener('click', () => {
        levelSpeed = 600
        levelChange()
    })

    render()
}
document.addEventListener('DOMContentLoaded', init)