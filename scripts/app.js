function init() {

    /*-------------------------------- Constants --------------------------------*/
    const totalCells = 10
    const hits = 18
    const dogStrike = 3

    /*---------------------------- Variables (state) ----------------------------*/
    let cells = []
    let score = 0
    let catSpeed
    let dogSpeed
    let levelSpeed = 1500
    let numOfSec = 30
    let clikedCats = 0
    let clickedDogs = 0
    let strikeLeft
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
    const heart1 = document.getElementById('heart1')
    const heart2 = document.getElementById('heart2')
    const heart3 = document.getElementById('heart3')
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
        if(endGame) 
            return
        
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

            clickedDogs++
            strikeLeft = dogStrike - clickedDogs

            if(strikeLeft === 2){
               heart1.classList.add('hidden')
            }
            else if(strikeLeft == 1){
                heart2.classList.add('hidden')
            }
            else if(strikeLeft == 0){
                loseMsg.classList.remove('hidden')
                heart3.classList.add('hidden')
                gameOver()
            }

            redWarning.classList.remove('red-flash')
            redWarning.offsetWidth
            redWarning.classList.add('red-flash')

            document.body.classList.add('freez-cursor')

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
        scoreElm.textContent = 0
        numOfSec = 30
        hitsLeft = hits
        clickedDogs = 0
        strikeLeft = dogStrike
        timeElm.textContent = '0:30'

        countDownTimer()
        addCat()
        addDog()

        clearInterval(catSpeed)
        clearInterval(dogSpeed)

        catSpeed = setInterval(addCat, levelSpeed)
        dogSpeed = setInterval(addDog, levelSpeed)

        playbtn.textContent = 'Start'
        messageElm.textContent = 'You have 18 hits left'


        winMsg.classList.add('hidden')
        loseMsg.classList.add('hidden')

        heart1.classList.remove('hidden')
        heart2.classList.remove('hidden')
        heart3.classList.remove('hidden')

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
        levelSpeed = 1500
        removeAnimels()
    })
    midLvl.addEventListener('click', () => {
        levelSpeed = 1000
        removeAnimels()
    })
    hardLvl.addEventListener('click', () => {
        levelSpeed = 500
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