// script.js

// Initialize cart from localStorage or create a new one
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Function to add item to cart
function addToCart(productCode) {
    const productName = getProductNameByCode(productCode);
    const productPrice = getProductPriceByCode(productCode);
    
    if (cart[productCode]) {
        cart[productCode].quantity += 1;
    } else {
        cart[productCode] = {
            name: productName,
            price: productPrice,
            quantity: 1
        };
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showModal(`Added ${productName} to cart.`);
}

// Function for bulk purchase
function bulkPurchase(productCode) {
    const productName = getProductNameByCode(productCode);
    const productPrice = getProductPriceByCode(productCode);
    const bulkQuantity = prompt(`Enter bulk quantity for ${productName}:`, "10");
    
    const quantity = parseInt(bulkQuantity);
    if (isNaN(quantity) || quantity <= 0) {
        showModal('Invalid quantity entered.');
        return;
    }
    
    if (cart[productCode]) {
        cart[productCode].quantity += quantity;
    } else {
        cart[productCode] = {
            name: productName,
            price: productPrice,
            quantity: quantity
        };
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showModal(`Added ${quantity} x ${productName} to cart.`);
}

// Function to get product name by code
function getProductNameByCode(code) {
    const products = getAllProducts();
    const product = products.find(p => p.code === code);
    return product ? product.name : 'Unknown Product';
}

// Function to get product price by code
function getProductPriceByCode(code) {
    const products = getAllProducts();
    const product = products.find(p => p.code === code);
    return product ? product.price : 0;
}

// Function to get all products (same as products.json)
function getAllProducts() {
    return [
        {"name": "Clavicle Brace", "code": "CB-01", "price": 1500},
        {"name": "Humerus Brace", "code": "HB-01", "price": 2000},
        {"name": "Elastic Wrist Support", "code": "WS-P1", "price": 800},
        // ... add all other products
        {"name": "Arm Strap", "code": "PA-03", "price": 500}
    ];
}

// Function to show modal with message
function showModal(message) {
    const modal = document.getElementById('cart-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Function to display cart items on cart.html
function displayCart() {
    if (window.location.pathname.endsWith('cart.html')) {
        const cartContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        let total = 0;
        cartContainer.innerHTML = '';

        for (const [code, item] of Object.entries(cart)) {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (₹${item.price} x ${item.quantity})</span>
                <button onclick="removeFromCart('${code}')">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        }

        cartTotal.textContent = `Total: ₹${total}`;
    }
}

// Function to remove item from cart
function removeFromCart(productCode) {
    delete cart[productCode];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    showModal('Item removed from cart.');
}

// Function to handle checkout
function checkout() {
    if (Object.keys(cart).length === 0) {
        showModal('Your cart is empty.');
        return;
    }
    // Implement actual checkout process here
    alert('Checkout functionality is not implemented yet.');
}

// Initialize cart display if on cart page
document.addEventListener('DOMContentLoaded', displayCart);