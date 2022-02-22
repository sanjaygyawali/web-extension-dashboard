// Hooks added here have a bridge allowing communication between the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks

export default function attachDomHooks(bridge) {
  /*
  bridge.send('message.to.quasar', {
    worked: true
  })
  */
  bridge.on("c:getYoutubePlayer", (event) => {
    // const el = document.getElementById("movie_player");
    bridge.send(event.eventResponseKey, { event, content: true });
  });
}
