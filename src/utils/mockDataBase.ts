// src/mockDatabase.ts

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
  
  // Functions for interacting with the mock database
  
  // Find user by username
  export const findUserByUsername = (username: string) => {
    return mockDatabase.users.find(user => user.username === username);
  };
  
  // Add a new user
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
  