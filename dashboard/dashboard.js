let chart;

async function fetchData() {
    const res = await fetch('http://localhost:5000/api/activity/summary');
    const data = await res.json();

    const siteList = document.getElementById("siteList");
    siteList.innerHTML = "";

    const labels = [];
    const times = [];

    data.forEach(site => {
        labels.push(site.website);
        times.push((site.totalTime / 60).toFixed(2)); // minutes

        const div = document.createElement("div");
        div.className = "site";
        div.innerHTML = `<span>${site.website}</span><span>${(site.totalTime / 60).toFixed(2)} min</span>`;
        siteList.appendChild(div);
    });

    if (chart) chart.destroy();
    const ctx = document.getElementById("barChart").getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Time Spent (min)',
                data: times,
                backgroundColor: '#0077cc'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.onload = fetchData;
