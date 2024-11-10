import products from './products.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    if (!productId || !products[productId]) {
        window.location.href = 'category.html';
        return;
    }

    const product = products[productId];

    // Update page content
    document.title = `${product.name} - ModernStore`;
    document.getElementById('productImage').src = product.image;
    document.getElementById('productImage').alt = product.name;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price}`;
    document.getElementById('productDescription').textContent = product.description;

    const detailsList = document.getElementById('productDetails');
    product.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
    });

    // Setup Add to Cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.dataset.id = product.id;
    addToCartBtn.dataset.name = product.name;
    addToCartBtn.dataset.price = product.price;
    addToCartBtn.dataset.image = product.image;
}); 
