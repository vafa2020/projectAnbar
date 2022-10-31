import Storage from "./Storage.js";
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const addNewProductBtn = document.querySelector("#addNewProduct");
const searchProduct = document.querySelector("#search-product");
const sortProduct = document.querySelector("#sort-product");
const productCategory = document.querySelector("#product-category");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
    searchProduct.addEventListener("change", (e) => this.searchProduct(e));
    sortProduct.addEventListener("change", (e) => this.sortedProduct(e));
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createdProductList(this.products);
    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "";
  }

  createdProductList(products) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let result = "";
    products.forEach((item) => {
      const savedCategory = Storage.getAllCategories();
      let selectedCategory = savedCategory.find((c) => c.id == item.category);
      result += `<div class="flex items-center justify-between mb-6">
        <span class="text-slate-400">${item.title}</span>
        <div class="flex items-center justify-between gap-x-4">
          <span class="text-slate-400">${new Date().toLocaleDateString(
            "fa-IR",
            options
          )}</span>
          <p class="border bg-transparent text-slate-400 rounded-full px-5 text-sm">${
            selectedCategory.title
          }</p>
          <span class="flex items-center justify-center w-7 h-7 rounded-full border-white border bg-slate-700 text-white">${
            item.quantity
          }</span>
          <button data-id=${
            item.id
          } class="delete-product text-red-400 border-red-400 border bg-transparent rounded-xl">delete</button>
        </div>
      </div>`;
    });

    document.querySelector("#product-list").innerHTML = result;
    const deleteProducts = [...document.querySelectorAll(".delete-product")];
    deleteProducts.forEach((element) => {
      element.addEventListener("click", (e) => this.buttonDeleteFunc(e));
    });
  }
  searchProduct(e) {
    const value = e.target.value.trim().toLowerCase();
    const filtered = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createdProductList(filtered);
  }
  sortedProduct(e) {
    const sorted = e.target.value;
    this.products = Storage.getAllProducts(sorted);
    this.createdProductList(this.products);
  }
  buttonDeleteFunc(e) {
    e.preventDefault();
    const Id = e.target.dataset.id;
    Storage.deleteProductStorage(Id);
    this.products = Storage.getAllProducts();
    this.createdProductList(this.products);
  }
}

export default new ProductView();
