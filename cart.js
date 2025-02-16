let cart = [];
let appliedPromoCode = null; 

const promoCodes = {
    "ostad10": 0.10, // 10% discount
    "ostad5": 0.05   // 5% discount
};

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && quantity > 0) {
        cartItem.quantity = quantity;
    }
    updateCart();
}

function clearCart() {
    cart = [];
    appliedPromoCode = null;
    updateCart();
}

function applyPromoCode(code) {
    if (promoCodes[code]) {
        appliedPromoCode = code;
        document.getElementById("promo-message").innerText = `Promo code applied: ${code}`;
    } else {
        document.getElementById("promo-message").innerText = "Invalid promo code!";
        appliedPromoCode = null;
    }
    updateCart();
}

function calculateTotal() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = appliedPromoCode ? subtotal * promoCodes[appliedPromoCode] : 0;
    let total = subtotal - discount;

    return { subtotal, discount, total };
}