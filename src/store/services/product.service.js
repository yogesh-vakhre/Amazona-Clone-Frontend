import productInstance from "../axios/productInstance";

const getAll = async () => {
  try {
    const products = await productInstance.get("/");
    return products.data;
  } catch (error) {
    return console.error(error);
  }
};

const getBySlug = async (slug) => {
  try {
    const product = await productInstance.get(`/slug/${slug}`);
    return product.data;
  } catch (error) {
    return console.error(error);
  }
};

const ProductService = {
  getAll,
  getBySlug,
};
export default ProductService;
