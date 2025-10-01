const productsList = document.querySelector(".list-product");

const cartTab = document.querySelector(".cart-tab");
const cartIcon = document.querySelector(".cart-icon");

cartIcon.addEventListener("click", () => {
  cartTab.classList.toggle("active"); // ye cart-tab ko dikha/chupta hai
});

let products = [];
let cart = [];
let TotalQuantity = 0;

function addProductData() {
  if (products.length > 0) {
    productsList.innerHTML = "";
    products.forEach((item) => {
      let newProduct = document.createElement("div");
      let cardBtn = document.createElement("p");
      cardBtn.classList.add("cart-btn");
      cardBtn.innerText = "Add to Cart";
      newProduct.classList.add("product");
      newProduct.innerHTML = `<img src="${item.image}" alt="chair" />
      <p class="product-name">${item.name}</p>
      <p class="price">$${item.price}</p>`;
      newProduct.appendChild(cardBtn);
      productsList.appendChild(newProduct);

      cardBtn.addEventListener("click", () => {
        addToCart(item.id);
      });
    });
  }
}

function addToCart(productId) {
  let product = products.find((p) => p.id === productId);
  let itemInCart = cart.find((item) => item.id === productId);
  console.log(itemInCart);
  if (itemInCart) {
    itemInCart.quantity += 1;
    // TotalQuantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
    // console.log(cart);
    // console.log(TotalQuantity);
  }
  addToCartHtml();
}

const productCartList = document.querySelector(".product-list-cart");
const cartQuentity = document.querySelector(".cart-quentity");
console.log(cartQuentity);
function addToCartHtml() {
  productCartList.innerHTML = "";
  TotalQuantity = 0;
  cart.forEach((cartItem) => {
    TotalQuantity += cartItem.quantity;
    cartQuentity.innerText = TotalQuantity;
    let newCartItem = document.createElement("div");
    newCartItem.classList.add("cart-product");
    newCartItem.innerHTML = `
    <img src="${cartItem.image}" alt="chair" />
            <p class="cart-p-name">${cartItem.name}</p>
            <p class="cart-price">$${cartItem.price}</p>
            <div class="quentity-btn">
              <div class="decresse">-</div>
              <span class="cart-quentity">${cartItem.quantity}</span>
              <div class="decresse">+</div>
            </div>
    `;
    // console.log(TotalQuantity);
    productCartList.appendChild(newCartItem);
  });
}

function fetchData() {
  fetch("product.json")
    .then((data) => data.json())
    .then((data) => {
      products = data;
      addProductData();
    })
    .catch((err) => console.error(err));
}

fetchData();
