<template>
  <v-container>
    <v-btn class="warning my-5" @click="openPlaidClient" :disabled="loading">
      Link your accounts via Plaid
    </v-btn>

    <v-card elevation="2">
      <v-card-title>Account Data</v-card-title>
      <v-card-subtitle v-if="accounts.length == 0">No accounts</v-card-subtitle>
      <v-card-subtitle v-if="error"> {{ error }}</v-card-subtitle>
      <v-progress-circular
        class="d-flex m-auto"
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-circular>
      <div v-else>
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
      </div>
    </v-card>

    <v-card elevation="2" class="mt-5">
      <v-card-title>Transactions </v-card-title>
      <v-card-subtitle v-if="error"> {{ error }}</v-card-subtitle>
      <v-card-subtitle v-if="transactions.length == 0"
        >No transactions</v-card-subtitle
      >
      <v-progress-circular
        class="d-flex m-auto"
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-circular>
      <div v-else>
        <v-list-item
          v-for="transaction in transactions"
          :key="transaction.transaction_id"
        >
          <v-list-item-content>
            <v-list-item-title>Name: {{ transaction.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ transaction.transaction_id }}
            </v-list-item-subtitle>
            <v-list-item-title
              >Amount: {{ transaction.amount }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card>
  </v-container>
</template>

<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { mapGetters } from 'vuex'
import firebase from 'firebase'
export default {
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  data() {
    return {
      items: [
        // { title: 'Profile', icon: 'mdi-account' },
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        // { title: 'Account', icon: 'mdi-account-box' },
        // { title: 'Admin', icon: 'mdi-gavel' },
        // { title: 'Content', icon: 'mdi-gavel', route: '/content' },
      ],
      handler: null,
      accounts: [],
      transactions: [],
      loading: false,
      error: null,
    }
  },
  async mounted() {
    await this.getAccounts()
    await this.getTransactions()
  },
  methods: {
    async fetchLinkToken() {
      const response = await AuthenticationService.getPlaidToken({
        user: this.user,
      })
      return response.data
    },
    async linkAccounts() {
      this.loading = true
      this.handler = Plaid.create({
        token: await this.fetchLinkToken(),
        onSuccess: async (publicToken, metadata) => {
          await AuthenticationService.exchangeToken({
            publicToken,
            id: this.user.data.id,
          })
            .then((result) => {
              const { accounts, transactions } = result.data
              this.accounts = accounts
              this.transactions = transactions
              this.loading = false
              this.error = null
            })
            .catch((err) => {
              console.log(err, 'error')
              this.loading = false
              this.error = err
              this.accounts = []
              this.transactions = []
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
    async getAccounts() {
      const collection = await firebase
        .firestore()
        .collection('/accounts')
        .where('user_id', '==', this.user.data.id)
      collection.get().then((snapshot) => {
        console.log(snapshot, 'snapshot a')
        snapshot.forEach((doc) => {
          this.accounts.push(doc.data())
        })
      })
    },
    async getTransactions() {
      console.log(this.user.data.id)
      const collection = await firebase
        .firestore()
        .collection('/transactions')
        .where('user_id', '==', this.user.data.id)
      collection.get().then((snapshot) => {
        console.log(snapshot, 'snapshot t')
        snapshot.forEach((doc) => {
          this.transactions.push(doc.data())
        })
      })
    },
  },
}
</script>
