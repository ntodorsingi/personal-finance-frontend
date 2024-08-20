<template>
  <div class="home">
    <h1>Welcome to Personal Finance App</h1>
    <p>This is your home dashboard where you can manage your accounts and transactions.</p>

    <div class="account-summary">
      <h2>Account Summary</h2>
      <ul>
        <li v-for="account in accounts" :key="account.id">
          <strong>{{ account.name }}:</strong> {{ account.balance }} {{ account.currency }}
        </li>
      </ul>
    </div>

    <div class="recent-transactions">
      <h2>Recent Transactions</h2>
      <ul>
        <li v-for="transaction in recentTransactions" :key="transaction.id">
          <strong>{{ transaction.type }}:</strong> {{ transaction.amount }} {{ transaction.currency }} 
          - {{ transaction.category }} on {{ transaction.date }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Home',
  data() {
    return {
      accounts: [],
      recentTransactions: []
    };
  },
  methods: {
    fetchAccounts() {
      // Pretpostavimo da koristite Axios za HTTP zahteve
      this.$http.get('/api/accounts')
        .then(response => {
          this.accounts = response.data;
        })
        .catch(error => {
          console.error("Error fetching accounts:", error);
        });
    },
    fetchRecentTransactions() {
      this.$http.get('/api/transactions/recent')
        .then(response => {
          this.recentTransactions = response.data;
        })
        .catch(error => {
          console.error("Error fetching transactions:", error);
        });
    }
  },
  mounted() {
    this.fetchAccounts();
    this.fetchRecentTransactions();
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.account-summary, .recent-transactions {
  margin-top: 20px;
}

h2 {
  color: #2c3e50;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>