<script>
export default {
  name: "WorkoutItem",
  props: {
    workoutSingle: {
      type: Object,
      required: true
    },
    itemIndex: {
      type: Number,
      required: true
    }
  }
};
</script>
<template>
  <b-list-group-item>
    <h4>{{workoutSingle.Title}}</h4>
    <p v-html="workoutSingle.Text"></p>
    <p>
      <small class="text-muted pull-right">
        <i class="fa fa-user"></i>
        {{workoutSingle.Username}} / 
        <i class="fa fa-calendar"></i>
        {{workoutSingle.WorkoutDate}}
      </small>
    </p>
  </b-list-group-item>
</template>