import Storage from "./Storage.js";
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const AddNewCategoryBtn = document.querySelector("#AddNewCategory");
const toggleButtonCategory = document.querySelector("#toggle-button-category");
const productcategorySelect = document.querySelector("#product-category");
const cancelCategoryBtn = document.querySelector("#cancelCategory");

class CategoryView {
  constructor() {
    AddNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleButtonCategory.addEventListener("click", (e) => this.toggleChange(e));
    cancelCategoryBtn.addEventListener("click", (e) => this.cancelCategory(e));
    this.categories = [];
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategories({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryTitle.value = "";
    categoryDescription.value = "";
  }

  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">
    select a category
  </option>`;
    this.categories.map(
      (opt) =>
        (result += `<option class="bg-slate-500 text-slate-300" value=${opt.id}>
          ${opt.title}
        </option>`)
    );
    productcategorySelect.innerHTML = result;
  }

  toggleChange() {
    const wrapperCategory = document.querySelector("#categoryToggle");
    wrapperCategory.classList.remove("hidden");
    toggleButtonCategory.classList.add("hidden");
  }
  cancelCategory() {
    const wrapperCategory = document.querySelector("#categoryToggle");
    wrapperCategory.classList.add("hidden");
    toggleButtonCategory.classList.remove("hidden");
  }
}

export default new CategoryView();
