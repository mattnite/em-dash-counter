function countEmDashes() {
    const body = document.body;
    if (!body)
        return 0;

    const treeWalker = document.createTreeWalker(
        body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                const parent = node.parentElement;
                if (!parent)
                    return NodeFilter.FILTER_REJECT;

                const tag = parent.tagName.toLowerCase();
                if (['script', 'style', 'noscript', 'textarea'].includes(tag)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );


    let count = 0;
    while (treeWalker.nextNode()) {
        matches = treeWalker.currentNode.nodeValue.match(/\u2014/g);
        count += matches ? matches.length : 0;
    }

    return count;
}

// Send count to background script to update the badge
const count = countEmDashes();
chrome.runtime.sendMessage({ type: 'emDashCount', count });
