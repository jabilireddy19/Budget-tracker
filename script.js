// Initialize balance, income, and expense amounts
let balance = 0;
let income = 0;
let expense = 0;

// Get DOM elements
const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addTransactionBtn = document.getElementById('addTransactionBtn');

// Update the UI with current balance, income, and expense
function updateUI() {
    balanceDisplay.textContent = balance.toFixed(2);
    incomeDisplay.textContent = income.toFixed(2);
    expenseDisplay.textContent = expense.toFixed(2);
}

// Add a transaction
function addTransaction() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (description.trim() === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount');
        return;
    }

    // Create a new transaction element
    const transactionItem = document.createElement('li');
    transactionItem.textContent = `${description} - $${amount.toFixed(2)}`;

    if (amount > 0) {
        income += amount;
        transactionItem.classList.add('income-item');
    } else {
        expense += Math.abs(amount);
        transactionItem.classList.add('expense-item');
    }

    balance = income - expense;

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'x';
    deleteBtn.onclick = function () {
        removeTransaction(transactionItem, amount);
    };
    transactionItem.appendChild(deleteBtn);

    // Append the transaction item to the list
    transactionList.appendChild(transactionItem);

    // Clear inputs
    descriptionInput.value = '';
    amountInput.value = '';

    // Update the UI
    updateUI();
}

// Remove a transaction
function removeTransaction(transactionItem, amount) {
    if (amount > 0) {
        income -= amount;
    } else {
        expense -= Math.abs(amount);
    }
    balance = income - expense;

    // Remove the transaction from the list
    transactionItem.remove();

    // Update the UI
    updateUI();
}

// Event listener for adding a transaction
addTransactionBtn.addEventListener('click', addTransaction);

// Initial UI update
updateUI();
