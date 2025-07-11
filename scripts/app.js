function init() {

    /*-------------------------------- Constants --------------------------------*/



    /*---------------------------- Variables (state) ----------------------------*/
    let cells = 6


    /*------------------------ Cached Element References ------------------------*/
    const gridElm = document.querySelector('.grid')


    /*-------------------------------- Functions --------------------------------*/
    function createGrid(){
        for(let i = 0; i < cells; i++ ){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            gridElm.appendChild(cell)
        }
    }
    createGrid()


    /*----------------------------- Event Listeners -----------------------------*/



}
document.addEventListener('DOMContentLoaded', init)