// console.log('main.js is up!')

let state = {
    /* Placeholder data until we add real data... */
    currencyData: {},
};
// console.log('Initial value of state:');
// console.log(state.currencyData);

function render() {
    // console.log('function displayOutput invoked');

    // Set rates constant
    const rates = state.currencyData.rates

    // Select parent element of chart bars
    const chartContainer = document.querySelector('#ChartContainer');

    // Delete innerHTML of parent element, to refresh state
    chartContainer.innerHTML = '';
    // console.log(rates);

    
    // Get max value of rates, to use as bar height ratio
    const ratesValues = Object.values(rates);
    // console.log(ratesValues);
    const maxRate = Math.max(...ratesValues);
    
    // Recreate state
    for (const key in rates) {
        let value = rates[key];
        let barHeight = (value / maxRate) * 100;
        // console.log(key, ':', value);
        chartContainer.innerHTML += `
            <div class="ChartBar" style="height: ${barHeight}%;">
                <div class="ChartBar-label">${key}</div>
                <div class="ChartBar-label">${value}</div>
            </div>
        `;
    }
}

function dataFetch(baseCurrency = 'EUR') {
    // console.log('function dataFetch invoked');
    fetch(`https://api.exchangeratesapi.io/latest?symbols=AUD,BRL,CAD,CHF,GBP&base=${baseCurrency}`)
        .then(response => response.json())
        .then(responseJson => {
            state.currencyData = responseJson;
            // console.log('Value of state after invoking function dataFetch:');
            // console.log(state.currencyData);
            render();
        });
}

dataFetch();