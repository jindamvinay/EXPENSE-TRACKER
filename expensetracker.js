document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expenseForm");
  const expenseList = document.getElementById("expenseList");
  const totalExpense = document.getElementById("totalExpense");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function updateExpenseList() {
    expenseList.innerHTML = "";
    let total = 0;
    expenses.forEach(function (expense, index) {
      total += parseFloat(expense.amount);
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `
        ${expense.name}: ₹${expense.amount}
        <button type="button" class="close" aria-label="Close" data-index="${index}">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      expenseList.appendChild(li);
    });
    totalExpense.textContent = `Total Expense: ₹${total.toFixed(2)}`;
  }

  updateExpenseList();

  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const expenseName = document.getElementById("expenseName").value;
    const expenseAmount = document.getElementById("expenseAmount").value;
    expenses.push({ name: expenseName, amount: expenseAmount });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateExpenseList();
    expenseForm.reset();
  });

  expenseList.addEventListener("click", function (event) {
    if (event.target.tagName === "SPAN") {
      const index = event.target.parentNode.getAttribute("data-index");
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      updateExpenseList();
    }
  });
});
