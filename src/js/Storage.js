//
//   {
//     id: 1,
//     title: "frontend",
//     description: "frontend of application",
//     createdAt: "2022-01-01T10:47:16.989Z",
//   },
//   {
//     id: 2,
//     title: "backend",
//     description: "backend of application",
//     createdAt: "2022-09-01T10:47:30.669Z",
//   },
// ];
// const products = [
//   {
//     id: 1,
//     title: "react.js",
//     category: "frontend",
//     createdAt: "2021-11-01T10:47:26.889Z",
//   },
//   {
//     id: 2,
//     title: "node.js",
//     category: "backend",
//     createdAt: "2022-11-01T10:47:26.999Z",
//   },
// ];
export default class Storage {
  static getAllCategories() {
    const saveCategories = JSON.parse(localStorage.getItem("categories")) || [];
    return saveCategories.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
    );
  }
  static saveCategories(category) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find((c) => c.title == category.title);
    if (existedItem) {
      //edit
      existedItem.title = category.title;
      existedItem.description = category.description;
    } else {
      //new
      category.id = new Date().getTime();
      category.createdAt = new Date().toISOString();
      savedCategories.push(category);
    }
    localStorage.setItem("categories", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    return savedProducts.sort((a, b) => {
      if (sort === "newest" || sort === "") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1;
      }
    });
  }
  static saveProducts(product) {
    const savedProducts = Storage.getAllProducts();
    const existedProduct = savedProducts.find((p) => p.id == product.id);
    if (existedProduct) {
      //edit
      existedProduct.title = product.title;
      existedProduct.quantity = product.quantity;
      existedProduct.category = product.category;
    } else {
      product.id = new Date().getTime();
      product.createdAt = new Date().toISOString();
      savedProducts.push(product);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
}
