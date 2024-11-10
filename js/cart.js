class CartManager {
    constructor() {
        this.cart = this.getCart();
        this.lastKnownCount = null;
    }

    getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : { items: [] };
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    addItem(item) {
        const existingItem = this.cart.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.items.push({
                id: item.id,
                name: item.name,
                price: parseFloat(item.price),
                image: item.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.showModal();
    }

    removeItem(itemId) {
        this.cart.items = this.cart.items.filter(item => item.id !== itemId);
        this.saveCart();
    }

    updateQuantity(itemId, quantity) {
        const item = this.cart.items.find(i => i.id === itemId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0).toFixed(2);
    }

    getTotalItemsCount() {
        return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const currentCount = this.getTotalItemsCount();
            
            // Only update DOM if count has changed
            if (this.lastKnownCount !== currentCount) {
                cartCount.textContent = currentCount;
                this.lastKnownCount = currentCount;
            }
        }
    }

    initializeCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount && this.lastKnownCount === null) {
            this.lastKnownCount = this.getTotalItemsCount();
            cartCount.textContent = this.lastKnownCount;
        }
    }

    showModal() {
        const modal = document.getElementById('addToCartModal');
        modal.classList.add('show');

        // Handle continue shopping button
        const continueBtn = modal.querySelector('.continue-shopping');
        continueBtn.onclick = () => {
            modal.classList.remove('show');
        };

        // Close modal when clicking outside
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        };
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Initialize cart count immediately when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        cartManager.initializeCartCount();
    });
} else {
    cartManager.initializeCartCount();
}

// Add event listeners to "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const item = {
                id: e.target.dataset.id,
                name: e.target.dataset.name,
                price: e.target.dataset.price,
                image: e.target.dataset.image
            };
            
            cartManager.addItem(item);
        });
    });
});
