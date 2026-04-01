// Import necessary modules and components from React and local files
import React, { createContext, useContext, useState, useEffect } from "react";
import { expenseSummaryData as summaryData, expenseData, expenseCategories as categoriesData} from "../data"; 

// Create a new context for the application
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [month, setMonth] = useState("2020-01");
  const [expenseSummaryData, setExpenseSummaryData] = useState(null);
  const [expenseDetailsData, setExpenseDetailsData] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState(null);
  const [expenseIdToBeDeleted, setExpenseIdToBeDeleted] = useState(null);

// Function to fetch expense categories from the API
const fetchExpenseCategories = async () => {
    setExpenseCategories(categoriesData.categories);
};

// Function to fetch expense and expense summary data
const fetchExpenseData = async () => {
    setExpenseSummaryData(summaryData);
    setTotalExpenses(expenseData.totalExpenses);
    setExpenseDetailsData(expenseData.expenses);
};

  //fetch expense and summary data on initial load and when the month changes
  useEffect(() => {
    fetchExpenseData();
  }, [month]);

  //fetch expense categories data when the month changes
  useEffect(() => { fetchExpenseCategories();}, []);

  return (
    <AppContext.Provider
      value={{
        month,
        expenseSummaryData,
        expenseDetailsData,
        totalExpenses,
        expenseCategories,
        expenseIdToBeDeleted,
        setMonth,
        setExpenseIdToBeDeleted,
        fetchExpenseData      
      }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext in other components
export const useAppContext = () => {
  return useContext(AppContext);
};