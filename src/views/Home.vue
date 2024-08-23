<template>
  <div class="home-container">
    <div class="balance-summary">
      <h2>Balance: {{ balance.toFixed(2) }} USD</h2>
    </div>
    <div class="transaction-form">
      <h3>Add New Transaction</h3>
      <form @submit.prevent="handleAddTransaction">
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" v-model="newTransaction.amount" />
          <div v-if="errors.amount" class="error-message">{{ errors.amount }}</div>
        </div>
        <div class="form-group">
          <label for="type">Type</label>
          <select id="type" v-model="newTransaction.type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <div v-if="errors.type" class="error-message">{{ errors.type }}</div>
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <input type="text" id="category" v-model="newTransaction.category" />
          <div v-if="errors.category" class="error-message">{{ errors.category }}</div>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" id="description" v-model="newTransaction.description" />
        </div>
        <button type="submit" class="submit-button">Add Transaction</button>
      </form>
    </div>
    <router-link to="/dashboard">Go to Dashboard</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { findUserByUsername, addTransaction, mockDatabase } from '../utils/mockDataBase';

export default defineComponent({
  name: 'Home',
  setup() {
    const username = 'john_doe'; // Replace with actual logged-in user's username
    const user = findUserByUsername(username);

    const transactions = ref(user ? mockDatabase.transactions.filter(tx => tx.user_id === user.id) : []);
    
    const newTransaction = ref({
      amount: 0,
      type: 'income' as 'income' | 'expense',
      category: '',
      description: ''
    });

    const errors = ref({
      amount: '',
      type: '',
      category: ''
    });

    const balance = computed(() => {
      return transactions.value.reduce((sum, tx) => {
        return tx.type === 'income' ? sum + tx.amount : sum - tx.amount;
      }, 0);
    });

    const handleAddTransaction = () => {
      errors.value = {
        amount: '',
        type: '',
        category: ''
      };

      if (newTransaction.value.amount <= 0) {
        errors.value.amount = 'Amount must be greater than zero.';
      }
      if (!newTransaction.value.type) {
        errors.value.type = 'Type is required.';
      }
      if (!newTransaction.value.category) {
        errors.value.category = 'Category is required.';
      }

      if (Object.values(errors.value).every(error => !error)) {
        if (user) {
          const transaction = {
            amount: newTransaction.value.amount,
            type: newTransaction.value.type,
            category: newTransaction.value.category,
            description: newTransaction.value.description,
            id: mockDatabase.transactions.length + 1,
            date: new Date(),
            created_at: new Date(),
            user_id: user.id,
          };

          addTransaction(user.id, transaction);
          transactions.value.push(transaction); // Update local transactions

          // Reset the form
          newTransaction.value = {
            amount: 0,
            type: 'income',
            category: '',
            description: ''
          };

          alert('Transaction added successfully!');
        }
      }
    };

    return {
      balance,
      newTransaction,
      errors,
      handleAddTransaction
    };
  }
});
</script>

<style scoped>
.home-container {
  max-width: 600px;
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
  font-size: 28px;
  color: #333;
  font-weight: bold;
}

.transaction-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

input, select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.error-message {
  color: #ff4d4d;
  font-size: 14px;
  margin-top: 5px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.dashboard-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
}

.dashboard-link:hover {
  text-decoration: underline;
}
</style>
