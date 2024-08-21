<template>
  <div class="home">
    <div class="home-container">
      <h1>Welcome to Your Personal Finance Tracker</h1>
      <p>Your account overview is ready. Start managing your finances now!</p>
      <div class="welcome-box">
        <h2>Current Overview</h2>
        <p v-if="balance !== null">Your current balance: ${{ balance.toFixed(2) }}</p>
        <p v-else>Loading balance...</p>
        <button class="add-transaction-button" @click="addTransaction">Add Transaction</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { findUserByUsername } from '@/utils/mockDataBase'; // Adjust the path as necessary

export default defineComponent({
  name: 'Home',
  setup() {
    const balance = ref<number | null>(null);

    // Fetch the balance of the logged-in user
    const fetchBalance = () => {
      const username = 'john_doe'; // Replace with actual logged-in user's username
      const user = findUserByUsername(username);
      if (user) {
        balance.value = user.balance;
      }
    };

    // Call fetchBalance when component is mounted
    onMounted(() => {
      fetchBalance();
    });

    const addTransaction = () => {
      // Functionality to add a transaction will be implemented later
      console.log('Add Transaction button clicked');
    };

    return {
      balance,
      addTransaction
    };
  }
});
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;
}

.home-container {
  max-width: 500px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
}

.welcome-box {
  background-color: #e0f7fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.welcome-box h2 {
  font-size: 20px;
  margin-top: 0;
  color: #00796b;
}

.welcome-box p {
  font-size: 16px;
  color: #00796b;
}

.add-transaction-button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-transaction-button:hover {
  background-color: #0056b3;
}
</style>
