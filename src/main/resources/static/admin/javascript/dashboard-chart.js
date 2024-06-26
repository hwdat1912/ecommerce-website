Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
});

const form = document.getElementById('form-statistic');
const monthSelector = document.getElementById('MONTH');
const yearInputter = document.getElementById('YEAR');

const charts = new Map();

form.addEventListener('submit', e => {
    e.preventDefault();
    const jsonData = JSON.stringify({
        month: monthSelector.disabled ? null : monthSelector.value,
        year: yearInputter.disabled ? null : yearInputter.value,
        type: typeSelector.value || null
    })
    getDataStatistic(jsonData);
})

function getDataStatistic(jsonData) {
    showSpinner();
    const bill = getStatisticBill(jsonData);
    const user = getStatisticUser(jsonData);
    const product = getStatisticProduct(jsonData);
    const revenue = getStatisticRevenue(jsonData);
    const profit = getStatisticProfit(jsonData);
    const cost = getStatisticCost(jsonData);
    $.when(bill, user, product, revenue, profit, cost)
        .then(() => hideSpinner())
        .catch(() => hideSpinner())
}

function getStatisticBill(jsonData) {
    return $.ajax({
        url:  `${form.dataset.urirest}/chart/bill`,
        type: 'POST',
        dataType: 'json',
        data: jsonData,
        success: function(data) {
            const labels = [];
            const dataChart = [];
            data.forEach(key => {
                labels.push(key.label);
                dataChart.push(+key.data);
            })
            generatePieChart('chartBill', labels, dataChart);
        }
    })
}

function getStatisticUser(jsonData) {
    return $.ajax({
        url:  `${form.dataset.urirest}/chart/user`,
        type: 'POST',
        dataType: 'json',
        data: jsonData,
        success: function(data) {
            const labels = [];
            const dataChart = [];
            data.forEach(key => {
                labels.push(key.label);
                dataChart.push(+key.data);
            })
            generatePieChart('chartUser', labels, dataChart);
        }
    })
}

function getStatisticProduct(jsonData) {
    return $.ajax({
        url:  `${form.dataset.urirest}/chart/product`,
        type: 'POST',
        dataType: 'json',
        data: jsonData,
        success: function(data) {
            const labels = [];
            const dataChart = [];
            data.forEach(key => {
                labels.push(key.label);
                dataChart.push(+key.data);
            })
            generatePieChart('chartProduct', labels, dataChart);
        }
    })
}

function getStatisticRevenue(jsonData) {
    return $.ajax({
        url:  `${form.dataset.urirest}/chart/revenue`,
        type: 'POST',
        dataType: 'json',
        data: jsonData,
        success: function(data) {
            const labels = [];
            const dataChart = [];
            data.forEach(key => {
                labels.push(key.label);
                dataChart.push(+key.data);
            })
            generateLineChart('revenue', labels, dataChart);
        }
    })
}

function getStatisticProfit(jsonData) {
    return $.ajax({
        url:  `${form.dataset.urirest}/chart/profit`,
        type: 'POST',
        dataType: 'json',
        data: jsonData,
        success: function(data) {
            const labels = [];
            const dataChart = [];
            data.forEach(key => {
                labels.push(key.label);
                dataChart.push(+key.data);
            })
            generateLineChart('profit', labels, dataChart);
        }
    })
}

function getStatisticCost(jsonData) {
    return $.ajax({
        url:  `${form.dataset.urirest}/chart/cost`,
        type: 'POST',
        dataType: 'json',
        data: jsonData,
        success: function(data) {
            const labels = [];
            const dataChart = [];
            data.forEach(key => {
                labels.push(key.label);
                dataChart.push(+key.data);
            })
            generateLineChart('cost', labels, dataChart);
        }
    })
}

function generatePieChart(id, labels, data) {
    if (charts.get(id)) {
        updateChart(id, labels, data);
        return;
    }
    const ctx = document.getElementById(id);
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#4e73df', '#858796', '#e74a3b', '#4e73df', '#f6c23e', '#1cc88a'],
                // hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });
    charts.set(id, chart);
}

function generateLineChart(id, labels, data) {
    if (charts.get(id)) {
        updateChart(id, labels, data);
        return;
    }
    const ctx = document.getElementById(id);
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                // label: "Tiền",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: data,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return formatter.format(value);
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                        console.log(tooltipItem.yLabel)
                        const datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + formatter.format(tooltipItem.yLabel);
                    }
                }
            }
        }
    });
    charts.set(id, lineChart);
}

function updateChart(id, labels, data) {
    const c = charts.get(id);
    c.data.labels = labels;
    c.data.datasets[0].data = data;
    c.update();
}

(function main() {
    getDataStatistic('{}');
})()