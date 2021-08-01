<template>
  <v-container>
    <v-btn class="warning my-5" @click="openPlaidClient" :disabled="loading">
      Link your accounts via Plaid
    </v-btn>
    <v-progress-circular
      indeterminate
      color="primary"
      v-if="loading"
    ></v-progress-circular>

    <v-card elevation="2" v-else>
      <v-card-title>Account Data</v-card-title>
      <v-list-item v-for="account in accounts" :key="account.account_id">
        <v-list-item-content>
          <v-list-item-title>{{ account.official_name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ account.account_id }}
          </v-list-item-subtitle>
          <v-list-item-title
            >Balance: {{ account.balances.current }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
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
      accounts: [],
      loading: false,
    }
  },
  methods: {
    async fetchLinkToken() {
      const response = await AuthenticationService.getPlaidToken()
      return response.data
    },
    async linkAccounts() {
      this.loading = true
      this.handler = Plaid.create({
        token: await this.fetchLinkToken(),
        onSuccess: async (publicToken, metadata) => {
          console.log(publicToken)
          console.log(metadata)
          // TODO: Use axios here, remember we won't have the same domain on production
          const accountQuery = await fetch(
            'http://localhost:5001/plaid-7344d/us-central1/exchangeToken',
            {
              method: 'POST',
              body: JSON.stringify({ publicToken }),
              headers: {
                'content-Type': 'application/json',
              },
            }
          )
          const { accounts } = await accountQuery.json()
          this.accounts = accounts
          this.loading = false
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
