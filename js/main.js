const getMonth = () => {
    let month = new Date().getMonth() + 1

    if (month < 10) {
        return `0${month}`
    } else {
        return month
    }
}

const getDate = () => {
    let date = new Date().getDate()

    if (date < 10) {
        return `0${date}`
    } else {
        return date
    }
}

const roundPrice = (price) => {
    const priceString = price.toString()
    const priceLength = priceString.length

    if (priceLength == 3) {
        return `${price}00`
    } else if (priceLength == 4) {
        return `${price}0`
    } else {
        return price
    }
}

const classColor = (price) => {
    if (price < 0.100) {
        return 'list1';
    } else if (price >= 0.100 && price < 0.200) {
        return 'list2';
    } else if (price >= 0.200 && price < 0.300) {
        return 'list3';
    } else if (price >= 0.300 && price < 0.400) {
        return 'list4';
    } else if (price >= 0.400 && price < 0.500) {
        return 'list5';
    } else if (price >= 0.500 && price < 0.600) {
        return 'list6';
    } else if (price >= 0.600 && price < 0.700) {
        return 'list7';
    } else if (price >= 0.700 && price < 0.800) {
        return 'list8';
    } else if (price >= 0.800 && price < 0.900) {
        return 'list9';
    } else if (price >= 0.900) {
        return 'list10';
    }
}

const currentYear = new Date().getFullYear()
const currentMonth = getMonth()
const currentDate = getDate()
let priceClass = 'DK1'


const loadData = (data) => {
    console.log(data);

    // Current view
    const priceContainer = document.getElementById('priceContainer')
    const currentHour = new Date().getHours() + 1
    priceContainer.innerHTML = `${Math.round(data[currentHour].DKK_per_kWh * 1000) / 1000} KR`

    const currentHour2 = new Date().getHours()
    const currentTimeContainer = document.getElementById('currentTimeContainer')
    currentTimeContainer.innerHTML = `${data[currentHour2].time_start.slice(11, 16).replace(":", ".")} - ${data[currentHour2].time_end.slice(11, 16).replace(":", ".")}`

    const lowestPriceContainer = document.getElementById('lowestPriceContainer')
    const highestPriceContainer = document.getElementById('highestPriceContainer')

    const highest = data.reduce((previous, current) => {
        return current.DKK_per_kWh > previous.DKK_per_kWh ? current : previous;
    });
    highestPriceContainer.innerHTML = Math.round(highest.DKK_per_kWh * 1000) / 1000
    const lowest = data.reduce((previous, current) => {
        return current.DKK_per_kWh < previous.DKK_per_kWh ? current : previous;
    });
    lowestPriceContainer.innerHTML = Math.round(lowest.DKK_per_kWh * 1000) / 1000


    // Overview

    const listContainer = document.getElementById('overviewList')

    data.map((item) => {
        listContainer.innerHTML += `
        <li class="overviewListItem">
        <p>kl. ${item.time_start.slice(11, 16).replace(":", ".")}</p>
        <p class="${classColor(Math.round(item.DKK_per_kWh * 1000) / 1000)}">${roundPrice(Math.round(item.DKK_per_kWh * 1000) / 1000)} kr</p>
    </li>
    `
    })



}


// History data
const getSelectedMonth = (month) => {
    switch (month) {
        case "Jan":
            return '01'
        case "Feb":
            return '02'
        case "Mar":
            return '03'
        case "Apr":
            return '04'
        case "May":
            return '05'
        case "Jun":
            return '06'
        case "Jul":
            return '07'
        case "Aug":
            return '08'
        case "Sep":
            return '09'
        case "Oct":
            return '10'
        case "Nov":
            return '11'
        case "Dec":
            return '12'
    }
}
const historySelector = document.getElementById('dateSelector')
historySelector.addEventListener('change', (e) => {
    getHistoryData(e.target.value)
})
const historyList = document.getElementById('historyList')
const option3 = document.getElementById('option3')
const option4 = document.getElementById('option4')
const option5 = document.getElementById('option5')



const optionTextDate = (daysBehind) => {
    let selectedFullDate = new Date(Date.now() - 86400000 * daysBehind)
    let dateStringed = selectedFullDate.toString()
    let selectedDate = dateStringed.slice(8, 10)
    let selectedMonth = getSelectedMonth(dateStringed.slice(4, 7))
    let selectedYear = dateStringed.slice(11, 15)

    let text = `${selectedDate}-${selectedMonth}-${selectedYear}`

    return text
}

option3.innerHTML = optionTextDate(3)
option4.innerHTML = optionTextDate(4)
option5.innerHTML = optionTextDate(5)

const getHistoryData = (daysBehind) => {
    switch (daysBehind) {
        case '1':
            let selectedFullDate1 = new Date(Date.now() - 86400000)
            let dateStringed1 = selectedFullDate1.toString()
            let selectedDate1 = dateStringed1.slice(8, 10)
            let selectedMonth1 = getSelectedMonth(dateStringed1.slice(4, 7))
            let selectedYear1 = dateStringed1.slice(11, 15)

            fetch(`https://www.elprisenligenu.dk/api/v1/prices/${selectedYear1}/${selectedMonth1}-${selectedDate1}_${priceClass}.json`)
                .then(response => response.json())
                .then(apiData => changeHistoryData(apiData))
            break;
        case '2':
            let selectedFullDate2 = new Date(Date.now() - 86400000 * 2)
            let dateStringed2 = selectedFullDate2.toString()
            let selectedDate2 = dateStringed2.slice(8, 10)
            let selectedMonth2 = getSelectedMonth(dateStringed2.slice(4, 7))
            let selectedYear2 = dateStringed2.slice(11, 15)

            fetch(`https://www.elprisenligenu.dk/api/v1/prices/${selectedYear2}/${selectedMonth2}-${selectedDate2}_${priceClass}.json`)
                .then(response => response.json())
                .then(apiData => changeHistoryData(apiData))
            break;
        case '3':
            let selectedFullDate3 = new Date(Date.now() - 86400000 * 3)
            let dateStringed3 = selectedFullDate3.toString()
            let selectedDate3 = dateStringed3.slice(8, 10)
            let selectedMonth3 = getSelectedMonth(dateStringed3.slice(4, 7))
            let selectedYear3 = dateStringed3.slice(11, 15)

            fetch(`https://www.elprisenligenu.dk/api/v1/prices/${selectedYear3}/${selectedMonth3}-${selectedDate3}_${priceClass}.json`)
                .then(response => response.json())
                .then(apiData => changeHistoryData(apiData))
            break;
        case '4':
            let selectedFullDate4 = new Date(Date.now() - 86400000 * 4)
            let dateStringed4 = selectedFullDate4.toString()
            let selectedDate4 = dateStringed4.slice(8, 10)
            let selectedMonth4 = getSelectedMonth(dateStringed4.slice(4, 7))
            let selectedYear4 = dateStringed4.slice(11, 15)

            fetch(`https://www.elprisenligenu.dk/api/v1/prices/${selectedYear4}/${selectedMonth4}-${selectedDate4}_${priceClass}.json`)
                .then(response => response.json())
                .then(apiData => changeHistoryData(apiData))
            break;
        case '5':
            let selectedFullDate5 = new Date(Date.now() - 86400000 * 5)
            let dateStringed5 = selectedFullDate5.toString()
            let selectedDate5 = dateStringed5.slice(8, 10)
            let selectedMonth5 = getSelectedMonth(dateStringed5.slice(4, 7))
            let selectedYear5 = dateStringed5.slice(11, 15)

            fetch(`https://www.elprisenligenu.dk/api/v1/prices/${selectedYear5}/${selectedMonth5}-${selectedDate5}_${priceClass}.json`)
                .then(response => response.json())
                .then(apiData => changeHistoryData(apiData))
            break;
    }
}


const changeHistoryData = (data) => {
    historyList.innerHTML = ''
    data.map((item) => {
        historyList.innerHTML += `
        <li class="overviewListItem">
        <p>kl. ${item.time_start.slice(11, 16).replace(":", ".")}</p>
        <p class="${classColor(Math.round(item.DKK_per_kWh * 1000) / 1000)}">${roundPrice(Math.round(item.DKK_per_kWh * 1000) / 1000)} kr</p>
    </li>
    `
    })
}

getHistoryData('1')


// Todays data
fetch(`https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDate}_${priceClass}.json`)
    .then(response => response.json())
    .then(apiData => loadData(apiData))
