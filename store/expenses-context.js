import { createContext, useReducer } from 'react';

const data = [
  {
    id: '234',
    description: 'A pair of sneakers',
    amount: 120.12,
    date: new Date('2019-10-13'),
  },
  {
    id: '3222',
    description: 'A pair of socks',
    amount: 300.87,
    date: new Date('2022-01-11'),
  },
  {
    id: 'e2fwf3',
    description: 'Watch',
    amount: 600.23,
    date: new Date('2021-11-18'),
  },
  {
    id: 'sdfs3e4',
    description: 'Tablet',
    amount: 150.00,
    date: new Date('2022-02-17'),
  },
  {
    id: 'e5esr332',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-03-22'),
  },
  {
    id: 'ewfrwef2423254',
    description: 'A pair of journal',
    amount: 89.29,
    date: new Date('2022-01-02'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, data);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
