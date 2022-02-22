<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer @hide="onHide" show-if-above v-model="left" side="left" bordered>
      <div>
        <button @click="play">Play</button>
        <button @click="pause">Pause</button>
        <button @click="getCurrentTime">Time</button>
      </div>
    </q-drawer>

    <q-page-container>
      <button @click="toggleSidebar">toggle</button>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
      loading: false,
      currentTabInfo: null,
      player: {
        youtube: false,
      },
      playerContext: null,
      payerDoc: null,
      splayer: null,
    };
  },
  async created() {
    await this.checkPage();
    this.$bex.on("onPlay", (event) => {
      console.log("event triggered onb play us ", event);
    });
  },
  methods: {
    onHide() {
      let data = this.$q.bex.send("wb.drawer.toggle", { open: false });
    },
    async toggleSidebar() {
      this.left = !this.left;
      if (this.left) {
        let data = this.$q.bex.send("wb.drawer.toggle", { open: true });
        await this.getPlayer();
      }
    },
    async checkPage() {
      let { data } = await this.$q.bex.send("getCurrentTabInfo");
      this.currentTabInfo = data;
      if (this.currentTabInfo.url.startsWith("https://www.youtube.com")) {
        this.player.youtube = true;
      } else {
        this.player.youtube = false;
      }
      await this.extractPageContext();
    },
    async extractPageContext() {
      this.loading = true;
      try {
        let data = await this.$q.bex.send("c:getYoutubePlayer");
        this.playerContext = data;
      } catch (e) {
        this.loading = e;
      }
      this.loading = false;
    },
    async getPlayer() {
      let playerDocs = this.$q.bex.send("getPlayer").then((response) => {
        // this.splayer = playerDocs.data;
        debugger;
        // this.$q.bex.off("getPlayer");
        // debugger;
      });
    },
    async fireEvent(key, params) {
      if (key == "play") {
        await this.$q.bex.send("playVideo");
      } else if (key == "pause") {
        await this.$q.bex.send("pauseVideo");
      }
      // return await this.$q.bex.send("fireEventOnPlayer", {
      //   key: key,
      //   params: params,
      // });
    },
    async play() {
      await this.fireEvent("play");
    },
    async pause() {
      await this.fireEvent("pause");
    },
    sync() {
      // todo sync with multiple.
    },
    getCurrentTime() {},
  },
};
</script>

<style></style>
