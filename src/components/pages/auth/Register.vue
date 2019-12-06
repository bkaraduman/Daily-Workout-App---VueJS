<template>
  <div class="container margin50">
    <div class="row">
      <div id="textBox" class="mainbox col-md-6 col-sm-6 margin50">
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title" style="text-align:center;font-weight:600">
              <h5>Nedir Antrenman Günlüğü?</h5>
            </div>
          </div>
          <div class="panel-body">
            <p>Antrenman Günlüğü, sizin spor salonlarınızda yaptığınız antrenmanları kayıt altına alıp arşivlemenizi sağlar.</p>
            <p>Yaptığınız antrenmanları unutmamak ve spor yapan insanlarla paylaşmak adına yaptığınız antrenmanları kayıt altına alabilirsiniz.</p>
            <p>Böylelikle bundan seneler sonra gelip baktığınızda hangi tarihte hangi antrenmanı yaptığınızı kolaylıkla bulabilirsiniz.</p>
          </div>
        </div>
      </div>
      <div id="loginBox" class="mainbox col-md-6 col-sm-6 margin50">
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title" style="text-align:center;">Kayıt</div>
          </div>
          <div class="panel-body">
            <form @submit.prevent="onSubmit" class="form-horizontal">
              <div class="form-group">
                <label for="id_Username" class="control-label col-md-4 requiredField">
                  Kullanıcı Adınız
                  <span class="asteriskField">*</span>
                </label>
                <div class="controls col-md-8">
                  <input
                    @blur="$v.username.$touch()"
                    v-model="username"
                    type="text"
                    class="input-md form-control"
                    :class="{'is-invalid':$v.username.$error}"
                    placeholder="Kullanıcı adınızı giriniz"
                  />
                  <small
                    v-if="!$v.username.required"
                    class="form-text text-danger"
                  >Bu alan zorunludur..</small>
                </div>
              </div>
              <div class="form-group">
                <label for="id_As" class="control-label col-md-4 requiredField">
                  E-posta Adresiniz
                  <span class="asteriskField">*</span>
                </label>
                <div class="controls col-md-8">
                  <input
                    @blur="$v.email.$touch()"
                    v-model="email"
                    type="email"
                    class="input-md form-control"
                    :class="{'is-invalid':$v.email.$error}"
                    placeholder="E-posta adresinizi giriniz"
                  />
                  <small
                    v-if="!$v.email.required"
                    class="form-text text-danger"
                  >Bu alan zorunludur..</small>
                  <small
                    v-if="!$v.email.email"
                    class="form-text text-danger"
                  >Lütfen geçerli bir e-posta adresi yazınız ..</small>
                </div>
              </div>
              <div class="form-group">
                <label for="id_Password" class="control-label col-md-4 requiredField">
                  Şifre
                  <span class="asteriskField">*</span>
                </label>
                <div class="controls col-md-8">
                  <input
                    @blur="$v.password.$touch()"
                    v-model="password"
                    type="password"
                    class="input-md form-control"
                    placeholder="Şifreniz..."
                  />
                  <small
                    v-if="!$v.password.required"
                    class="form-text text-danger"
                  >Bu alan zorunludur..</small>
                  <small
                    v-if="!$v.password.minLength"
                    class="form-text text-danger"
                  >Lütfen şifreniz en az {{ $v.password.$params.minLength.min }} karakterden oluşsun..</small>
                </div>
              </div>
              <div class="button-container d-flex flex-column align-items-center">
                <button
                  type="submit"
                  :disabled="$v.$invalid"
                  class="btn btn-success btn-block mb-2"
                >Kayıt Ol</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: null,
      password: null,
      username: null
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("register", {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(response => {
          console.log(response);
          // this.$router.push("/")
        });
    }
  },
  validations: {
    username: {
      required      
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
};
</script>
<style>
.is-invalid {
  border: 1px solid red;
}
.margin50 {
  margin-top: 50px;
}
</style>