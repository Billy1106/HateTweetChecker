document.getElementById('btn').addEventListener('click', () => {
    addAPIKey(document.getElementById('apiKey').value)
})

function addAPIKey(api) {
    chrome.runtime.sendMessage({ name: "setAPIKey", apiKey: api })
}