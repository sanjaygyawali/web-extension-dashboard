<template>
  <div>HI</div>
</template>

<script>
import Peer from "simple-peer";
export default {
  created() {
    this.init();
  },
  methods: {
    init() {
      let peer1 = new Peer({ initiator: true });

      let peer2 = new Peer();

      peer1.on("signal", (data) => {
        // when peer1 has signaling data, give it to peer2 somehow
        peer2.signal(data);
      });

      peer2.on("signal", (data) => {
        // when peer2 has signaling data, give it to peer1 somehow
        peer1.signal(data);
      });

      peer1.on("connect", () => {
        // wait for 'connect' event before using the data channel
        peer1.send("hey peer2, how is it going?");
      });

      peer2.on("data", (data) => {
        // got a data channel message
        console.log("got a message from peer1: " + data);
      });
    },
  },
};
</script>

<style></style>
