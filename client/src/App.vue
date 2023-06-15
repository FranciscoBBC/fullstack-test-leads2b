<template>
  <div id="app">
    <Navbar />
    <Sidebar />

    <div class="authenticated-view" v-if="isAuthenticated">
      <router-view />
    </div>

    <div v-if="!isAuthenticated">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  created() {
    this.$store.dispatch("restoreSession");
  },
};
</script>

<style lang="scss">
@import "./assets/styles/template";
</style>
