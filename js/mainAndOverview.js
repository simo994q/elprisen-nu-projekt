const loadData = (data) => {
    console.log(data);

    // Current view
    const priceContainer = document.getElementById('priceContainer')
    const currentHour = new Date().getHours()
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