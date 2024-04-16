// npm code
// npx json-server --watch db.json

const btns = document.querySelectorAll(".btn");
const productsDOM = document.querySelector(".products-center");
const storeProducts = document.querySelectorAll(".product");
const searchInput = document.querySelector("#search");

let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      console.log(res.data);
      allProductsData = res.data;
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(products, _filters) {
  const filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  productsDOM.innerHTML = "";
  filteredProducts.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<div class="img-container">
    <img src=${item.image} class="product-img" />
    </div>
    <div class="product-desc">
      <p class="product-price">$ ${item.price}</p>
      <p class="product-title">${item.title}</p>
    </div>`;
    productsDOM.appendChild(productDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  });
});
