<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
    <router-link to="/" class="navbar-brand font-weight-bolder mr-3">
      <img src="../../assets/logo48x48.png" />
      <!-- <h1 class="font-weight-bold title">
        <span class="logo-text">Antrenman</span>Günlüğü
      </h1>-->
    </router-link>
    <button
      class="navbar-light navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsDefault"
      aria-controls="navbarsDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsDefault">
      <ul class="navbar-nav mr-auto align-items-center">
        <date-picker v-model="date" :config="options" @dp-change="triggerSearch"></date-picker>
      </ul>
      <ul class="navbar-nav ml-auto align-items-center" :class="loginClass">
        <router-link to="/login" tag="li" class="nav-item">
          <a class="nav-link" href="javascript:void(0)">
            <i class="fa fa-sign-in"></i>&nbsp;Giriş Yap
          </a>
        </router-link>
        <router-link to="/register" tag="li" class="nav-item">
          <a class="nav-link" href="javascript:void(0)">
            <i class="fa fa-user-plus"></i>&nbsp;Kayıt Ol
          </a>
        </router-link>
      </ul>
      <ul class="navbar-nav ml-auto align-items-center" :class="logoutClass">
        <router-link to="/yeni-antrenman" tag="li" class="nav-item">
          <a class="nav-link" href="javascript:void(0)">
            <i class="fa fa-plus"></i>&nbsp;Yeni Antrenman
          </a>
        </router-link>
        <router-link to="/antrenmanlarim" tag="li" class="nav-item">
          <a class="nav-link" href="javascript:void(0)">
            <i class="fa fa-user"></i>&nbsp;Antrenmanlarım
          </a>
        </router-link>
        <li class="nav-item">
          <a href="#!" class="nav-link" @click.prevent="logout">
            <i class="fa fa-sign-out"></i>&nbsp;Çıkış Yap
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      options: {
        format: "YYYY-MM-DD",
        useCurrent: false
      }
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    triggerSearch() {
      this.$router.push("/?date=" + this.date).catch(err => {});
    }
  },
  computed: {
    logoutClass() {
      return {
        "d-none": !this.$store.getters.isAuthenticated
      };
    },
    loginClass() {
      return {
        "d-none": this.$store.getters.isAuthenticated
      };
    }
  }
};
</script>
<style>
.d-none {
  display: none !important;
}
</style>