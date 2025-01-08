// Initial item data
const items = [
    { id: 1, code: 'LPT001', name: 'Laptop', description: 'Core i5, 3rd generation', price: 30000 }
];

// Function to format a number as KES currency
function formatKES(amount) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
    }).format(amount);
}

// Function to load items into the page
function loadItems() {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = items.map(item => `
        <div class="item">
            <h3>${item.name}</h3>
            <p>Code: ${item.code}</p>
            <p>${item.description}</p>
            <p>Price: ${formatKES(item.price)}</p>
        </div>
    `).join('');
}

// Function to add a new item
function addItem(name, code, description, price) {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // Generate unique ID
    items.push({ id, code, name, description, price: parseFloat(price) });
    loadItems(); // Refresh the items list
}

// Handle add-item form submission
document.getElementById('add-item-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('item-name').value;
    const code = document.getElementById('item-code').value;
    const description = document.getElementById('item-description').value;
    const price = document.getElementById('item-price').value;

    if (name && code && description && price > 0) {
        addItem(name, code, description, price);
        this.reset(); // Clear the form
        alert('Item added successfully!');
    } else {
        alert('Please fill all fields with valid data.');
    }
});

// Load items when the page loads
window.onload = loadItems;

// Load items when the page loads
window.onload = loadItems;


// Format KES to display currency
function formatKES(amount) {
    return `KES ${parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

// Handle sales form submission
document.getElementById('sales-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const productId = document.getElementById('product').value; // Get the selected product's ID
    const quantity = parseInt(document.getElementById('quantity').value); // Get the quantity, parse it to integer

    // Find the item from the items array by matching the id
    const item = items.find(i => i.id === parseInt(productId));

    // Calculate total price if item is found
    const total = item ? item.price * quantity : 0;

    if (item && quantity > 0) {
        document.getElementById('sales-message').textContent = `Sale recorded for ${item.name} (Code: ${item.code})! Total: ${formatKES(total)}`;
    } else {
        document.getElementById('sales-message').textContent = 'Invalid sale details. Please ensure you have selected a valid product and entered a valid quantity.';
    }
});


// Handle purchase form submission
document.getElementById('purchase-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const productId = document.getElementById('purchase-product').value;
    const quantity = document.getElementById('purchase-quantity').value;

    const item = items.find(i => i.id == productId);
    const total = item ? item.price * quantity : 0;

    if (item && quantity > 0) {
        document.getElementById('purchase-message').textContent = `Purchase successful for ${item.name} (Code: ${item.code})! Total: ${formatKES(total)}`;
    } else {
        document.getElementById('purchase-message').textContent = 'Invalid purchase details.';
    }
});

// Handle payment form submission
document.getElementById('payment-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const method = document.querySelector('input[name="payment-method"]:checked')?.value;
    const amount = document.getElementById('amount').value;

    if (method && amount > 0) {
        document.getElementById('payment-message').textContent = `Payment of ${formatKES(amount)} using ${method} was successful!`;
    } else {
        document.getElementById('payment-message').textContent = 'Invalid payment details.';
    }
});
