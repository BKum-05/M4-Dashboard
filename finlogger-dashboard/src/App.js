import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Overview from './components/Overview';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseDetails from "./components/ExpenseDetails";

import { ExpenseModalProvider } from './context/ExpenseModalContext';
import { Container, Row } from 'react-bootstrap';

import { user, expenseSummaryData, expenseData } from './data'; // Added expenseData
import { AppProvider, useAppContext } from './context/AppContext';

// AppContent component
function AppContent() {
  const { month, totalExpenses, setMonth } = useAppContext();

  // Get the expense details from expenseData
  const expenseDetailsData = expenseData.expenses;

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    // optionally, update related data here
  };

  return (
    <div className="App">
      <Header />
      <ExpenseModalProvider>
        <Container fluid="lg">
          <div>
            <Overview month={month} handleMonthChange={handleMonthChange}
              totalExpenses={totalExpenses} userIncome={user.income} />
          </div>
          <Row className="tbl-container">

            {/* render ExpenseSummary if expenseSummaryData data exists*/}
            {expenseSummaryData ? (
              <ExpenseSummary data={expenseSummaryData} />
            ) : (
              <div>Loading Expense Summary data...</div>
            )}
            {/* render ExpenseDetails if expenseDetailsData data exists*/}
            {expenseDetailsData ? (
              <ExpenseDetails data={expenseDetailsData} />
            ) : (
              <div>Loading Expense Details data...</div>
            )}

          </Row>
        </Container>
      </ExpenseModalProvider>
    </div>
  );
}

// App component
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;