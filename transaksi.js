document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();
});
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const transactionName = document.getElementById('transaction-name').value;
    const amount = document.getElementById('amount').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    saveTransaction(transactionName, amount, price, category);
    document.getElementById('transaction-form').reset();
    loadTransactions();
});

function saveTransaction(name, amount, price, category) {
    let formattedPrice = parseFloat(price).toLocaleString('id-ID');
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({ 
        name,
        amount,
        price: formattedPrice,
        category 
     });
     
     localStorage.setItem('transactions', JSON.stringify(transactions));
 }

function loadTransactions() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach((transaction, index) => {
        const newRow = tableBody.insertRow();
        const cellName = newRow.insertCell(0);
        const cellAmount = newRow.insertCell(1);
        const cellPrice = newRow.insertCell(2);
        const cellCategory = newRow.insertCell(3);
        const cellAction = newRow.insertCell(4);
        cellName.textContent = transaction.name;
        cellAmount.textContent = transaction.amount;
        cellPrice.textContent = transaction.price;
        cellCategory.textContent = transaction.category;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            deleteTransaction(index);
        };
        cellAction.appendChild(deleteButton);
    });
}

function deleteTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    loadTransactions();
}
