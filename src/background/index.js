chrome.browserAction.setBadgeBackgroundColor({ color: "#4281F4" })

chrome.runtime.onInstalled.addListener(() => {
    console.log('Reader extension running!');
});