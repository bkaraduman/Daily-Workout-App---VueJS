<script>
import { VueEditor } from "vue2-editor";

import {
  required,
  maxLength,
  numeric,
  between
} from "vuelidate/lib/validators";

export default {
  name: "NewWorkout",
  components: {
    VueEditor
  },
  data() {
    return {
      workoutType: 1,
      workout: null,
      workoutRate: null
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("saveWorkout", {
          workoutType: this.workoutType,
          workout: this.workout,
          workoutRate: this.workoutRate
        })
        .then(response => {
          console.log("resp: ", response);
        });
    }
  },
  validations: {
    workoutRate: {
      required,
      numeric,
      maxLength: maxLength(1),
      between: between(1, 5)
    },
    workout: {
      required,
      maxLength: maxLength(280)
    }
  },
  computed: {
    workoutTypes() {
      return this.$store.state.account.workoutTypes;
    }
  },
  created() {
    this.$store.dispatch("fetchWorkoutTypes").then(() => {
    });
  }
};
</script>
<template>
  <div class="container margin50">
    <form @submit.prevent="onSubmit" class="form-horizontal">
      <div class="form-group">
        <h2>Antrenman Ekle</h2>
      </div>
      <div class="form-group">
        <label for="workoutTypeId">Antrenman Tip</label>
        <select class="form-control" id="workoutTypeId" v-model="workoutType">
          <option v-for="item in workoutTypes" :value="item.ID">{{item.Title}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="workoutRate">Antrenman Verimliliği</label>
        <input
          v-model="workoutRate"
          @blur="$v.workoutRate.$touch()"
          class="input-md form-control"
          id="workoutRate"
          placeholder="1-2-3-4-5"
          style="margin-bottom: 10px"
          type="number"
        />
        <small v-if="!$v.workoutRate.required" class="form-text text-danger">Bu alan zorunludur..</small>
        <small
          v-if="!$v.workoutRate.maxLength"
          class="form-text text-danger"
        >Bu alan maksimum {{ $v.workoutRate.$params.maxLength.max }} karakterden oluşabilir..</small>
        <small
          v-if="!$v.workoutRate.numeric"
          class="form-text text-danger"
        >Bu alan karakterden oluşamaz..</small>
        <small
          v-if="!$v.workoutRate.between"
          class="form-text text-danger"
        >Bu alana sadece 1-5 arasında değer girilebilir..</small>
      </div>
      <div class="form-group">
        <label for="workout">Antrenman</label>
        <vue-editor v-model="workout" />

        <small v-if="!$v.workout.required" class="form-text text-danger">Bu alan zorunludur..</small>

        <small
          v-if="!$v.workout.maxLength"
          class="form-text text-danger"
        >Lütfen antrenman içeriğiniz maksimum {{ $v.workout.$params.maxLength.max }} karakterden oluşsun</small>
      </div>
      <input
        type="submit"
        :disabled="$v.$invalid"
        name="Save"
        value="Kaydet"
        class="btn btn-primary btn btn-success pull-right"
        id="submit-id-signup"
      />
    </form>
  </div>
</template>
<style>
.margin50 {
  margin-top: 50px;
  margin-bottom: 70px;
}
</style>