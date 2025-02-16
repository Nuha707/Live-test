function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    getProducts().forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

function updateCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price.toFixed(2)}</p>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartDiv.appendChild(div);
    });

    const totals = calculateTotal();
    document.getElementById("subtotal-price").innerText = totals.subtotal.toFixed(2);
    document.getElementById("discount-amount").innerText = totals.discount.toFixed(2);
    document.getElementById("total-price").innerText = totals.total.toFixed(2);
}

document.getElementById("clear-cart").addEventListener("click", clearCart);
document.getElementById("apply-promo").addEventListener("click", () => {
    const promoCode = document.getElementById("promo-code").value.trim();
    applyPromoCode(promoCode);
});

document.addEventListener("DOMContentLoaded", displayProducts);
