// Background code goes here
// chrome.browserAction.onClicked.addListener((tab) => {
//   console.log(1, tab);
//   if (tab.url.startsWith("https://www.youtube.com")) {
//     // TODO: inject in youtube.
//     // console.log(2, tab);
//     // bridge.send("startYoutubeBox");
//   } else {
//     chrome.tabs.create(
//       {
//         url: chrome.extension.getURL("www/index.html"),
//       },
//       (/* newTab */) => {
//         // Tab opened.
//       }
//     );
//   }
// });

// chrome.runtime.onInstalled.addListener((reason) => {
//   if (reason == chrome.runtime.OnInstalledReason.INSTALL) {
//     chrome.tabs.create({
//       url: "",
//     });url
//   }
// });
