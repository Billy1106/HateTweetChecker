function checkForHateSpeech(text = '') {
    if(!!text) {
        chrome.runtime.sendMessage({ name: "checkForHateSpeech", text: text })
    }
}

function showAlert() {
    alert("Warning: Your tweet may contain hate speech. Please review and edit before posting.");
}

let isPointerInTheButton = false
let inputText = ''
document.addEventListener("mouseover", function(event) {
    const tweetButton = document.querySelector("div[role='button'][data-testid='tweetButton']");
    
    if(tweetButton?.contains(event.target)) {
        const tweetContent = document.querySelector('span[data-text]')?.innerText;
        if(!isPointerInTheButton && tweetContent !== inputText ) {
            inputText = tweetContent
            checkForHateSpeech(tweetContent);
        }
        isPointerInTheButton = true
    } else {
        isPointerInTheButton = false
    }
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if (request.action === "showAlert") {
    showAlert();
}
});
  