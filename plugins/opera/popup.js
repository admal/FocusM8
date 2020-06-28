
var enableBtn = document.getElementById("start-blocking-websites-button");
var disableBtn = document.getElementById("stop-blocking-websites-button");

chrome.storage.sync.get("isBlocking", function(data){
    enableBtn.style.display = data.isBlocking ? "none" : "block";
    disableBtn.style.display = data.isBlocking ? "block" : "none";

    enableBtn.addEventListener("click", () => {
        enableBtn.style.display = "none";
        disableBtn.style.display = "block";
    
    
        chrome.storage.sync.set({ isBlocking: true }, function () {
        });
    });
    
    disableBtn.addEventListener("click", () => {
        enableBtn.style.display = "block";
        disableBtn.style.display = "none";
    
        enableBlocking = false;
    
        chrome.storage.sync.set({ isBlocking: false }, function () {
        });
    });
    

});