<template>
  <v-app>
    <navbar></navbar>
    <v-content class="mx-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import navbar from "./components/Navbar";
export default {
  name: 'App',
  
  components: {
    navbar

  },

  data: () => ({
    //
  }),
}
</script>
