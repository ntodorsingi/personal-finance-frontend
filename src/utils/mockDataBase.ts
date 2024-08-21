import rawData from './mockData.json';

interface User {
  id: number;
  username: string;
  password: string;
  currency: string;
  balance: number;
  created_at: Date;
}

interface Transaction {
  id: number;
  user_id: number;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  description: string;
  created_at: Date;
}

export const mockDatabase = {
  users: [] as User[],
  transactions: [] as Transaction[],
};

// Convert raw JSON data into the correct types
const convertToDatabaseFormat = () => {
  mockDatabase.users = rawData.users.map(user => ({
    ...user,
    created_at: new Date(user.created_at),
  }));

  mockDatabase.transactions = rawData.transactions.map(transaction => ({
    ...transaction,
    date: new Date(transaction.date),
    created_at: new Date(transaction.created_at),
    type: transaction.type as 'income' | 'expense',  // Ensure correct type
  }));
};

// Initialize the database with converted data
convertToDatabaseFormat();

// Example function to find a user by username
export const findUserByUsername = (username: string) => {
  return mockDatabase.users.find(user => user.username === username);
};

// Example function to add a new user
export const addUser = (username: string, password: string, currency: string) => {
  const newUser: User = {
    id: mockDatabase.users.length + 1,
    username,
    password,
    currency,
    balance: 0,
    created_at: new Date(),
  };
  mockDatabase.users.push(newUser);
  return newUser;
};
