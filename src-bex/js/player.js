function get(id) {
  return top.document.getElementById(id);
}
function visible(elem) {
  return elem && elem.getClientRects().length !== 0;
}
let _player = {};
let youtubeConfig = {
  _player: null,
  prepare() {
    let player = get("movie_player");
    if (visible(player)) {
      _player = player;
    }
  },
  play() {
    _player.playVideo();
  },
  pause() {
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
  return new Promise((resolve, reject) => {
    let player = youtubeConfig;
    console.log("Before init");
    let init = () => {
      console.log("starting of init");
      player.prepare();
      if (_player) {
        console.log("Now can resolve", player);
        youtubeConfig.pause();
        return player;
      } else {
        console.log("set time out, searchig again.");
        setTimeout(init, 500);
      }
    };
    resolve(init());
  });
};
export default {
  hello: "Test",
  inititalizer,
};
