

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function showCart() {
    loadCart();
    let cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} - Quantity: ${item.quantity}`;
        
        let addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => increaseQuantity(item.id));
        
        let removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => decreaseQuantity(item.id));
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', () => removeFromCart(item.id));
        
        li.appendChild(addButton);
        li.appendChild(removeButton);
        li.appendChild(deleteButton);
        cartItemsList.appendChild(li);
    });
}

function getProductDetails(productId) {
    // Assuming product details are fetched from a database
    if (productId === 'product1') {
        return { id: 'product1', name: 'Product 1', price: 10 };
    } else if (productId === 'product2') {
        return { id: 'product2', name: 'Product 2', price: 15 };
    }
    // Add more product details as needed
}

// script.js

// Handle form submission for adding a new car
document.getElementById("add-car-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var carData = {};
    formData.forEach(function(value, key) {
        carData[key] = value;
    });
    addCarToCatalogue(carData);
    event.target.reset();
});

// Function to add a new car to the catalogue
function addCarToCatalogue(carData) {
    var catalogueData = JSON.parse(localStorage.getItem("catalogueData")) || [];
    catalogueData.push(carData);
    localStorage.setItem("catalogueData", JSON.stringify(catalogueData));
}

// Function to display confirmation data in Interface 2
function displayConfirmationData() {
    var confirmationData = JSON.parse(localStorage.getItem("confirmationData")) || {};
    var confirmationContainer = document.getElementById("confirmation-data");
    confirmationContainer.innerHTML = "";
    for (var key in confirmationData) {
        var div = document.createElement("div");
        div.textContent = key + ": " + confirmationData[key];
        confirmationContainer.appendChild(div);
    }
}

