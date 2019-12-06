
<script>
import AppHeader from "./components/shared/AppHeader";
import AppFooter from "./components/shared/AppFooter";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  },
  components: {
    AppHeader,
    AppFooter
  },
  created() {
    this.$store.dispatch("initAuth");
  }
};
</script>
<template>
  <div id="app">
    <div id="main-wrapper">
      <app-header/>
      <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
      <router-view />
    </div>
    <app-footer />
  </div>
</template>
<style>
.alert {
  text-align: center;
}
</style>