window.addEventListener('resize', () => {
    handleResize()
})

const pageOne = document.getElementById('currentContainer')
const pageTwo = document.getElementById('overviewContainer')
const pageThree = document.getElementById('historyContainer')

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
    }
}
const fullDisplay = () => {
    pageOne.style.display = 'flex'
    pageTwo.style.display = 'block'
    pageThree.style.display = 'block'
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
let settingsPageActive = false

const changeDisplay = (page) => {
    if (settingsPageActive) {
        settingsPageActive = false
        closeSettings()
    }
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

const settingsContainer = document.getElementById('settingsContainer')
const headerSettings = document.getElementById('headerSettings')
const mobileSettings = document.getElementById('mobileSettings')
const closeImg = document.getElementById('closeImg')

const openSettings = () => {
    settingsContainer.style.display = 'flex'
}
const closeSettings = () => {
    settingsContainer.style.display = 'none'
}

headerSettings.addEventListener('click', () => {
    openSettings()
    settingsPageActive = true
})
mobileSettings.addEventListener('click', () => {
    openSettings()
    settingsPageActive = true
})
closeImg.addEventListener('click', () => {
    closeSettings()
    changeDisplay(1)
    settingsPageActive = false
})