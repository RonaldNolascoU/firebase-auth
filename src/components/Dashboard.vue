<template>
  <v-container>
    <v-card elevation="2" class="my-5 mb-5">
      <v-card-actions>Plaid Data. .</v-card-actions>
    </v-card>
    <v-card elevation="2">
      <v-card-title>Account Data</v-card-title>
      <v-card-subtitle>Balance</v-card-subtitle>
    </v-card>
    <v-btn class="warning my-5" @click="openPlaidClient">
      Link your accounts via Plaid
    </v-btn>
  </v-container>
</template>

<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data() {
    return {
      items: [
        { title: 'Profile', icon: 'mdi-account' },
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Account', icon: 'mdi-account-box' },
        { title: 'Admin', icon: 'mdi-gavel' },
        { title: 'Content', icon: 'mdi-gavel', route: '/content' },
      ],
      handler: null,
    }
  },
  methods: {
    async fetchLinkToken() {
      const response = await AuthenticationService.getPlaidToken()
      const { linkToken } = response.data
      return linkToken
    },
    async linkAccounts() {
      this.handler = Plaid.create({
        token: await this.fetchLinkToken(),
        onSuccess: async (publicToken, metadata) => {
          console.log(publicToken)
          console.log(metadata)
          // TODO: Use axios here, remember we won't have the same domain on production
          await fetch('/item/public_token/exchange', {
            method: 'POST',
            body: JSON.stringify({ publicToken }),
            headers: {
              'content-Type': 'application/json',
            },
          })
        },
        onExit: async (error, metadata) => {
          console.log(error)
          console.log(metadata)
        },
        onEvent: async (metadata) => {
          console.log(metadata)
        },
      })
    },
    async openPlaidClient() {
      await this.linkAccounts()
      this.handler.open()
    },
  },
}
</script>
