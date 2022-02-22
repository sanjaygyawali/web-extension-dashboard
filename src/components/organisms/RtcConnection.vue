<template>
  <div>
    <label for="">id</label> -
    <input type="text" v-model="peerId" />
    <br />
    <label for="">Server ?</label> -
    <input type="checkbox" v-model="server" />
    <br />
    <label for="">slide</label>
    <input
      @change="changeSlider"
      type="range"
      min="1"
      v-model="range"
      max="100"
    />
    <span>{{ range }}</span>
    <br />
    <button @click="start">Start Server</button>
    <button @click="join">Join To Server.</button>
    <span> Status:: {{ status }} </span>
    <input type="text" v-model="content" />
    <button @click="sendDataContent">Send Content</button>
    <pre>
      {{ dataContent }}
    </pre>
  </div>
</template>

<script>
import Peer from "peerjs";
const randomString = "sanjay0011";

export default {
  data() {
    return {
      range: 1,
      client: false,
      server: false,
      lastPeerId: null,

      recvevId: "",
      status: [],
      message: "",

      connectionId: "",
      ////////////////////////////....//.../....//
      content: "",
      dataContent: [],
      peer: null,
      peerId: null,
      conn: null,
      opponent: {
        peerId: null,
      },
      turn: false,
      ended: false,
    };
  },
  created() {
    this.autoSlide();
  },
  methods: {
    changeSlider(value) {
      this.conn.send({
        type: "slide",
        value: this.range,
      });
    },
    autoSlide() {
      setInterval(() => {
        this.range++;
      }, 1000);
    },
    sendDataContent() {
      console.log("send connetction", this.content);
      this.conn.send(this.content);
    },
    sliderChange(value) {
      this.conn.send({
        type: "slide",
        value: value,
      });
    },
    begin() {
      this.conn.on("data", (data) => {
        if (data.type == "slide") {
          this.range = data.value;
        } else {
          this.dataContent.push(data);
        }

        console.log("Received Data", data);
      });
      this.conn.on("close", (_) => {
        this.turn = false;
      });
      this.peer.on("error", (_) => {
        alert("" + err);
        this.turn = false;
      });
    },
    process() {},
    ping() {
      // console.log("PING");
      this.peer.socket.send({
        type: "ping",
      });
      setTimeout(this.ping, 16000);
    },

    initialize() {
      this.peer = new Peer("", { debug: 3 });

      this.peer.on("error", (err) => {
        alert("" + err);
      });
      this.ping();
    },
    start() {
      this.initialize();
      this.peer.on("open", (id) => {
        this.peerId = id;
      });
      this.peer.on("open", (_) => {
        console.log("JOIN using this id ", this.peerId);
        // alert("join using this i d" + this.peerId);
      });
      this.peer.on("connection", (c) => {
        if (this.conn) {
          c.close();
          return;
        }
        this.conn = c;
        this.turn = true;
        this.begin();
      });
    },
    join() {
      this.client = true;
      this.initialize();
      this.peer.on("open", (id) => {
        this.conn = this.peer.connect(this.peerId, {
          reliable: true,
        });
        this.conn.on("open", (_) => {
          this.opponent.peerId = this.peerId;
          this.begin();
        });
      });
    },
  },
};
</script>

<style></style>
