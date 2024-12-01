document.addEventListener('DOMContentLoaded', () => {
    // Load cart items from local storage
    loadCart();
});

function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    showModal(`${productName} has been added to your cart.`);
}

function bulkPurchase(productName) {
    let quantity = prompt(`Enter the quantity for bulk purchase of ${productName}:`);
    if (quantity && !isNaN(quantity)) {
        let price = 999.99; // Example price, you can fetch the actual price dynamically
        let totalPrice = price * quantity;
        addToCart(`${productName} (Bulk x${quantity})`, totalPrice);
    } else {
        showModal('Invalid quantity.');
    }
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.querySelector('.cart-items');
    let cartTotal = 0;

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.productName}</span>
                <span>₹${item.price.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItem);
            cartTotal += item.price;
        });

        document.getElementById('cart-total').innerText = cartTotal.toFixed(2);
    }
}

function showModal(message) {
    let modal = document.getElementById('cart-modal');
    let modalMessage = document.getElementById('modal-message');
    modalMessage.innerText = message;
    modal.style.display = 'block';
}

function closeModal() {
    let modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

function checkout() {
    alert('Proceeding to checkout...');
    // Implement checkout functionality here
}