const getMonth = () => {
    let month = new Date().getMonth() + 1

    if (month < 10) {
        return `0${month}`
    } else {
        return month
    }
}

const currentYear = new Date().getFullYear()
const currentMonth = getMonth()
const currentDate = new Date().getDate()
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

    const classColor = (price) => {
        if (price >= 0 && price < 0.100) {
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

    data.map((item) => {
        listContainer.innerHTML += `
        <li class="overviewListItem">
        <p>kl. ${item.time_start.slice(11, 16).replace(":", ".")}</p>
        <p class="${classColor(Math.round(item.DKK_per_kWh * 1000) / 1000)}">${roundPrice(Math.round(item.DKK_per_kWh * 1000) / 1000)} kr</p>
    </li>
    `
    })
}



const changeHistoryData = (theData) => {

}


// Todays data
fetch(`https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDate}_${priceClass}.json`)
    .then(response => response.json())
    .then(apiData => loadData(apiData))

