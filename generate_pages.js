const fs = require('fs');
const path = require('path');

// Load products
const products = require('./products.json');

// HTML Template for Individual Product Pages
const htmlTemplate = (product) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - Affix Orthotics</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="images/logo.png" alt="Affix Orthotics Logo">
            </div>
            <ul class="navigation">
                <li><a href="index.html">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="cart.html">Cart</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="product-detail">
            <div class="product-images">
                ${product.images.map(image => `<img src="images/${image}" alt="${product.name}">`).join('\n')}
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p class="price">₹${product.price}</p>
                <p class="description">This is a detailed description of ${product.name}. It includes all the features, specifications, and benefits of the product.</p>
                ${product.sizes ? `<p class="sizes">Available Sizes: 
                    <select id="size-select">
                        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                </p>` : ''}
                ${product.weights ? `<p class="weights">Available Weights: 
                    <select id="weight-select">
                        ${product.weights.map(weight => `<option value="${weight}">${weight}</option>`).join('')}
                    </select>
                </p>` : ''}
                <button class="cta-button" onclick="addToCart('${product.code}')">Add to Cart</button>
                <button class="cta-button" onclick="bulkPurchase('${product.code}')">Bulk Purchase</button>
            </div>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 Affix Orthotics. All rights reserved.</p>
    </footer>

    <!-- Modal for Add to Cart Confirmation -->
    <div id="cart-modal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeModal()">&times;</span>
            <p id="modal-message"></p>
            <button class="cta-button" onclick="goToCart()">Go to Cart</button>
            <button class="cta-button" onclick="continueShopping()">Continue Shopping</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
`;

// HTML Template for Products Listing Page
const productsPageTemplate = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products - Affix Orthotics</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="images/logo.png" alt="Affix Orthotics Logo">
            </div>
            <ul class="navigation">
                <li><a href="index.html">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="cart.html">Cart</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="products-list">
            <h1>Our Products</h1>
            <div class="products-grid">
                ${products.map(product => `<div class="product-card">
                    <img src="images/${product.images[0]}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p class="price">₹${product.price}</p>
                    <a href="${product.code}.html" class="view-button">View Product</a>
                </div>`).join('\n')}
            </div>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 Affix Orthotics. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
`;

// HTML Template for Cart Page
const cartPageTemplate = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cart - Affix Orthotics</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="images/logo.png" alt="Affix Orthotics Logo">
            </div>
            <ul class="navigation">
                <li><a href="index.html">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="cart.html">Cart</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="cart">
            <h1>Your Cart</h1>
            <div id="cart-items"></div>
            <div class="cart-total" id="cart-total">Total: ₹0</div>
            <button class="cta-button" onclick="checkout()">Checkout</button>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 Affix Orthotics. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
`;

// HTML Template for Index Page (Optional)
const indexPageTemplate = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Affix Orthotics</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="images/logo.png" alt="Affix Orthotics Logo">
            </div>
            <ul class="navigation">
                <li><a href="index.html">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="cart.html">Cart</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="home">
            <h1>Welcome to Affix Orthotics</h1>
            <p>Your trusted provider of orthopedic supports and accessories.</p>
            <a href="products.html" class="cta-button">Browse Products</a>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 Affix Orthotics. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
`;

// CSS Content (shared styles)
const cssContent = `/* filepath: style.css */

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

header {
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    padding: 1rem 2rem;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo img {
    max-height: 50px;
}

.navigation {
    list-style: none;
    display: flex;
    gap: 1rem;
}

.navigation li {
    margin: 0;
}

.navigation a {
    color: #333;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

.navigation a:hover {
    background-color: #f0f0f0;
}

.products-list {
    padding: 2rem;
    text-align: center;
}

.products-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    width: 220px;
    text-align: center;
}

.product-card img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}

.product-card h2 {
    font-size: 1.2rem;
    margin: 1rem 0 0.5rem 0;
}

.product-card .price {
    color: #333;
    font-weight: bold;
    margin-bottom: 1rem;
}

.view-button {
    background-color: #333;
    color: #fff;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 4px;
}

.view-button:hover {
    background-color: #555;
}

.product-detail {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    flex-wrap: wrap;
}

.product-images {
    flex: 1;
}

.product-images img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.product-info {
    flex: 1;
    max-width: 600px;
}

.product-info h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.product-info .price {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
}

.product-info .description {
    font-size: 1rem;
    margin-bottom: 2rem;
}

.product-info .sizes,
.product-info .weights {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.cta-button {
    background-color: #333;
    color: #fff;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 1rem;
    font-size: 1rem;
}

.cta-button:hover {
    background-color: #555;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 1rem 0;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    text-align: center;
    border-radius: 4px;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close-button:hover,
.close-button:focus {
    color: #000;
    text-decoration: none;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.cart-item button {
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
}

.cart-item button:hover {
    background-color: #ff1a1a;
}

.cart-total {
    font-weight: bold;
    margin-top: 1rem;
}
`;

// Create output directories if they don't exist
const outputDir = 'output';
const imagesDir = path.join(outputDir, 'images');
const assetsDir = path.join('assets');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Write CSS file
fs.writeFileSync(path.join(outputDir, 'style.css'), cssContent);

// Generate Individual Product HTML Files
products.forEach(product => {
    const filename = `${product.code}.html`;
    const filepath = path.join(outputDir, filename);
    const content = htmlTemplate(product);
    fs.writeFileSync(filepath, content);
});

// Generate Products Page
const productsPage = productsPageTemplate();
fs.writeFileSync(path.join(outputDir, 'products.html'), productsPage);

// Generate Cart Page
const cartPage = cartPageTemplate();
fs.writeFileSync(path.join(outputDir, 'cart.html'), cartPage);

// Generate Index Page (Optional)
const indexPage = indexPageTemplate();
fs.writeFileSync(path.join(outputDir, 'index.html'), indexPage);

// Copy Common Assets (e.g., logo.png, script.js)
const assets = ['logo.png', 'script.js'];
assets.forEach(asset => {
    const sourcePath = path.join(assetsDir, asset);
    const destPath = path.join(imagesDir, asset);
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
    }
});

console.log('All product pages, products.html, and cart.html generated successfully.');