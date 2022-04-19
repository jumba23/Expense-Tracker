const localStorageArray =
  JSON.parse(localStorage.getItem("localStorageArray")) || [];
const vendor = document.getElementById("location");
const description = document.getElementById("expenseDescription");
const date = document.getElementById("dateCharged");
const amount = document.getElementById("amountCharged");

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const expenseItem = {
    id: Date.now(),
    date: dateCorrectFormat(date.value),
    description: description.value,
    location: vendor.value,
    amount: amount.value,
  };
  addExpense(expenseItem);
  document.getElementById('form').reset()
});

function addExpense(expense) {
  renderExpense(expense);
  localStorageArray.push(expense);
  saveInLocalStorage(expense);
}

function saveInLocalStorage(expense) {
  localStorage.setItem("localStorageArray", JSON.stringify(localStorageArray));
}

function renderExpense(expense) {
  const table = document
    .getElementById("tableExpenses")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow(0);

  const amountCharged = expense.amount;
  const amountFormated =
    "$" + amountCharged.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  newRow.insertCell(0).textContent = expense.location;
  newRow.insertCell(1).textContent = expense.description;
  newRow.insertCell(2).textContent = expense.date;
  newRow.insertCell(3).textContent = amountFormated;

  const deleteButton = createDeleteButton(expense);
  newRow.appendChild(deleteButton);
}

function createDeleteButton(expense) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.setAttribute("id", "deleteButton");

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteRow(deleteButton,expense.id);
  });
  return deleteButton;
}

function deleteRow(deleteButton, id) {
  deleteButton.parentElement.remove();
  for (let i = 0; i < localStorageArray.length; i++) {
    if (localStorageArray[i].id === id) {
      localStorageArray.splice(i, 1);
      localStorage.setItem("localStorageArray", JSON.stringify(localStorageArray))
    }
  }
}

function dateCorrectFormat() {
  const date = document.getElementById("dateCharged").value.split("-");
  const day = date[2];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthFormated = months[date[1] - 1];
  const dateFormat = monthFormated + " - " + day;
  return dateFormat;
}

window.addEventListener('load', (e) => {
  e.preventDefault();
  localStorageArray.forEach((expense) => {
    renderExpense(expense);
  });
});
