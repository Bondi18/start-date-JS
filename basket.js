"use strict";

const basketCounterEl = document.querySelector(".cartIconWrap span");
const basketTotalValueEl = document.querySelector(".basketTotalValue");
const basketEl = document.querySelector(".basket");
const basketSvgEl = document.querySelector(".cartIconWrap");
const featuredItemsEls = document.querySelector(".featuredItems");
const basketTotalEl = document.querySelector(".basketTotal");

basketSvgEl.addEventListener("click", () => {
    basketEl.classList.toggle("hidden");
})

const basket = {};

featuredItemsEls.addEventListener("click", event => {
    if (!event.target.closest('.addToCard')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCard(id, name, price);
});

function addToCard(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    const productsArr = Object.values(basket);
    let count = 0;
    for (const product of productsArr) {
        count = count + product.count;
    }
    return count;
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0)
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }

    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}





