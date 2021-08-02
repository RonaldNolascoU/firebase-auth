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
                  Login to Plaid
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your username and password:</p>
              <v-form>
                <v-text-field
                  outline
                  label="Username"
                  type="text"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  outline
                  hide-details
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <!-- <v-btn color="info" flat>
                Forgot password?
              </v-btn> -->
              <!-- <v-spacer></v-spacer> -->
              <v-btn
                color="info"
                :large="$vuetify.breakpoint.smAndUp"
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              Don't have an account?
              <router-link :to="'/register'">Register</router-link>
            </p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      darkTheme: true,
      platformName: 'Platform name',
      password: null,
      email: null,
    }
  },
  methods: {
    async login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log('User Logged Successfully!', user)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log('Bad Login!')
        })
    },
  },
}
</script>
