chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'emDashCount') {
        const count = message.count;
        const tabId = sender.tab?.id;

        if (!tabId)
            return;

        if (count === 0) {
            chrome.action.setBadgeText({ text: '', tabId });
            return;
        }

        const text = count > 999 ? "999+" : String(count);
        chrome.action.setBadgeText({ text, tabId });
        chrome.action.setBadgeBackgroundColor({ color: '#ff5c00', tabId });
    }
});
