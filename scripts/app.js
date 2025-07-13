function init() {

    /*-------------------------------- Constants --------------------------------*/
    const totalCells = 6
    const hits = 20

    /*---------------------------- Variables (state) ----------------------------*/
    let cells = []
    let score = 0
    let speed
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
    const playAgainBtn = document.querySelector('#restart-game')

    /*-------------------------------- Functions --------------------------------*/
    function createGrid() {
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            gridElm.appendChild(cell)
            gridElm.addEventListener('click', clickCat)
            gridElm.addEventListener('click', clickDog)
            cells.push(cell)
        }
    }

    function addCat() {
        if (endGame)
            return

        cells.forEach(cell => {
            cell.classList.remove('cat')
            cell.textContent = ''
        })

        const randomIndx = Math.floor(Math.random() * cells.length)
        const randomCell = cells[randomIndx]
        if (randomCell.classList.contains('dog')) {
            return
        }
        randomCell.classList.add('cat')
    }

    function clickCat(event) {
        if (event.target.classList.contains('cat')) {
            event.target.classList.remove('cat')
            addCat()

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
            } else {
                addCat()
                addDog()
            }

        }
    }

    function addDog() {
        cells.forEach(cell => {
            cell.classList.remove('dog')
            cell.textContent = ''
        })

        const randomIndx = Math.floor(Math.random() * cells.length)
        const randomCell = cells[randomIndx]
        if (randomCell.classList.contains('cat')) {
            return
        }
        randomCell.classList.add('dog')
    }

    function clickDog(event) {
        if (event.target.classList.contains('dog')) {
            event.target.classList.remove('dog')
            if (!event.target.classList.contains('cat')) {
                addDog()
            }
        }
    }

    function startGame() {
        endGame = false
        clikedCats = 0
        score = 0
        numOfSec = 30
        countDownTimer()
        addCat()
        addDog()
        speed = setInterval(addCat, levelSpeed)
        speed = setInterval(addDog, levelSpeed)
        messageElm.textContent = 'Starting..'
    }

    function levelChange() {
        if (speed)
            clearInterval(speed)
        if (!endGame) {
            speed = setInterval(addCat, levelSpeed)
            speed = setInterval(addDog, levelSpeed)
        }
    }

    function countDownTimer() {
        countDown = setInterval(() => {
            if (numOfSec <= 0) {
                clearInterval(countDown)
                clearInterval(speed)
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
        clearInterval(speed)
        clearInterval(countDown)
        if (win) {
            messageElm.textContent = 'Winner!'
        }
        if (!win) {
            messageElm.textContent = 'You Loose!'
        }
        playAgainBtn.classList.toggle('hidden')
    }

    function playAgain() {
        startGame()
        playAgainBtn.classList.toggle('hidden')
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

    playAgainBtn.addEventListener('click', playAgain)

    render()
}
document.addEventListener('DOMContentLoaded', init)