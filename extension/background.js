let activeTab = null;
let activeStart = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    handleTabChange(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        handleTabChange(tab.url);
    }
});

function handleTabChange(url) {
    if (!url.startsWith('http')) return;

    const now = Date.now();

    if (activeTab && activeStart) {
        const timeSpent = Math.floor((now - activeStart) / 1000);

        fetch('http://localhost:5000/api/activity', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                website: new URL(activeTab).hostname,
                timeSpent
            })
        });
    }

    activeTab = url;
    activeStart = now;
}
