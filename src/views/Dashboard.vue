<template>
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <AccountSummary />
      <Charts />
      <TransactionList />
      <Pagination />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import AccountSummary from '@/components/AccountSummary.vue';
  import Charts from '@/components/Charts.vue';
  import TransactionForm from '@/components/TransactionForm.vue';
  import Pagination from '@/components/Pagination.vue';
  
  export default {
    components: {
      Navbar,
      AccountSummary,
      Charts,
      TransactionForm,
      Pagination,
    },
  };
  </script>
  