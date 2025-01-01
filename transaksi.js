document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();
});

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    // Mengambil nilai dari form
    const transactionName = document.getElementById('transaction-name').value;
    const amount = document.getElementById('amount').value;
    const price = document.getElementById('price').value; // Ambil nilai harga
    const category = document.getElementById('category').value;

    // Menyimpan transaksi ke local storage
    saveTransaction(transactionName, amount, price, category); // Tambahkan parameter harga

    // Mengosongkan form setelah disimpan
    document.getElementById('transaction-form').reset();

    // Memuat ulang daftar transaksi
    loadTransactions();
});

function saveTransaction(name, amount, price, category) {
    let formattedPrice = parseFloat(price).toLocaleString('id-ID'); // Format harga dengan titik desimal
    
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
    
    // Kosongkan tabel sebelum memuat ulang
    tableBody.innerHTML = '';

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach((transaction, index) => {
        const newRow = tableBody.insertRow();
        
        const cellName = newRow.insertCell(0);
        const cellAmount = newRow.insertCell(1);
        const cellPrice = newRow.insertCell(2); // Sel untuk harga
        const cellCategory = newRow.insertCell(3);
        const cellAction = newRow.insertCell(4); // Sel untuk aksi
        
        cellName.textContent = transaction.name;
        cellAmount.textContent = transaction.amount;
        cellPrice.textContent = transaction.price; // Tampilkan harga
        cellCategory.textContent = transaction.category;

        // Membuat tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            deleteTransaction(index); // Panggil fungsi hapus dengan indeks
        };
        
        cellAction.appendChild(deleteButton); // Tambahkan tombol ke sel aksi
    });
}

function deleteTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // Hapus transaksi berdasarkan indeks
    transactions.splice(index, 1);
    
    // Simpan kembali ke local storage
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Muat ulang daftar transaksi setelah penghapusan
    loadTransactions();
}
