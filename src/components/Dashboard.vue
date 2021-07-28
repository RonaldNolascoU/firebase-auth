<template>
  
  <v-container>
    <v-card
      elevation="2"
      class="my-5 mb-5"
    >
      <v-card-actions>Plaid Data. .</v-card-actions>
    </v-card>
    <v-card
      elevation="2"
    >
      <v-card-title>Account Data</v-card-title>
      <v-card-subtitle>Balance</v-card-subtitle>
    </v-card>
    <v-btn class="warning my-5">
      Link your accounts via Plaid
    </v-btn>
  </v-container>
  
</template>
<script>
  const Plaid = require('plaid');
  const JQuery = require ('jquery');
  window.$ = JQuery;
  export default {
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

    mounted () {
      (async ($) => {
      const fetchLinkToken = async () => {
          const response = await fetch('/link/token/create', {
            method: 'POST',
          });
          const { linkToken } = await response.json();
          return linkToken;
        };

        const handler = Plaid.create({
          token: await fetchLinkToken(),
          onSuccess: async (publicToken, metadata) => {
            console.log(publicToken);
            console.log(metadata);
            await fetch('/item/public_token/exchange', {
              method: 'POST',
              body: JSON.stringify({publicToken}),
              headers: {
                'content-Type': 'application/json'
              },
            });
          },
          onExit: async (error, metadata) => {
            console.log(error);
            console.log(metadata);
          },
          onEvent: async (metadata) => {
            console.log(metadata);
          }
        });

        $('#plaid-button').on('click', function(e) { handler.open() });

    })(JQuery);
  }
}
</script>