<template>
  <v-app
    :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }"
    :dark="darkTheme"
    id="inspire"
  >
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  {{ platformName }}
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <v-form @submit.prevent="submit">
                <v-text-field
                  outline
                  label="Name"
                  type="text"
                  v-model="form.name"
                ></v-text-field>
                <v-text-field
                  outline
                  label="Email"
                  type="text"
                  v-model="form.email"
                ></v-text-field>
                <v-text-field
                  outline
                  hide-details
                  label="Password"
                  type="password"
                  v-model="form.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn color="info" text @click="submit()">
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              Already have an account?
              <router-link :to="'/login'">Login</router-link>
            </p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import firebase from 'firebase'
import store from '../store'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      error: null,
      darkTheme: true,
      platformName: 'Register',
      password: null,
      email: null,
    }
  },
  methods: {
    async submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user
          console.log(user, 'user')
          this.$router.push('dashboard')
          // ...
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
          // ..
        })
    },
  },
}
</script>
