<template>
  <div>
    {{ player }}
    <div id="player"></div>
  </div>
</template>

<script>
export default {
  created() {
    this.initPlayer();
  },
  data() {
    return {
      player: player,
    };
  },
  mounted() {
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },
  methods: {
    initPlayer() {
      this.player.load("0tDGI2IPv5Q");
      // player.setVolume(100);
      // this.player.on("playing", () => {
      //   console.log(this.player.getDuration());
      // });
    },
  },
};
</script>

<style></style>
