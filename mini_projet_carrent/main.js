let search=document.querySelector('.search-box');

document.querySelector('#search-icon').onclick=()=>{
    search.classList.toggle('active');
    menu.classList.remove('active');
}
let menu=document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = ()=> {
    menu.classList.toggle('active');
    search.classList.remove('active');
}
//hide menu and search box on scroll 
window.onscroll=()=>{
    menu.classList.remove('active');
    search.classList.remove('active');
}
//header
let header=document.querySelector('header');
window.addEventListener('scroll' , ()=> {
    header.classList.toggle('shadow', window.scrollY > 0);
});


/*filtre*/

document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll('.filter button');
    const boxes = document.querySelectorAll('.box');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterName = button.dataset.name;

            // Toggle the 'active' class on the clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter the boxes based on the color or model name
            boxes.forEach(box => {
                const boxColor = box.dataset.color;
                const boxModel = box.dataset.model;
                if (filterName === 'tous' || filterName === boxColor || filterName === boxModel) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });
});


/*price*/
function sortCarsAscending() {
    var container = document.querySelector('.cars-container');
    var boxes = container.querySelectorAll('.box');
    var sortedBoxes = Array.from(boxes).sort(function(a, b) {
        var priceA = parseFloat(a.querySelector('#prix').textContent.replace('prix:', '').replace('$', ''));
        var priceB = parseFloat(b.querySelector('#prix').textContent.replace('prix:', '').replace('$', ''));
        return priceA - priceB;
    });
    container.innerHTML = '';
    sortedBoxes.forEach(function(box) {
        container.appendChild(box);
    });
}

function sortCarsDescending() {
    var container = document.querySelector('.cars-container');
    var boxes = container.querySelectorAll('.box');
    var sortedBoxes = Array.from(boxes).sort(function(a, b) {
        var priceA = parseFloat(a.querySelector('#prix').textContent.replace('prix:', '').replace('$', ''));
        var priceB = parseFloat(b.querySelector('#prix').textContent.replace('prix:', '').replace('$', ''));
        return priceB - priceA;
    });
    container.innerHTML = '';
    sortedBoxes.forEach(function(box) {
        container.appendChild(box);
    });
}


// script.js

function addToCart(event) {
    event.preventDefault();
    var box = event.target.closest(".box");
    var carName = box.querySelector("h3").textContent;
    var carPrice = box.querySelector("#prix").textContent;
    var carImage = box.querySelector("img").src;

    // Create an object with the cart item details
    var cartItem = {
        name: carName,
        price: carPrice,
        image: carImage
    };

    // Store the cart item in localStorage
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    alert("Product added to cart!");
}


// script.js


function showCart() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var cartList = document.getElementById("cart-items");
    var totalElement = document.getElementById("cart-total");

    // Clear previous content
    cartList.innerHTML = "";

    // Add each cart item to the list
    cartItems.forEach(function(item, index) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = item.image;

        var name = document.createElement("span");
        name.textContent = item.name;
        
        var price = document.createElement("span");
        price.textContent = item.price;

        // Check if quantity is defined, if not, default to 1
        var quantity = document.createElement("span");
        quantity.textContent = `- Quantity: ${item.quantity || 1}`;

        let addButton = document.createElement("button");
        addButton.textContent = '+';
        addButton.addEventListener('click', () => increaseQuantity(item.id));
        
        let removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => decreaseQuantity(item.id));

        var button = document.createElement("button");
        button.textContent = "Supprimer";
        button.addEventListener("click", function() {
            removeCartItem(item.id);
        });

        li.appendChild(img); 
        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(quantity);
        li.appendChild(addButton);
        li.appendChild(removeButton);
        li.appendChild(button);
        cartList.appendChild(li);
    });
    totalElement.textContent = "Total: $" + calculateTotal().toFixed(2);
}
function increaseQuantity(id) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity++;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        showCart();
    }
}

function decreaseQuantity(id) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        showCart();
    }
}
function removeCartItem(id) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var index = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        showCart();
    }
}
function calculateTotal() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var total = 0;

    cartItems.forEach(function(item) {
        total += item.price * (item.quantity || 1);
    });

    return total;
}