document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalAmount = document.querySelector('.subtotal-amount');

    function renderCart() {
        const cart = cartManager.getCart();
        
        if (cart.items.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            return;
        }

        cartItemsContainer.innerHTML = cart.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price}</p>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                </div>
                <button class="remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        subtotalAmount.textContent = `$${cartManager.getTotal()}`;
        
        addCartControlListeners();
    }

    function addCartControlListeners() {
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('.cart-item').dataset.id;
                const item = cartManager.cart.items.find(i => i.id === itemId);
                cartManager.updateQuantity(itemId, item.quantity + 1);
                renderCart();
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('.cart-item').dataset.id;
                const item = cartManager.cart.items.find(i => i.id === itemId);
                cartManager.updateQuantity(itemId, item.quantity - 1);
                renderCart();
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('.cart-item').dataset.id;
                cartManager.removeItem(itemId);
                renderCart();
            });
        });
    }

    // Add checkout button handler
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // Check if cart is not empty
            if (cartManager.cart.items.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    // Initial render
    renderCart();
}); 