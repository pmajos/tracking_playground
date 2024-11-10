document.addEventListener('DOMContentLoaded', () => {
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const totalAmount = document.querySelector('.total-amount');

    function renderOrderSummary() {
        const cart = cartManager.getCart();
        
        if (cart.items.length === 0) {
            showEmptyCartModal();
            return;
        }

        // Render order items
        orderItemsContainer.innerHTML = cart.items.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price} × ${item.quantity}</p>
                </div>
                <div class="item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');

        // Update totals
        const subtotal = cartManager.getTotal();
        subtotalAmount.textContent = `$${subtotal}`;
        totalAmount.textContent = `$${subtotal}`; // Same as subtotal since shipping is free
    }

    // Handle form submission
    const shippingForm = document.getElementById('shipping-form');
    if (shippingForm) {
        shippingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear the cart
            localStorage.removeItem('cart');
            
            // Redirect to thank you page
            window.location.href = 'thank-you.html';
        });
    }

    // Add autofill functionality
    const checkoutFormInputs = ['#name', '#email', '#address', '#city', '#postal'];
    setupAutofill(checkoutFormInputs);

    // Initial render
    renderOrderSummary();
});

function showEmptyCartModal() {
    const modal = document.getElementById('emptyCartModal');
    modal.classList.add('show');

    // Close modal when clicking outside
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            window.location.href = 'cart.html';
        }
    };
} 
