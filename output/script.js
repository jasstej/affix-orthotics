// Initialize cart from localStorage or create a new one
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Function to add item to cart
function addToCart(productCode) {
    const productName = getProductNameByCode(productCode);
    const productPrice = getProductPriceByCode(productCode);
    const selectedSize = document.querySelector(`input[name="size-${productCode}"]:checked`);

    if (!selectedSize) {
        showModal('Please select a size.');
        return;
    }

    const size = selectedSize.value;

    const cartKey = `${productCode}-${size}`;

    if (cart[cartKey]) {
        cart[cartKey].quantity += 1;
    } else {
        cart[cartKey] = {
            name: productName,
            price: productPrice,
            size: size,
            quantity: 1
        };
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showModal(`Added ${productName} (Size: ${size}) to cart.`, true);
}

// Function for bulk purchase
function bulkPurchase(productCode) {
    const productName = getProductNameByCode(productCode);
    const productPrice = getProductPriceByCode(productCode);
    const selectedSize = document.querySelector(`input[name="size-${productCode}"]:checked`);

    if (!selectedSize) {
        showModal('Please select a size.');
        return;
    }

    const size = selectedSize.value;
    const bulkQuantity = prompt(`Enter bulk quantity for ${productName} (Size: ${size}):`, "10");

    const quantity = parseInt(bulkQuantity);
    if (isNaN(quantity) || quantity <= 0) {
        showModal('Invalid quantity entered.');
        return;
    }

    const cartKey = `${productCode}-${size}`;

    if (cart[cartKey]) {
        cart[cartKey].quantity += quantity;
    } else {
        cart[cartKey] = {
            name: productName,
            price: productPrice,
            size: size,
            quantity: quantity
        };
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showModal(`Added ${quantity} x ${productName} (Size: ${size}) to cart.`, true);
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
        {
            "name": "Clavicle Brace",
            "code": "CB-01",
            "price": 1500,
            "images": ["CB-01_1.jpg", "CB-01_2.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Humerus Brace",
            "code": "HB-01",
            "price": 2000,
            "images": ["HB-01_1.jpg", "HB-01_2.jpg", "HB-01_3.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Elastic Wrist Support",
            "code": "WS-P1",
            "price": 800,
            "images": ["WS-P1_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Tibla Brace",
            "code": "TB-01",
            "price": 1200,
            "images": ["TB-01_1.jpg", "TB-01_2.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Silicone Foot Insole",
            "code": "SI-01",
            "price": 800,
            "images": ["SI-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Silicone Foot Arch",
            "code": "SA-01",
            "price": 900,
            "images": ["SA-01_1.jpg", "SA-01_2.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Heel Cushion",
            "code": "HC-01",
            "price": 500,
            "images": ["HC-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Skin Traction",
            "code": "TR-01",
            "price": 1400,
            "images": ["TR-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Ankle Traction",
            "code": "TR-02",
            "price": 1500,
            "images": ["TR-02_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Pelvic Traction",
            "code": "PT-01",
            "price": 1600,
            "images": ["PT-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Exercise Ball",
            "code": "EB-01",
            "price": 600,
            "images": ["EB-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Weight cuff",
            "code": "WC-01",
            "price": 400,
            "images": ["WC-01_1.jpg"],
            "weights": ["1kg", "2kg", "5kg"]
        },
        {
            "name": "Finger Exerciser",
            "code": "FE-01",
            "price": 300,
            "images": ["FE-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Bed Rest",
            "code": "BR-01",
            "price": 1000,
            "images": ["BR-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Commode Chair",
            "code": "CC-01",
            "price": 2500,
            "images": ["CC-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Commode Stool",
            "code": "CS-02",
            "price": 1800,
            "images": ["CS-02_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Walking Stick with Elbow Support",
            "code": "WS-01",
            "price": 1300,
            "images": ["WS-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Crutches",
            "code": "CR-01",
            "price": 2200,
            "images": ["CR-01_1.jpg", "CR-01_2.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Foldable Walker",
            "code": "FW-01",
            "price": 3000,
            "images": ["FW-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Walking Stick",
            "code": "WS-02",
            "price": 900,
            "images": ["WS-02_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Walking Stick 3 Leg",
            "code": "WS-03",
            "price": 1000,
            "images": ["WS-03_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Walking Stick 4 Leg",
            "code": "WS-04",
            "price": 1100,
            "images": ["WS-04_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Thermal Hot Water Bottle",
            "code": "THWB-01",
            "price": 700,
            "images": ["THWB-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Back Rest Universal",
            "code": "BRU-01",
            "price": 1400,
            "images": ["BRU-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "STOCKS AVAILABLE AT",
            "code": "STA-01",
            "price": 0,
            "images": [],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Heating Pad",
            "code": "HP-01",
            "price": 600,
            "images": ["HP-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Insole with Foot Arch",
            "code": "IFA-01",
            "price": 800,
            "images": ["IFA-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Cervical Collar",
            "code": "CC-01",
            "price": 1800,
            "images": ["CC-01_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Cervical Collar Hard",
            "code": "CC-02",
            "price": 2000,
            "images": ["CC-02_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Philadelphia Collar",
            "code": "CC-03",
            "price": 2200,
            "images": ["CC-03_1.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Cervical Pillow",
            "code": "PL-01",
            "price": 1500,
            "images": ["PL-01_1.jpg", "PL-01_2.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        {
            "name": "Arm Strap",
            "code": "PA-03",
            "price": 500,
            "images": ["PA-03_1.jpg", "PA-03_2.jpg"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        }
    ];
}

// Function to show modal with message
function showModal(message, showOptions = false) {
    const modal = document.getElementById('cart-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerHTML = message;

    if (showOptions) {
        modalMessage.innerHTML += `
            <div class="modal-options">
                <button onclick="goToCart()">Go to Cart</button>
                <button onclick="closeModal()">Continue Shopping</button>
            </div>
        `;
    }

    modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Function to go to cart page
function goToCart() {
    window.location.href = 'cart.html';
}

// Function to display cart items on cart.html
function displayCart() {
    if (window.location.pathname.endsWith('cart.html')) {
        const cartContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        let total = 0;
        cartContainer.innerHTML = '';

        for (const [key, item] of Object.entries(cart)) {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (Size: ${item.size}) (₹${item.price} x ${item.quantity})</span>
                <button onclick="removeFromCart('${key}')">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        }

        cartTotal.textContent = `Total: ₹${total}`;
    }
}

// Function to remove item from cart
function removeFromCart(cartKey) {
    delete cart[cartKey];
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