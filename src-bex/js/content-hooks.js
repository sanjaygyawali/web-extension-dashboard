import { race } from "core-js/fn/promise";

const iFrame = document.createElement("iframe");
const defaultFrameHeight = "62px";

/**
 * Set the height of our iFrame housing our BEX
 * @param height
 */
const setIFrameHeight = (height) => {
  iFrame.height = height;
};

/**
 * Reset the iFrame to its default height e.g The height of the top bar.
 */
const resetIFrameHeight = () => {
  setIFrameHeight("62px");
};

/**
 * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
 * @type {string}
 */
iFrame.id = "bex-app-iframe";
iFrame.width = "100%";
resetIFrameHeight();

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  position: "fixed",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  border: "0",
  zIndex: "9999999", // Make sure it's on top
  overflow: "visible",
});
/**
 * Content hooks which listen for messages from the BEX in the iFrame
 * @param bridge
 */
export default function attachContentHooks(bridge) {
  /**
   * When the drawer is toggled set the iFrame height to take the whole page.
   * Reset when the drawer is closed.
   */
  bridge.on("wb.drawer.toggle", (event) => {
    const payload = event.data;
    if (payload.open) {
      setIFrameHeight("100%");
    } else {
      resetIFrameHeight();
    }
    bridge.send(event.eventResponseKey);
  });

  bridge.on("startYoutubeBox", (event) => {
    const payload = event.data;

    (function () {
      // When the page loads, insert our browser extension app.
      iFrame.src = chrome.runtime.getURL(`www/index.html#popup/`);
      document.body.prepend(iFrame);
    })();
  });

  // bridge.on("getPlayer", (event) => {});

  bridge.on("pauseVideo", (event) => {
    // let player = top.document.getElementById("movie_player");
    // debugger;
    // player.pauseVideo();
    youtube.pause();
    bridge.send(event.eventResponseKey);
  });
  bridge.on("playVideo", (event) => {
    let player = top.document.getElementById("movie_player");
    player.playVideo();
    bridge.send(event.eventResponseKey);
  });

  bridge.on("fireEventOnPlayer", async (event) => {
    if (!splayer._player) {
      // splayer = await player.inititalizer();
      // debugger;
    }
    const eventToFire = event.data.key;
    const eventParams = event.data.params || {};
    splayer[eventToFire]();
    bridge.send(event.eventResponseKey);
  });

  let playButton = document.querySelectorAll(".ytp-play-button")[0];
  debugger;
  playButton.addEventListener("click", () => {
    bridge.send("onPlay");
  });
}
