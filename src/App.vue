<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      drawerIsOpen: false,
    };
  },
  methods: {
    drawerToggled() {
      this.$q.bex
        .send("wb.drawer.toggle", {
          open: this.drawerIsOpen, // So it knows to make it bigger / smaller
        })
        .then((r) => {
          // Only set this once the promise has resolved so we can see the entire slide animation.
          this.drawerIsOpen = !this.drawerIsOpen;
        });
    },
  },
};
</script>
