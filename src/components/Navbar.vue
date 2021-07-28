<template>
  <nav>
    <v-toolbar class="indigo accent-2">
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">Plaid</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="login" class="white--text mr-2">Login</router-link>
      <router-link to="register" class="white--text mr-2">Register</router-link>
      <v-btn class="info">
        <span>Sync</span>
        
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      class="grey lighten-5"
      dark
      permanent
      app
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon class="grey lighten-1">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="grey--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn class="indigo" block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
    }
  },
  data () {
      return {
        items: [
          { title: 'Profile', icon: 'mdi-account' },
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Account', icon: 'mdi-account-box' },
          { title: 'Admin', icon: 'mdi-gavel' },
          { title: 'Content', icon: 'mdi-gavel', route: '/content' },
        ],
      }
    },
};
</script>