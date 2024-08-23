<template>
    <div class="account-details-container">
      <div class="chart-row">
        <PieChart
          :data="expensesVsIncomeData"
          :labels="['Expenses', 'Income']"
          title="Expenses vs Income"
        />
      </div>
      <div class="chart-row">
        <PieChart
          :data="expensesByCategoryData"
          :labels="expenseCategories"
          title="Expenses by Category"
        />
        <PieChart
          :data="incomesByCategoryData"
          :labels="incomeCategories"
          title="Income by Category"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import PieChart from '../components/PieChart.vue';
  import { getTransactionsByUserId, findUserByUsername } from '../utils/mockDataBase';
  
  export default defineComponent({
    name: 'AccountDetails',
    components: {
      PieChart
    },
    setup() {
      const username = 'john_doe'; // Replace with actual logged-in user's username
      const user = findUserByUsername(username);
      const transactions = user ? getTransactionsByUserId(user.id) : [];
  
      const expenses = transactions.filter(transaction => transaction.type === 'expense');
      const incomes = transactions.filter(transaction => transaction.type === 'income');
  
      const totalExpenses = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
      const totalIncome = incomes.reduce((sum, transaction) => sum + transaction.amount, 0);
  
      const expenseCategories = Array.from(new Set(expenses.map(transaction => transaction.category)));
      const incomeCategories = Array.from(new Set(incomes.map(transaction => transaction.category)));
  
      const expensesByCategoryData = expenseCategories.map(category => 
        expenses.filter(transaction => transaction.category === category)
                .reduce((sum, transaction) => sum + transaction.amount, 0)
      );
  
      const incomesByCategoryData = incomeCategories.map(category => 
        incomes.filter(transaction => transaction.category === category)
               .reduce((sum, transaction) => sum + transaction.amount, 0)
      );
  
      return {
        expensesVsIncomeData: [totalExpenses, totalIncome],
        expensesByCategoryData,
        incomesByCategoryData,
        expenseCategories,
        incomeCategories
      };
    }
  });
  </script>
  
  <style scoped>
  .account-details-container {
    max-width: 1000px;
    margin: auto;
    padding: 20px;
  }
  
  .chart-row {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  </style>
  