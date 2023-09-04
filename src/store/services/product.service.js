import productInstance from "../axios/productInstance";

const getProducts = async () => await productInstance.get("/");

const getProductBySlug = async (slug) =>
  await productInstance.get(`/slug/${slug}`);

const ProductService = {
  getProducts,
  getProductBySlug,
};
export default ProductService;
