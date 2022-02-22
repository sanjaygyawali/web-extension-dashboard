<template>
  <q-page class="flex">
    <video-app></video-app>
    <rtc-connection></rtc-connection>
    <compact-tab></compact-tab>
    <background-image></background-image>

    <!-- <background-base></background-base> -->
  </q-page>
</template>

<script>
import BackgroundImage from "../components/molecules/BackgroundImage.vue";
import CompactTab from "../components/organisms/CompactTab";
// import BackgroundBase from "../components/organisms/BackgroundBase.vue";
import RtcConnection from "../components/organisms/RtcConnection.vue";
import VideoApp from "../components/organisms/VideoApp.vue";
export default {
  name: "PageIndex",
  components: {
    BackgroundImage,
    CompactTab,
    // BackgroundBase,
    RtcConnection,
    VideoApp,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
