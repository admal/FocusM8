class BlockedPage {
  constructor(pageUrl){
    this.pageUrl = pageUrl;
    //Will be added more configuration here like time, patterns categories etc...
  }
}

//TODO: load from config
let blockedPages = [
  new BlockedPage("https://www.facebook.com"),
  new BlockedPage("https://www.twitch.tv"),
  new BlockedPage("https://www.youtube.com")
];

var currentUrl = window.location.href;
for (const blockedPage of blockedPages) {
  if (currentUrl.startsWith(blockedPage.pageUrl)) {
    blockPage();
  }
}

function blockPage() {
  //TODO: load nice template
  document.documentElement.innerHTML = '';
  document.documentElement.innerHTML = 'Domain is blocked';
  document.documentElement.scrollTop = 0;
}