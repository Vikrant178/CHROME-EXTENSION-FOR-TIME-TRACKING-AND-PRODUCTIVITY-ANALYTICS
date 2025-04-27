let currentTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
    trackTime();
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab && tab.url) {
            currentTab = getHostname(tab.url);
            startTime = Date.now();
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {
        trackTime();
        if (tab.url) {
            currentTab = getHostname(tab.url);
            startTime = Date.now();
        }
    }
});

function trackTime() {
    if (!currentTab || !startTime) return;
    const timeSpent = Date.now() - startTime;

    chrome.storage.local.get(["timeData"], data => {
        let timeData = data.timeData || {};
        if (!timeData[currentTab]) {
            timeData[currentTab] = 0;
        }
        timeData[currentTab] += timeSpent;
        chrome.storage.local.set({ timeData });
    });
}

function getHostname(url) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return null;
    }
  }
  

chrome.runtime.onStartup.addListener(() => {
    startTime = Date.now();
});
