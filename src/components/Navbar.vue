<template>
  <nav>
    <v-toolbar class="indigo accent-2">
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="user.loggedIn"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">Plaid</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="user.loggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined dark v-bind="attrs" v-on="on">
            <v-icon dark left>mdi-account-circle</v-icon>
            {{ user.data.displayName || user.data.email }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn class="indigo white--text" block @click="logout">
              Logout
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <span class="white--text" v-if="user.loggedIn">{{
        user.data.displayName || user.data.email
      }}</span> -->
    </v-toolbar>

    <v-navigation-drawer
      class="grey lighten-5"
      v-model="drawer"
      dark
      temporary
      app
      v-if="user.loggedIn"
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
            <v-list-item-title class="grey--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
export default {
  data() {
    return {
      drawer: false,
      items: [
        // { title: 'Profile', icon: 'mdi-account' },
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        // { title: 'Account', icon: 'mdi-account-box' },
        // { title: 'Admin', icon: 'mdi-gavel' },
        // { title: 'Content', icon: 'mdi-gavel', route: '/content' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  mounted() {
    console.log(this.user, 'f user')
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/login')
        })
    },
  },
}
</script>
