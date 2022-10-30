import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  // console.log(ProductView);
  CategoryView.setApp();
  CategoryView.createCategoriesList();
  ProductView.setApp();
  ProductView.createdProductList();
});
