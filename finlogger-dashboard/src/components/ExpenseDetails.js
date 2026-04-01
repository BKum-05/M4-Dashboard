import { Table, Col } from "react-bootstrap";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useState } from "react";
import { useExpenseModal } from "../context/ExpenseModalContext";

// Helper function to format date
function updateDateFormat(date) {
  const d1 = new Date(date);
  const month = d1.toLocaleString("en-us", { month: "short" });
  const day = d1.getDate();
  const dayOfWeek = d1.toLocaleString("en-us", { weekday: "short" });
  return `${month} ${day}, ${dayOfWeek}`;
}

function ExpenseDetails({ data }) {
  // Edit Expense function
  const { handleShow } = useExpenseModal();

  // Delete Expense modal state
  const [showDM, setShowDM] = useState(false);
  const [expenseIdToBeDeleted, setExpenseIdToBeDeleted] = useState(null);

  // Handle Edit button click
  const handleEdit = (event, expense) => {
    event.preventDefault(); // Prevent default anchor behavior
    handleShow("edit", expense); // Open modal in edit mode
  };

  // Handle Delete button click
  const handleDMShow = (event, expenseId) => {
    event.preventDefault();
    setShowDM(true);
    setExpenseIdToBeDeleted(expenseId);
  };

  // Close delete modal
  const handleDMClose = () => {
    setShowDM(false);
    setExpenseIdToBeDeleted(null);
  };

  // Delete expense (placeholder for now)
  const handleDelete = () => {
    console.log("Deleting expense ID:", expenseIdToBeDeleted);
    handleDMClose();
  };

  // Create table rows
  const tableItems = data.map((expense) => {
    return (
      <tr key={expense._id}>
        <td className="text-nowrap">{updateDateFormat(expense.date)}</td>
        <td>{expense.description}</td>
        <td>${expense.amount}</td>
        <td>
          <a
            href="#"
            className="me-2 edit expButton"
            onClick={(e) => handleEdit(e, expense)}
          >
            <img src="./images/edit.png" alt="Edit" />
          </a>
          <a
            href="#"
            className="delete"
            onClick={(e) => handleDMShow(e, expense._id)}
          >
            <img src="./images/delete.png" alt="Delete" />
          </a>
        </td>
      </tr>
    );
  });

  return (
    <Col md="8">
      <p className="heading">Expense Details</p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th width="31%">DATE</th>
            <th width="31%">DESCRIPTION</th>
            <th width="31%">AMOUNT</th>
            <th width="7%" className="editDeleteTd"></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </Table>

      {showDM && (
        <DeleteConfirmationModal
          showDM={showDM}
          handleDMClose={handleDMClose}
          handleDelete={handleDelete}
        />
      )}
    </Col>
  );
}

export default ExpenseDetails;