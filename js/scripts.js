let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, name, price, image) {
    cart.push({ productId, name, price, image, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.target;
            addToCart(
                btn.dataset.id,
                btn.dataset.name,
                parseFloat(btn.dataset.price),
                btn.dataset.image
            );
        });
    });
});
