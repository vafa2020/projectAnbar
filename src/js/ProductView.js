import Storage from "./Storage.js";

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const selectCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#addNewProduct");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
    // selectCategory.addEventListener("change", (e) => this.selectedCategory(e));
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = selectCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    console.log(this.products);
    this.createdProductList();
  }

  createdProductList() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let result = "";
    this.products?.forEach((item) => {
      const savedCategory = Storage.getAllCategories();
      let selectedCategory = savedCategory.find((c) => c.id == item.category);

      result += `<div class="flex items-center justify-between mb-6">
  <span class="text-slate-400">${item.title}</span>
  <div class="flex items-center justify-between gap-x-2">
    <span class="text-slate-400">${new Date().toLocaleDateString(
      "fa-IR",
      options
    )}</span>
    <span
      class="border bg-transparent text-slate-400 rounded-full p-1 text-sm"
      >${selectedCategory.title}</span
    >
    <span
      class="flex items-center justify-center w-7 h-7 rounded-full border-white border-2 bg-slate-700 text-white"
      >${item.quantity}</span
    >
    <button class="border-0 bg-transparent text-red-500" data-id=${item.id}>
      delete
    </button>
  </div>
</div>`;
    });

    document.querySelector("#product-list").innerHTML = result;
  }
}

export default new ProductView();
