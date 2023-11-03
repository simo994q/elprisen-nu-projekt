window.addEventListener('resize', () => {
    handleResize()
})

const pageOne = document.getElementById('currentContainer')
const pageTwo = document.getElementById('overviewContainer')
const pageThree = document.getElementById('historyContainer')
const settingsPage = document.getElementById('settingsPage')

const setDisplay = (page) => {
    switch (page) {
        case 1:
            pageOne.style.display = 'flex'
            pageTwo.style.display = 'none'
            pageThree.style.display = 'none'
            break;
        case 2:
            pageOne.style.display = 'none'
            pageTwo.style.display = 'block'
            pageThree.style.display = 'none'
            break;
        case 3:
            pageOne.style.display = 'none'
            pageTwo.style.display = 'none'
            pageThree.style.display = 'block'
            break;
        case 4:
            pageOne.style.display = 'none'
            pageTwo.style.display = 'none'
            pageThree.style.display = 'none'
            settingsPage.style.dispay = 'flex'
            break;
    }
}
const fullDisplay = () => {
    pageOne.style.display = 'flex'
    pageTwo.style.display = 'block'
    pageThree.style.display = 'block'
    if (settingsPageOpen = true) {
        settingsPage.style.dispay = 'flex'
    } else {
        settingsPage.style.dispay = 'none'
    }
}

const navOne = document.getElementById('navOne')
const navTwo = document.getElementById('navTwo')
const navThree = document.getElementById('navThree')

navOne.addEventListener('click', () => {
    changeDisplay(1)
})
navTwo.addEventListener('click', () => {
    changeDisplay(2)
})
navThree.addEventListener('click', () => {
    changeDisplay(3)
})
let pageSelector = 1

const changeDisplay = (page) => {
    switch (page) {
        case 1:
            pageSelector = 1
            handleResize()
            break;
        case 2:
            pageSelector = 2
            handleResize()
            break;
        case 3:
            pageSelector = 3
            handleResize()
            break;
    }
}

const handleResize = () => {
    if (window.innerWidth < 850) {
        setDisplay(pageSelector)
    } else {
        fullDisplay()
    }
}

handleResize()