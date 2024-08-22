<template>
  <div class="dashboard-container">
    <div class="balance-summary">
      <h2>Balance: {{ balance.toFixed(2) }} USD</h2>
    </div>
    <div class="filters">
      <label>
        <input type="checkbox" v-model="showExpenses" />
        Show Expenses
      </label>
      <label>
        <input type="checkbox" v-model="showIncome" />
        Show Income
      </label>
      <label>
        Sort by Date:
        <select v-model="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
    <div class="transaction-list">
      <div v-if="filteredTransactions.length === 0">No transactions found.</div>
      <ul>
        <li v-for="transaction in filteredTransactions" :key="transaction.id" :class="transaction.type">
          <span>{{ transaction.date.toLocaleDateString() }}</span>
          <span>{{ transaction.category }}</span>
          <span :class="{ income: transaction.type === 'income', expense: transaction.type === 'expense' }">
            {{ transaction.amount.toFixed(2) }} USD
          </span>
          <span>{{ transaction.description }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { findUserByUsername, mockDatabase } from '../utils/mockDataBase';

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const username = 'john_doe'; // Replace with dynamic username retrieval
    const user = findUserByUsername(username);

    const transactions = ref(user ? mockDatabase.transactions.filter(tx => tx.user_id === user.id) : []);
    const showExpenses = ref(true);
    const showIncome = ref(true);
    const sortOrder = ref('asc');

    const filteredTransactions = computed(() => {
      let result = transactions.value.filter(tx => {
        if (tx.type === 'expense') return showExpenses.value;
        if (tx.type === 'income') return showIncome.value;
        return false;
      });

      result = result.sort((a, b) => {
        if (sortOrder.value === 'asc') return a.date.getTime() - b.date.getTime();
        return b.date.getTime() - a.date.getTime();
      });

      return result;
    });

    const balance = computed(() => {
      return transactions.value.reduce((sum, tx) => {
        return tx.type === 'income' ? sum + tx.amount : sum - tx.amount;
      }, 0);
    });

    return {
      balance,
      filteredTransactions,
      showExpenses,
      showIncome,
      sortOrder
    };
  }
});
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.balance-summary {
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: #333;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filters label {
  margin-right: 20px;
}

.filters select {
  margin-left: 10px;
}

.transaction-list {
  list-style-type: none;
  padding: 0;
}

.transaction-list ul {
  padding: 0;
  list-style-type: none;
}

.transaction-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.transaction-list li.income {
  color: #28a745;
}

.transaction-list li.expense {
  color: #dc3545;
}

.transaction-list span {
  flex: 1;
}
</style>
