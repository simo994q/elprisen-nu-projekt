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
}



fetch(`https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDate}_${priceClass}.json`)
    .then(response => response.json())
    .then(apiData => loadData(apiData))

