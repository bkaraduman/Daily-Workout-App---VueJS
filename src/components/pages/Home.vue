<script>
import WorkoutItem from "../../components/shared/WorkoutItem";

export default {
  name: "Home",
  data: function() {
    return { date: "" };
  },
  components: { WorkoutItem },
  computed: {
    workouts() {
      return this.$store.state.account.workouts;
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    getNow: function() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      this.date = date;
    },
    fetchData() {
      this.getNow();

      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");

      let query = this.$route.query.date;

      if (query != null) {
        currentDateWithFormat = query;
      }
      console.log(currentDateWithFormat);
      this.$store.dispatch("fetchWorkouts", currentDateWithFormat).then(() => {
        this.date = currentDateWithFormat;
      });
    }
  }
};
</script>

<template>
  <main role="main">
    <section class="mt-4 mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <h3 class="font-weight-bold title text-center">
              <span class="logo-text">{{date}} Antrenmanları</span>
            </h3>
            <b-list-group>
              <workout-item
                v-for="(item, index) in workouts"
                :workoutSingle="item"
                :itemIndex="index"
              />
            </b-list-group>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.page-header h2 a span {
  color: #d9534f !important;
}
.page-header h2 a {
  color: #333;
}
</style>