// Content script content goes here or in activatedContentHooks (use activatedContentHooks if you need a variable
// accessible to both the content script and inside a hook

function get(id) {
  return top.document.getElementById(id);
}
function visible(elem) {
  return elem && elem.getClientRects().length !== 0;
}
let _player = {};
let youtube = {
  _player: null,
  prepare() {
    let player = get("movie_player");
    if (visible(player)) {
      _player = player;
      this._player = player;
      console.log("IniriLIZE ", player);
    }
  },
  play() {
    _player.playVideo();
  },
  pause() {
    console.log("_player is ", _player);
    _player.pauseVideo();
  },
  seek(sec) {
    _player.seekTo(sec, true);
  },
  isReady() {
    return true;
  },
  getTime() {
    return _player.getCurrentTime();
  },
  toggleFullscreen() {
    _player.toggleFullscreen();
  },
};

let inititalizer = () => {
  window.testPlayer = youtube;
  let init = () => {
    console.log("starting of init");
    youtube.prepare();
    if (_player) {
      console.log("Now can resolve", _player);
      return youtube;
    } else {
      console.log("set time out, searchig again.");
      setTimeout(init, 500);
    }
  };
  init();
};
inititalizer();
