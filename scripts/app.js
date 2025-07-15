function init() {

    /*-------------------------------- Constants --------------------------------*/
    const totalCells = 10
    const hits = 18

    /*---------------------------- Variables (state) ----------------------------*/
    let cells = []
    let score = 0
    let catSpeed
    let dogSpeed
    let levelSpeed = 1700
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
    const howToPlayBtn = document.getElementById('how-to-play-btn')
    const howToPlayDiv = document.getElementById('how-to-play')
    const closeHowToBtn = document.getElementById('close-how-to')
    const loseMsg = document.getElementById('lose-msg')
    const winMsg = document.getElementById('win-msg')
    const redWarning = document.getElementById('background-img-game')

    /*-------------------------------- Functions --------------------------------*/
    function createGrid() {
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.addEventListener('click', clickAnimal)
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

    function clickAnimal(event) {
        if (event.target.classList.contains('cat')) {
            event.target.classList.remove('cat')

            score += 5
            scoreElm.textContent = score

            clikedCats += 1
            hitsLeft = hits - clikedCats

            if (hitsLeft <= 0) {
                winMsg.classList.remove('hidden')
                messageElm.textContent = '.'
            } else {
                messageElm.textContent = `You have ${Math.max(0, hitsLeft)} hits left`
            }

            if (clikedCats >= hits) {
                gameOver(true)
            }

        } else if (event.target.classList.contains('dog')) {
            event.target.classList.remove('dog')

            redWarning.classList.remove('red-flash')
            redWarning.offsetWidth
            redWarning.classList.add('red-flash')

            document.body.classList.add('freez-cursor')
            messageElm.textContent = 'You clicked a dog pausing..'

            setTimeout(() => {
                document.body.classList.remove('freez-cursor')
                messageElm.textContent = `You have ${Math.max(0, hitsLeft)} hits left`
            }, 2000)
        }
    }


    function removeAnimels() {
        cells.forEach(cell => {
            cell.classList.remove('cat', 'dog')
        })
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

        clearInterval(catSpeed)
        clearInterval(dogSpeed)

        catSpeed = setInterval(addCat, levelSpeed)
        dogSpeed = setInterval(addDog, levelSpeed)

        playbtn.textContent = 'Start'
        messageElm.textContent = 'Play'
        messageElm.textContent = 'You have 18 hits left'


        winMsg.classList.add('hidden')
        loseMsg.classList.add('hidden')

    }

    function countDownTimer() {
        clearInterval(countDown)

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

            if (numOfSec <= 9) {
                timeElm.classList.add('time-red')
            }
            else {
                timeElm.classList.remove('time-red')
            }
        }, 1000)

    }

    function gameOver(win) {
        endGame = true
        clearInterval(catSpeed)
        clearInterval(dogSpeed)
        clearInterval(countDown)
        removeAnimels()

        if (win) {
            winMsg.classList.remove('hidden')
            messageElm.textContent = '.'
        }
        if (!win) {
            loseMsg.classList.remove('hidden')
        }

        playbtn.textContent = 'Play Again'
    }

    function pages(page) {
        document.getElementById('home-page').style.display = 'none'
        document.getElementById('game-page').style.display = 'none'
        document.getElementById(page).style.display = 'block'
    }


    function render() {
        createGrid()
    }

    /*----------------------------- Event Listeners -----------------------------*/
    playbtn.addEventListener('click', startGame)

    easyLvl.addEventListener('click', () => {
        levelSpeed = 1700
        removeAnimels()
    })
    midLvl.addEventListener('click', () => {
        levelSpeed = 1000
        removeAnimels()
    })
    hardLvl.addEventListener('click', () => {
        levelSpeed = 600
        removeAnimels()
    })

    howToPlayBtn.addEventListener('click', () => {
        howToPlayDiv.style.display = 'block'
    })

    closeHowToBtn.addEventListener('click', () => {
        howToPlayDiv.style.display = 'none'
    })

    document.getElementById('easy').addEventListener('click', () => {
        pages('game-page')
    })
    document.getElementById('medium').addEventListener('click', () => {
        pages('game-page')
    })
    document.getElementById('hard').addEventListener('click', () => {
        pages('game-page')
    })

    pages('home-page')
    render()
}
document.addEventListener('DOMContentLoaded', init)