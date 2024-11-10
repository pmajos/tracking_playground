// Sample product data (this would usually come from a backend)
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 99.99,
        image: "path/to/image1.jpg",
        description: "Description for product 1"
    },
    {
        id: 2,
        name: "Product 2",
        price: 149.99,
        image: "path/to/image2.jpg",
        description: "Description for product 2"
    }
];

// Shopping cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    // Update cart count in navigation
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add cart count to navigation
    const cartLink = document.querySelector('nav a[href="cart.html"]');
    if (cartLink) {
        cartLink.innerHTML += ' <span class="cart-count">0</span>';
    }

    // Display featured products on home page
    const featuredSection = document.querySelector('.featured-products');
    if (featuredSection) {
        products.forEach(product => {
            featuredSection.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        });
    }
});
