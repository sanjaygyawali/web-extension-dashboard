// Hooks added here have a bridge allowing communication between the BEX Background Script and the BEX Content Script.
// Note: Events sent from this background script using `bridge.send` can be `listen`'d for by all client BEX bridges for this BEX

// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/background-hooks

export default function attachBackgroundHooks(bridge) {
  bridge.on("storage.get", (event) => {
    const payload = event.data;
    if (payload.key === null) {
      chrome.storage.local.get(null, (r) => {
        const result = [];

        // Group the items up into an array to take advantage of the bridge's chunk splitting.
        for (const itemKey in r) {
          result.push(r[itemKey]);
        }
        bridge.send(event.eventResponseKey, result);
      });
    } else {
      chrome.storage.local.get([payload.key], (r) => {
        bridge.send(event.eventResponseKey, r[payload.key]);
      });
    }
  });

  bridge.on("storage.set", (event) => {
    const payload = event.data;
    chrome.storage.local.set({ [payload.key]: payload.data }, () => {
      bridge.send(event.eventResponseKey, payload.data);
    });
  });

  bridge.on("storage.remove", (event) => {
    const payload = event.data;
    chrome.storage.local.remove(payload.key, () => {
      bridge.send(event.eventResponseKey, payload.data);
    });
  });

  /*
  // EXAMPLES
  // Listen to a message from the client


  // Send a message to the client based on something happening.
  chrome.tabs.onCreated.addListener(tab => {
    bridge.send('browserTabCreated', { tab })
  })

     */
  // Send a message to the client based on something happening.
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(changeInfo, tab);
    if (changeInfo.url) {
      bridge.send("browserTabUpdated", { tab, changeInfo });
    }
  });

  bridge.on("getAllTabs", (event) => {
    chrome.tabs.query({}, (tabs) => {
      bridge.send(event.eventResponseKey, tabs);
    });
  });

  bridge.on("getCurrentTabInfo", (event) => {
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, (tabs) => {
      let [tab] = tabs;
      bridge.send(event.eventResponseKey, tab);
    });
  });
  bridge.on("contentEvent", (event) => {
    bridge.send("c:getYoutubePlayer", (data) => {
      bridge.send(event.eventResponseKey, event);
    });
    // bridge.send(event.eventResponseKey, event);
  });

  chrome.browserAction.onClicked.addListener((tab) => {
    console.log(1, tab);
    if (tab.url.startsWith("https://www.youtube.com")) {
      // TODO: inject in youtube.
      // console.log(2, tab);
      bridge.send("startYoutubeBox");
    } else {
      chrome.tabs.create(
        {
          url: chrome.extension.getURL("www/index.html"),
        },
        (/* newTab */) => {
          // Tab opened.
        }
      );
    }
  });
}
