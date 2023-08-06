import productInstance from "../axios/productInstance";

const getAll = async () => {
  try {
    const products = await productInstance.get("/");
    return products.data;
  } catch (error) {
    return console.error(error);
  }
};

const ProductService = {
  getAll,
};
export default ProductService;
