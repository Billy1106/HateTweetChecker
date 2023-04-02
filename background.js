let apiKey = ''
async function checkForHateSpeech(text) {
    const apiUrl = "https://api.openai.com/v1/completions";
    const API_KEY = apiKey
    const prompt = `Given the text, determine if it contains hate speech. Text: "${text}"\nHate speech:`;
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        prompt: prompt,
        max_tokens: 5,
        n: 1,
        stop: null,
        temperature: 0.5
      })
    });
  
    const data = await response.json();
    console.log(data)
    const result = data.choices && data.choices[0] && data.choices[0].text.trim();
    return result === "Yes";
}
  
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
if (request.name === "checkForHateSpeech") {
    const isHateSpeech = await checkForHateSpeech(request.text);
    if (isHateSpeech) {
        chrome.tabs.sendMessage(sender.tab.id, { action: "showAlert" });
    }
} else if (request.name === "setAPIKey") {
    
    apiKey = request.apiKey
    
}
});