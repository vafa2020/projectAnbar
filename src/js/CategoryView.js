const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const AddNewCategoryBtn = document.querySelector("#AddNewCategory");
const cancelBtn = document.querySelector("#cancel");
const productcategorySelect = document.querySelector("#product-category");
import Storage from "./Storage.js";

class CategoryView {
  constructor() {
    AddNewCategoryBtn.addEventListener("click", (e) => this.AddNewCategory(e));
    this.categories = [];
  }
  AddNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategories({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList(this.categories);
  }
  createCategoriesList(categories) {
    let result = `<option class="bg-slate-500 text-slate-300" value="">
    select a category
  </option>`;
    const options = categories.map(
      (opt) =>
        (result += `<option class="bg-slate-500 text-slate-300" value=${opt.id}>
          ${opt.title}
        </option>`)
    );
    productcategorySelect.innerHTML = options;
    console.log(productcategorySelect);
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
}

export default new CategoryView();
